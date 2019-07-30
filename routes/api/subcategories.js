const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Subcategory Model
const Subcategory = require("../../models/Subcategory");

// @route  GET api/subcategory
// @desc   Get all subcategory
// @access Public
router.get("/", (req, res) => {
  Subcategory.find()
    .sort({ date: -1 })
    .then(subcategories => res.json(subcategories));
});

// @route  POST api/subcategory
// @desc   Create a subcategory
// @access Private
router.post("/", auth, (req, res) => {
  const newSubcategory = new Subcategory({
    name: req.body.name,
    label: req.body.label,
    imageUrl: req.body.imageUrl,
    course: req.body.course_id,
    created_by: req.user.id
  });

  newSubcategory.save().then(subcategory => res.json(subcategory));
});

// @route  PUT api/subcategory
// @desc   Update a subcategory
// @access Private
router.put("/:id", auth, (req, res) => {
  const subcategoryID = req.params.id;
  const subcategoryInputs = req.body;

  Subcategory.findById(subcategoryID, function (err, subcategory) {
    if (!subcategory) res.status(404).json({ success: false, msg: "Subcategory not found." });
    else {
      subcategory.name = subcategoryInputs.name || subcategory.name;
      subcategory.label = subcategoryInputs.label || subcategory.label;
      subcategory.imageUrl = subcategoryInputs.imageUrl || subcategory.imageUrl;
      subcategory.course = subcategoryInputs.course_id || subcategory.imageUrl;
      subcategory
        .save()
        .then(subcategory => res.json(subcategory))
        .catch(err =>
          res
            .status(400)
            .json({ success: false, msg: `Update failed. ${err}` })
        );
    }
  });
});

// @route  DELETE api/subcategory/:id
// @desc   Delete a subcategory
// @access Private
router.delete("/:id", auth, (req, res) => {
  Subcategory.findById(req.params.id)
    .then(subcategory => subcategory.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
