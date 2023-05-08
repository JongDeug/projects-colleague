<script lang="ts">
    import Svg from '../../component/Svg.svelte';
    import Layout from '../../component/Layout.svelte';
    import SmallHeader from '../../component/SmallHeader.svelte';
    import { page } from '$app/stores';
    import axios from 'axios';

    let test = '';

    function setTest(data){
        test = data;
    }

    function getValue() {
        const res = axios.get('/api/test')
            .then(response => {test = response.data})
            .catch(error => console.log(error));
        console.log(res);
    }

</script>

<SmallHeader header="TEST Page" />

<Layout>
    <button
            class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-200 font-medium rounded-lg px-3 py-1.5"
            type="button"
            on:click={getValue}>
        값 테스트
    </button>
    <div class="sm:flex items-center justify-between pb-4">
        테스트 데이터 : {test}
    </div>
</Layout>
