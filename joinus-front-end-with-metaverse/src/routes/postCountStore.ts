import { writable } from 'svelte/store';
import axios from "axios";
import { URL } from "./env";

let items = [];
const getReceivePosts = async () => {
  await axios.get(`${URL}/api/message/list/received`,
    { withCredentials: true })
    .then(response => {
      const receivePosts = response.data.data;
      // checked 를 걸러줘야함.
      items = receivePosts.filter((post) => post.checked === false);
      console.log(items);
    })
    .catch(error => console.log(error));
}
await getReceivePosts();

export const postMsgCount= writable(items.length);