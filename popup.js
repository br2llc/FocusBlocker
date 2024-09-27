
document.getElementById("blockBtn").addEventListener("click", () => {
    const url = document.getElementById("blockUrl").value.trim();
    if (url) {
        chrome.storage.sync.get(["blockedSites"], (data) => {
            let blockedSites = data.blockedSites || [];
            if (!blockedSites.includes(url)) {
                blockedSites.push(url);
                chrome.storage.sync.set({ "blockedSites": blockedSites }, () => {
                    displayBlockedSites();
                    document.getElementById("blockUrl").value = "";
                });
            }
        });
    }
});

document.getElementById("clearAll").addEventListener("click", () => {
    chrome.storage.sync.set({ "blockedSites": [] }, () => {
        displayBlockedSites();
    });
});

function displayBlockedSites() {
    chrome.storage.sync.get(["blockedSites"], (data) => {
        const blockedSites = data.blockedSites || [];
        const blockedList = document.getElementById("blockedList");
        blockedList.innerHTML = "";
        blockedSites.forEach((site) => {
            const listItem = document.createElement("li");
            listItem.textContent = site;
            blockedList.appendChild(listItem);
        });
    });
}

displayBlockedSites();
    