//var
const authCode = "563492ad6f91700001000001c774e08575654d5aacda35e3f9718897";
const gallery = document.querySelector(".gallery");
const searchInp = document.querySelector(".search-inp");
const form = document.querySelector("form");
const moreBtn = document.querySelector(".more-btn");
let searchValue;
let page = 1;
let fetchLink;
let searchInput;

//even listerner
searchInp.addEventListener("input", updateSearch);
moreBtn.addEventListener("click", loadMore);
form.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput = searchValue;
  searchForPhotos(searchValue);
});

//updating search for searched api function
function updateSearch(e) {
  searchValue = e.target.value;
}

//api fetch 
async function fetchApi(link) {
  let curatedData = await fetch(link, {
    method: "GET",
    headers: {
      authorization: authCode,
      accept: "application/json",
    },
  });
  const data = await curatedData.json();
  return data;
}

//image generate with html
function generatePhoto(data) {
  data.photos.forEach((photo) => {
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("fetch-img");
    imgDiv.innerHTML = `
    <a href=${photo.src.original} target="_blank">
      <img src="${photo.src.large}" class="fetch-img" alt="${photo.alt}"></img>
    </a>
    <div class="info">
      <a href="${photo.photographer_url}" target="_blank">
        <p>${photo.photographer}</p>
      </a>
      <a href=${photo.src.original} target="_blank">
        <i class="fa-solid fa-download"></i>
      </a>
    </div> 
    `;
    gallery.appendChild(imgDiv);
  });
}

//clearing input once searched
function clearSearch() {
  gallery.innerHTML = "";
  searchInp.value = "";
}

// api fetched for random image for homepage
async function curatedPhoto() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  let data = await fetchApi(fetchLink);
  generatePhoto(data);
}

// api fetched for searched image
async function searchForPhotos(search) {
  clearSearch();
  fetchLink = `https://api.pexels.com/v1/search?query=${search}&per_page=15&page=1`;
  let data = await fetchApi(fetchLink);
  generatePhoto(data);
}

//extra images
async function loadMore() {
  page++;
  if (searchValue) {
    `https://api.pexels.com/v1/search?query=${searchValue}&per_page=15&page=${page}`;
  } else {
    `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  let data = await fetchApi(fetchLink);
  generatePhoto(data);
}

//calling cruated function from starting homepage images
curatedPhoto();
