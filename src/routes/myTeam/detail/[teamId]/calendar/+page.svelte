<script lang="ts">
	import Sidebar from '../../../../../component/SidebarMyTeam.svelte';
	import Breadcrumb from '../../../../../component/Breadcrumb.svelte';
	import Layout from '../../../../../component/Layout.svelte';
	import SmallHeader from '../../../../../component/SmallHeader.svelte';

	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import listPlugin from '@fullcalendar/list';
	import interactionPlugin from '@fullcalendar/interaction';

	import { onMount } from 'svelte';

	/** @type {import("./$types").PageData} */
	export let data;

	let options = {
		plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
		initialView: 'dayGridMonth',
		editable: true,
		selectable: true,
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,listWeek'
		},
		events: [{ id: '1', title: 'New Event', start: new Date() }],
		dateClick: handleDateClick,
		select: (info) => {
			console.log(info.start);
		},
		eventClick: (info) => {
			console.log(info.event.id); // event에 위 처럼 id를 설정할 수 있고 그 아이디를 통해 events 배열에서 걸러서 지울 수 있음.
			// 즉 중요한 db는 events 객체임!
			// info.event.remove();
		}
	};

	function handleDateClick(event) {
		if (confirm('Would you like to add an event to ' + event.dateStr + ' ?')) {
			const { events } = options;
			const calendarEvents = [
				...events,
				{
					id: '2',
					title: 'New Event',
					start: event.date
				}
			];
			options = {
				...options,
				events: calendarEvents
			};
			// console.log(options);
		}
	}

	let calendarEl;
	onMount(async () => {
		let calendar = new Calendar(calendarEl, options);
		calendar.render();
	});
</script>

<SmallHeader header="abcd" />
<Layout style="flex justify-center">
	<Sidebar teamId="{data.teamId}"/>

	<div class="ml-5 block w-[70%]">
		<Breadcrumb prevContent="내 팀" nextContent="캘린더" />

		<div class="rounded-lg shadow-md border p-10 mt-3">
			<h1 class="font-bold mb-7">캘린더</h1>
			<div bind:this={calendarEl} />
		</div>
	</div>
</Layout>
