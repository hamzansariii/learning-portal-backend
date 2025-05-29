const express = require('express')
const db = require('../models')
const MockGenAPIEndpoint = require('../controllers/mockGenAPI')
const router = express.Router()

const { sequelize } = require('../models'); // Adjust path as per your setup

router.get('/participant-feedback/data', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const title = req.query.title || '';
        const minScore = parseFloat(req.query.minScore) || 0;
        const maxScore = parseFloat(req.query.maxScore) || 10;
        console.log("TITLE = ", title)

        // Fetch paginated data
        const [rows] = await sequelize.query(`
      SELECT * FROM participants
      WHERE title LIKE :title
        AND score BETWEEN :minScore AND :maxScore
      ORDER BY createdAt DESC
      LIMIT :limit OFFSET :offset
    `, {
            replacements: {
                title: `%${title}%`,
                minScore,
                maxScore,
                limit,
                offset
            }
        });

        // Fetch total count
        const [[{ count }]] = await sequelize.query(`
      SELECT COUNT(*) as count FROM participants
      WHERE title LIKE :title
        AND score BETWEEN :minScore AND :maxScore
    `, {
            replacements: { title: `%${title}%`, minScore, maxScore }
        });

        res.status(200).json({ rows, count });

    } catch (error) {
        console.log("Error in custom query:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.patch('/participant-feedback/review/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { isReviewed } = req.body
        const record = await db.participant.findByPk(id)
        if (!record) {
            return res.status(404).json({ 'message': 'Record not found' })
        }
        record.isReviewed = isReviewed;
        await record.save()
        return res.status(200).json({ 'message': 'Record updated!' })
    } catch (error) {
        console.log(error)
    }
})


module.exports = router