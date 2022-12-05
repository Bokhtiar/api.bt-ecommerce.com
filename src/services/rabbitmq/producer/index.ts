import { Channel } from "amqplib";
import {mqConnection} from '../../../config/rabbitmq.config'

export const mqProducer = async ({
  queueName,
  message,
}: {
  queueName: string;
  message: any;
}): Promise<boolean> => {
  /* establish connection */
  const connection = await mqConnection();

  if (connection) {
    /* Create a channel */
    const channel: Channel = await connection.createChannel();

    /* Makes the queue available to the client */
    await channel.assertQueue(queueName);

    /* Publish message to queue */
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    return true;
  }

  return false;
};

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
