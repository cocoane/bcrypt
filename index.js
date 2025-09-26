const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/hash', async (req, res) => {
  const password = req.body.password;
  if (!password) return res.status(400).json({error: 'no password'});
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  res.json({ hash });
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
