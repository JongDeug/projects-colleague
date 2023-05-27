import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  if (params.postId) {
    return {
      postId: params.postId,
    };
  }

  throw error(404, 'Not found');
}