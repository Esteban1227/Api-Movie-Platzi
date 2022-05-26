searchFormBtn.addEventListener("click", () =>{
    location.hash =`search=${searchFormInput.value}`
});
trendingBtn.addEventListener("click", () =>{
    location.hash ="trends"
});
arrowBtn.addEventListener("click", () =>{
    history.back()
    /* location.hash ="home" */
});

function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,currentScroll - (currentScroll/5));
    }
};

window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false)


function navigator() {
    if(location.hash.startsWith("#trends")){
        trendsPage()
    }else if(location.hash.startsWith("#search=")){
        searchPage()
    }else if(location.hash.startsWith("#movie=")){
        moviePage()
    }else if(location.hash.startsWith("#category=")){
        categoriesPage()
    }else{
        homePage()
    }
    location.hash
    smoothscroll()
}
function homePage(){
    console.log("home");
    headerSection.classList.remove("header-container--long");
    headerSection.style.background ="";
    arrowBtn.classList.add("inactive");
    arrowBtn.classList.remove("header-arrow-white");
    headerTitle.classList.remove("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.remove("inactive");
    categoriesPreviewSection.classList.remove("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.add("inactive");
    getTrendingMoviesPreview();
    getCategoriesMoviesPreview();   
}
function categoriesPage(){
    console.log("category");

    headerSection.classList.remove("header-container--long");
    headerSection.style.background ="";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

    const [_, categoryData] = location.hash.split("=");
    const [categoryId, categoryName] = categoryData.split("-")

    headerCategoryTitle.innerHTML = categoryName;
    getMoviesByCategory(categoryId);   
}
function trendsPage(){
    console.log("trends");

    headerSection.classList.remove("header-container--long");
    headerSection.style.background ="";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    headerCategoryTitle.innerHTML = "Tendencias"
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");
    getTrendingMovies()  
}
function moviePage(){
    console.log("movie");
    headerSection.classList.add("header-container--long");
    /* headerSection.style.background =""; */
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.add("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.remove("inactive"); 

    const [_, id] = location.hash.split("=");
    getMovieById(id)  
}
function searchPage(){
    console.log("search");
    headerSection.classList.remove("header-container--long");
    headerSection.style.background ="";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");   
    const [_, query] = location.hash.split("=");
    getMovieBySearch(query)
}
