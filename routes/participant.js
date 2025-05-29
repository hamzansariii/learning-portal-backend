const express = require('express')
const db = require('../models')
const MockGenAPIEndpoint = require('../controllers/mockGenAPI')
const router = express.Router()

router.post('/form-submit', async (req, res) => {
    const { name, email, synopsis, title } = req.body
    try {
        const feedback = await MockGenAPIEndpoint(synopsis)
        await db.participant.create({ name, email, synopsis, title, score: feedback.score, feedback: feedback.feedback })
        res.status(200).json(feedback)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router