<script>
    import SmallHeader from '../../component/SmallHeader.svelte';
    import ConfirmBtn from '../../component/ConfirmBtn.svelte';
    import Layout from '../../component/Layout.svelte';
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
    TabItem
} from 'flowbite-svelte';
    import { page } from '$app/stores';
    import { onMount } from "svelte";
    import axios from "axios";
    import { URL } from "../env";
    import * as localStorage from "../localStorage";
    import { browser } from "$app/environment";

    let sendModal = false;
    let receiveCheckModal = false;
    let sendCheckModal = false;
    let color;
    let userId = sessionStorage.getItem("loginMember");

    let board = [];

    $: activeUrl = $page.url.searchParams.get('page');
    let pages = [
    { name: '1', href: '/components/pagination?page=1' },
    { name: '2', href: '/components/pagination?page=2' },
    { name: '3', href: '/components/pagination?page=3' },
    { name: '4', href: '/components/pagination?page=4' },
    { name: '5', href: '/components/pagination?page=5' }
    ];

    $: {
    pages.forEach((page) => {
        let splitUrl = page.href.split('?');
        let queryString = splitUrl.slice(1).join('?');
        const hrefParams = new URLSearchParams(queryString);
        let hrefValue = hrefParams.get('page');
        if (hrefValue === activeUrl) {
            page.active = true;
        } else {
            page.active = false;
        }
    });
    pages = pages;
}

    let receivedvMsg = [];
    let sentMsg = [];
    onMount(async () => {
    await axios.get(`${URL}/api/message/list/received`, { withCredentials: true })
        .then(response => {
            receivedvMsg = response.data.data;
            console.log(receivedvMsg)
        })
        .catch(error => console.log(error));
});

    onMount(async () => {
    await axios.get(`${URL}/api/message/list/sent`, { withCredentials: true })
        .then(response => {
            sentMsg = response.data.data;
        })
        .catch(error => console.log(error));
});

    const sendMessage = async (title, content, receiver) => {
    await axios.post(`${URL}/api/message/create`,
        {
            sender : userId,
            receiver : receiver,
            title : title,
            content : content,
        }, { withCredentials: true })
        .then(response => {
            if (response.data.data == "success") {
                alert("create success");
                if (browser) {
                    window.location.href = `/postMsg`;
                }
            }
        })
        .catch(error => console.log(error));
};

    const deleteMessage = async (messageId) => {
    await axios.post(`${URL}/api/message/delete`,
        {
            params:{
                messageId : messageId
            }
        }, { withCredentials: true })
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

    const getDetail = async (messageId) => {
    let message = [];
    await axios.get(`${URL}/api/message/detail`,
{
    params:{
    messageId : messageId
}
}, { withCredentials: true })
    .then(response => {
    if (response.data.data == "success") {
    message = response.data.data;
}
})
    .catch(error => console.log(error));
};

    const previous = () => {
    alert('Previous btn clicked. Make a call to your server to fetch data.');
};
    const next = () => {
    alert('Next btn clicked. Make a call to your server to fetch data.');
};

    let textareaprops = {
    id: 'message',
    name: 'message',
    label: 'Your message',
    rows: 4,
    placeholder: 'Leave a comment...'
};

    const clickRow = () => {
    color = 'yellow';
    receiveCheckModal = true;
};
</script>

<SmallHeader header="Post Message" />

<Layout>
    <div class="relative overflow-x-auto">
        <Tabs>
            <!-- 받은 쪽지 -->
            <TabItem open>
                <span slot="title">받은 쪽지</span>

                <Table class="mb-6" hoverable>
                    <TableHead>
                        <TableHeadCell class="!p-4">
                            <Checkbox />
                        </TableHeadCell>
                        <TableHeadCell>보낸 사람</TableHeadCell>
                        <TableHeadCell>제목</TableHeadCell>
                        <TableHeadCell>날짜</TableHeadCell>
                        <TableHeadCell>읽음 상태</TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {#each receivedvMsg as item}
                        <TableBodyRow>
                            <TableBodyCell class="!p-4">
                                <Checkbox />
                            </TableBodyCell>
                            <!-- 방법1 -->
                            <TableBodyCell on:click={clickRow}>{item.sender}</TableBodyCell>
                            <TableBodyCell on:click={clickRow}>{item.title}</TableBodyCell>
                            <TableBodyCell on:click={clickRow}>{item.sendTime}</TableBodyCell>
                            <TableBodyCell on:click={clickRow}>{item.checked}</TableBodyCell>
                        </TableBodyRow>
                        {/each}
                            </TableBody>
                            </Table>

                            <div class="flex justify-between">
                            <ConfirmBtn content="삭제" color="red" />
                            <ConfirmBtn
                            content="쪽지 보내기"
                            color="blue"
                            on:click={() => {
                            color = 'yellow';
                            sendModal = true;
                        }}
                    />
    </div>

    <div class="flex justify-center">
        <Pagination {pages} on:previous={previous} on:next={next} />
    </div>
</TabItem>

<!-- 보낸 쪽지 -->
<TabItem>
    <span slot="title">보낸 쪽지</span>
    <Table class="mb-6" hoverable>
        <TableHead>
            <TableHeadCell class="!p-4">
                <Checkbox />
            </TableHeadCell>
            <TableHeadCell>받은 사람</TableHeadCell>
            <TableHeadCell>제목</TableHeadCell>
            <TableHeadCell>날짜</TableHeadCell>
            <TableHeadCell>읽음 상태</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each sentMsg as item}
            <!-- 방법2 -->
            <TableBodyRow
                on:click={(e) => {
                    color = 'yellow';
                    sendCheckModal = true;
                }}
            >
                <TableBodyCell class="!p-4">
                    <Checkbox />
                </TableBodyCell>
                <TableBodyCell>{item.receiver}</TableBodyCell>
                <TableBodyCell>{item.title}</TableBodyCell>
                <TableBodyCell>{item.sendTime}</TableBodyCell>
                <TableBodyCell>{item.checked}</TableBodyCell>
            </TableBodyRow>
            {/each}
                </TableBody>
                </Table>

                <div class="flex justify-between">
                <ConfirmBtn content="삭제" color="red" />
                <ConfirmBtn
                content="쪽지 보내기"
                color="blue"
                on:click={() => {
                color = 'yellow';
                sendModal = true;
            }}
        />
    </div>

    <div class="flex justify-center">
        <Pagination {pages} on:previous={previous} on:next={next} />
    </div>
</TabItem>
</Tabs>
</div>

<!-- 보낸 쪽지 확인 -->
<Modal title="보낸 쪽지 확인" bind:open={sendCheckModal} {color} autoclose>
    <div class="leading-relaxed w-[600px]">
        <Label for="message" class="block mb-2">받은 사람</Label>
        <Input id="disabled-input-2" class="mb-6" disabled readonly value="Disabled readonly input" />

        <Label for="message" class="block mb-2">내용</Label>
        <Textarea {...textareaprops} disabled readonly />
    </div>
    <svelte:fragment slot="footer">
        <div class="flex justify-between w-[100%]">
            <ConfirmBtn content="취소" color="red" />
            <ConfirmBtn
                content="확인"
                color="blue"
                on:click={() => {
                    alert('Handle success');
                }}
            />
        </div>
    </svelte:fragment>
</Modal>

<!-- 받은 쪽지 확인 -->
<Modal title="받은 쪽지 확인" bind:open={receiveCheckModal} {color} autoclose>
    <div class="leading-relaxed w-[600px]">
        <Label for="message" class="block mb-2">보낸 사람</Label>
        <Input id="disabled-input-2" class="mb-6" disabled readonly value="Disabled readonly input" />

        <Label for="message" class="block mb-2">내용</Label>
        <Textarea {...textareaprops} disabled readonly />
    </div>
    <svelte:fragment slot="footer">
        <div class="flex justify-between w-[100%]">
            <ConfirmBtn content="취소" color="red" />
            <ConfirmBtn
                content="답장하기"
                color="blue"
                on:click={() => {
                    alert('Handle success');
                }}
            />
        </div>
    </svelte:fragment>
</Modal>

<!-- 쪽지 보내기 -->
<Modal title="쪽지 보내기" bind:open={sendModal} {color} autoclose>
    <div class=" leading-relaxed w-[600px]">
        <Label for="message" class="block mb-2" id="receiver">받는 사람</Label>
        <Search size="md" class="mb-4" />

        <Label for="message" class="block mb-2" id="contentss">내용</Label>
        <Textarea {...textareaprops} />
    </div>
    <svelte:fragment slot="footer">
        <div class="flex justify-between w-[100%]">
            <ConfirmBtn content="취소" color="red" />
            <ConfirmBtn
                content="보내기"
                color="blue"
                on:click={() => {
                    sendMessage("제목", "내용", "asd");
                    alert('Handle success');
                }}
            />
        </div>
    </svelte:fragment>
</Modal>
</Layout>
