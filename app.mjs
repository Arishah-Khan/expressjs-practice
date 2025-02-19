import express from "express";
import path from "path";  
const app = express();
const port = process.env.PORT || 3000;

const _dirname = path.resolve()

app.use('/' , express.static(path.join(_dirname,'./web/dist')))


app.get('/', (req, res) => {
  res.send("Home page served from the dist directory");
});

app.get('/weather', (req, res) => {
  res.json({ user: 'tobi' });
});

app.get('/weather/:cityName', (req, res) => {
  res.send(req.params);
});

app.get('/weather/:cityName/:side', (req, res) => {
  res.send(req.params);
});

app.use("/", (req, res) => {
  res.send("Middleware is running");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
