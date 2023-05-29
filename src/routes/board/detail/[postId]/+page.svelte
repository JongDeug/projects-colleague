<script>
  import Layout from "../../../../component/Layout.svelte";
  import SmallHeader from "../../../../component/SmallHeader.svelte";
  import Svg from "../../../../component/Svg.svelte";
  import ConfirmBtn from "../../../../component/ConfirmBtn.svelte";
  import { onMount } from "svelte";
  import axios from "axios";
  import { URL } from "../../../env";
  import * as localStorage from "../../../localStorage";
  import { browser } from "$app/environment";

  /** @type {import("./$types").PageData} */
  export let data;

  let userId = localStorage.getWithExpiry("loginMember");
  export let post = [];
  onMount(async () => {
    // 게시글 상세정보 게시글 id 파라미터로 줘서 Post 엔티티로 받아오기
    await axios.get(`${URL}/api/post/detail`,
      {
        params: {
          postId: data.postId
        }
      }, { withCredentials: true })
      .then(response => {
        let copy = response.data.data;
        let date = copy.createTime.split("T")[0];
        let time = copy.createTime.split("T")[1].split(".")[0];

        copy.createTime = date + " | " + time;
        post = copy;
      })
      .catch(error => console.log(error));
  });

  // 게시글 삭제
  const deletePost = async (postId) => {
    await axios.post(`${URL}/api/post/detail/delete`,
      {},
      {
        params: {
          postId: postId
        },
        withCredentials: true
      })
      .then(response => {
        alert(response.data.data);
        if (browser) {
          window.location.href = "/";
        }
      })
      .catch(error => console.log(error));
  };
</script>

<SmallHeader header="Board" />

<Layout>
  <div class="px-5">
    <h1 class="mb-5">{post.title}</h1>
    <div class="relative flex mb-2 justify-between">
      <div class="flex space-x-5">
        <p class="flex items-center">
          <Svg svgName="작성자" />
          작성자 : {post.userId}
        </p>
        <p class="flex items-center">
          <Svg svgName="날짜" />
          날짜 : {post.createTime}
        </p>
        <p class="flex items-center">
          <Svg svgName="조회수" />
          조회수 : {post.hit}
        </p>
      </div>

      <!--      location 추가해야함-->
      {#if post.userId === userId}
        <div>
          <ConfirmBtn content="수정하기" color="blue" location="/board/update/{post.id}" />
          <a
            class="text-center text-white focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2 bg-red-600 hover:bg-red-800 focus:ring-red-300 rounded-lg"
            on:click={() => deletePost(post.id)}
          >
            삭제하기
          </a>
        </div>
      {/if}
    </div>
    <hr class="border-2 mb-3" />

    <p>{@html post.content}</p>
  </div>

</Layout>
