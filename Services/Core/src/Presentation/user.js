import express from 'express';
import { auth } from '../Application/authorization/auth.js';
import multer from 'multer';
import { blockUser, getBlockedUsers, unblockUser } from '../Application/block.js';
import { getUsersByIds } from '../Application/message_brokers/rabbitmq-sender.js';
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();
// router.get("/getAllUsers",(req,res,next) => auth(req,res,next,["admin","superAdmin"]),getAllUsers);
// router.get("/getAllUsers/:id",(req,res,next) => auth(req,res,next,["admin","superAdmin"]), getUserByID);
// router.post("/signUp",upload.single("file"), userSignUp);
// router.put("/updateProfilePicture",(req,res,next) => auth(req,res,next,["user"]),upload.single("file"), userUpdateProfilePicture);
// router.post("/deleteProfilePicture",(req,res,next) => auth(req,res,next,["user"]), userDeleteProfilePicture);
// router.patch("/editUser",(req,res,next) => auth(req,res,next,["user"]), userEdit);
// router.delete("/delete",(req,res,next) => auth(req,res,next,["user"]), userDelete);
// router.post("/createOTP", sendOTP);
// router.post("/checkOTP", acceptOTP);
router.post("/blockUser",(req,res,next) => auth(req,res,next,["user"]), blockUser);
router.delete("/unblockUser/:userId",(req,res,next) => auth(req,res,next,["user"]), unblockUser);
router.get("/blockedUsers",(req,res,next) => auth(req,res,next,["user"]), getBlockedUsers);
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