import { Room } from 'colyseus.js';
import type UserInterface from './userInterface';
import type Phaser from 'phaser';
import * as CalendarT from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { URL } from '../../routes/env';
import type Connection from '../interaction/connection';
import scrollGridPlugin from "@fullcalendar/scrollgrid"

export default class Calendar implements UserInterface {
	_scene: Phaser.Scene;
	_connection: Connection;

	private _group: Phaser.GameObjects.Group;

	constructor(scene, connection) {
		this._scene = scene;
		this._connection = connection;
	}

	async createCalendar() {
		const teamId = this._connection.teamId;
		let eventList = [];
		let calendarEvents = [];

		let options = {
			plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, scrollGridPlugin],
			schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
			dayMinWidth: 100,
			initialView: 'dayGridMonth',
			editable: true,
			selectable: true,
			selectMirror: true,
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,listWeek'
			},
			events: [],
			dateClick: handleDateClick,
			select: handleSelectClick,
			eventClick: handleEventClick,
			contentHeight: 510
		};


		// start
		await render(teamId);

		async function createEvent(teamId, title, start, end) {
			await axios
				.post(
					`${URL}/api/calendar/create`,
					{
						title: title,
						startDate: start,
						endDate: end
					},
					{
						params: {
							teamId: teamId
						},
						withCredentials: true
					}
				)
				.then((response) => {
					if (response.data.data == 'success') {
						alert('create success');
					}
				})
				.catch((error) => console.log(error));
		}

		async function deleteEvent(eventId) {
			await axios
				.post(
					`${URL}/api/calendar/delete`,
					{ withCredentials: true },
					{
						params: {
							calendarId: eventId
						}
					}
				)
				.then((response) => {
					if (response.data.data == 'success') {
						alert('delete success');
					}
				})
				.catch((error) => console.log(error));
		}

		async function handleSelectClick(info) {
			calendarEvents = [];
			const diff = Math.abs(info.end - info.start);
			// 하루보다 커야함
			if (diff > 86400000) {
				const eventName = prompt('이벤트명');
				console.log(eventName);
				if (eventName) {
					await createEvent(teamId, eventName, info.startStr, info.endStr);
					await render(teamId);
				}
			}
		}

		async function handleDateClick(event) {
			calendarEvents = [];
			const eventName = prompt('이벤트명');
			const eventTime = prompt('시간', event.date);
			if (eventName && eventTime) {
				await createEvent(teamId, eventName, eventTime, null);
				await render(teamId);
			}
		}

		async function handleEventClick(info) {
			if (confirm('삭제 하실겁니까?')) {
				calendarEvents = [];
				await deleteEvent(info.event.id);
				await render(teamId);
			}
		}

		async function getEventList(teamId) {
			await axios
				.get(`${URL}/api/calendar/list`, {
					params: {
						teamId: teamId
					},
					withCredentials: true
				})
				.then((response) => {
					eventList = response.data.data;
					eventList.forEach((event) => {
						if (event.endDate !== null) {
							calendarEvents = [
								...calendarEvents,
								{
									id: event.id,
									title: event.title,
									start: event.startDate,
									end: event.endDate
								}
							];
						} else {
							calendarEvents = [
								...calendarEvents,
								{
									id: event.id,
									title: event.title,
									start: new Date(event.startDate),
									end: new Date(event.endDate)
								}
							];
						}
					});
					options = {
						...options,
						events: calendarEvents
					};
				})
				.catch((error) => console.log(error));
		}

		async function render(teamId) {
			try {
				await getEventList(teamId);

				const calendarEl = document.getElementById('calendar');
				// console.log(this._options);
				const calendarT = new CalendarT.Calendar(calendarEl, options);
				calendarT.render();

				const topNav = document.querySelector('.fc-header-toolbar');
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				topNav.style.fontSize = 'x-small';
			} catch (e) {
				console.log('render error', e);
			}
		}

	}

	async create(): Promise<void> {
		this._group = this._scene.add.group();

		const calendar = {
			button: this._scene.add
				.sprite(760, 38, 'uiButtons', 0)
				.setName('calendarButton')
				.setScale(2, 2)
				.setInteractive()
				.setDepth(2),
			board: this._scene.add
				.sprite(400, 330, 'settingMenu', 1)
				.setScale(5.8, 4.2)
				.setName('calendarBoard')
				.setOrigin(0.5, 0.5)
				.setInteractive()
				.setDepth(1),
			content: this._scene.add
				.dom(400, 50)
				.createFromCache('calendar')
				// .setScale(0.794, 0.8)
				.setScale(0.62, 0.8)
				.setName('calendarContent')
				.setDepth(1)
		};

		this._group.add(calendar.button);
		this._group.add(calendar.board);
		this._group.add(calendar.content);

		// 메인 카메라(플레이어, 맵)과 UI 카메라 분리
		// 달력은 중복되지 않으므로 main 카메라에서 제거할 필요가 없음, 더군다나 Container를 주게되면 id값도 찾지못함.
		this._scene.cameras.main.ignore(this._group);
	}

	public get group(): Phaser.GameObjects.Group {
		return this._group;
	}
}
