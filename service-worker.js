self.addEventListener("install", function (event) {
    console.log("Service Worker installing.");
    event.waitUntil(
        caches.open("p1_v1")
            .then(function (cache) {
                return cache.addAll(
                    [
                        "listing.html",
                        "details.html",
                        "map.html",
                        "definitions.js",
                        "helper_fn.js",
                        "jquery-3.7.0.min.js",
                        "manifest.webmanifest",
                        "service-worker.js",
                        "https://maps.googleapis.com/maps/api/js",
                        "Images/icon-192x192.png",
                        "Images/icon-256x256.png",
                        "Images/icon-384x384.png",
                        "Images/icon-512x512.png"
                    ]
                );
            })
            .then(self.skipWaiting())
    );

});

self.addEventListener("activate", function (event) {
    console.log("Service Worker activating.");
    event.waitUntil(
        caches.keys()
            .then(function (keys) {
                return Promise.all(
                    keys.filter(function (key) {
                        return !key.startsWith("p1_v1");
                    })
                        .map(function (key) {
                            return caches.delete(key);
                        })
                );
            })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );

});

self.addEventListener('push', function (event) {
    var notificationText = "You Got New Message!";
    if (event.data) {
        notificationText = event.data.text();
    }

    const title = 'Travel APP';
    const options = {
        body: notificationText,
        icon: 'Images/icon-192x192.png',
        badge: 'Images/icon-192x192.png'
    };
    send_message_to_all_clients(notificationText);
    event.waitUntil(self.registration.showNotification(title, options));
});


/* Clear popup notification on click */
self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow("http://127.0.0.1:5500/listing.html")
    );
});


function send_message_to_client(client, msg) {
    return new Promise(function (resolve, reject) {
        var msg_chan = new MessageChannel(); msg_chan.port1.onmessage = function (event) {
            if (event.data.error) {
                reject(event.data.error);
            } else {
                resolve(event.data);
            }
        };

        client.postMessage(msg, [msg_chan.port2]);
    });
}

function send_message_to_all_clients(msg) {
    clients.matchAll()
    .then(clients => {
        clients.forEach(client => {
            send_message_to_client(client, msg)
            .then(m => console.log("[Service Worker] From Client:" + msg)
            );
        });
    });
}
