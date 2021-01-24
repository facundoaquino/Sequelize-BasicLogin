const express = require('express')
const router = express.Router()
const db = require('./../database/models')
const sequelize = db.sequelize
const Op = sequelize.Op

/*---------------------- hashing password ---------------------*/

const bcrypt = require('bcryptjs')

/*---------------------- locals middlewares ---------------------*/
const userLoged = require('../middlewares/userLoged')
const isLoged = require('../middlewares/isLoged')

/*---------------------- handler routes ---------------------*/

router.get('/', isLoged, (req, res) => {
	// db.user.findAll().then(console.log)

	res.render('index')
})

router.get('/login', isLoged, (req, res) => {
	res.render('login')
})

router.post('/register', isLoged, async (req, res) => {
	try {
		req.body.password = bcrypt.hashSync(req.body.password, 10)

		await db.user.create(req.body)
	} catch (e) {
		res.redirect('/')
		console.log(e)
	}

	res.redirect('login')
})

router.post('/login', isLoged, async (req, res) => {
	const user = await db.user.findOne({ where: { email: req.body.email } })

	if (user) {
		const pass = user.password
		const passIsTrue = bcrypt.compareSync(req.body.password, pass)
		if (passIsTrue) {
			req.session.user = { ...user['_previousDataValues'], password: '' }

			res.redirect('/home')
		}
	} else {
		res.send('credenciales invalidas')
	}
})

router.get('/home', userLoged, async (req, res) => {
	const posts = await db.post.findAll({
		attributes: ['post', [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%d-%m-%Y %T'), 'date']],

		where: {
			user_id: req.session.user.id,
		},
	})

	res.render('userDashboard', { posts: posts })
})

router.post('/post', async (req, res) => {
	await db.post.create({ id: null, post: req.body.post, user_id: res.locals.userLoged.id })

	res.redirect('/home')
})
/*---------------------- logout ---------------------*/

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		res.redirect('/')
	})
})

/*---------------------- api get all posts users ---------------------*/

router.get('/getAll', async (req, res) => {
	const posts = await sequelize.query(
		'select name ,lastname, post   from users inner join posts on posts.user_id=users.id order by posts.created_at desc'
	)

	res.send(posts[0])
})

/*---------------------- test route ---------------------*/

router.get('/test', async (req, res) => {
	const users = await db.user.findAll({
		include:[{association:'posteos'}]
	})
	
	console.log(users);
	 res.send(users)
})

module.exports = router
