import Fastify, { FastifyInstance, FastifyRequest } from "fastify";
import WebSocketPlugin from "@fastify/websocket";
import { SocketStream } from "@fastify/websocket";
import * as os from "node:os";
import { spawn } from "child_process";

const fastify = Fastify();

fastify.register(WebSocketPlugin);

fastify.register(async function (fastify: FastifyInstance) {
  fastify.get(
    "/ws",
    { websocket: true },
    (connection: SocketStream, req: FastifyRequest) => {
      sendMemoryData(connection);
    }
  );
});
fastify.listen({ port: 3000 });
console.log("Server listening on port 3000");

function sendMemoryData(connection: any) {
  setInterval(() => {
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();
    const usedMemory = totalMemory - freeMemory; // Calculate used memory
    // Format the message to MB
    const memoryData = {
      freeMemory: freeMemory / (1024 * 1024),
      totalMemory: totalMemory / (1024 * 1024),
      usedMemory: usedMemory / (1024 * 1024),
    };
    connection.socket.send(JSON.stringify(memoryData));
  }, 1000); // Update interval of 1 second
}
