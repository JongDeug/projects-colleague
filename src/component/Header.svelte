<script>
  import { fade, fly } from "svelte/transition";
  import { clickOutside } from "../routes/clickOutside";
  import {
    Modal,
    Label,
    Search,
    Textarea,
    Button,
    Badge,
    Avatar,
    Listgroup,
    ListgroupItem,
    CloseButton
  } from "flowbite-svelte";
  import HeaderBtn from "./HeaderBtn.svelte";
  import Svg from "./Svg.svelte";
  import ConfirmBtn from "./ConfirmBtn.svelte";
  import axios from "axios";
  import { browser } from "$app/environment";
  import { URL } from "../routes/env";
  import * as localStorage from "../routes/localStorage";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { postMsgCount } from "../routes/postCountStore";

  // count
  let countV;
  postMsgCount.subscribe(postMsgCount => {
    countV = postMsgCount;
    console.log(countV);
  });

  import { connect } from "../routes/SockJs";

  connect();

  let profileStatus = false;
  const handleProfileStatus = () => {
    profileStatus = !profileStatus;
  };
  let postMsgStatus = false;
  const handlePostMsgStatus = () => {
    postMsgStatus = !postMsgStatus;
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
  } else if (pathArray === "userRecommendation") {
    current = "UserRecommendation";
  } else {
    current = null;
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
        // )
        .then(response => {
          userInfo = response.data.data;
          console.log(userInfo);
        })
        .catch(error => console.log(error));
    }
  });

  // 조회
  export let items = [];
  const getReceivePosts = async () => {
    await axios.get(`${URL}/api/message/list/received`,
      { withCredentials: true })
      .then(response => {
        const receivePosts = response.data.data;
        // checked 를 걸러줘야함.
        items = receivePosts.filter((post) => post.checked === false);
        console.log(items);
      })
      .catch(error => console.log(error));
  };

  let getMessage = {};
  const getDetail = async (messageId, check) => {
    await axios.post(`${URL}/api/message/detail`, {},
      {
        params: {
          messageId: messageId,
          check: check //  or false    ( 상세조회 요청하는 유저 id가 받는사람이랑 같으면 true, 아니면 false )
        },
        withCredentials: true
      })
      .then(response => {
        getMessage = response.data.data;
        console.log(getMessage);
      })
      .catch(error => console.log(error));
  };
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
              <Button class="relative" size="sm" color="dark" on:click={async () => {
               await getReceivePosts();
               handlePostMsgStatus();
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span class="sr-only">Notifications</span>
                <span
                  class="font-medium inline-flex items-center justify-center px-2.5 py-0.5 text-sm bg-pink-500 text-pink-100 rounded-full absolute font-bold border-2 border-white dark:border-gray-900 w-5 h-5 -top-2 -right-2">{countV}</span>
              </Button>

              <!-- 프로필 사진 -->
              <div class="relative ml-3">
                <button
                  type="button"
                  class="flex max-w-xs items-center rounded-full bg-gray-800 focus:outline-none focus:ring-2 ring-red focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  on:click={handleProfileStatus}
                >
                  <img
                    class="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>

                <!-- 포스트 메시지 알림창 클릭 시 -->
                {#if postMsgStatus && items[0]}
                  <div
                    class="absolute right-12 z-10 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    transition:fade={{ duration: 90 }}
                    use:clickOutside
                    on:mouseleave={handlePostMsgStatus}
                  >
                    <div class="p-1">
                      <Listgroup active>

                        {#each items as postMsg}
                          <div class="flex">
                            <ListgroupItem class="font-semibold gap-2" on:click={() => {
                            if(browser){
                              window.location.href = "/postMsg";
                            }
                            }}>
                              <span class="overflow-hidden">{postMsg.sender}님이 쪽지를 전송했습니다!😀</span>
                            </ListgroupItem>
                            <CloseButton on:click={async () => {
                              alert('삭제하시면 읽은 것으로 표시됩니다.');
                              await getDetail(postMsg.id, true);
                              postMsgCount.update(postMsgCount => postMsgCount -= 1);
                            }} />
                          </div>
                        {/each}
                      </Listgroup>
                    </div>


                  </div>
                {/if}

                <!-- 프로필 사진 클릭 시 -->
                {#if profileStatus}
                  <div
                    class="absolute right-[-5px] z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    transition:fade={{ duration: 90 }}
                    use:clickOutside
                    on:mouseleave={handleProfileStatus}
                  >
                    <a
                      href="/profile/{userInfo.id}"
                      class="block px-4 py-2 m-2 text-gray-700 rounded-lg hover:bg-slate-300 font-bold"
                    >
                      <span class="mb-2 inline-block">{userInfo.name}</span> <br />@{userInfo.id}
                    </a>
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
                    <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                    <a
                      on:click={logout}
                      class="block px-4 py-2 m-2 text-gray-700 rounded-lg hover:bg-slate-300"
                    >로그아웃</a>
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
