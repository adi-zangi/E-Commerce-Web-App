/**
 * Creates a pool that is connected to the shop database
 */

import { Pool } from 'pg';

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'e_commerce_shop',
    password: 'admin',
    port: 5432,
});

export default pool;