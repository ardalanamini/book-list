import server from "./bootstrap";

server
  .start(() => console.log(`Server running at ${server.get("url")}:${server.get("port")}`));
