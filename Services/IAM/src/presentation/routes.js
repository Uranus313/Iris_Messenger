import express from 'express';
import adminRouter from "./admin.js";
import generalRouter from "./general.js";
import superAdminRouter from "./superAdmin.js";
import userRouter from "./user.js";
// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "../application/utilities/swagger_output.json" with { type: 'json' };
const router = express.Router();

// router.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use("/users",userRouter);
router.use("/admins",adminRouter);
router.use("/general",generalRouter);
router.use("/superAdmin",superAdminRouter);

export default router;