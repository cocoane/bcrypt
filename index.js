const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/hash', async (req, res) => {
  try {
    const password = req.body.password;
    const salt = req.body.salt; // client_secret

    if (!password) return res.status(400).json({ error: 'no password' });
    if (!salt) return res.status(400).json({ error: 'no salt' });

    // bcrypt salt 형식 정규식 검사 (예: $2a$10$...)
    if (!/^(\$2[aby]\$\d{2}\$[./A-Za-z0-9]{22})/.test(salt)) {
      return res.status(400).json({ error: 'invalid salt format' });
    }

    const hash = await bcrypt.hash(password, salt);
    res.json({ hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
