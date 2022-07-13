const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");
const https = require("https");
exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query("select user_id, username from users");

    return res.status(200).json({
      success: true,
      users: rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.getRole = async (req, res) => {
  try {
    const { rows } = await db.query(
      "select user_id, username , role from users"
    );
    return res.status(200).json({
      success: true,
      users: rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// exports.getIP = async (req, res) => {
//   try {
//     https.get("https://geolocation-db.com/json/"),
//       (resp) => {
//         let data = "";
//         resp.on("end", () => {
//           console.log(JSON.parse(data).explanation);
//         });
//       };
//     return res.status(200).json({
//       success: true,
//       ipAdress: "data",
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await hash(password, 10);

    await db.query(
      "insert into users(username,password,role) values ($1 , $2, $3)",
      [username, hashedPassword, role]
    );

    return res.status(201).json({
      success: true,
      message: "The registraion was succefull",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  let user = req.user;

  let payload = {
    id: user.user_id,
    username: user.username,
  };

  try {
    const token = await sign(payload, SECRET);

    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Logged in succefully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out succefully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
