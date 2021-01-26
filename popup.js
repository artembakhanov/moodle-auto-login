/* global chrome */
window.onload = function () {

    document.getElementById("auto_clicks").addEventListener('change', function () {
        chrome.storage.sync.set({         
            auto_clicks: document.getElementById("auto_clicks").checked
        }, null);
    });

    document.getElementById("cookie").addEventListener('change', function () {
        chrome.storage.sync.set({         
            cookie: document.getElementById("cookie").checked
        }, null);
    });

    chrome.storage.sync.get({
        auto_clicks: true
    }, function (items) {
        document.getElementById('auto_clicks').checked = items.auto_clicks;
    });


    chrome.storage.sync.get({
        cookie: true
    }, function (items) {
        document.getElementById('cookie').checked = items.cookie;
    });
};