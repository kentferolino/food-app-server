const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// FoodItems Model
const FoodItem = require("../../models/FoodItem");

// @route  GET api/fooditem
// @desc   Get all fooditem
// @access Public
router.get("/", (req, res) => {
  FoodItem.find()
    .sort({ date: -1 })
    .then(fooditems => res.json(fooditems));
});

// @route  GET api/fooditem/subcategory/:subcatID
// @desc   Get a food items by subcategory id
// @access Private
router.get("/subcategory/:subcatID", auth, (req, res) => {
  const subcatID = req.params.subcatID;
  FoodItem.find({ subcategory: subcatID }, function (err, fooditems) {
    if (err) throw err;
    else {
      res.json(fooditems)
    }
  })
});

// @route  POST api/fooditem
// @desc   Create a fooditem
// @access Private
router.post("/", auth, (req, res) => {
  const newFoodItem = new FoodItem({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    subcategory: req.body.subcategory_id,
    created_by: req.user.id
  });

  newFoodItem.save().then(fooditem => res.json(fooditem));
});

// @route  PUT api/fooditem
// @desc   Update a fooditem
// @access Private
router.put("/:id", auth, (req, res) => {
  const fooditemID = req.params.id;
  const fooditemInputs = req.body;

  FoodItem.findById(fooditemID, function (err, fooditem) {
    if (!fooditem) res.status(404).json({ success: false, msg: "Food not found." });
    else {
      fooditem.name = fooditemInputs.name;
      fooditem.title = fooditemInputs.title;
      fooditem.imageUrl = fooditemInputs.imageUrl;
      fooditem
        .save()
        .then(fooditem => res.json(fooditem))
        .catch(err =>
          res
            .status(400)
            .json({ success: false, msg: `Update failed. ${err}` })
        );
    }
  });
});

// @route  DELETE api/fooditem/:id
// @desc   Delete a fooditem
// @access Private
router.delete("/:id", auth, (req, res) => {
  FoodItem.findById(req.params.id)
    .then(fooditem => fooditem.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
