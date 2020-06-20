const dbPromised = idb.open("bolakoding", 1, upgradeDb => {
    const clubsObjectStore = upgradeDb.createObjectStore("clubs", {
        keyPath: "id"
    });
});

const saveClubToFav = async (club) => {
    try {
        dbPromised
            .then(async (db) => {
                clubData = await club
                var transaction = db.transaction("clubs", "readwrite");
                var store = transaction.objectStore("clubs");
                store.add(clubData);
                return transaction.complete;
            })
            .then(() => {
                M.toast({ html: 'Club di favoritkan!' })
                setTimeout(() => {
                    location.reload();
                }, 1500);
            });
    } catch (e) {
        console.log(e.message);
    }
}

const deleteFavClub = async (id) => {
    dbPromised
        .then(db => {
            var tx = db.transaction("clubs", "readwrite");
            var store = tx.objectStore("clubs");
            store.delete(id);
            return tx.complete
        })
        .then(() => {
            M.toast({ html: 'Club di hapus dari favorit' })
            setTimeout(() => {
                location.reload();
            }, 1500);
        });
}

const getAllFavClub = () => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then(db => {
                var tx = db.transaction("clubs", "readonly");
                var store = tx.objectStore("clubs");
                return store.getAll();
            })
            .then(clubs => {
                resolve(clubs);
            });
    });
}

const getFavClubById = (id) => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then(db => {
                var tx = db.transaction("clubs", "readonly");
                var store = tx.objectStore("clubs");
                return store.get(id);
            })
            .then(club => {
                resolve(club);
            });
    });
}
