const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("more-search-btn");


const key = "d92gIMPl27ghd0PNXGdCNUh0N76AcheCkjLHNmcaecY";
let page = 1;
let keyWord = "";
async function searchEngin(){
    keyWord = searchBox.value;
    const URL = `https://api.unsplash.com/search/collections?page=${page}&query=${keyWord}&client_id=${key}&per_page=6`;

    let response = await fetch(URL);
    let data = await response.json();
    let results = data.results;

    if(page === 1){
        searchResult.innerHTML = "";
    }
    results.map((result) =>{
      
       let  photos =  result.preview_photos;
       photos.map((img) =>{
        const image = document.createElement("img");
        image.src = img.urls.small;

        let imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
    
        imageLink.appendChild(image);
        searchResult.append(imageLink);   
    });
    showMoreBtn.style.display = "block";     
});
};
searchForm.addEventListener("submit" , (e) =>{
    e.preventDefault();
    page = 1;
    searchEngin();
});
showMoreBtn.addEventListener("click" , () =>{
    page++;
    searchEngin();
})


