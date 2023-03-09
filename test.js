const input = document.getElementById("input")
const title = document.getElementById("title")
const homeBtn = document.getElementById("homeBtn")
const newsContents = document.getElementById("news-contents")
let displayNews = ""

window.addEventListener("DOMContentLoaded", function(){
    filterNews();
});

input.addEventListener("change", filterNews)
homeBtn.addEventListener("click", displayHome)

function filterNews() {
  let inputValue = input.value
  // console.log(inputValue);

  //Ketika input value ada
  if(inputValue) {
  displayNews = ""
  fetch(`https://newsapi.org/v2/everything?q=${inputValue}&language=id&pageSize=24&apiKey=15a2a125b22b4c6a930c8066a67f6c4f`)
	.then(resp => resp.json())
	.then(data => {
		// console.log(data)
		data.articles.map(article => {
		return displayNews += `
				<div class="col-4 mb-2">
          			<div class="card" style="width: 100%;">
            			<img src="${article.urlToImage}" class="card-img-top" alt="News Image Thumbnail">
           					<div class="card-body">
              					<h5 class="card-title">${article.title}</h5>
              					<p class="card-text">${article.description}</p>
              					<a href="${article.url}" class="btn btn-primary">Read More...</a>
            				</div>
          			</div>
        		</div>
			`;
		}).join()
     	 // console.log(displayNews);
    	 newsContents.innerHTML = displayNews;
	})
	.catch(err => {
      return  displayNews = `
        <div class="alert alert-danger" role="alert">
            Konten tidak ditemukan
        </div>
      `
    })
    newsContents.innerHTML = displayNews;
  } 

  //Ketika input value tidak ada
  else if (inputValue.length == 0) {
    displayHome();
    
  }
}


function displayHome() {
    displayNews = ""
    fetch(`https://newsapi.org/v2/top-headlines?country=id&apiKey=15a2a125b22b4c6a930c8066a67f6c4f`)
    .then(resp => resp.json())
    .then(data => {
      // console.log(data)
      data.articles.map(article => {
      return displayNews += `
        <div class="col-4 mb-2">
                <div class="card" style="width: 100%;">
                  <img src="${article.urlToImage}" class="card-img-top" alt="News Image Thumbnail">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <a href="${article.url}" class="btn btn-primary">Read More...</a>
                    </div>
                </div>
            </div>
      `;
    }).join();
       // console.log(displayNews);
       newsContents.innerHTML = displayNews;
  })
}
