/** @format */

const mongoose = require("mongoose");
const express = require("express");
const recipe = require("../models/Recipe.model");
const router = express.Router();
const { createRecipe, getRecipes, updateRecipe, getRecipe } = require("../controllers/Recipe.controller");

router.post("/", createRecipe);
router.get("/", getRecipes);

router.put("/:id", updateRecipe);
router.get("/:id", getRecipe);

module.exports = router;
