import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.APP_PORT 
const url = process.env.APP_URL

app.listen(port, ()=>{
    console.log(`Server is running at  ${url}${port}`);
})

