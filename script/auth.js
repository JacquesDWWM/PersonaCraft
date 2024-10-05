const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const app = express();



const pool = new Pool({
    user: 'user-test',
    host: 'localhost',
    database: 'bdd-persona',
    password: 'personacraft',
    port: 5432,
});

app.use(express.json());

// signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    // check if user already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const newUser = await pool.query('INSERT INTO users (userName, email, password) VALUES ($1, $2, $3) RETURNING *', [userName, email, hashedPassword]
    );

    res.status(201).json({message: 'User created successfully', user: newUser.rows[0]});
});

    // connexion path
    app.post('/signin', async (req, res) => {
        const { email, password } = req.body;

        // check if user exists
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length === 0) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.rows[0].password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // generate token
        const token = jwt.sign({ userId: user.rows[0].id }, 'personacraft', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    });

    //middleware to protect routes
    const authenticateToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.sendStatus(401);

        jwt.verify(token, 'personacraft', (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    };

    //protected route to userinterface
    app.get('/userinterface', authenticateToken, (req, res) => {
        res.json({ message: 'welcome to the userinterface', user: req.user });
    });
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
