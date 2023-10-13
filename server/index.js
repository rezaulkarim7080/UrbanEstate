import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import product from './routes/productRoute.js';
import user from './routes/userRoutes.js';



import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config()

const app = express();

app.use(cors());
app.use(cookieParser());


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));





app.use(express.json());



app.use('/api', product);
app.use('/api', user);



// const CONNECTION_URL = 'mongodb+srv://rkrezaulkarim88:zYGxz8ap1JsHhmd9@cluster0.fn1drp9.mongodb.net/'

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

