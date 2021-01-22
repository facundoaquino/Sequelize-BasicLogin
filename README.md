
##   sql script database 

> database/config/dataBase.sql


# Run

> npm run dev

# Basic sequelize queries


```javascript
//Get all users

router.get('/test', async (req, res) => {
	const result = await db.user.findAll({})

	res.send(result)
})

//Get by attributes

router.get('/test', async (req, res) => {
	const result = await db.user.findAll({
		attributes: ['name', 'lastname'],
	})

	res.send(result)
})

//Using where and attributes
//SELECT name from users where name = 'luciana'

router.get('/test', async (req, res) => {
	const result = await db.user.findAll({
		where: {
			name: 'luciana',
		},
		attributes: ['name'],
	})

	console.log(result)

	res.send(result)
})

/*  OPERATIONS WHIT OP */

// const Op = sequelize.Op
//SELECT name , email FROM users WHERE name LIKE "%undo%"

router.get('/test', async (req, res) => {
	const result = await db.user.findAll({
		attributes: ['name', 'email'],
		where: {
			name: {
				[Op.like]: '%undo%',
			},
		},
	})

	res.send(result)
})

/*DATE FORMAT WHIT sequelize.fn */
//SELECT DATE_FORMAT(`created_at`, '%y') AS `updatedAt` FROM `posts` AS `post`
router.get('/test', async (req, res) => {
	const posts = await db.post.findAll({

        attributes: [[sequelize.fn('DATE_FORMAT', sequelize.col

        ('created_at'), '%y'), 'date']],
	})

	res.send(posts)
})
```
