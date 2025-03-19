import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/api/v1/user/register", (req, res) => {
    res.send("User registered successfully");
    const { name, email, password } = req.body;
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
});
app.listen(process.env.PORT, () => {
    console.log( `Server is running on port ${PORT} located at localhost:${PORT}`);
});