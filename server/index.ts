/**
 * A web service that listens for database requests
 */

import express from 'express';
import db from './db/db';

const app = express();
const port = 3001;



app.listen(port, () => {
   console.log(`Listening on port ${port}`)
});