import amqp from "amqplib";
import { v4 as uuidv4 } from "uuid";
import { rabbitmqConnectionURI } from "../configs/config.js";

export default async function sendTokenValidationRequest(token) {
    const connection = await amqp.connect(rabbitmqConnectionURI);
    const channel = await connection.createChannel();

    const queue = "token_validation";
    const responseQueue = await channel.assertQueue("", { exclusive: true });

    const correlationId = uuidv4();

    return new Promise((resolve, reject) => {
        channel.consume(
            responseQueue.queue,
            (message) => {
                if (message.properties.correlationId === correlationId) {
                    const response = JSON.parse(message.content.toString());
                    resolve(response);
                    channel.close();
                }
            },
            { noAck: true }
        );

        channel.sendToQueue(queue, Buffer.from(JSON.stringify({ token })), {
            correlationId,
            replyTo: responseQueue.queue,
        });
    });
}

// export async function authMiddleware(req, res, next) {
//     const token = req.header("x-auth-token");
//     if (!token) return res.status(401).send("No token provided");

//     try {
//         const response = await sendTokenValidationRequest(token);

//         if (!response.isValid) return res.status(400).send(response.error);

//         if (response.data.admin) req.admin = response.data.admin;
//         if (response.data.user) req.user = response.data.user;

//         next();
//     } catch (error) {
//         console.error("Token validation error:", error);
//         res.status(500).send("Internal server error");
//     }
// }
