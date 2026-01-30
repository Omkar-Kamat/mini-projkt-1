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
    });
  })
  .catch(err => console.error("Fetch failed:", err));

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = searchbar.value.trim();
  if (!query) return;

  window.location.href = `search.html?search=${encodeURIComponent(query)}`;
});

