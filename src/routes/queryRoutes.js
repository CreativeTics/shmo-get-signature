const express = require("express");
const { getQueryResult } = require("../controllers/queryController");

const router = express.Router();

router.get("/signature/:annotationId", getQueryResult);

module.exports = router;
