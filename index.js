const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/hash', async (req, res) => {
  const password = req.body.password;
  const salt = req.body.salt;
  if (!password) return res.status(400).json({error: 'no password'});
  if (!salt) return res.status(400).json({error: 'no salt'});
  try {
    const hash = await bcrypt.hash(password, salt);
    res.json({ hash });
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
