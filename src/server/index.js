const express = require('express');

const app = express();


app.use(express.static('dist'));

app.get('/api/getHeader', (req, res) => {
	res.send({ message: "Welcome to Servicenow React Workshop" });
});

app.listen(8080, () => console.log('Listening on port 8080!'));
