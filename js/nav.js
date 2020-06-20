
document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('.sidenav')
    M.Sidenav.init(element)
    getInput()
    loadnav()
})

const getInput = () => {
    page = window.location.hash.substr(1)
    console.log(page);
    if(page.length > 1){
        loadpage(page)
    }else {
        loadpage('klasmen')
    }
}

const loadnav = () => {
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status != 200) return;
            document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
                elm.innerHTML = xhttp.responseText;
            });

            document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
                elm.addEventListener("click", (event) => {
                    // Tutup sidenav
                    var sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();
                    page = event.target.getAttribute("href").substr(1);
                    return loadpage(page);
                });
            });
        }
    }
    xhttp.open("GET", "/nav.html", true);
    xhttp.send();
}

const loadpage = (page) => {
    clearPage()
    const body = document.getElementById('body-content')
    if (page === 'klasmen') {
        openKlasmen()
    } else if (page === 'jadwal') {
        openJadwal()
    } else if (page === 'favorite') {
        openFavorite()
    } else {
        body.innerHTML = "<div class='error-message'><h3>Error 404</h3><p>Halaman tidak ditemukan</p></div>"
    }
}