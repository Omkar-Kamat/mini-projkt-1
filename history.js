const historySection = document.getElementById("history-div");

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

historySection.innerHTML = "";

if (searchHistory.length === 0) {
    historySection.innerHTML = "<p>No search history yet.</p>";
} else {
    searchHistory
        .sort((a, b) => b.time - a.time)
        .forEach(item => {
            const div = document.createElement("div");
            div.className = "history-item";
            div.onclick = () =>{
                window.location.href = `search.html?search=${encodeURIComponent(item.query)}`
            }
            const date = new Date(item.time);

            div.innerHTML = `
                <div>${item.query}</div>
                <div>${date.toLocaleString()}</div>
            `;

            historySection.appendChild(div);
        });
}

const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    searchHistory = [];
    historySection.innerHTML = `<p class="empty-history">No search history yet.</p>`;
};
