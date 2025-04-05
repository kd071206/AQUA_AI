const products = [
    {
      id: "camera1",
      name: "Camera 1",
      image: "images/camera1.jpg",
      price: 75000,
      description: "Smart underwater monitoring camera"
    },
    {
      id: "camera2",
      name: "Camera 2",
      image: "images/camera2.jpg",
      price: 80000,
      description: "High-resolution fish tracker"
    },
    {
      id: "camera3",
      name: "Camera 3",
      image: "images/camera3.jpg",
      price: 82000,
      description: "Night vision aquatic camera"
    },
    {
      id: "camera4",
      name: "Camera 4",
      image: "images/camera4.jpg",
      price: 79000,
      description: "Thermal vision AI camera"
    },
    {
      id: "camera5",
      name: "Camera 5",
      image: "images/camera5.jpg",
      price: 87000,
      description: "Wide-angle fish behavior monitor"
    },
    {
      id: "camera6",
      name: "Camera 6",
      image: "images/camera6.jpg",
      price: 89000,
      description: "Dual-lens AI camera system"
    },
    {
      id: "drone1",
      name: "Drone 1",
      image: "images/drone1.jpg",
      price: 90000,
      description: "Aerial mapping for aquafarms"
    },
    {
      id: "drone2",
      name: "Drone 2",
      image: "images/drone2.jpg",
      price: 95000,
      description: "Thermal scanning drone"
    },
    {
      id: "drone3",
      name: "Drone 3",
      image: "images/drone3.jpg",
      price: 97000,
      description: "Drone for automated pond analysis"
    },
    {
      id: "drone4",
      name: "Drone 4",
      image: "images/drone4.jpg",
      price: 99000,
      description: "High-resolution imaging drone"
    },
    {
      id: "drone5",
      name: "Drone 5",
      image: "images/drone5.jpg",
      price: 100000,
      description: "Advanced surveillance drone"
    },
    {
      id: "purifier1",
      name: "Water Purifier 1",
      image: "images/purifier1.jpg",
      price: 50000,
      description: "AI-enhanced water purification"
    },
    {
      id: "purifier2",
      name: "Water Purifier 2",
      image: "images/purifier2.jpg",
      price: 52000,
      description: "UV and AI-based filtering"
    },
    {
      id: "purifier3",
      name: "Water Purifier 3",
      image: "images/purifier3.jpg",
      price: 54000,
      description: "Multi-stage AI filtration"
    },
    {
      id: "feeder1",
      name: "AI Feeder 1",
      image: "images/feeder1.jpg",
      price: 55000,
      description: "Smart feeding system"
    },
    {
      id: "feeder2",
      name: "AI Feeder 2",
      image: "images/feeder2.jpg",
      price: 57000,
      description: "Automated pellet distributor"
    },
    {
      id: "feeder3",
      name: "AI Feeder 3",
      image: "images/feeder3.jpg",
      price: 60000,
      description: "Schedule-based feeder with sensors"
    }
  ];
  
  // Product Detail Loader
  function loadProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const product = products.find(p => p.id === productId);
  
    if (product && document.getElementById("product-detail")) {
      const detailContainer = document.getElementById("product-detail");
      detailContainer.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p><strong>Price:</strong> ₹${product.price.toLocaleString()}</p>
        <button onclick="addToCart('${product.id}')">Add to Cart</button>
        <p id="added-msg" style="color: green; margin-top: 10px;"></p>
      `;
    }
  }
  
  // Cart Functions
  function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    const msg = document.getElementById("added-msg");
    if (msg) msg.textContent = "Product added to cart!";
  }
  
  function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    if (!cartItemsContainer) return;
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
  
    let html = "";
    let total = 0;
  
    cart.forEach((id, index) => {
      const item = products.find(p => p.id === id);
      if (item) {
        total += item.price;
        html += `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" />
            <div class="info">
              <h4>${item.name}</h4>
              <p>₹${item.price.toLocaleString()}</p>
            </div>
            <button onclick="removeFromCart(${index})">Remove</button>
          </div>
        `;
      }
    });
  
    html += `<p id="total-amount">Total: ₹${total.toLocaleString()}</p>`;
    html += `<button id="checkout-button" onclick="location.href='checkout.html'">Proceed to Checkout</button>`;
    cartItemsContainer.innerHTML = html;
  }
  
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
  
  function renderCheckout() {
    const checkoutContainer = document.getElementById("checkout-items");
    if (!checkoutContainer) return;
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    let html = "";
  
    cart.forEach(id => {
      const item = products.find(p => p.id === id);
      if (item) {
        total += item.price;
        html += `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" />
            <div class="info">
              <h4>${item.name}</h4>
              <p>₹${item.price.toLocaleString()}</p>
            </div>
          </div>
        `;
      }
    });
  
    html += `<p id="total-amount">Total: ₹${total.toLocaleString()}</p>`;
    checkoutContainer.innerHTML = html;
  }
  
  // Load correct content based on page
  window.addEventListener("DOMContentLoaded", () => {
    loadProductDetail();
    renderCart();
    renderCheckout();
  });
  