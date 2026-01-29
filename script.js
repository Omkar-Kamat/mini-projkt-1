let productSection = document.getElementById("product-section");

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(({ products }) => {
    products.forEach(item => {
      const product = document.createElement("div");
      product.classList.add("product");

      product.innerHTML = `
        <img src="${item.thumbnail}" class="product-img" alt="${item.title}" />
        <h3 class="product-title">${item.title}</h3>
        <p class="product-price">Price: $${item.price}</p>
      `;

      productSection.appendChild(product);
    });
  })
  .catch(console.error);
