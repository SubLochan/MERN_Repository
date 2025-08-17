const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const photos = [
  { url: 'https://picsum.photos/id/1011/300', caption: 'Mountain' },
  { url: 'https://picsum.photos/id/1015/300', caption: 'Forest' },
  { url: 'https://picsum.photos/id/1016/300', caption: 'Beach' }
];

app.get('/api/photos', (req, res) => {
  res.json(photos);
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});