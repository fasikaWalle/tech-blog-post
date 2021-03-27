const router = require("express").Router();
const apiRoute = require("./api/");
const homeRoute = require("./home-route.js");

router.use("/api", apiRoute);
router.use("/", homeRoute);

module.exports = router;
