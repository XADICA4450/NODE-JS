const express = require('express');
const {
    getAllData,
    deleteData,
    getDataById,
    postData,
    editData,
    searchByName,
}=require("../controllers/dataControllers");

const router = express.Router();
router.get("/", getAllData);
router.delete("/:id",deleteData);
router.post("/",postData);
router.get("/:id", getDataById);
router.put("/:id", editData);
router.get("/search", searchByName);


module.exports = router;