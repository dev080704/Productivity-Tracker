const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/logs', require('./routes/log'));
app.use('/api/preferences', require('./routes/preferences'));
app.use('/api/report', require('./routes/report'));

app.listen(5000, () => console.log('Server running on port 5000'));