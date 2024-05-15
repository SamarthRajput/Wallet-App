const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const mainRouter = require("./routes/index");

app.use(express.json());
//all request that will come here will go the main router
app.use("/api/v1", mainRouter);



app.listen(3000);
