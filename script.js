function createcard(title, channel, views, date_uploaded) {
    const cointainer = document.body.querySelector(".cointainer");
    let view_str;
    if (views<1000){
        view_str = views;
    }
    else if (views<1000000){
        view_str = views/1000 + "K";
    }
    else{
        view_str = views/1000000 + "M";
    }
    let html =
        `<div class="card">
            <div class="image">
                <img src="https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACwWOixJVrKLFindK92kYMgTcQbw" alt="">
            </div>
            <div class="text">
                <h2>${title}</h2>
                <p>${channel} . ${view_str} views . ${date_uploaded}</p>
            </div>
        </div>`
        cointainer.innerHTML += html;
}

