import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  if (params.userId) {
    return {
      userId: params.userId,
    };
  }

  throw error(404, 'Not found');
}