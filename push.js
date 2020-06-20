const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BLQx0r4WYESIxExuPyhh5jj8zNO2ig6i5HaNkofgMoalUYcZ2WD7GnNnw_9CZhdFFj7y5zbezbX88d7g3VT9gwE",
   "privateKey": "r7U8mi1AjgjWuxeOe2gIHe_4-Q9Lf6ZNOWO-XDrw43I"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eAUfB8zrtAY:APA91bF2D3a3S1ctCmeZ0aTjb2xHo5HljPr1HRuffWggvBVA8S-Ypvr_z7kxTQoxGBppdpcc7hVmsGevtPQADyLqRVGgSCT3YcDWJM1-qm2Sd56O8SNUuOskUwXvBQ8Nqci_vyOAQsVT",
   "keys": {
       "p256dh": "BIn4MxCtPJYqBNxhKvq7vKimo3uF4rCRJSuAdYllS9jFoCLD5MGcEs/hdV88HH9OoUcvcYO0x54IF+W9+vZdjOo=",
       "auth": "ZaOs4xE5M10i5JzBGsUc8A=="
   }
};
var payload = 'Notifikasi dari BolaKoding !!';
 
var options = {
   gcmAPIKey: '390165983721',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);