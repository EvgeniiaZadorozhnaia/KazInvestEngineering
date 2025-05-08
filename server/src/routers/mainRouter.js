const router = require("express").Router();
const aiController = require("../controllers/aiController");

router.post("/", aiController.sendRequest);

module.exports = router;
