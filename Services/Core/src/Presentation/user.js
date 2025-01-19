import express from 'express';
import { auth } from '../Application/authorization/auth.js';
import multer from 'multer';
import { blockUser, getBlockedUsers, unblockUser } from '../Application/block.js';
import { getUsersByIds } from '../Application/message_brokers/rabbitmq-sender.js';
import { addContact, removeContact , getMyContacts } from '../Application/contact.js';
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();
router.post("/blockUser",(req,res,next) => auth(req,res,next,["user"]), blockUser);
router.delete("/unblockUser/:userId",(req,res,next) => auth(req,res,next,["user"]), unblockUser);
router.get("/blockedUsers",(req,res,next) => auth(req,res,next,["user"]), getBlockedUsers);
router.post("/addContact",(req,res,next) => auth(req,res,next,["user"]), addContact);
router.delete("/removeContact/:userId",(req,res,next) => auth(req,res,next,["user"]), removeContact);
router.get("/contacts",(req,res,next) => auth(req,res,next,["user"]), getMyContacts);
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