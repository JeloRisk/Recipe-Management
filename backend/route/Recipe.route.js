/** @format */

const mongoose = require("mongoose");
const express = require("express");
const recipe = require("../models/Recipe.model");
const router = express.Router();
const { createRecipe, getRecipes, updateRecipe, getRecipe, deleteRecipe } = require("../controllers/Recipe.controller");

router.post("/", createRecipe);
router.get("/", getRecipes);

router.put("/:id", updateRecipe);
router.get("/:id", getRecipe);
router.delete("/delete/:id", deleteRecipe);

module.exports = router;
