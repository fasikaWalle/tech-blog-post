const router = require("express").Router();
const apiRoute = require("./api/");
const homeRoute = require("./home-route.js");
const dashboardRoute = require("./dashboard-route.js");
const createPostRoute = require("./create-post.js");

router.use("/", homeRoute);
router.use("/api", apiRoute);
router.use("/dashboard", dashboardRoute);
router.use("/create", createPostRoute);


module.exports = router;
