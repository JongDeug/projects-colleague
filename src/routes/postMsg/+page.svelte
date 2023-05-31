<script>
  import SmallHeader from "../../component/SmallHeader.svelte";
  import ConfirmBtn from "../../component/ConfirmBtn.svelte";
  import Layout from "../../component/Layout.svelte";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Checkbox,
    Pagination,
    Input,
    Modal,
    Textarea,
    Label,
    Search,
    Tabs,
    TabItem, Avatar, Listgroup, ListgroupItem
  } from "flowbite-svelte";
  import * as localStorage from "../localStorage";
  import { client } from "../SockJs";
  import { postMsgCount } from "../postCountStore";
  import axios from "axios";
  import { URL } from "../env";
  import { onMount } from "svelte";
  import { LightPaginationNav, paginate } from "svelte-paginate";
  import { browser } from "$app/environment";

  const userId = localStorage.getWithExpiry("loginMember");
  let sendContent;
  const sendMessage = (sender, receiver, content) => {
    const payload = {
      sender: sender,
      receiver: receiver,
      content: content,
      sendTime: new Date()
    };
    client.publish({ destination: "/hello", body: JSON.stringify(payload) });
    if (browser) {
      alert("쪽지 전송을 완료했습니다.");
      window.location.href = "/postMsg";
    }
  };


  let sendModal = false;
  let receiveCheckModal = false;
  let sendCheckModal = false;
  let color;


  let textareaprops = {
    id: "message",
    name: "message",
    label: "Your message",
    rows: 4,
    placeholder: ""
  };


  let members;
  let receiver = {};
  let searchInput;
  const searchUsers = async (memberId) => {
    if (memberId) {
      await axios.get(`${URL}/api/member/search`,
        {
          params: {
            memberId: memberId
          },
          withCredentials: true
        })
        .then(response => {
          members = response.data.data;
          console.log(members);
        })
        .catch(error => console.log(error));
    } else {
      members = [];
    }
  };
  $: searchUsers(searchInput);


  export let items = [];
  onMount(async () => {
    await axios.get(`${URL}/api/message/list/received`,
      { withCredentials: true })
      .then(response => {
        let receivePosts = response.data.data;
        receivePosts = receivePosts.sort((a,b) => {
          const dateA = new Date(a.sendTime);
          const dateB = new Date(b.sendTime);
          if(dateA < dateB) return 1;
          if(dateA > dateB) return -1;
        })
        for (const post of receivePosts) {
          let date = post.sendTime.split("T")[0];
          let time = post.sendTime.split("T")[1];
          time = time.split(".")[0];
          post.sendTime = `${date} / ${time}`;
        }
        items = receivePosts;
        console.log(items);
      })
      .catch(error => console.log(error));
  });

  let currentPage = 1;
  let pageSize = 3;
  $: paginatedItems = paginate({ items, pageSize, currentPage });


  const loadReceiveData = async () => {
    await axios.get(`${URL}/api/message/list/received`,
      { withCredentials: true })
      .then(response => {
        let receivePosts = response.data.data;
        for (const post of receivePosts) {
          let date = post.sendTime.split("T")[0];
          let time = post.sendTime.split("T")[1];
          time = time.split(".")[0];
          post.sendTime = `${date} / ${time}`;
        }
        items = receivePosts;
      })
      .catch(error => console.log(error));
  };

  const loadSentData = async () => {
    await axios.get(`${URL}/api/message/list/sent`,
      { withCredentials: true })
      .then(response => {
        let receivePosts = response.data.data;
        for (const post of receivePosts) {
          let date = post.sendTime.split("T")[0];
          let time = post.sendTime.split("T")[1];
          time = time.split(".")[0];
          post.sendTime = `${date} / ${time}`;
        }
        items = receivePosts;
        // console.log(items);
      })
      .catch(error => console.log(error));
  };

  // 조회
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
        if(check){
          postMsgCount.update(postMsgCount => postMsgCount -= 1);
        }
      })
      .catch(error => console.log(error));
  };

  // 삭제
  const deleteByReceiver = async (messageId) => {
    await axios.post(`${URL}/api/message/delete/receiver`, {},
      {
        params: {
          messageId: messageId
        },
        withCredentials: true
      })
      .then(response => {
        if (response.data.data == "success") {
          alert("delete success");
          if (browser) {
            window.location.href = `/postMsg`;
          }
        }
      })
      .catch(error => console.log(error));
  };
  const deleteBySender = async (messageId) => {
    await axios.post(`${URL}/api/message/delete/sender`, {},
      {
        params: {
          messageId: messageId
        },
        withCredentials: true
      })
      .then(response => {
        if (response.data.data == "success") {
          alert("delete success");
          if (browser) {
            window.location.href = `/postMsg`;
          }
        }
      })
      .catch(error => console.log(error));
  };



</script>

<SmallHeader header="Post Message" />

<Layout>
  <div class="relative overflow-x-auto">
    <Tabs>
      <!-- 받은 쪽지 -->
      <TabItem open on:click={async () => await loadReceiveData()}>
        <span slot="title">받은 쪽지</span>

        <Table class="mb-6" hoverable>
          <TableHead>
            <TableHeadCell>보낸 사람</TableHeadCell>
            <TableHeadCell>날짜</TableHeadCell>
            <TableHeadCell>본인 읽음 상태</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each paginatedItems as item}
              {#if item.receiverDeleted === false}
                <TableBodyRow
                  on:click={async (e) => {
									color = 'yellow';
									receiveCheckModal = true;
                  await getDetail(item.id, true);
								}}
                >
                  <TableBodyCell>{item.sender}</TableBodyCell>
                  <TableBodyCell>{item.sendTime}</TableBodyCell>
                  <TableBodyCell>
                    {#if item.checked === false}
                      읽지않음
                    {:else}
                      읽음
                    {/if}
                  </TableBodyCell>
                </TableBodyRow>
              {/if}
            {/each}
          </TableBody>
        </Table>


        <div class="flex justify-end">
          <ConfirmBtn
            content="쪽지 보내기"
            color="blue"
            on:click={() => {
							color = 'yellow';
							sendModal = true;
						}}
          />
        </div>

        <div class="flex justify-center mt-3">
          <LightPaginationNav
            totalItems="{items.length}"
            pageSize="{pageSize}"
            currentPage="{currentPage}"
            limit="{1}"
            showStepOptions="{true}"
            on:setPage="{(e) => {
              currentPage = e.detail.page
            }}"
          />
        </div>
      </TabItem>

      <!-- 보낸 쪽지 -->
      <TabItem on:click={async () => await loadSentData()}>
        <span slot="title">보낸 쪽지</span>
        <Table class="mb-6" hoverable>
          <TableHead>
            <TableHeadCell>받은 사람</TableHeadCell>
            <TableHeadCell>날짜</TableHeadCell>
            <TableHeadCell>상대방 읽음 상태</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each paginatedItems as item}
              {#if item.senderDeleted === false}
                <TableBodyRow
                  on:click={async (e) => {
									color = 'yellow';
									sendCheckModal = true;
                  await getDetail(item.id, false);
								}}
                >
                  <TableBodyCell>{item.receiver}</TableBodyCell>
                  <TableBodyCell>{item.sendTime}</TableBodyCell>
                  <TableBodyCell>
                    {#if item.checked === false}
                      읽지않음
                    {:else}
                      읽음
                    {/if}
                  </TableBodyCell>
                </TableBodyRow>
              {/if}
            {/each}
          </TableBody>
        </Table>

        <div class="flex justify-end">
          <ConfirmBtn
            content="쪽지 보내기"
            color="blue"
            on:click={() => {
							color = 'yellow';
							sendModal = true;
						}}
          />
        </div>

        <div class="flex justify-center mt-3">
          <LightPaginationNav
            totalItems="{items.length}"
            pageSize="{pageSize}"
            currentPage="{currentPage}"
            limit="{1}"
            showStepOptions="{true}"
            on:setPage="{(e) => {
            currentPage = e.detail.page
            }}"
          />
        </div>
      </TabItem>
    </Tabs>
  </div>


  <!-- 받은 쪽지 확인 -->
  <Modal title="받은 쪽지 확인" bind:open={receiveCheckModal} {color} autoclose>
    <div class="leading-relaxed w-[600px]">
      <Label for="message" class="block mb-2">보낸 사람</Label>
      <Input id="disabled-input-2" class="mb-6" readonly bind:value={getMessage.sender} />

      <Label for="message" class="block mb-2">내용</Label>
      <Textarea {...textareaprops} readonly bind:value={getMessage.content} />
    </div>
    <svelte:fragment slot="footer">
      <div class="flex justify-start w-[100%]">
        <ConfirmBtn
          content="삭제"
          color="red"
          on:click={async () => {
            await deleteByReceiver(getMessage.id);
					}}
        />
      </div>
    </svelte:fragment>
  </Modal>

  <!-- 보낸 쪽지 확인 -->
  <Modal title="보낸 쪽지 확인" bind:open={sendCheckModal} {color} autoclose>
    <div class="leading-relaxed w-[600px]">
      <Label for="message" class="block mb-2">받은 사람</Label>
      <Input id="disabled-input-2" class="mb-6" readonly bind:value={getMessage.receiver} />

      <Label for="message" class="block mb-2">내용</Label>
      <Textarea {...textareaprops} readonly bind:value={getMessage.content} />
    </div>
    <svelte:fragment slot="footer">
      <div class="flex justify-start w-[100%]">
        <ConfirmBtn
          content="삭제"
          color="red"
          on:click={async () => {
            await deleteBySender(getMessage.id);
					}}
        />
      </div>
    </svelte:fragment>
  </Modal>


  <!-- 쪽지 보내기 -->
  <Modal title="쪽지 보내기" bind:open={sendModal} {color}>
    <div class="relative">
      <div class=" leading-relaxed w-[600px]">
        <Label for="message" class="block mb-2">검색</Label>
        <Search size="md" class="" bind:value={searchInput} />

        <div class="absolute t-0 r-0 w-full">
          <Listgroup active>
            {#each members as member}
              <ListgroupItem class="font-semibold gap-2" on:click={(e) => {
                e.preventDefault();
              if(userId !== member.id){
                receiver = member;
              }
              members = [];
              searchInput = "";
            }}>
                <Avatar src="" size="xs" />
                {member.id}
              </ListgroupItem>
            {/each}
          </Listgroup>
        </div>

        <Label for="message" class="block mb-2 mt-4">받는 사람</Label>
        <Input id="default-input" class="mb-4" readonly bind:value={receiver.id} />

        <Label for="message" class="block mb-2">내용</Label>
        <Textarea {...textareaprops} bind:value={sendContent} />
      </div>
    </div>
    <svelte:fragment slot="footer">
      <div class="flex justify-between w-[100%]">
        <ConfirmBtn content="취소" color="red" />
        <ConfirmBtn
          content="전송"
          color="blue"
          on:click={() => {
            if(!userId){
              alert('로그인 후 이용해주세요');
            }else{
              if(!receiver && !sendContent){
                alert('빠진 입력이 있습니다.')
              }else{
              sendMessage(userId, receiver.id,sendContent)
              }
            }
          }}
        />
      </div>
    </svelte:fragment>
  </Modal>
</Layout>
