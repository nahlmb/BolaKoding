var baseUrl = 'https://api.football-data.org/v2'
var apiToken = 'bb3129464d36472385c90c749659169d'
var body = document.getElementById('body-content')

const clearPage = () => {
    body.innerHTML = ''
}

const openKlasmen = async () => {
    try {
        const get = await fetch('pages/klasmen.html')
        const html = await get.text()
        body = document.getElementById('body-content')
        body.innerHTML = html
        getKlasmenData()
    } catch (e) {
        console.log(e.message);
    }
}

const openJadwal = async () => {
    try {
        const get = await fetch('./pages/jadwal.html')
        const html = await get.text()
        body = document.getElementById('body-content')
        body.innerHTML = html
        getJadwalData()
    } catch (e) {
        console.log(e.message);
    }
}

const openFavorite = async () => {
    try {
        const get = await fetch('./pages/favorit.html')
        const html = await get.text()
        body = document.getElementById('body-content')
        body.innerHTML = html
        getFavoritedClubs()
    } catch (e) {
        console.log(e.message);
    }
}

const getKlasmenData = async () => {
    try {
        if ("caches" in window) {
            chaceData = await caches.match(`${baseUrl}/competitions/2021/standings?standingType=HOME`)
            if (chaceData) {
                const chaceJson = await chaceData.json()
                showKlasmenData(chaceJson)
            }
        }
        const get = await fetch(`${baseUrl}/competitions/2021/standings?standingType=HOME`, {
            headers: {
                'X-Auth-Token': apiToken
            }
        })
        const fetchJson = await get.json()
        showKlasmenData(fetchJson)

    } catch (e) {
        console.log(e.message)
    }
}

const showKlasmenData = async (json) => {
    const container = document.querySelector(".collection")
    container.style.visibility = 'hidden'

    const response = JSON.parse(JSON.stringify(json))
    const table = response.standings[0].table

    table.forEach(club => {
        const item = `
            <li class="collection-item avatar">
                <img src="${club.team.crestUrl}" alt="" class="circle">
                <span class="title">${club.team.name}</span>
                <p>Ranking: ${club.position} <br>
                    Point: ${club.points}
                </p>
                <a href="./club.html?id=${club.team.id}" class="secondary-content"><i class="material-icons bk-blue">read_more</i></a>
            </li>
            `
        document.querySelector(".progress").style.visibility = 'hidden'
        container.style.visibility = 'visible'
        container.innerHTML += item
    });
}

const getJadwalData = async () => {
    try {
        if ("caches" in window) {
            chaceData = await caches.match(`${baseUrl}/competitions/2021/matches?&limit=24`)
            if (chaceData) {
                const chaceJson = await chaceData.json()
                showJadwalData(chaceJson)
            }
        }
        const get = await fetch(`${baseUrl}/competitions/2021/matches?&limit=24`, {
            headers: {
                'X-Auth-Token': apiToken
            }
        })
        const fetchJson = await get.json()
        showJadwalData(fetchJson)
    } catch (e) {
        console.log(e.message);
    }
}

const showJadwalData = (json) => {
    const container = document.querySelector(".collection")
    container.style.visibility = 'hidden'

    const response = JSON.parse(JSON.stringify(json))
    const matches = response.matches

    matches.forEach(match => {
        const homeTeam = match.homeTeam.name
        const awayTeam = match.awayTeam.name
        const date = new Date(match.utcDate).toLocaleDateString()

        const html = `
        <a href="#!" class="collection-item">
            <p class="title">${homeTeam} vs ${awayTeam}</p>
            <p class="sub-title">${date}</p>
        </a>
        `

        document.querySelector(".progress").style.visibility = 'hidden'
        container.style.visibility = 'visible'
        container.innerHTML += html
    })
}

const fetchDetailClub = async (id) => {
    try {
        if ("caches" in window) {
            chaceData = await caches.match(`${baseUrl}/teams/${id}/`)
            if (chaceData) {
                const chaceJson = await chaceData.json()
                const chaceClub = JSON.parse(JSON.stringify(chaceJson))
                return chaceClub
            }
        }
        const get = await fetch(`${baseUrl}/teams/${id}/`, {
            headers: {
                'X-Auth-Token': apiToken
            }
        })
        const json = await get.json()
        const club = JSON.parse(JSON.stringify(json))
        return club
    } catch (e) {
        return undefined
    }
}

const showDetailClub = (club) => {
    const container = document.querySelector("#body-content")
    container.style.visibility = 'hidden'

    const html = `
    <div class="club-detail">
        <img src="${club.crestUrl}" alt="" class="circle">
        <p><strong>${club.name}</strong>
        <br>
        ${club.website}
        <br>
        <br>
        Venue: ${club.venue}
        <br>
        Address: ${club.address}
        <br>
        Phone: ${club.phone}
        <br>
        Founded: ${club.founded}
        </p>
    </div>
    `

    container.style.visibility = 'visible'
    container.innerHTML = html
}

const getFavoritedClubs = async () => {
    const container = document.querySelector(".fav-container")
    try {
        const clubs = await getAllFavClub()
        clubs.forEach(club => {
            const html = `
            <a class="favorite-card" href="/club.html?id=${club.id}">
            <div class="card horizontal">
                <div class="card-image">
                    <img src="${club.crestUrl}">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <p><strong>${club.name}</strong>
                            <br>
                            ${club.venue}
                        </p>
                    </div>
                </div>
            </div>
            </a>
            `
            container.innerHTML += html
        })
    } catch (e) {
        console.log(e.message);
    }
}