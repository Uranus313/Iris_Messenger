import amqp from "amqplib";
import jwt from "jsonwebtoken";
import { readUsers } from "../../infrastructure/user.js";
import {  readAdmins } from "../../infrastructure/admin.js";
import { rabbitmqConnectionURI } from "../../config/config.js";
import { readSuperAdmin } from "../../infrastructure/superAdmin.js";
const connection = await amqp.connect(rabbitmqConnectionURI);
const channel = await connection.createChannel();


export  const  setupRabbitMQTokenValidation = async () => {
    try {
        

        const queue = "token_validation";

        await channel.assertQueue(queue, { durable: false });

        channel.consume(queue, async (message) => {
            const { token } = JSON.parse(message.content.toString());
            let response = { isValid: false };

            try {
                const decoded = jwt.verify(token, process.env.JWTSecret);
                response.isValid = true;

                if (decoded.status == "admin") {
                    // const admin = await adminReadByID(decoded._id);
                    // response.data = { admin: admin.toJSON() };
                    const admin = await readAdmins(decoded.id);
                    // console.log(admin.addresses)
                    if (!admin.id) {
                      response.error = "access denied. admin not found"; 
                    }
                    if (admin.isBanned || admin.isDeleted) {
                      response.error = "access denied. admin is banned or deleted";             
                    }
                    if(! response.error){
                        response.data = { user: admin , status: "admin" };
                    }
                }else if(decoded.status == "user") {
                    const user = await readUsers(decoded.id);
                    // console.log(user.addresses)
                    if (!user.id) {
                      response.error = "access denied. user not found"; 
                    }
                    if (user.isBanned || user.isDeleted) {
                      response.error = "access denied. user is banned or deleted";             
                    }
                    if(! response.error){
                        response.data = { user: user , status: "user" };
                    }
                } else if (decoded.status == "superAdmin"){
                    const superAdmin = await readSuperAdmin(decoded.id);
                    if (!superAdmin.id) {
                      response.error = "access denied. superAdmin not found"; 
                    }
                    if (superAdmin.isBanned || superAdmin.isDeleted) {
                      response.error = "access denied. superAdmin is banned or deleted";             
                    }
                    if(! response.error){
                        response.data = { user: superAdmin , status: "superAdmin" };
                    }
                }else{
                    response.error = "access denied. invalid status";
                }
            } catch (error) {
                console.log(error);
                response.error = "Invalid token";
            }

            channel.sendToQueue(
                message.properties.replyTo,
                Buffer.from(JSON.stringify(response)),
                { correlationId: message.properties.correlationId }
            );

            channel.ack(message);
        });

        console.log("RabbitMQ is listening for token validation requests...");
    } catch (error) {
        console.log("RabbitMQ Error:", error);
    }
}
export const setupRabbitMQUserSender = async ()=> {
    try {
        

        const queue = "user_data";

        await channel.assertQueue(queue, { durable: false });

        channel.consume(queue, async (message) => {
            const { ids , type } = JSON.parse(message.content.toString());
            let response = { isValid: false };

            try {
                response.isValid = true;

                if (type == "admin") {
                    const admins = await readAdmins(undefined,undefined, ids);
                    
                    response.data = { users: admins , status: "admin" };
                    
                }else if(type == "user") {
                    const users = await readUsers(undefined,undefined, ids);
                    
                    response.data = { users: users , status: "user" };
                } else{
                    response.error = "invalid status";
                }
            } catch (error) {
                response.error = "error happened";
            }

            channel.sendToQueue(
                message.properties.replyTo,
                Buffer.from(JSON.stringify(response)),
                { correlationId: message.properties.correlationId }
            );

            channel.ack(message);
        });

        console.log("RabbitMQ is listening for token validation requests...");
    } catch (error) {
        console.log("RabbitMQ Error:", error);
    }
}

// setupRabbitMQ();