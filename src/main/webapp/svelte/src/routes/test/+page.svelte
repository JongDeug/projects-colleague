<script lang="ts">
    import Svg from '../../component/Svg.svelte';
    import Layout from '../../component/Layout.svelte';
    import SmallHeader from '../../component/SmallHeader.svelte';
    import { page } from '$app/stores';
    import axios from 'axios';


    let board = [
        {
            id: '공지',
            title: 'test1',
            writer: 'kim',
            createTime: '2023-03-10',
            hit: '30'
        },
        {
            id: '공지',
            title: 'test2',
            writer: 'kim',
            createTime: '2023-03-10',
            hit: '30'
        }
    ];

    $: activeUrl = $page.url.searchParams.get('page');
    let pages = [
        { name: '1', href: '/components/pagination?page=1' },
        { name: '2', href: '/components/pagination?page=2' },
        { name: '3', href: '/components/pagination?page=3' },
        { name: '4', href: '/components/pagination?page=4' },
        { name: '5', href: '/components/pagination?page=5' }
    ];

    $: {
        pages.forEach((page: any) => {
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
    let test = '';

    // axios.get('/test')
    //     .then(response => test = response.data)
    //     .catch(error => console.log(error))

    // axios.get('/api/test')
    //      .then(response => test.set(response.data))
    //      .catch(error => console.log(error))

    function getValue() {
        const res = axios.get('/test').then(response => test = response.data).catch(error => console.log(error));
        console.log(res);
    }

</script>

<SmallHeader header="TEST Page" />

<Layout>
    <button
            class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-200 font-medium rounded-lg px-3 py-1.5"
            type="button"
            on:click={getValue()}>
        값 테스트
    </button>
    <div class="sm:flex items-center justify-between pb-4">
        테스트 데이터 : {test}
    </div>
</Layout>
