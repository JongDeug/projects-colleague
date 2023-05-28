<script lang="ts">
  import Sidebar from "../../../../../component/SidebarMyTeam.svelte";
  import Breadcrumb from "../../../../../component/Breadcrumb.svelte";
  import Layout from "../../../../../component/Layout.svelte";
  import SmallHeader from "../../../../../component/SmallHeader.svelte";

  import { Calendar } from "@fullcalendar/core";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import timeGridPlugin from "@fullcalendar/timegrid";
  import listPlugin from "@fullcalendar/list";
  import interactionPlugin from "@fullcalendar/interaction";

  import { onMount } from "svelte";

  /** @type {import("./$types").PageData} */
  export let data;

  let options = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    editable: true,
    selectable: true,
    selectMirror: true,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      // right: "dayGridMonth,timeGridWeek,timeGridDay"
      right: "dayGridMonth,listWeek"
    },
    events: [{ id: "1", title: "어허어", start: new Date(), end: null }],
    dateClick: handleDateClick,
    select: handleSelectClick,
    eventClick: (info) => {
      // event 클릭 시 삭제
      info.event.remove();
    }
  };

  function handleSelectClick(info) {
    console.log(info);
    const diff = Math.abs(info.end - info.start);
    // 하루보다 커야함
    if (diff > 86400000) {
      let eventName = prompt("이벤트명");
      const { events } = options;

      // 처음 Event 를 가져오고 로딩
      // 추가할땐 api로 추가하고 집어넣고 => 로딩
      const calendarEvents = [
        ...events,
        {
          id: "2",
          title: eventName,
          start: info.startStr,
          end: info.endStr
        }
      ];
      options = {
        ...options,
        events: calendarEvents
      };
    }
  }

  function handleDateClick(event) {
    console.log(event.date);
    let eventName = prompt("이벤트명");
    let eventTime = prompt("시간", event.date);
    const { events } = options;
    const calendarEvents = [
      ...events,
      {
        id: "2",
        title: eventName,
        start: new Date(eventTime),
        end: null,
      }
    ];
    options = {
      ...options,
      events: calendarEvents
    };
  }

  let calendarEl;
  export let calendar;
  $: if (calendar) {
    calendar = new Calendar(calendarEl, options);
    calendar.render();
  }

  onMount(async () => {
    calendar = new Calendar(calendarEl, options);
    calendar.render();
  });
</script>

<SmallHeader header="abcd" />
<Layout style="flex justify-center">
  <Sidebar teamId="{data.teamId}" />

  <div class="ml-5 block w-[70%]">
    <Breadcrumb prevContent="내 팀" nextContent="캘린더" />

    <div class="rounded-lg shadow-md border p-10 mt-3">
      <h1 class="font-bold mb-7">캘린더</h1>
      <div bind:this={calendarEl} />
    </div>
  </div>
</Layout>
