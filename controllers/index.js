const router = require("express").Router();
const apiRoute = require("./api/");
const homeRoute = require("./home-route.js");
const dashboardRoute = require("./dashboard-route.js");
router.use("/dashboard", dashboardRoute);
router.use("/api", apiRoute);
router.use("/", homeRoute);

module.exports = router;
