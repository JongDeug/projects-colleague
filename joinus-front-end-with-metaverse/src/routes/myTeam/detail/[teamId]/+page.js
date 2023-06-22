import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  if (params.teamId) {
    return {
      teamId: params.teamId,
    };
  }

  throw error(404, 'Not found');
}