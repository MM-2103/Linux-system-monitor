import Fastify, { FastifyInstance, FastifyRequest } from "fastify";
import WebSocketPlugin from "@fastify/websocket";
import { SocketStream } from "@fastify/websocket";
import * as os from 'node:os';

const fastify = Fastify();

(async () => {
  fastify.register(WebSocketPlugin);

  fastify.register(async function (fastify: FastifyInstance) {
    fastify.get(
      "/",
      { websocket: true },
      (connection: SocketStream, req: FastifyRequest) => {
        console.log("Hello");
        connection.socket.on("message", (message: string) => {
          // message.toString() === 'hi from client'
          // connection.socket.send("hi from server");
          let sys_totalmem = os.totalmem();
          let sys_freemem = os.freemem();
          console.log(sys_totalmem - sys_freemem);
        });
      }
    );
  });
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server listening n port 3000");
  } catch (e) {
    console.log("Error", e);
  }
})();
