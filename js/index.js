const form = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");

let search = "";
let movie = [];

// Va chercher le lien avec FETCH puis renvoi nous le resultat RES
// puis converti le en json avec RES.JSON()
const fetchMovies = async () => {
	movies = await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${search}`
	).then((res) => res.json());
	console.log(movies);
};

const moviesDisplay = async () => {
	// Execute la fonction fetchMovies après récupération de l'input user
	await fetchMovies();
	//movies.results.length = 12;

	result.innerHTML = movies.results
		//		.slice(0, 12)
		.map(
			(movie) =>
				`
      <li>
        <h2>${movie.original_title}</h2>
        <div class="card-content">
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"></img>
          <div class="infos">
            <p>${movie.overview}</p>
            <p>Popularité : ${movie.popularity} ⭐ </p>
          </div>
        </div>
      </li>
      `
		)
		.join(""); // supprime la virgule
};

// e.preventDefault() permet de desactiver le comportement par défaut
// -> ici evite le rechargement de la page
form.addEventListener("submit", (e) => {
	e.preventDefault();
	search = searchInput.value;
	moviesDisplay();
});
