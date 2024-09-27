
document.getElementById("saveProfile").addEventListener("click", () => {
    const profile = document.getElementById("profile").value;
    chrome.storage.sync.set({ "activeProfile": profile }, () => {
        alert("Profile saved!");
    });
});

chrome.storage.sync.get(["activeProfile"], (data) => {
    document.getElementById("profile").value = data.activeProfile || "default";
});
    