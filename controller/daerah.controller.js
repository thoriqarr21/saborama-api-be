const pool = require("../database/index");
const { v4: uuidv4 } = require('uuid');

const daerahController = {
    getAll: async (req, res) => {
        try {
            const [rows] = await pool.query("SELECT * FROM daerahs");
            res.json({ error: false, message: 'success', daerahs: rows });
        } catch (error) {
            console.error(`Error fetching daerahs: ${error.stack}`);
            res.status(500).json({ error: true, message: 'Failed to fetch daerahs' });
        }
    },
    getById: async (req, res) => {
        try {
            const { daerahId } = req.params;
            const [rows] = await pool.query("SELECT * FROM daerahs WHERE daerahId = ?", [daerahId]);
            if (rows.length === 0) {
                return res.status(404).json({ error: true, message: 'Daerah not found' });
            }
            const daerah = rows[0];
            const [makanans] = await pool.query("SELECT * FROM makanans WHERE daerahId = ?", [daerahId]);
            res.json({ error: false, message: 'success', daerah: { ...daerah, makanans } });
        } catch (error) {
            console.error(`Error fetching daerah details: ${error.stack}`);
            res.status(500).json({ error: true, message: 'Failed to fetch daerah details' });
        }
    },
    create: async (req, res) => {
        try {
            const { name, deskripsi, pictureId } = req.body;
            const daerahId = uuidv4();
            await pool.query("INSERT INTO daerahs (daerahId, name, deskripsi, pictureId) VALUES (?, ?, ?, ?)", [daerahId, name, deskripsi, pictureId]);
            res.status(201).json({ error: false, message: 'Daerah added successfully', daerah: { daerahId, name, deskripsi, pictureId } });
        } catch (error) {
            console.error(`Error adding daerah: ${error.stack}`);
            res.status(500).json({ error: true, message: 'Failed to add daerah' });
        }
    },
    update: async (req, res) => {
        try {
            const { daerahId } = req.params;
            const { name, deskripsi, pictureId } = req.body;
            await pool.query("UPDATE daerahs SET name = ?, deskripsi = ?, pictureId = ? WHERE daerahId = ?", [name, deskripsi, pictureId, daerahId]);
            res.json({ error: false, message: 'Daerah updated successfully', daerah: { daerahId, name, deskripsi, pictureId } });
        } catch (error) {
            console.error(`Error updating daerah: ${error.stack}`);
            res.status(500).json({ error: true, message: 'Failed to update daerah' });
        }
    },
    delete: async (req, res) => {
        try {
            const { daerahId } = req.params;
            await pool.query("DELETE FROM daerahs WHERE daerahId = ?", [daerahId]);
            res.json({ error: false, message: 'Daerah deleted successfully' });
        } catch (error) {
            console.error(`Error deleting daerah: ${error.stack}`);
            res.status(500).json({ error: true, message: 'Failed to delete daerah' });
        }
    }
};

module.exports = daerahController;
