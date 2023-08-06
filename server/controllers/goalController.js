const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

// @desc     Get goals
// @route    GET /api/goals
// @access   PRIVATE 
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
    // res.status(200).json({message:'Get Goals'})
})

// @desc     Set goal
// @route    POST /api/goals
// @access   PRIVATE 
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please provide a text')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
    // res.status(200).json({message:'Set Goal'})
})

// @desc     Update goal
// @route    PUT /api/goals
// @access   PRIVATE 
const updateGoal = asyncHandler(async (req, res) => {
    //Get goal by id
    const goal = Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    if (!req.user) {
        res.status(401)
        throw new Error('User not authorized')
    }

    //Make sure only update goal of logged in user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedGoal)
    // res.status(200).json({message:`Update goal with id ${req.params.id}`})
})

// @desc     Delete goal
// @route    DELETE /api/goals
// @access   PRIVATE 
const deleteGoal = asyncHandler(async (req, res) => {
    //Get goal by id
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    if (!req.user) {
        res.status(401)
        throw new Error('User not authorized')
    }

    //Make sure only delete goal of logged in user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.deleteOne()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}