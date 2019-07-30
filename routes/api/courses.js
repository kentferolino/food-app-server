const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Course Model
const Course = require("../../models/Course");

// @route  GET api/course
// @desc   Get all course
// @access Public
router.get("/", (req, res) => {
  Course.find()
    .sort({ date: -1 })
    .then(courses => res.json(courses));
});

// @route  GET api/course/name/:name
// @desc   Get a course by course name
// @access Private
router.get("/name/:name", auth, (req, res) => {
  const name = req.params.name;
  Course.findOne({ name: name }, function (err, course) {
    if (err) throw err;
    if (!course) res.status(404).json({ success: false, msg: "Course not found." });
    else {
      res.json(course)
    }
  })
});

// @route  POST api/course
// @desc   Create a course
// @access Private
router.post("/", auth, (req, res) => {
  const newCourse = new Course({
    name: req.body.name,
    label: req.body.label,
    imageUrl: req.body.imageUrl,
    created_by: req.user.id
  });

  newCourse.save().then(course => res.json(course));
});

// @route  PUT api/course
// @desc   Update a course
// @access Private
router.put("/:id", auth, (req, res) => {
  const courseID = req.params.id;
  const courseInputs = req.body;

  Course.findById(courseID, function (err, course) {
    if (!course) res.status(404).json({ success: false, msg: "Course not found." });
    else {
      course.name = courseInputs.name;
      course.label = courseInputs.label;
      course.imageUrl = courseInputs.imageUrl;
      course
        .save()
        .then(course => res.json(course))
        .catch(err =>
          res
            .status(400)
            .json({ success: false, msg: `Update failed. ${err}` })
        );
    }
  });
});

// @route  DELETE api/course/:id
// @desc   Delete a course
// @access Private
router.delete("/:id", auth, (req, res) => {
  Course.findById(req.params.id)
    .then(course => course.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
