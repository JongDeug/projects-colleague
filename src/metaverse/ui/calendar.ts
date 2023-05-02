import { Room } from 'colyseus.js';
import type UserInterface from './userInterface';
import type Phaser from 'phaser';
import * as CalendarT from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import scrollPlugin from '@fullcalendar/scrollgrid';

export default class Calendar implements UserInterface {
	_scene: Phaser.Scene;
	private _group: Phaser.GameObjects.Group;

	constructor(scene) {
		this._scene = scene;
	}

	create(): void {
		this._group = this._scene.add.group();

		const calendar = {
			button: this._scene.add
				.sprite(700, 38, 'uiButtons', 0)
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
				.dom(400, 110)
				.createFromCache('calendar')
				.setOrigin(0.5, 0.5)
				.setName('calendarContent')
				.setDepth(1)
		};

		let options = {
			plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, scrollPlugin],
			// fullcalendar free trial
			schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
			dayMinWidth: 20,
			stickyFooterScrollbar: true,
			initialView: 'dayGridMonth',
			contentHeight: 390,
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

		try {
			if (calendar.content.active) {
				// document.addEventListener('DOMContentLoaded', () => {
				const calendarEl = document.getElementById('calendar')!;
				// console.log(calendarEl);
				const calendarT = new CalendarT.Calendar(calendarEl, options);
				calendarT.render();
				// });
			}
		} catch (e) {
			console.log('render error', e);
		}

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
			}
		}

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
