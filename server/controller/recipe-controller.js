const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/recipe/create-abl");
const GetAbl = require("../abl/recipe/get-abl");
const ListAbl = require("../abl/recipe/list-abl");
const DeleteAbl = require("../abl/recipe/delete-abl")

router.post("/create", async (req, res) => {
    await CreateAbl(req, res)
});

router.get("/get", async(req,res) =>{
    await GetAbl(req,res);
});

router.get("/list", async(req,res) =>{
    await ListAbl(req,res);
});

router.delete("/delete", async(req,res) =>{
    await DeleteAbl(req,res)
});

module.exports = router;