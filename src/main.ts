import { createSignal, createEffect } from "solid-js";
import { QueryClient, createQuery } from "@tanstack/solid-query";

const [client] = createSignal(new QueryClient());
const [postId, setPostId] = createSignal(1);

const postsQuery = createQuery(
  () => ({
    queryKey: ["posts", postId()],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId()}`
      );
      return response.json();
    },
    placeholderData: (prevData) => prevData,
  }),
  client
);

const h1 = document.createElement("h1");
createEffect(() => {
  h1.textContent = `Post: ${postsQuery.data?.title}`;
});

const button = document.createElement("button");
button.textContent = "Click me";
button.onclick = () => setPostId((i) => i + 1);

document.body.append(h1, button);
