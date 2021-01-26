console.log('Hello world')

/*---------------------- references DOM ---------------------*/

const getAllPosts = document.getElementById('getAllPosts')

/*---------------------- Create posts cards ---------------------*/

const createPostCards = (posts) => {
	const cardsContainer = document.createElement('div')
	document.body.append(cardsContainer)
cardsContainer.classList.add('cardsContainer', 'd-flex', 'flex-wrap','justify-content-center')
	posts.forEach((post) => {
		const card = `
        <div class="card text-dark bg-light m-5 " style="width: 300px">
        <div class="card-header"><i class="fas fa-user mr-2"></i> ${post.name}-${post.lastname}</div>
        <div class="card-body">
            <h5 class="card-title">Post</h5>
            <p class="card-text">${post.post}</p>
        </div>
        </div>
        `

		cardsContainer.insertAdjacentHTML('beforeend', card)
	})
}



/*---------------------- config url enviroment ---------------------*/

const URL_DEVELOPMENT = 'http://localhost:3000/getAll'
const URL_PRODUCTION = 'https://sequelizeloginposts.herokuapp.com/getAll'

getAllPosts.addEventListener('click', async () => {
	const posts = await fetch(URL_PRODUCTION)

	const data = await posts.json()

    console.log(data)
    
    getAllPosts.setAttribute('disabled',true)

	createPostCards(data)
})
