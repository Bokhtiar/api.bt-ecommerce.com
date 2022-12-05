import client, { Connection } from "amqplib";

const rabbitSettings = {
    protocol : 'amqp',
    hostname : "localhost", 
    port : 5672,
    username : 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
} 




// /* establish connection */
export const mqConnection = async (): Promise<Connection | undefined> => {
  try {
    const connection: Connection = await client.connect(
        rabbitSettings
    );
 
    console.log("RabbitMQ connection established.");

    return connection;
  } catch (error: any) {
    console.log("Failed to connect with rabbitMQ server.");
    console.log(error);
  }
};
