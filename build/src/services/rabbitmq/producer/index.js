"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mqProducer = void 0;
const rabbitmq_config_1 = require("../../../config/rabbitmq.config");
const mqProducer = ({ queueName, message, }) => __awaiter(void 0, void 0, void 0, function* () {
    /* establish connection */
    const connection = yield (0, rabbitmq_config_1.mqConnection)();
    if (connection) {
        /* Create a channel */
        const channel = yield connection.createChannel();
        /* Makes the queue available to the client */
        yield channel.assertQueue(queueName);
        /* Publish message to queue */
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
        return true;
    }
    return false;
});
exports.mqProducer = mqProducer;
// import { Channel } from "amqplib";
// import { rabbitSettings } from "../../../config/rabbitmq.config";
// export const mqProducer = async ({
//   queueName,
//   message,
// }: {
//   queueName: string;
//   message: any;
// }): Promise<boolean> => {
//   //create connection
//   const conn = await amqp.connect(rabbitSettings);
//   if (conn) {
//     //create channel
//     const channel = await conn.createChannel();
//     //queue
//     let res = await channel.assertQueue(queueName);
//     await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
//     console.log("message send");
//     return true;
//   }
//   return false;
// };
