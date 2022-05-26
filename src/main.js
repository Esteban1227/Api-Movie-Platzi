const API_KEY = "b9f7373564ff8e5e239d6bb816748958"
const API_AXIOS = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers:{
        "Content-Type":"application/json;charset=utf-8",
    },
    params:{
        "api_key":API_KEY
    },
})

//utils
function createMovies(movies,mainContainer){
    mainContainer.innerHTML = ""
    movies.forEach(movie => {
        const movieContainer = document.createElement("div")
        movieContainer.classList.add("movie-container");
        const moveImg = document.createElement("img");
        moveImg.classList.add("movie-img");
        moveImg.setAttribute("alt",movie.title);
        moveImg.setAttribute("src",`https://image.tmdb.org/t/p/w300/${movie.poster_path}`);
        movieContainer.appendChild(moveImg);
        movieContainer.addEventListener("click", () =>{
            location.hash = `#movie=${movie.id}`
        })
        mainContainer.appendChild(movieContainer)
    });
}
function createCategories(categories,mainContainer){
    mainContainer.innerHTML = ""
    categories.forEach(category => {
        const categoryContainer = document.createElement("div")
        categoryContainer.classList.add("category-container");
        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add("category-title");
        categoryTitle.setAttribute("id","id" + category.id);
        categoryTitle.addEventListener("click", () =>{
            location.hash = `#category=${category.id}-${category.name}`
        })
        const categoryTitleText = document.createTextNode(category.name)
        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle);
        mainContainer.appendChild(categoryContainer)
    });
}

//
async function getTrendingMoviesPreview(){
    const { data } = await API_AXIOS(`trending/movie/day`);
    const movies = data.results;
    createMovies(movies,trendingMoviesPreviewList)
}

async function getCategoriesMoviesPreview(){
    const {data} = await API_AXIOS(`genre/movie/list`);
    const categories = data.genres;
    createCategories(categories,categoriesPreviewList)
}

async function getMoviesByCategory(id){
    const { data } = await API_AXIOS(`discover/movie`,{
        params:{
            with_genres:id,
        }
    });
    const movies = data.results;
    createMovies(movies,genericSection)
}

async function getMovieBySearch(query){
    const { data } = await API_AXIOS(`search/movie`,{
        params:{
            query,
        }
    });
    const movies = data.results;
    createMovies(movies,genericSection)
}

async function getTrendingMovies(){
    const { data } = await API_AXIOS(`trending/movie/day`);
    const movies = data.results;
    createMovies(movies,genericSection)
}

async function getMovieById(id){
    const { data:movie } = await API_AXIOS(`movie/${id}`);

    const movilImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    headerSection.style.background = `
    linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
        url(${movilImgUrl})
        `
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesId(id)
}

async function getRelatedMoviesId(id){
    const { data } = await API_AXIOS(`movie/${id}/similar`);
    const relatedMovies = data.results;

    createMovies(relatedMovies,relatedMoviesContainer)
}


