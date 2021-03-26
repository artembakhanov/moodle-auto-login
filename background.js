/* global chrome */

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    chrome.storage.sync.get({auto_clicks: true}, function(items) {

        if (items.auto_clicks && changeInfo.status === "complete")
        {
            if (tab.url.startsWith("https://moodl.innopolis.university/admin/oauth2callback.php") || tab.url.startsWith("https://moodle.innopolis.university/auth/oauth2/login.php")) {
                chrome.tabs.executeScript(tabId, {code: `document.querySelector("button[type=submit].btn").click()`, runAt: "document_end"});
            }
            else if (tab.url.startsWith("https://moodle.innopolis.university/login/index.php")) {
                chrome.tabs.executeScript(tabId, {code: `document.querySelector("a[title='Innopolis University']").click()`, runAt: "document_end"});
            } else if (tab.url.startsWith("https://moodle.innopolis.university") ) {
                chrome.tabs.executeScript(tabId, {code: `document.querySelector("span.login > a").click();`, runAt: "document_end"});
            } else if (tab.url.startsWith("https://sso.university.innopolis.ru")) {
                chrome.tabs.executeScript(tabId, {file: "ssologin.js", runAt: "document_end"});
            }
        }

    });
    
});

chrome.cookies.onChanged.addListener(function (changeInfo) {
    chrome.storage.sync.get({cookie: true}, function(items) {
        if (items.cookie && !changeInfo.removed) {
            var fullCookie = changeInfo.cookie
            console.log(fullCookie)
            if (fullCookie.expirationDate !== 1895665688 && ["sso.university.innopolis.ru", "moodle.innopolis.university"].indexOf(fullCookie.domain) >= 0) {
                var newCookie = {};

                //If no real url is available use: "https://" : "http://" + domain + path
                newCookie.url = "http" + ((fullCookie.secure) ? "s" : "") + "://" + fullCookie.domain + fullCookie.path;
                newCookie.name = fullCookie.name;
                newCookie.value = fullCookie.value;
                if (!fullCookie.hostOnly)
                    newCookie.domain = fullCookie.domain;
                newCookie.path = fullCookie.path;
                newCookie.secure = fullCookie.secure;
                newCookie.httpOnly = fullCookie.httpOnly;
                newCookie.expirationDate = 1895665688;
                newCookie.storeId = fullCookie.storeId;

                chrome.cookies.remove({"name": newCookie.name, "url": newCookie.url}, function(){});
                chrome.cookies.set(newCookie, function(cookie) {});
            }
        }
    });
});