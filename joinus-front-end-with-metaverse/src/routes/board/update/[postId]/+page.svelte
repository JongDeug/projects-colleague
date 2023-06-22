<script>
  import Layout from "../../../../component/Layout.svelte";
  import Quill from "../../../../component/Quill.svelte";
  import SmallHeader from "../../../../component/SmallHeader.svelte";
  import ConfirmBtn from "../../../../component/ConfirmBtn.svelte";
  import { Toggle, Label, Select } from "flowbite-svelte";
  import axios from "axios";
  import { URL } from "../../../env";
  import * as localStorage from "../../../localStorage";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  /** @type {import("./$types").PageData} */
  export let data;


  let content = { html: "", text: "" };
  $: console.log(content);
  let title;

  export let post = [];
  onMount(async () => {
    await axios.get(`${URL}/api/post/detail/edit`,
      {
        params: {
          postId: data.postId
        },
        withCredentials: true
      })
      .then(response => {
        let copy = response.data.data;
        let date = copy.createTime.split("T")[0];
        let time = copy.createTime.split("T")[1].split(".")[0];

        copy.createTime = date + " | " + time;
        post = copy;
        console.log(post);

        content.html = post.content;
        title = post.title;
      })
      .catch(error => console.log(error));
  });

  let selected;

  let previewStatus = true;
  const handlePreviewBtn = () => {
    previewStatus = !previewStatus;
  };

  let userId = localStorage.getWithExpiry("loginMember");
  const updatePost = async () => {
    if (!title) {
      alert("제목을 입력해주세요");
    } else {
      await axios.post(`${URL}/api/post/create`,
        {
          id: post.id,
          userId: post.userId,
          title: title,
          content: content.html,
          hit: post.hit
        }, { withCredentials: true })
        .then(response => {
          if (response.data.data == "success") {
            alert("update success");
            if (browser) {
              window.location.href = "/";
            }
          }
        })
        .catch(error => console.log(error));
    }
  };
</script>

<SmallHeader header="Update Post" />

<Layout>
  {#if !previewStatus}
    <!-- 게시판 내용 작성 -->
    <div class="w-[100%] mr-3">
      <input
        type="text"
        class="mb-3 border-slate-400 w-full"
        placeholder="제목을 입력해주세요"
        bind:value={title}
      />

      <div id="quill">
        <Quill {content} bind:value={content} />
      </div>

      <div class="flex justify-between mt-5">
        <!-- 태그 및 공지 설정 -->
        <div class="flex items-center">
          <!-- 공지 설정은 관리자만 -->
          <div>
            <Toggle>공지 설정</Toggle>
          </div>
        </div>

        <!-- 버튼 -->
        <div>
          <ConfirmBtn on:click={updatePost} content="수정" color="blue" />
          <ConfirmBtn content="미리보기" color="blue" on:click={handlePreviewBtn} />
        </div>
      </div>
    </div>
  {:else}
    <!-- 게시판 내용 표시 -->
    <div class="border w-[100%] border-slate-400 py-2 px-3 mb-3">
      {#if !!title}
        {title}
      {:else}
        제목을 입력해주세요
      {/if}
    </div>
    <div class="border w-[100%] h-[500px] border-slate-300 p-5">
      {@html content.html}
    </div>

    <div class="flex justify-between mt-5">
      <!-- 태그 및 공지 설정 -->
      <div class="flex items-center">
        <div>
          <Toggle>공지 설정</Toggle>
        </div>
      </div>

      <!-- 버튼 -->
      <div>
        <ConfirmBtn on:click={updatePost} content="수정" color="blue" />
        <ConfirmBtn content="돌아가기" color="blue" on:click={handlePreviewBtn} />
      </div>
    </div>
  {/if}
</Layout>
