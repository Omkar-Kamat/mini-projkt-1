const productSection = document.getElementById("product-section");
const form = document.getElementById("search-form");
const searchbar = document.getElementById("search-bar");


fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(({ products }) => {
    productSection.innerHTML = "";

    products.forEach(item => {
      const product = document.createElement("div");
      product.className = "product";

      product.innerHTML = `
        <img src="${item.thumbnail}" class="product-img" alt="${item.title}">
        <h3 class="product-title">${item.title}</h3>
        <p class="product-price">Price: $${item.price}</p>
      `;

      productSection.appendChild(product);
      product.addEventListener("click",()=>{
        window.location.href = `product.html?id=${item.id}`
      })
    });
  })
  .catch(err => console.error("Fetch failed:", err));

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = searchbar.value.trim();
  if (!query) return;
  
  console.log("Query: ",query)
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  console.log("History: ",history)

  let exists = history.some(item => item.query.toLowerCase() === query.toLowerCase())

  if(!exists){
    history.unshift({
      query: query,
      time: Date.now()
    });
  }
  localStorage.setItem("searchHistory",JSON.stringify(history));

  window.location.href = `search.html?search=${encodeURIComponent(query)}`;
});

const suggestionBox = document.getElementById("suggestion-box");
searchbar.addEventListener("input", () => {
  suggestionBox.style.display = "block"
  const text = searchbar.value.trim().toLowerCase();
  suggestionBox.innerHTML = "";
  
  if (!text) {
    suggestionBox.style.display = "none"
    return;
  }
  
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  const matches = history.filter(item =>
    item.query.toLowerCase().includes(text)
  );
  
  matches.forEach(item => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.innerText = item.query;

    div.addEventListener("click", () => {
      searchbar.value = item.query;
      suggestionBox.innerHTML = "";
    });

    suggestionBox.appendChild(div);
  });
});

function goToHistory(){
  window.location.href = 'history.html'
} 