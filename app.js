const homeBtn = document.getElementById("homeBtn") 
const newsContents = document.getElementById("news-contents")
let displayNews = ""

/*---memunculkan berita ketika pertama kali loading---*/
window.addEventListener("DOMContentLoaded", async function(){
    try {
    	const newsDataHeadline = await getHeadlineNews();
		updateNews(newsDataHeadline)
	} catch(err) {
		let errMessage = showError(err);
		newsContents.innerHTML = errMessage;
	}
});

/*---memunculkan berita ketika user mengetik keyword pada search input---*/
const input = document.getElementById("input")
input.addEventListener("change", async function() {
	let inputValue = input.value;
	
	try {
	//jika ada input value dari user
		if(inputValue) {
			const newsData = await getNews(inputValue);
			updateNews(newsData);
		}
		//jika input dihapus sampai habis
		else if(!inputValue || inputValue.length === 0) {
			const newsDataHeadline = await getHeadlineNews();
			updateNews(newsDataHeadline)
		}
	} catch(err) {
		let errMessage = showError(err);
		newsContents.innerHTML = errMessage;
	}
})

/*---memunculkan berita ketika user mengklik icon news pada navbar---*/
homeBtn.addEventListener("click", async function() {
	try {
	const newsDataHeadline = await getHeadlineNews();
	updateNews(newsDataHeadline)
	} catch(err) {
		let errMessage = showError(err);
		newsContents.innerHTML = errMessage;
	}
});


/*---Fungsi untuk mendapatkan data (fetch) dari API---*/

//fetch berita berdasarkan input user
function getNews(keyword) {
	return fetch(`https://newsapi.org/v2/everything?q=${keyword}&language=id&pageSize=24&apiKey=15a2a125b22b4c6a930c8066a67f6c4f`)
	.then(resp => {
		if(!resp.ok) {
		  throw new Error(resp.status);
		}
		return resp.json();
	})
	.then(data => {
		if(data.totalResults === 0) {
		  throw new Error("Konten tidak ditemukan");
		}
		return data.articles;
	});
}

//fetch berita berdasarkan headline di Indonesia
function getHeadlineNews() {
    return fetch(`https://newsapi.org/v2/top-headlines?country=id&apiKey=15a2a125b22b4c6a930c8066a67f6c4f`)
    .then(resp => {
		if(!resp.ok) {
		  throw new Error(resp.status);
		}
		return resp.json();
	})
    .then(data => {
		if(data.totalResults === 0) {
		  throw new Error("Konten tidak ditemukan");
		}
		return data.articles;
	})
}

/*---Fungsi untuk mencetak data berita (yang sudah di berhasil di fetch) ke dalam html---*/
function updateNews(news) {
		displayNews = "";
		newsContents.innerHTML = news.map(article => showNews(article)).join(" ");
}

function showNews(article) {
	return displayNews =
	`<div class="col-4 mb-2">
        <div class="card" style="width: 100%;">
            <img src="${article.urlToImage}" class="card-img-top" alt="News Image Thumbnail">
           		<div class="card-body">
              		<h5 class="card-title">${article.title}</h5>
              		<p class="card-text">${article.description}</p>
              		<a href="${article.url}" class="btn btn-primary">Read More...</a>
            	</div>
         </div>
    </div>
    `
}

/*---Fungsi untuk mencetak tampilan banner error---*/
function showError(message) {
	displayNews = "";
	return displayNews = `
        <div class="alert alert-danger" role="alert">
            ${message}
        </div>
      `
}
