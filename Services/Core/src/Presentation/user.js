import express from 'express';
import { auth } from '../Application/authorization/auth.js';
import multer from 'multer';
import { blockUser, getBlockedUsers, unblockUser } from '../Application/block.js';
import { getUsersByIds } from '../Application/message_brokers/rabbitmq-sender.js';
import { addContact, removeContact , getMyContacts } from '../Application/contact.js';
import { getMyAllConversations } from '../Application/user.js';
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();
router.post("/blockUser", blockUser);
router.delete("/unblockUser/:userId", unblockUser);
router.get("/blockedUsers", getBlockedUsers);
router.post("/addContact", addContact);
router.delete("/removeContact/:userId", removeContact);
router.get("/contacts", getMyContacts);
router.get("/allConversations", getMyAllConversations);


router.get("/test",async (req , res) =>{
    console.log("my test")
    const result = await getUsersByIds([1,2],"user");
    if (result.error){
        res.status(400).send({message : result.error});
        logger.info(result.error);
        return;
    }
    res.send(result.data.users);
})
export default router;