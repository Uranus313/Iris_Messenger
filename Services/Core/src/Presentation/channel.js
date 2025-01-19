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

const upload = multer({ storage });

const router = express.Router();

// 1. Get all groups with optional query parameters
router.get("/", getAllChannels);

// 2. Add a new group
router.post("/",upload.single("file"), addChannel);

// 3. Remove a group by ID
router.delete("/:groupId", removeChannel);

// 4. Get groups owned/associated with the current user
router.get("/my-groups", getMyChannels);

// 5. Join a group
router.post("/:groupId/join", joinChannel);

// 6. Leave a group
router.post("/:groupId/leave", leaveChannel);

// 7. Remove a specific user from a group (admin/owner action)
router.post("/remove-user", removeUserFromMyChannel);

// 8. Get all users in a group
router.get("/:groupId/users", getChannelUsers);

export default router;
