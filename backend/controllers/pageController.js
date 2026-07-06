const Page = require("../models/Page");

const slugify = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
};

// GET ALL
exports.getPages = async (req, res) => {
    const pages = await Page.find().sort({ createdAt: -1 });

    res.json(pages);
};

// CREATE
exports.createPage = async (req, res) => {

    const { title, content } = req.body;

    const page = await Page.create({
        title,
        content,
        slug: slugify(title)
    });

    res.status(201).json(page);
};

// GET SINGLE
exports.getPage = async (req, res) => {

    const page = await Page.findOne({
        slug: req.params.slug
    });

    if (!page)
        return res.status(404).json({
            message: "Page not found"
        });

    res.json(page);
};

// UPDATE
exports.updatePage = async (req, res) => {

    const { title, content } = req.body;

    const page = await Page.findByIdAndUpdate(
        req.params.id,
        {
            title,
            content,
            slug: slugify(title)
        },
        {
            new: true
        }
    );

    res.json(page);
};

// DELETE
exports.deletePage = async (req, res) => {

    await Page.findByIdAndDelete(req.params.id);

    res.json({
        message: "Deleted"
    });
};
