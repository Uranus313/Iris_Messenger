import amqp from "amqplib";
import { v4 as uuidv4 } from "uuid";
import { rabbitmqConnectionURI } from "../../config/config.js";

const connection = await amqp.connect(rabbitmqConnectionURI);
const channel = await connection.createChannel(); // Shared channel for all requests

// Function to send a message and wait for a response
async function sendRequest(queueName, payload) {
    const responseQueue = await channel.assertQueue("", { exclusive: true });
    const correlationId = uuidv4();

    return new Promise((resolve, reject) => {
        channel.consume(
            responseQueue.queue,
            (message) => {
                if (message.properties.correlationId === correlationId) {
                    const response = JSON.parse(message.content.toString());
                    resolve(response);
                    channel.ack(message);
                }
            },
            { noAck: false }
        );

        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)), {
            correlationId,
            replyTo: responseQueue.queue,
        });
    });
}

// Function to validate tokens
export async function sendTokenValidationRequest(token) {
    const queue = "token_validation";
    return await sendRequest(queue, { token });
}

// Function to fetch user data by IDs
export async function getUsersByIds(ids , type) {
    const queue = "user_data";
    return await sendRequest(queue, { ids ,type });
}
