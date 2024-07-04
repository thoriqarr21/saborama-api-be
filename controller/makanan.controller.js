const pool = require("../database/index");
const { v4: uuidv4 } = require('uuid');

const makananController = {
    getAll: async (req, res) => {
        try {
            const [rows] = await pool.query("SELECT * FROM makanans");
            res.json({ error: false, message: 'success', makanans: rows });
        } catch (error) {
            console.error(`Error fetching makanans: ${error.stack}`);
            res.status(500).json({ error: true, message: 'Failed to fetch makanans' });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await pool.query("SELECT * FROM makanans WHERE id = ?", [id]);
            if (rows.length === 0) {
                return res.status(404).json({ error: true, message: 'Makanan not found' });
            }
            const makanan = rows[0];
            const [coments] = await pool.query("SELECT * FROM coments WHERE id = ?", [id]);
            res.json({ error: false, message: 'success', makanan: { ...makanan, coments } });
        } catch (error) {
            console.error(`Error fetching makanan details: ${error.stack}`);
            res.status(500).json({ error: true, message: 'Failed to fetch makanan details' });
        }
    },
    create: async (req, res) => {
        try {
            const { name, publisher, description, tingkatSulit, waktu, rating, image, bahan, daerahId } = req.body;
            const id = uuidv4();
            await pool.query("INSERT INTO makanans (id, name, publisher, description, tingkatSulit, waktu, rating, image, bahan, daerahId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [id, name, publisher, description, tingkatSulit, waktu, rating, image, bahan, daerahId]);
            res.status(201).json({ error: false, message: 'Makanan added successfully', makanan: { id, name, publisher, description, tingkatSulit, waktu, rating, image, bahan, daerahId } });
        } catch (error) {
            console.error(`Error adding makanan: ${error.stack}`);
            res.status(500).json({ error: true, message: 'Failed to add makanan' });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, publisher, description, tingkatSulit, waktu, rating, image, bahan, daerahId } = req.body;
            await pool.query("UPDATE makanans SET name = ?, publisher = ?, description = ?, tingkatSulit = ?, waktu = ?, rating = ?, image = ?, bahan = ?, daerahId = ? WHERE id = ?",
                [name, publisher, description, tingkatSulit, waktu, rating, image, bahan, daerahId, id]);
            res.json({ error: false, message: 'Makanan updated successfully', makanan: { id, name, publisher, description, tingkatSulit, waktu, rating, image, bahan, daerahId } });
        } catch (error) {
            console.error(`Error updating makanan: ${error.stack}`);
            res.status(500).json({ error: true, message: 'Failed to update makanan' });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await pool.query("DELETE FROM makanans WHERE id = ?", [id]);
            res.json({ error: false, message: 'Makanan deleted successfully' });
        } catch (error) {
            console.error(`Error deleting makanan: ${error.stack}`);
            res.status(500).json({ error: true, message: 'Failed to delete makanan' });
        }
    }
};

module.exports = makananController;
