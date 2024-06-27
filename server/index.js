// CLI: npm install express body-parser --save
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// APIsf
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// apis
app.use('/api/customer', require('./api/customer.js'));

app.use('/api/admin', require('./api/admin.js'));