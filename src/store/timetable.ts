import { Group } from './../api/models/index';
import { Lecturer, Room, Event } from '@/api/models';
import { stringifyDate } from '@/utils';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTimetableStore = defineStore('timetable', () => {
	const events = ref<Map<number, Event>>(new Map());
	const days = ref<Map<string, number[]>>(new Map());
	const lecturers = ref<Map<number, Lecturer>>(new Map());
	const rooms = ref<Map<number, Room>>(new Map());
	const groups = ref<Group[] | null>(null);

	function eventList(date: Date) {
		const ids = days.value.get(stringifyDate(date));

		if (ids) {
			const arr: Event[] = [];
			for (const id of ids) {
				const event = events.value.get(id);
				if (event) {
					arr.push(event);
				}
			}
			return arr;
		}

		return [];
	}

	return { events, days, lecturers, rooms, eventList, groups };
});
