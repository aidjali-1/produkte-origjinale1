// Lista e produkteve (si në foton e dërguar)
const PRODUCTS = [
    {
        id: "kreher-classic",
        title: "Krehër Profesional",
        category: "Aksesorë",
        price: 150,
        currency: "ALL",
        description: "Krehër plastik profesional i cilësisë së lartë.",
        images: [
            "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/8cde45142a5d9f90cfb2bc1d93e39f97.jpg",
        ],
        sizes: ["SKA"],
        colors: ["Zi", "Roze", "Lejla", "Blu"]
    },
    {
        id: "xhins-ripped",
        title: "Xhinse Moderne",
        category: "Rroba",
        price: 2400,
        currency: "ALL",
        description: "Xhinse të rehatshme me dizajn modern dhe material cilësor.",
        images: [
            "https://via.placeholder.com/300x400?text=Xhinse",
        ],
        sizes: ["S","M","L","XL"],
        colors: ["Zi", "Blu"]
    },
    {
        id: "bluze-sport",
        title: "Bluzë Sport",
        category: "Veshje",
        price: 1200,
        currency: "ALL",
        description: "Bluzë sportive për aktivitete fizike dhe veshje të përditshme.",
        images: [
            "https://via.placeholder.com/300x400?text=Bluzë",
        ],
        sizes: ["S","M","L","XL"],
        colors: ["E Bardhë", "E Zezë", "Blu"]
    }
];

// Ruajtja e shportës në localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render produktet
function renderProducts(filter = "") {
    const list = document.getElementById("product-list");
    list.innerHTML = "";
    PRODUCTS.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()))
        .forEach(p => {
            const div = document.createElement("div");
            div.className = "product";
            div.innerHTML = `
                <img src="${p.images[0]}" alt="${p.title}">
                <h4>${p.title}</h4>
                <p>${p.price} ${p.currency}</p>
                <a href="#" class="btn" onclick="showProduct('${p.id}')">Shiko</a>
            `;
            list.appendChild(div);
        });
}

// Shfaq modal-in e produktit
function showProduct(id) {
    const p = PRODUCTS.find(x => x.id === id);
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
        <h2>${p.title}</h2>
        <p><b>ID:</b> ${p.id}</p>
        <p><b>Kategoria:</b> ${p.category}</p>
        <p>${p.description}</p>
        <p><b>Çmimi:</b> ${p.price} ${p.currency}</p>
        <p><b>Madhësitë:</b> ${p.sizes.join(", ")}</p>
        <p><b>Ngjyrat:</b> ${p.colors.join(", ")}</p>
        <button class="btn" onclick="addToCart('${p.id}')">Shto në shportë</button>
    `;

    document.getElementById("product-modal").style.display = "flex";
}

// Mbyll modal-in e produktit
function closeModal() {
    document.getElementById("product-modal").style.display = "none";
}

// Shto në shportë
function addToCart(id) {
    const prod = PRODUCTS.find(p => p.id === id);
    cart.push(prod);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    closeModal();
}

// Përditëso numrin e shportës
function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}

// Hap shportën
function openCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Shporta është bosh.</p>";
    } else {
        cart.forEach(p => {
            cartItems.innerHTML += `<p>${p.title} - ${p.price} ${p.currency}</p>`;
            total += p.price;
        });
    }

    document.getElementById("total-price").innerText = "Totali: " + total + " ALL";
    document.getElementById("cart-modal").style.display = "flex";
}

// Mbyll shportën
function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

// Hap formularin e porosisë
function showOrderForm() {
    document.getElementById("cart-modal").style.display = "none";
    document.getElementById("order-modal").style.display = "flex";
}

// Mbyll formularin e porosisë
function closeOrderForm() {
    document.getElementById("order-modal").style.display = "none";
}

// Porosia
document.getElementById("order-form").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Porosia u dërgua me sukses!");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    closeOrderForm();
});

// Kërkimi
document.getElementById("search").addEventListener("input", function() {
    renderProducts(this.value);
});

// Inicializimi
updateCartCount();
renderProducts();
