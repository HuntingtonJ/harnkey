const express = require("express");
const router = express.Router();

const db = require("../Services/database.js");

const HarnessService = require("../Services/harnessService.js");
const harnessService = new HarnessService(db);

router.get("/", async (req, res) => {
  let name = "";
  let harness = null;
  if (req.query.name) {
    name = req.query.name;
  }
  try {
    harness = await harnessService.getHarness(name);
    res.json(harness);
  } catch (error) {
    console.error(error);
    res.status(404).send({
      error: true,
      message: error,
    });
  }
});

module.exports = router;
