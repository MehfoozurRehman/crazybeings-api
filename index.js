const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mailer = require("./mailer");

// api config
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// api routes
app.get("/", (_req, res) =>
  res.json({ message: "Welcome to the Crazybeings API" })
);

app.post("/api/contact", (req, res) => {
  if (req.body) {
    mailer("Contact Form", req.body, "contact");
    res.json({ message: "success" });
  } else {
    res.json({ message: "error" });
  }
});

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
