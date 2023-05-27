<script>
  import { fade, fly } from "svelte/transition";
  import { clickOutside } from "../routes/clickOutside";
  import { Modal, Label, Search, Textarea } from "flowbite-svelte";
  import HeaderBtn from "./HeaderBtn.svelte";
  import Svg from "./Svg.svelte";
  import ConfirmBtn from "./ConfirmBtn.svelte";
  import axios from "axios";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { URL } from "../routes/env";
  import * as localStorage from "../routes/localStorage";
  import { onMount } from "svelte";
  import { page } from "$app/stores";


  let profileStatus = false;
  const handleProfileStatus = () => {
    profileStatus = !profileStatus;
  };

  let mobileMenu = false;
  const handleMobileStauts = () => {
    mobileMenu = !mobileMenu;
  };

  // url 받아오기

  let path = $page.url.pathname;
  let pathArray = path.split("/")[1];
  let current;
  if (pathArray === "") {
    current = "Board";
  } else if (pathArray === "myTeam") {
    current = "MyTeam";
  } else {
    current = "UserRecommendation";
  }

  let sendModal = false;
  let color;
  let textareaprops = {
    id: "message",
    name: "message",
    label: "Your message",
    rows: 4,
    placeholder: "Leave a comment..."
  };


  // 로그인 상태
  let loginMember;
  if (browser) {
    loginMember = localStorage.getWithExpiry("loginMember");
  }

  const logout = () => {
    const res = axios.get(`${URL}/api/logout`, { withCredentials: true }
    )
      .then(response => {
        if (response.data.data == "success") {
          localStorage.removeItem("loginMember");
          if (browser) {
            window.location.href = response.data.redirect;
          }
        }
      })
      .catch(error => console.log(error));
  };

  let userInfo = [];
  onMount(async () => {
    let loginMember = localStorage.getWithExpiry("loginMember");
    if (loginMember) {
      await axios.get(`${URL}/api/member/profile/update`,
        { withCredentials: true })
        .then(response => {
          userInfo = response.data.data;
        })
        .catch(error => console.log(error));
    }
  });
</script>

<nav id="nav" class="bg-[#95E0C8]">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <!-- 왼쪽 -->
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <a
            href="/"
            on:click={() => (current = 'Board')}
            class="flex navLogo items-center"
            id="logo"
          >
            <img src="/images/JoinUs.png" alt="" class="w-11 h-11 mr-3" />
            Join.Us
          </a>
        </div>

        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <HeaderBtn
              href="/"
              on:click={() => (current = 'Board')}
              content="게시판"
              {current}
              name="Board"
            />
            <HeaderBtn
              href="/myTeam/list"
              on:click={() => (current = 'MyTeam')}
              content="내 팀(ing)"
              {current}
              name="MyTeam"
            />
            <HeaderBtn
              href="/userRecommendation"
              on:click={() => (current = 'UserRecommendation')}
              content="유저 추천"
              {current}
              name="UserRecommendation"
            />
            <!--            <HeaderBtn-->
            <!--              href="/faq"-->
            <!--              on:click={() => (current = 'FAQ')}-->
            <!--              content="FAQ"-->
            <!--              {current}-->
            <!--              name="FAQ"-->
            <!--            />-->
          </div>
        </div>
      </div>

      <!-- 오른쪽 -->
      <div class="hidden md:block">
        <div class="ml-4 flex items-center space-x-3 md:ml-6">
          {#if !loginMember}
            <!-- 회원가입, 로그인 -->
            <a
              href="/signup"
              class="bg-gray-900 text-white px-3 py-1 rounded-md font-medium focus:ring-4 focus:outline-none"
            >회원가입</a
            >
            <a
              href="/login"
              class="bg-gray-900 text-white px-3 py-1 rounded-md font-medium focus:ring-4 focus:outline-none"
            >로그인</a
            >
          {/if}

          {#if loginMember}
            <!-- 알림, 작은 프로필 -->
            <div class="ml-4 md:ml-6 flex items-center">
              <button
                type="button"
                class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <Svg svgName="알림" />
              </button>

              <!-- 프로필 사진 -->
              <div class="relative ml-3">
                <button
                  type="button"
                  class="flex max-w-xs items-center rounded-full bg-gray-800 focus:outline-none focus:ring-2 ring-red focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  on:click={handleProfileStatus}
                >
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>

                <!-- 프로필 사진 클릭 시 -->
                {#if profileStatus}
                  <div
                    class="absolute right-[-5px] z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    transition:fade={{ duration: 90 }}
                    use:clickOutside
                    on:clickOutside={handleProfileStatus}
                  >
                    <a
                      href="/profile"
                      class="block px-4 py-2 m-2 text-gray-700 rounded-lg hover:bg-slate-300 font-bold"
                    >
                      <span class="mb-2 inline-block">{userInfo.name}</span> <br />@{userInfo.id}
                    </a
                    >

                    <hr class="h-px mt-3 mb-2 bg-gray-200 border-0 dark:bg-gray-700" />

                    <a
                      href="/myPage/updateProfile"
                      class="block px-4 py-2 m-2 text-gray-700 rounded-lg hover:bg-slate-300">설정</a
                    >
                    <a
                      href="/postMsg"
                      class="block px-4 py-2 m-2 text-gray-700 rounded-lg hover:bg-slate-300"
                    >쪽지함
                    </a>
                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <!--                    <a-->
                    <!--                      href=""-->
                    <!--                      class="block px-4 py-2 m-2 text-gray-700 rounded-lg hover:bg-slate-300"-->
                    <!--                      on:click={() => {-->
                    <!--											color = 'yellow';-->
                    <!--											sendModal = true;-->
                    <!--										}}-->
                    <!--                    >질문하기-->
                    <!--                    </a>-->
                    <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a
                      on:click={logout}
                      class="block px-4 py-2 m-2 text-gray-700 rounded-lg hover:bg-slate-300"
                    >로그아웃</a
                    >
                  </div>
                {/if}
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- mobile -->
      <div class="-mr-2 flex md:hidden">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          on:click={handleMobileStauts}
        >
          <Svg svgName="햄버거" />
        </button>
      </div>
    </div>
  </div>

  {#if mobileMenu}
    <div class="md:hidden" id="mobile-menu" transition:fly={{ y: -10, duration: 400 }}>
      <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
        <a
          href="/board/list"
          class="{current === 'Board'
						? 'bg-gray-900 text-white'
						: ''} hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md font-medium"
          on:click={() => (current = 'Board')}>게시판</a
        >
        <a
          href="/myTeam/list"
          class="{current === 'MyTeam'
						? 'bg-gray-900 text-white'
						: ''} hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md font-medium"
          on:click={() => (current = 'MyTeam')}>내 팀(ing)</a
        >
        <a
          href="/userRecommendation"
          class="{current === 'UserRecommendation'
						? 'bg-gray-900 text-white'
						: ''} hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md font-medium"
          on:click={() => (current = 'UserRecommendation')}>유저 추천</a
        >
        <!--        <a-->
        <!--          href="/faq"-->
        <!--          class="{current === 'FAQ'-->
        <!--						? 'bg-gray-900 text-white'-->
        <!--						: ''} hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md font-medium"-->
        <!--          on:click={() => (current = 'FAQ')}>FAQ</a-->
        <!--        >-->
      </div>
      <div class="border-t border-gray-700 pt-4 pb-3">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <!-- 프로필 사진 -->
            <img
              class="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="font-medium leading-none">Tom Cook</div>
            <div class="font-medium leading-none">tom@example.com</div>
          </div>
          <button
            type="button"
            class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <Svg svgName="알림" />
          </button>
        </div>
        <div class="mt-3 space-y-1 px-2">
          <a
            href="/myPage/updateProfile"
            class="block rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:text-white"
          >설정</a
          >
          <a
            href="/postMsg"
            class="block rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:text-white"
          >쪽지</a
          >
          <!-- svelte-ignore a11y-invalid-attribute -->
          <!--          <a-->
          <!--            href="#"-->
          <!--            class="block rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:text-white"-->
          <!--            on:click={() => {-->
          <!--							color = 'yellow';-->
          <!--							sendModal = true;-->
          <!--						}}-->
          <!--          >질문하기-->
          <!--          </a>-->
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a
            on:click={logout}
            href="#"
            class="block rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:text-white"
          >로그아웃</a
          >
        </div>
      </div>
    </div>
  {/if}
</nav>

<Modal title="질문하기" bind:open={sendModal} {color} autoclose>
  <div class=" leading-relaxed w-[600px]">
    <p class="mb-6 font-bold">To. 관리자</p>
    <Label for="message" class="block mb-2">내용</Label>
    <Textarea {...textareaprops} />
  </div>
  <svelte:fragment slot="footer">
    <div class="flex justify-between w-[100%]">
      <ConfirmBtn content="취소" color="red" />
      <ConfirmBtn
        content="보내기"
        color="blue"
        on:click={() => {
					alert('Handle success');
				}}
      />
    </div>
  </svelte:fragment>
</Modal>
