const pool = require("../database/index");

const comentController = {
    create: async (req, res) => {
        try {
            const { id, name, komentar } = req.body;

            // Check if the makanan exists
            const [makananDetail] = await pool.query("SELECT id FROM makanans WHERE id = ?", [id]);
            if (makananDetail.length === 0) {
                return res.status(404).json({ error: true, message: 'Makanan not found' });
            }

            // Insert the coment
            await pool.query("INSERT INTO coments (id, name, komentar) VALUES (?, ?, ?)", [id, name, komentar]);

            return res.status(201).json({
                error: false,
                message: 'Coment added successfully',
                coment: { id, name, komentar },
            });
        } catch (error) {
            console.error(`Error adding coment: ${error.stack}`);
            return res.status(500).json({ error: true, message: 'Failed to add coment' });
        }
    },
};

module.exports = comentController;
