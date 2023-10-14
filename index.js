const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { roleRoute } = require("./routes/Role");
const { userRoute } = require("./routes/User");
const { memberRoute } = require("./routes/Member");
const { communityRoute } = require("./routes/Community");
const { connectDB } = require("./config/database");

const app = express();
const bodyparser = require("body-parser");
dotenv.config();
app.use(bodyparser.json({ limit: "50mb" }));
app.use(cookieParser());
connectDB(process.env.MONGODB_URL);
app.use("/v1/role", roleRoute);

app.use("/v1/auth", userRoute);
app.use("/v1/community", communityRoute);
app.use("/v1/member", memberRoute);
app.listen(4000, () => {
  console.log("server started");
});
