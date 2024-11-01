/** @format */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const RecipeRoute = require("./route/Recipe.route");
const app = express();

app.use(express.json());

app.use("/api/recipes", RecipeRoute);
app.get("/", (req, res) => {
  res.send("Hello, Marlo");
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
