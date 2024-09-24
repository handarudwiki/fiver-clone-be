import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileupload from 'express-fileupload';
import userRouter from './routes/UserRoute';

dotenv.config();
const app = express();
const port = process.env.APP_PORT 
const url = process.env.APP_URL

app.use(cors)
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileupload());

app.use('/api/v1/users', userRouter);


app.listen(port, ()=>{
    console.log(`Server is running at  ${url}${port}`);
})

