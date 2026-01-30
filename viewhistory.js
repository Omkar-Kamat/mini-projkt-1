const historySection = document.getElementById("history-div");

let viewHistory = JSON.parse(localStorage.getItem("viewHistory")) || [];

historySection.innerHTML = "";

if (viewHistory.length === 0) {
    historySection.innerHTML = "<p>No view history yet.</p>";
} else {
    viewHistory
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

const clearViewHistory = () => {
    localStorage.removeItem("viewHistory");
    viewHistory = [];
    historySection.innerHTML = `<p class="empty-history">No view history yet.</p>`;
};
