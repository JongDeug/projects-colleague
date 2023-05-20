<script>
  import Meeting from "../Meeting.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<Meeting teamId={data.roomId}></Meeting>