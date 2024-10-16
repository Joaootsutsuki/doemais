require("dotenv").config();
const express = require("express");
const cors = require("cors");
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(protectedRoutes);

app.listen(PORT, () =>{
    console.log("Server rodando na porta " + PORT);
})