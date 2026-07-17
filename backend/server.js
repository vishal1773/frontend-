const app = require('./src/app');

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Backend running on http://127.0.0.1:${port}`);
});
