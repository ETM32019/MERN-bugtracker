import asyncHandler from "express-async-handler";
import Bug from "../models/bugModel.js";

//@desc     Get all user bugs
//@route    GET /api/bugs
//@access   Private
const getUserBugs = asyncHandler(async (req, res) => {
  const bugs = await Bug.find({});
  res.json(bugs);
});

//@desc     Create new bug issue
//@route    POST /api/bugs
//@access   Private
const postCreateBug = asyncHandler(async (req, res) => {
  const bug = new Bug({
    user: req.user._id,
    title: "Sample Bug Title",
    reproSteps: "",
    type: "Bug",
    project: "",
    desc: "",
    status: "New",
    assignmentTo: "",
    priority: 4,
    severity: "1 - Critical",
    originalEstimate: 0,
    remaining: 0,
    hoursSpent: 0,
    levelOfEffort: 1,
  });

  await bug.save();
  res.status(201).json(bug);
});

//@desc     Get bug details by ID
//@route    GET /api/bugs/:id
//@access   Private
const getBugDetails = asyncHandler(async (req, res) => {
  const bug = await Bug.findById(req.params.id);
  if (bug) {
    return res.json(bug);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

//@desc     Update a bug by ID
//@route    PUT /api/bugs/:id
//@access   Private
const putBugById = asyncHandler(async (req, res) => {
  const {
    title,
    project,
    type,
    reproSteps,
    desc,
    status,
    assignmentTo,
    priority,
    severity,
    originalEstimate,
    remaining,
    hoursSpent,
    levelOfEffort,
  } = req.body;

  const bug = await Bug.findById(req.params.id);

  if (bug) {
    bug.title = title;
    bug.project = project;
    bug.type = type;
    bug.reproSteps = reproSteps;
    bug.desc = desc;
    bug.status = status;
    bug.assignmentTo = assignmentTo;
    bug.priority = priority;
    bug.severity = severity;
    bug.originalEstimate = originalEstimate;
    bug.remaining = remaining;
    bug.hoursSpent = hoursSpent;
    bug.levelOfEffort = levelOfEffort;

    const updatedBug = await bug.save();
    res.json(updatedBug);
  } else {
    res.status(404);
    throw new Error("Bug not found");
  }
});

//@desc     Delete a bug by ID
//@route    DELETE /api/bugs/:id
//@access   Private
const deleteBugById = asyncHandler(async (req, res) => {
  const bug = await Bug.findById(req.params.id);
  if (bug) {
    await bug.remove();
    res.json({ message: "Item Removed!" });
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

export { getUserBugs, postCreateBug, getBugDetails, deleteBugById, putBugById };
