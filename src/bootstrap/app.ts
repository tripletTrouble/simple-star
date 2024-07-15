import express from 'express';
import dotenv from 'dotenv';
import router from '../routes/api';

dotenv.config();

const app = express();
const port = process.env.APP_PORT;

app.use(express.json());

router.init(app);

app.listen(port, () => {
    console.log('App running on port ' + port);
})
