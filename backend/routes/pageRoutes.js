const express = require("express");
const router = express.Router();

const {
    getPages,
    createPage,
    getPage,
    updatePage,
    deletePage
} = require("../controllers/pageController");

router.get("/admin", getPages);

router.post("/admin", createPage);

router.put("/admin/:id", updatePage);

router.delete("/admin/:id", deletePage);

router.get("/pages/:slug", getPage);

module.exports = router;
