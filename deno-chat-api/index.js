addEventListener("fetch", (event) => {
  const response = new Response("Hello World third try!", {
    headers: { "content-type": "text/plain" },
  });
  event.respondWith(response);
});
