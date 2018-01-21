var router = require("express").Router();
var jwt = require("express-jwt");
const KEY_SECRET = require("../config/index").KEY_SECRET;
const auth = jwt({
  secret: KEY_SECRET,
  userProperty: "payload",
})
var userCtrl = require("../controllers/user_controller");

router.post("/login", userCtrl.login);
router.post("/register", userCtrl.register);
router.get("/checkAuth", auth, userCtrl.checkAuthSuccess);
router.get("/forgotpassword/:email", userCtrl.forgotPassword)
router.put("/confirm", auth, userCtrl.confirmAccount);
router.put("/changePassword", auth, userCtrl.changePassword);

module.exports = router;