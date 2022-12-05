import { Channel, ConsumeMessage } from "amqplib";
import {mqConnection} from '../../../config/rabbitmq.config'
import { ICategoryCreateOrUpdate } from "../../../types/admin/category.types";
import {adminCategoryService} from '../../../services/admin/category.service'
 
export const mqCategoryConsumer = async () => {
  const queueName = "category";
    console.log(queueName)

    /* establish connection */
    const connection = await mqConnection();
  console.log("connection create asdfa asdfasd ");

  if (connection) {
    /* create a channel */
    const channel : Channel = await connection.createChannel();

    /* consume message from the queue */
    const consumer =
      async (channel: Channel) =>
      (msg: ConsumeMessage | null): void => {
        if (msg) {
          const parsedData: ICategoryCreateOrUpdate = JSON.parse(
            msg.content.toString()
          );
            console.log('consumer ready');
            
          /* update or create to database */
          const documents: ICategoryCreateOrUpdate = {
            name: parsedData.name,
            icon: parsedData.icon,
            banner_image: parsedData.banner_image
          };

          adminCategoryService.categoryCreate({ documents });

          /* Acknowledge the message */
          channel.ack(msg);
        }
      };

    await channel.consume(queueName, await consumer(channel));
  }
};
