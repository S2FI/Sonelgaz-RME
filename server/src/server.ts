import express from "express";
import { PostController } from "./controllers/post.controller";
import { middlewares } from "./config/global/middleware";
import { createConnection } from "typeorm";
import { getOrmconfigConnection } from "./utils/ormconfig/ormconfig";
import path from "path";
process.env.NODE_CONFIG_DIR = path.join(__dirname, "./config/env");
import config from "config";
import cors from "cors";
import bodyParser from "body-parser";
import { CLIENT_URL } from "./constants";
import cookieParser from "cookie-parser";

const PORT1 = config;
const PORT = 7000;


let app = express();
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
middlewares(app);

getOrmconfigConnection(process.env.NODE_ENV).then((ormConfig_: any) => {
  createConnection(ormConfig_.ormconfig).then(async () => {
    console.log(
      `Server is running at http://localhost:${ormConfig_.PORT_SERVER}`
    );
    console.log("fff ", PORT1);
  });
});

let postController = new PostController();
app.get("/", function (req, res) {
  res.send("hello world !!");
});

app.use("/api/posts/", postController.router);

// started the server
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
