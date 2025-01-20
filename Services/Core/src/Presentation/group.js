import express from "express";
import {
    getAllGroups,
    addGroup,
    removeGroup,
    getMyGroups,
    joinGroup,
    leaveGroup,
    removeUserFromMyGroup,
    getGroupUsers,
} from "../Application/group.js";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });


const router = express.Router();

// 1. Get all groups with optional query parameters
router.get("/", getAllGroups);

// 2. Add a new group
router.post("/",upload.single("file"), addGroup);

// 3. Remove a group by ID
router.delete("/:groupId", removeGroup);

// 4. Get groups owned/associated with the current user
router.get("/my-groups", getMyGroups);

// 5. Join a group
router.post("/:groupId/join", joinGroup);

// 6. Leave a group
router.post("/:groupId/leave", leaveGroup);

// 7. Remove a specific user from a group (admin/owner action)
router.post("/remove-user", removeUserFromMyGroup);

// 8. Get all users in a group
router.get("/:groupId/users", getGroupUsers);

export default router;
