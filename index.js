const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();

app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const daerahRouter = require('./routes/daerah.router');
const makananRouter = require('./routes/makanan.router');
const comentRouter = require('./routes/coment.router');

app.use("/api/v1/daerah", daerahRouter);
app.use("/api/v1/makanan", makananRouter);
app.use("/api/v1/coment", comentRouter);

const PORT = process.env.PORT || 3039;

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
