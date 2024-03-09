import { Elysia } from "elysia";

const app = new Elysia();

let users: Record<string, any>[] = [];

let connectedUsers = new Map();

app
  .get("/", () => ({
    pong: true,
  }))
  .ws("/ws", {
    close(ws) {
      console.log(ws.id, "disconnected");
      users = users.filter((u) => u.id !== ws.id);
      const connectedTo = connectedUsers.get(ws.id);
      if (connectedTo) {
        connectedTo.send({ type: "info", data: "match-disconnected" });
        connectedUsers.delete(connectedTo.id);
      }
      connectedUsers.delete(ws.id);
    },
    message(ws, message: any) {
      if (message.type === "message") {
        if (connectedUsers.get(ws.id)) {
          connectedUsers.get(ws.id).send(message);
        }
      }
    },
    open(ws) {
      console.log(ws.id, "connected");
      users.push(ws);
      ws.send({ type: "info", data: "enqueued" });
      if (users.length > 1) {
        const user1 = users.pop()!;
        const user2 = users.pop()!;
        user1.send({ type: "info", data: "connected" });
        user2.send({ type: "info", data: "connected" });
        connectedUsers.set(user1.id, user2);
        connectedUsers.set(user2.id, user1);
      }
    },
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
