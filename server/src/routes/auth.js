const Router = require("express");
const {
  getUsers,
  register,
  login,
  logout,
  getRole,
  getIP,
} = require("../controllers/auth");
const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");
const { registerValidation, loginValidation } = require("../validators/auth");
const router = Router();

router.get("/get-users", getUsers);
router.get("/get-roles", getRole);
// router.get("/get-IP", getIP);
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.get("/logout", logout);

module.exports = router;
