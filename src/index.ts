import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

mongoose.connect('mongodb+srv://admin:admin@ad-2019-fdyzz.mongodb.net/secret-friend?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(cors())
app.use(routes);
app.listen(3333);