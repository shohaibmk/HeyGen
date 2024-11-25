// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

function getStatus() {
  const randomNum = Math.floor(Math.random() * 3);  // Random number between 0 and 2

  if (randomNum === 0) {
    return 'completed';
  }
  else if (randomNum === 1) {
    return 'pending';
  }
  else {
    return 'error';
  }
}

app.get('/status', (req, res) => {
  const status = getStatus();
  console.log("New Req", status);
  if (status === 'completed') {
    res.status(200).json({ status: 'completed' });
  } else if (status === 'pending') {
    res.status(202).json({ status: 'pending' });
  }
  else {
    res.status(500).json({ status: 'error' });
  }
});





app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

export default app;