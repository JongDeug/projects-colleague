import { error } from '@sveltejs/kit';

/** @type {import("./$types").PageLoad} */
export function load({ params }) {
	if (params.minuteId) {
		return {
			minuteId: params.minuteId
		};
	}

	throw error(404, 'Not found');
}
