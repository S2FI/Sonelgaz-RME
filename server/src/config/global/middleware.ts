
import cors from "cors";
import { CLIENT_URL, MOBILE_URL } from "../../constants";

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  // credentials: true, // This is important.
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: true,
  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  ],
 origin: [CLIENT_URL, MOBILE_URL , "http://localhost:19006"]
}
// (origin: any, callback: any) => {
//     if (whitelist.includes(origin)) return callback(null, true);

//     callback(new Error("Not allowed by CORS !"));
//   },
//   optionSuccessStatus: 200,
// };

export const middlewares = (app: any) => {
  app.use(cors(corsOptions));
  // app.use(helmet());
  //  if (process.env.NODE_ENV === 'development') {
  //   app.use(morgan('dev'));
  // }
};
