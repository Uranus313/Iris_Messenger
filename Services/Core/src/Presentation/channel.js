import express from "express";
import {
    getAllChannels,
    addChannel,
    removeChannel,
    getMyChannels,
    joinChannel,
    leaveChannel,
    removeUserFromMyChannel,
    getChannelUsers,
} from "../Application/channel.js";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// 1. Get all channels with optional query parameters
router.get("/", getAllChannels);

// 2. Add a new channel
router.post("/",upload.single("file"), addChannel);

// 3. Remove a channel by ID
router.delete("/:channelId", removeChannel);

// 4. Get channels owned/associated with the current user
router.get("/my-channels", getMyChannels);

// 5. Join a channel
router.post("/:channelId/join", joinChannel);

// 6. Leave a channel
router.post("/:channelId/leave", leaveChannel);

// 7. Remove a specific user from a channel (admin/owner action)
router.post("/remove-user", removeUserFromMyChannel);

// 8. Get all users in a channel
router.get("/:channelId/users", getChannelUsers);

export default router;
