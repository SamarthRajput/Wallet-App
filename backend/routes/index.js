const express = require("express");
const app = express();
const userRouter = require("./user");
const accountRouter = require("./account");
const cors = require("cors");
app.use(cors());

//creating a new router
//why do we need a router because we know all requests will start from /api/v1
//eg: /api/v1/user
//eg: /api/v1/transaction
const router = express.Router();
router.use("/user", userRouter);

router.use("/account", accountRouter)

module.exports = router;

