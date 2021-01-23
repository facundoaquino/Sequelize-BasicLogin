## sql script database

> [database/config/dataBase.sql]

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
		attributes: [[sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%y'), 'date']],
	})

	res.send(posts)
})

/*Find by primary key */

router.get('/test', async (req, res) => {
	const post = await db.post.findByPk(11)
	res.send(post)
})

/*Find one*/
//SELECT `id`, `post`, `user_id`, `created_at` FROM `posts` AS `post` WHERE `post`.`user_id` = 11 LIMIT 1

router.get('/test', async (req, res) => {
	const post = await db.post.findOne({
		where: {
			user_id: 11,
		},
	})
	res.send(post)
})

/*Operators like*/
// SELECT `id`, `post`, `user_id`, `created_at` FROM `posts` AS `post` WHERE `post`.`post` LIKE '%at%'
router.get('/test', async (req, res) => {
	const post = await db.post.findAll({
		where: {
			post: { [db.Sequelize.Op.like]: '%at%' },
		},
	})
	res.send(post)
})

/*ORDER */

//SELECT `name`, `id`, `lastname`, `password`, `email` FROM `users` AS `user` ORDER BY `user`.`name`, `user`.`lastname` DESC
router.get('/test', async (req, res) => {
	const users = await db.user.findAll({
		order: [
			// ascending default
			['name'],
			//second condition
			['lastname', 'desc'],
		],
	})
	res.send(users)
})

/*Limit & offset*/
//SELECT `name`, `id`, `lastname`, `password`, `email` FROM `users` AS `user` WHERE `user`.`name` LIKE '%a%' LIMIT 2, 2;

router.get('/test', async (req, res) => {
	
	const users = await db.user.findAll({
		 where:{
			 name:{
				 [db.Sequelize.Op.like]:"%a%"
			 }

		 },
		 limit:2,
		 offset:2

	})
	res.send(users)
})


/*functions ==> SUM  others.... max, min, count*/
//SELECT sum(`id`) AS `sum` FROM `users` AS `user`;

router.get('/test', async (req, res) => {
	
	const users = await db.user.sum('id')
	 
	res.send({users})
})
```


## Raw Queries


```javascript

router.get('/test', async (req, res) => {
	
	const users = await sequelize.query("select name , post from users inner join posts on posts.user_id=users.id")
	 
	res.send( users)
})

```


[database/config/dataBase.sql]:<https://github.com/facundoaquino/Sequelize-BasicLogin/blob/master/database/config/dataBase.sql>