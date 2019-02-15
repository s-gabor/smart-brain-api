const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var knex = require('knex');

const db = knex({
	client: 'mysql',
	connection: {
	    host : '127.0.0.1',
	    user : 'root',
	    password : 'shamu',
	    database : 'cats_app'
	}
});


// db.select('*').from('cats').then(data => {
// 	console.log(data);
// })


const database = [
	{
		userId: '1',
		name: 'Sam',
		email: 'sam@gmail.com',
		password: '111',
		rank: 0,
		joined: new Date()
	},
	{
		userId: '2',
		name: 'Jane',
		email: 'jane@gmail.com',
		password: '222',
		rank: 0,
		joined: new Date()
	}
]

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
	res.send(database);
})


app.post('/signin', (req, res) => {
	const { email, password } = req.body;
	if (email === database[0].email && password === database[0].password) {
		res.json(database[0]);
	} else {
		res.json('User and/or password doesn\'t match any active user. Please register!');
	}
})


app.post('/register', (req, res) => {
	const { name, email, password } = req.body;
	const user = {
			userId: '3',
			name: name,
			email: email,
			password: password,
			rank: 0,
			joined: new Date()
		}
	database.push(user);
	res.send(user);
})


app.put('/image', (req, res) => {
	const userId = req.body.userId;
	let isUser = {}; 
	database.forEach(user => {
		if (user.userId === userId) {
			user.rank++
			isUser = user;
		}
	})
	res.send(isUser);
})


app.get('/profile/:userId', (req, res) => {
	const id = req.params.userId;
	console.log(id);
	let activeUser = 'User not found';
	database.forEach(user => {
		if (id === user.userId) {
			activeUser = user;
		}
	})
	res.send(activeUser);
})


app.listen(3000, () => console.log('Started server on port 3000.'));


