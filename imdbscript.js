// This is a API Key
const key = '32bc368e';

var search = document.getElementById('Input');
var display = document.getElementsByClassName('favcontainers');

fetch('http://www.omdbapi.com/?i=tt3896198&apikey=32bc368e')
    .then(res => res.json())

search.addEventListener('input', findMovies);

async function findMovie() {
    // In this we Finding the ID of the Movie from the url
    var urls = new URLSearchParams(window.location.search);
    var id = urls.get('id')
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${key}`
    const res = await fetch(`${url}`);
    const data = await res.json();

    // In this we making the output html by string interpolition
    var outputs = `

    <div class="poster">
        <img src=${data.Poster} alt="Movie Poster">
    </div>
    <div class="details">
        <div class="detailsheaders">
            <div class="ls">
                <h2>${data?.Title}</h2>
            </div>
            <div class="rs">
                <i class="fa-solid fa-bookmark" onClick=addTofav('${id}') style="cursor: pointer;"></i>
            </div>
        </div>
        <span class="italics"><i>${data.Year} &#x2022; ${data.Country} &#x2022; Rating - <span
                    style="font-size: 18px; font-weight: 600;">${data.imdbRating}</span>/10 </i></span>
        <ul class="ul">
            <li><strong>Actors: </strong>${data.Actors}</li>
            <li><strong>Director: </strong>${data.Director}</li>
            <li><strong>Writers: </strong>${data.Writer}</li>
        </ul>
        <ul class="ul">
            <li><strong>Genre: </strong>${data.Genre}</li>
            <li><strong>Release Date: </strong>${data.DVD}</li>
            <li><strong>Box Office: </strong>${data.BoxOffice}</li>
            <li><strong>Movie Runtime: </strong>${data.Runtime}</li>
        </ul>
        <p style="font-size: 14px; margin-top:10px;">${data.Plot}</p>
        <p style="font-size: 15px; font-style: italic; color: #222; margin-top: 10px;">
            <i class="fa-solid fa-award"></i>
            &thinsp; ${data.Awards}
        </p>
    </div> 
    `
    // We Appending the output
    document.querySelector('.moviecontainers').innerHTML = outputs

}

async function addTofav(id) {
    localStorage.setItem(id,id);
    alert('Movie Added in Watchlist!');
}

//This Function remove the movie from the favorites and also from the localstorage
async function removefavorites(id) {
    localStorage.removeItem(id);

    // the user and refreshing the page
    alert('Movie Removed from the Watchlist');
    window.location.replace('myfavourite.html');
}

//This Function display the movie list on the search page
async function displaymovie(movies) {
    var outputs = '';
    //In this loop we traversing over the movies list which is passed as an argument to our function
    for (i of movies) {

        var img = '';
        if (i.Poster != 'N/A') {
            img = i.Poster;
        }
        else {
            img = 'assets/poster.jpg';
        }
        var id = i.imdbID;

        outputs += `

        <div class="fav">
            <div class="poster">
            <a href="movie.html?id=${id}"><img src=${img} alt="Favourites Poster"></a>
            </div>
            <div class="fav-details">
                <div class="favdetailsbox">
                    <div>
                        <p class="movie-name"><a href="movie.html?id=${id}">${i.Title}</a></p>
                        <p class="movie-rating"><a href="movie.html?id=${id}">${i.Year}</a></p>
                    </div>
                    <div>
                        <i class="fa-solid fa-bookmark" style="cursor:pointer;" onClick=addTofav('${id}')></i>
                    </div>
                </div>
            </div>
        </div>

       `
    }

    document.querySelector('.favcontainers').innerHTML = outputs;
}


//This FindMovies() function is use When the user is searching for the movie then a list of the related movie will be displayed and that list is fetched
async function findMovies() {
    const url = `https://www.omdbapi.com/?s=${(search.value).trim()}&page=1&apikey=${key}`
    const data = await fetch(`${url}`).then(res => res.json())

    if (data.Search) {
        //Calling the function to display list of the movies 
        displaymovie(data.Search)
    }
}

//This function are used to Favorites movies are loaded on to the favourite page 

async function myfavorites() {
    var outputs = ''

    for (i in localStorage) {
        var id = localStorage.getItem(i);
        console.log(i,id);
        if (id != null) {
            //Fetching the movie through id 
            const url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${key}`
            const res = await fetch(`${url}`);
            const data = await res.json();


            var img = ''
            if (data.Poster) {
                img = data.Poster
            }
            else { img = data.Title }
            var Id = data.imdbID;
            //Adding all the movie html in the output using interpolition
            outputs += `

        <div class="fav">
            <div class="poster">
                <a href="movie.html?id=${id}"><img src=${img} alt="Favourites Poster"></a>
            </div>
            <div class="fav-details">
                <div class="favdetailsbox">
                    <div>
                        <p class="movie-name">${data.Title}</p>
                        <p class="movie-rating">${data.Year} &middot; <span
                                style="font-size: 15px; font-weight: 600;">${data.imdbRating}</span>/10</p>
                    </div>
                    <div style="color: maroon">
                        <i class="fa-solid fa-trash" style="cursor:pointer;" onClick=removefavorites('${Id}')></i>
                    </div>
                </div>
            </div>
        </div>

       `;
        }
    }
    document.querySelector('.favcontainers').innerHTML = outputs;
}