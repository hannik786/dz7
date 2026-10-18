const products = [
    {
        id: 1,
        name: "Laptop",
        price: 1200
    },
    {
        id: 2,
        name: "Phone",
        price: 800
    },
    {
        id: 3,
        name: "Headphones",
        price: 200
    }
];
let cart = [];
const productsContainer = document.querySelector("#products");
const searchInput = document.querySelector("#search");
const cartList = document.querySelector("#cart-list");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const emptyCartButton = document.querySelector("#empty-cart");
const darkModeButton = document.querySelector("#dark-mode");
const noProductsMessage = document.querySelector("#no-products");
function renderProducts(items) {
    productsContainer.replaceChildren();
    noProductsMessage.hidden = items.length !== 0;
    items.forEach(function (product) {
        const card = document.createElement("div");
        card.className = "product";
        const name = document.createElement("h3");
        name.textContent = product.name;
        const price = document.createElement("p");
        price.textContent = `Ціна: ${product.price} $`;
        const button = document.createElement("button");
        button.textContent = "Add to cart";
        button.dataset.productId = product.id;
        card.append(name, price, button);
        productsContainer.appendChild(card);
    });
}
productsContainer.addEventListener("click", function (event) {
    if (!event.target.matches("button[data-product-id]")) {
        return;
    }
    const productId = Number(event.target.dataset.productId);
    const product = products.find(function (item) {
        return item.id === productId;
    });
    if (product) {
        cart.push(product);
        renderCart();
    }
});
function renderCart() {
    cartList.replaceChildren();
    cart.forEach(function (product, index) {
        const li = document.createElement("li");
        const text = document.createElement("span");
        text.textContent = `${product.name} — ${product.price} $ `;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Видалити";
        removeButton.className = "remove-button";
        removeButton.dataset.cartIndex = index;
        li.append(text, removeButton);
        cartList.appendChild(li);
    });
    cartCount.textContent = cart.length;
    const total = cart.reduce(function (sum, product) {
        return sum + product.price;
    }, 0);
    cartTotal.textContent = total;
}
cartList.addEventListener("click", function (event) {
    if (!event.target.matches("button[data-cart-index]")) {
        return;
    }
    const index = Number(event.target.dataset.cartIndex);
    cart.splice(index, 1);
    renderCart();
});
emptyCartButton.addEventListener("click", function () {
    cart = [];
    renderCart();
});
searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.trim().toLowerCase();
    const filteredProducts = products.filter(function (product) {
        return product.name.toLowerCase().includes(searchText);
    });
    renderProducts(filteredProducts);
});
darkModeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    darkModeButton.textContent = isDark
        ? "☀️ Light mode"
        : "🌙 Dark mode";
});
renderProducts(products);
renderCart();