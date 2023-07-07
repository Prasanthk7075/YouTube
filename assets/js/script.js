var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".side-bar")
var conatiner = document.querySelector('.container')
var filter_conatiner = document.querySelector('.filter')

menuIcon.onclick = function () {
    sidebar.classList.toggle("small-menu")
    conatiner.classList.toggle("large-container")
    filter_conatiner.classList.toggle("filter-container")
}

const Card = document.querySelector(".videos-container")

const api_key = 'AIzaSyBe2feBz8u38Vpmg3yIfMAUUj8pis9P9q8'
const product_key = 'https://www.googleapis.com/youtube/v3/videos?'
const chanel_Url = ' https://www.googleapis.com/youtube/v3/channels?'



fetch(product_key + new URLSearchParams({
    key: api_key,
    part: "snippet",
    chart: "mostPopular",
    maxResults: 100,
    regionCode: "IN"
}))

    .then(res => res.json())
    .then(data => {
        data.items.forEach(item => {
            getChanelIcon(item)
        })
    })

const getChanelIcon = (video_data) => {
    fetch(chanel_Url + new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId
    }))
        .then(res => res.json()).then(
            data => {
                video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
                makeCard(video_data)
                // console.log(video_data)
            }
        )
}

const makeCard = (data) => {
    Card.innerHTML += `
           <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${ data.id }'">
                <img src="${ data.snippet.thumbnails.high.url }" class="thumbnail">
                <div class="content">
                    <img src="${ data.channelThumbnail }" class="profile">
                    <div class="info">
                        <h3 class="title">${ data.snippet.title }</h3>
                        <p class="chanel-name">${ data.snippet.channelTitle }</p>
                        <p class="chanel-name">186K views 2 mo ago</p>
                    </div>
                </div>
            </div>
`
}
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if (searchInput.value.length) {
        location.href = searchLink + searchInput.value;
    }
})