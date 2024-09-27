
let blockedSites = [];
let activeProfile = 'default';
chrome.storage.sync.get(['blockedSites', 'activeProfile'], (data) => {
  blockedSites = data.blockedSites || [];
  activeProfile = data.activeProfile || 'default';
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    const url = new URL(tab.url);
    if (blockedSites.includes(url.hostname)) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: blockSite
      });
    }
  }
});

function blockSite() {
  document.body.innerHTML = "<h1>Site Blocked</h1><p>Focus on your productivity!</p>";
}
    