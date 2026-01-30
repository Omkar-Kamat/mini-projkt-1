const params = new URLSearchParams(window.location.search);
const query = params.get("id");
const productDetail = document.getElementById("product-detail")

console.log(query)
fetch(`https://dummyjson.com/products/${query}`)
.then(response => response.json())
.then((product)=>{
    console.log(product);
})

