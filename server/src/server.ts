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
import { CLIENT_URL, MOBILE_URL } from "./constants";
import cookieParser from "cookie-parser";
import multer from 'multer';
const PORT1 = config;
const PORT = 7000;


let app = express();

app.use(cookieParser());
app.use(cors( { origin: [CLIENT_URL, MOBILE_URL, "http://localhost:19006"], credentials: true })); //{ origin: '*', credentials: true } [CLIENT_URL, MOBILE_URL]
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
middlewares(app);
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

getOrmconfigConnection(process.env.NODE_ENV).then((ormConfig_: any) => {
  createConnection(ormConfig_.ormconfig).then(async () => {
    console.log(
      `Server is running at http://localhost:${ormConfig_.PORT_SERVER}`
    );
    // console.log("fff ", PORT1);
  });
});
const upload = multer({ storage });

let postController = new PostController();
app.get("/", function (req, res) {
  res.send("hello world !!");
});

app.use("/api/posts/", postController.router);

app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);
  console.log("La79eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeet")
  res.status(200).json({
    message: 'success!',
  });
});


// started the server
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
