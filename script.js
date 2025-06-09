const products = [
    { id: 1, name: "Wireless Noise-Cancelling Headphones", price: 7999.99, image: "https://m.media-amazon.com/images/I/41lArSiD5hL.jpg", rating: 4.5, category: "electronics", description: "High-quality over-ear headphones with noise cancellation, certified for Microsoft Teams and Zoom, featuring a 20-hour battery life.", availability: "In Stock", spec: "Bluetooth 5.0, 40mm drivers" },
    { id: 2, name: "Smart Watch with Fitness Tracker", price: 5999.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", rating: 4.2, category: "electronics", description: "Track your fitness with heart rate monitoring and sleep analysis, compatible with iOS and Android.", availability: "In Stock", spec: "1.3-inch AMOLED, 5ATM water resistance" },
    { id: 3, name: "Portable Bluetooth Speaker", price: 1999.99, image: "https://cdn.moglix.com/p/BWYTyuYBqacng-xxlarge.jpg", rating: 4.7, category: "electronics", description: "Compact speaker with rich sound and 12-hour battery life, perfect for outdoor use.", availability: "In Stock", spec: "10W output, IPX7 waterproof" },
    { id: 4, name: "Waterproof Laptop Backpack", price: 1499.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62", rating: 4.3, category: "home", description: "Durable backpack with 15.6-inch laptop compartment and rain cover.", availability: "In Stock", spec: "20L capacity, water-resistant fabric" },
    { id: 5, name: "4K Ultra HD Smart TV 55-inch", price: 44999.99, image: "https://5.imimg.com/data5/SELLER/Default/2023/10/353175195/HN/EP/LY/32671122/samsung-55-inches-crystal-ismart-4k-ultra-hd-smart-led-tv.jpg", rating: 4.6, category: "electronics", description: "Enjoy stunning 4K visuals with smart features and built-in apps.", availability: "Out of Stock", spec: "3840x2160 resolution, HDR10" },
    { id: 6, name: "Wireless Gaming Mouse", price: 1299.99, image: "https://rukminim2.flixcart.com/image/850/1000/ky1vl3k0/mouse/m/q/m/2-4ghz-rechargeable-wireless-gaming-mouse-x8-professional-gaming-original-imagad723mv9vxyz.jpeg?q=90&crop=false", rating: 4.4, category: "electronics", description: "Ergonomic mouse with customizable RGB lighting and high precision.", availability: "In Stock", spec: "16000 DPI, 6 buttons" },
    { id: 7, name: "Stainless Steel Kitchen Knife Set", price: 999.99, image: "https://rukminim3.flixcart.com/image/850/1000/l47cu4w0/kitchen-knife/t/1/m/2-kitchen-knife-set-professional-kitchen-knife-chef-set-set-of-2-original-imagf5cepqhwtugn.jpeg?q=90&crop=false", rating: 4.8, category: "home", description: "Set of 5 knives with ergonomic handles for professional cooking.", availability: "In Stock", spec: "German stainless steel, 5-piece set" },
    { id: 8, name: " H|M  Casual Jacket", price: 2999.99, image: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4", rating: 4.1, category: "clothing", description: "Stylish and warm jacket suitable for all seasons.", availability: "In Stock", spec: "Cotton blend, water-repellent" },
    { id: 9, name: "Wireless Charging Pad", price: 999.99, image: "https://m.media-amazon.com/images/I/61oIAKY9s1L.jpg", rating: 4.0, category: "electronics", description: "Fast wireless charger compatible with most devices.", availability: "In Stock", spec: "10W, Qi-certified" },
    { id: 10, name: "Robot Vacuum Cleaner", price: 34999.99, image: "https://m.media-amazon.com/images/I/31g6gMSSCBL._SR290,290_.jpg", rating: 4.5, category: "home", description: "Smart vacuum with app control and self-charging feature.", availability: "In Stock", spec: "2000Pa suction, 90min runtime" },
  ];
  
  let cart = [];
  
  function displayProducts(category = "all", sort = "default", maxPrice = 100000) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    let filteredProducts = products.filter(product => 
      (category === "all" || product.category === category) &&
      product.price <= maxPrice
    );

  
    filteredProducts.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="rating">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</div>
        <div class="price">₹${product.price.toFixed(2)}</div>
        <button onclick="addToCart(${product.id})">${product.category === 'subscription' ? 'Subscribe' : 'Add to Cart'}</button>
      `;
      productElement.addEventListener('mouseover', (e) => showTooltip(e, product));
      productElement.addEventListener('mouseout', hideTooltip);
      productsContainer.appendChild(productElement);
    });
  }
  
  function filterProducts(category) {
    const cat = category || document.getElementById('category-select').value;
    const sort = document.getElementById('sort').value;
    const maxPrice = document.getElementById('price-range').value;
    document.getElementById('price-value').textContent = `Max: ₹${maxPrice}`;
    displayProducts(cat, sort, maxPrice);
  }
  
  function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-select').value;
    const sort = document.getElementById('sort').value;
    const maxPrice = document.getElementById('price-range').value;
    document.getElementById('price-value').textContent = `Max: ₹${maxPrice}`;
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    let filteredProducts = products.filter(product => 
      (category === "all" || product.category === category) &&
      product.price <= maxPrice &&
      product.name.toLowerCase().includes(searchTerm)
    );
  
    if (sort === "price-asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    }
  
    filteredProducts.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="rating">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</div>
        <div class="price">₹${product.price.toFixed(2)}</div>
        <button onclick="addToCart(${product.id})">${product.category === 'subscription' ? 'Subscribe' : 'Add to Cart'}</button>
      `;
      productElement.addEventListener('mouseover', (e) => showTooltip(e, product));
      productElement.addEventListener('mouseout', hideTooltip);
      productsContainer.appendChild(productElement);
    });
  }
  
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
  }
  
  function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;
    
    cart.forEach(item => {
      total += item.price * item.quantity;
      count += item.quantity;
      
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <span>${item.name} x${item.quantity}</span>
        <span>₹${(item.price * item.quantity).toFixed(2)}</span>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItems.appendChild(cartItem);
    });
    
    cartCount.textContent = count;
    cartTotal.textContent = `Subtotal: ₹${total.toFixed(2)}`;
  }
  
  function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity--;
      } else {
        cart.splice(itemIndex, 1);
      }
      updateCart();
    }
  }
  
  function toggleCart() {
    const cart = document.getElementById('cart');
    cart.classList.toggle('open');
  }
  
  function checkout() {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Proceeding to checkout. Thank you for shopping!');
    cart = [];
    updateCart();
    toggleCart();
  }
  
  function showTooltip(event, product) {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = `
      <table>
        <tr><td>Name:</td><td>${product.name}</td></tr>
        <tr><td>Description:</td><td>${product.description}</td></tr>
        <tr><td>Availability:</td><td>${product.availability}</td></tr>
        <tr><td>Spec:</td><td>${product.spec}</td></tr>
      </table>
    `;
    tooltip.style.display = 'block';
    moveTooltip(event);
  }
  
  function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
  }
  
  function moveTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    let x = event.pageX + 10;
    let y = event.pageY + 10;
  
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
  
    if (x + tooltipWidth > windowWidth) x = event.pageX - tooltipWidth - 10;
    if (y + tooltipHeight > windowHeight) y = event.pageY - tooltipHeight - 10;
  
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  }
  
  document.addEventListener('mousemove', moveTooltip);
  displayProducts();