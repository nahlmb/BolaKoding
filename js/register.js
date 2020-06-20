const register = () => {    
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker
                .register("./service_worker.js")
                .then(function () {
                    console.log("ServiceWorker registered!");
                })
                .catch(function () {
                    console.log("Fail to register ServiceWorker");
                });
        });
        reqNotifPremission()
    } else {
        console.log("ServiceWorker not supported in this browser");
    }
}

const reqNotifPremission = () => {
    if ('Notification' in window) {
        Notification.requestPermission()
            .then(result => {
                if (result === "denied" || result === "default") {
                    return;
                }
                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration()
                        .then(registration => {
                            registration.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: urlBase64ToUint8Array("BLQx0r4WYESIxExuPyhh5jj8zNO2ig6i5HaNkofgMoalUYcZ2WD7GnNnw_9CZhdFFj7y5zbezbX88d7g3VT9gwE")
                            }).then(function (subscribe) {
                                console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                                    null, new Uint8Array(subscribe.getKey('auth')))));
                            }).catch(function (e) {
                                console.error('Tidak dapat melakukan subscribe ', e.message);
                            });
                        });
                }
            });
    }
}

const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

register()