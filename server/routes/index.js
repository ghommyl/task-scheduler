const express = require("express");
const router = express.Router();

const dbModule = require("../dbModule");
dbModule.connect();

router.get("/get-tasks", (req, res) => {
  dbModule.getTasks((err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send({ tasks: rows });
    }
  });
});

router.put("/update-task/:id", (req, res) => {
  dbModule.updateTask(req.params['id'], req["body"], (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete("/delete-task/:id", (req, res) => {
  dbModule.deleteTask(req.params["id"], (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

router.post("/add-task", (req, res) => {
  dbModule.addTask((err, id) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send({ id: id });
    }
  });
});

module.exports = router;
