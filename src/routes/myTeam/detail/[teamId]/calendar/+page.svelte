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

  import { afterUpdate, onMount } from "svelte";
  import axios from "axios";
  import { URL } from "../../../../env";

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
      right: "dayGridMonth,listWeek"
    },
    events: [],
    dateClick: handleDateClick,
    select: handleSelectClick,
    eventClick: handleEventClick
  };

  const deleteEvent = async (eventId) => {
    await axios.post(`${URL}/api/calendar/delete`, { withCredentials: true },
      {
        params: {
          calendarId: eventId
        }
      })
      .then(response => {
        if (response.data.data == "success") {
          alert("delete success");
        }
      })
      .catch(error => console.log(error));
  };

  //  일정 생성 (서버 DB에 저장)
  const createEvent = async (teamId, title, start, end) => {
    await axios.post(`${URL}/api/calendar/create`,
      {
        title: title,
        startDate: start,
        endDate: end
      }, {
        params: {
          teamId: data.teamId
        },
        withCredentials: true
      })
      .then(response => {
        if (response.data.data == "success") {
          alert("create success");
        }
      })
      .catch(error => console.log(error));
  };

  async function handleEventClick(info) {
    // info.event.id 찾아서 삭제
    await deleteEvent(info.event.id);
    await rerender();
  }

  async function handleSelectClick(info) {
    const diff = Math.abs(info.end - info.start);
    // 하루보다 커야함
    if (diff > 86400000) {
      let eventName = prompt("이벤트명");
      if(eventName){
        await createEvent(data.teamId, eventName, info.startStr, info.endStr);
        await rerender();
      }
    }
  }

  async function handleDateClick(event) {
    let eventName = prompt("이벤트명");
    let eventTime = prompt("시간", event.date);
    if(eventName && eventTime){
      await createEvent(data.teamId, eventName, eventTime, null);
      await rerender();
    }
  }

  const rerender = async () => {
    await getEventList();
    eventList.forEach((event) => {
      if (event.endDate !== null) {
        calendarEvents = [...calendarEvents, {
          id: event.id,
          title: event.title,
          start: event.startDate,
          end: event.endDate
        }];
      } else {
        calendarEvents = [...calendarEvents, {
          id: event.id,
          title: event.title,
          start: new Date(event.startDate),
          end: new Date(event.endDate)
        }];
      }
    });
  };

  let calendarEvents = [];
  $: {
    options = {
      ...options,
      events: calendarEvents
    };
    calendarEvents = [];
    console.log(calendarEvents);
    console.log("hi");
  }

  let calendarEl;
  let calendar;
  $: if (calendar) {
    calendar = new Calendar(calendarEl, options);
    calendar.render();
  }

  export let eventList = [];
  onMount(async () => {
    // event 리스트 가져오기
    await axios.get(`${URL}/api/calendar/list`,
      {
        params: {
          teamId: data.teamId
        },
        withCredentials: true
      })
      .then(response => {
        eventList = response.data.data;
        // console.log(eventList);
      })
      .catch(error => console.log(error));

    eventList.forEach((event) => {
      if (event.endDate !== null) {
        calendarEvents = [...calendarEvents, {
          id: event.id,
          title: event.title,
          start: event.startDate,
          end: event.endDate
        }];
      } else {
        calendarEvents = [...calendarEvents, {
          id: event.id,
          title: event.title,
          start: new Date(event.startDate),
          end: new Date(event.endDate)
        }];
      }
    });

    options = {
      ...options,
      events: calendarEvents
    };

    calendar = new Calendar(calendarEl, options);
    calendar.render();
    await getTeam(data.teamId);
  });

  const getEventList = async () => {
    await axios.get(`${URL}/api/calendar/list`,
      {
        params: {
          teamId: data.teamId
        },
        withCredentials: true
      })
      .then(response => {
        eventList = response.data.data;
      })
      .catch(error => console.log(error));
  };


  // team 구하기
  let team = [];
  const getTeam = async (teamId) => {
    await axios.get(`${URL}/api/team/detail`,
      {
        params: {
          teamId: teamId
        },
        withCredentials: true
      })
      .then(response => {
        team = response.data.data;
      })
      .catch(error => console.log(error));
  };
</script>

<SmallHeader header="{team.name}" />
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
