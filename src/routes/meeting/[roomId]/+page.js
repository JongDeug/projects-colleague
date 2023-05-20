import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  // console.log(params.teamId);
  if (params.roomId) {
    return {
      roomId: params.roomId,
    };
  }

  throw error(404, 'Not found');
}