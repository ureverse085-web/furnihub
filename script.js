// ==========================================================================
// 50+ PRODUCT DATA ENGINE (DIVERSE PREMIUM LUXURY FURNITURE)
// ==========================================================================
const CATEGORIES = ["Sofas", "Chairs", "Tables", "Beds", "Office", "Storage", "Decor"];
const IMAGES = {
    Sofas: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80"
    ],
    Chairs: [
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&q=80"
    ],
    Tables: [
        "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1530018607912-eff2df11a7be?auto=format&fit=crop&w=600&q=80"
    ],
    Beds: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80"
    ],
    Office: [
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=600&q=80"
    ],
    Storage: [
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1601084881623-cee5a7de3433?auto=format&fit=crop&w=600&q=80"
    ],
    Decor: [
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80"
    ]
};

const ADJECTIVES = ["Minimalist", "Nordic", "Imperial", "Bauhaus", "Velvet", "Walnut", "Bouclé", "Luxe", "Sleek", "Organic"];
const TYPES = {
    Sofas: ["Lounger", "Sectional Sofa", "Daybed", "Settee"],
    Chairs: ["Armchair", "Lounge Chair", "Dining Chair", "Stool"],
    Tables: ["Coffee Table", "Dining Table", "Console", "End Table"],
    Beds: ["Platform Bed", "Canopy Bed", "Divan"],
    Office: ["Desk", "Task Chair", "Credenza"],
    Storage: ["Sideboard", "Bookshelf", "Wardrobe", "Chest of Drawers"],
    Decor: ["Pendant Light", "Vase Set", "Wall Mirror", "Sculptural Rug"]
};

// Generate Exactly 52 Unique Highly Detailed Products Densely Populated
const products = [];
let idCounter = 1;

CATEGORIES.forEach(cat => {
    const typeList = TYPES[cat];
    typeList.forEach(type => {
        ADJECTIVES.forEach((adj, idx) => {
            if (idCounter > 52) return;
            
            const basePrice = Math.floor(Math.random() * 2500) + 150;
            const hasSale = Math.random() > 0.6;
            const oldPrice = hasSale ? Math.floor(basePrice * 1.25) : null;
            const imgArr = IMAGES[cat];
            const image = imgArr[idx % imgArr.length];

            products.push({
                id: idCounter++,
                name: `${adj} ${type}`,
                category: cat,
                price: basePrice,
                oldPrice: oldPrice,
                rating: (4.0 + Math.random() * 1.0).toFixed(1),
                image: image,
                isNew: Math.random() > 0.7,
                isSale: hasSale,
                colors: ["#3D2B1F", "#9A6B43", "#C4A484", "#2C2C2C"].slice(0, Math.floor(Math.random() * 3) + 2),
                description: `Elevate your domestic framework with this exceptional premium choice. Exquisitely structured using elite grade materials, ensuring permanent comfort engineered for continuous visual elegance.`
            });
        });
    });
});

// ==========================================================================
// SYSTEM STATE MANAGEMENT (LOCAL STORAGE PERSISTED)
// ==========================================================================
let cart = JSON.parse(localStorage.getItem("SF_CART")) || [];
let wishlist = JSON.parse(localStorage.getItem("SF_WISHLIST")) || [];
let currentUser = JSON.parse(localStorage.getItem("SF_USER")) || null;

let currentFilterCategory = "All";
let shopCurrentPage = 1;
const itemsPerPage = 12;

// ==========================================================================
// CENTRAL APPLICATION ROUTING ARCHITECTURE
// ==========================================================================
function navigateTo(viewId) {
    // Scroll smoothly to top on every view mutation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Manage Core View States
    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
    const targetedView = document.getElementById(`view-${viewId}`);
    if (targetedView) targetedView.classList.add('active');

    // Sync Active Navigation Link States
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('onclick').includes(`'${viewId}'`)) {
            link.classList.add('active');
        }
    });

    // Close Mobile Navbar on routing execution
    document.getElementById("navLinks").classList.remove("active");

    // Route Processing Injections
    if (viewId === 'home') renderHomeFeaturedProducts();
    if (viewId === 'shop') renderShopEngine();
    if (viewId === 'cart') renderCartEngine();
    if (viewId === 'wishlist') renderWishlistEngine();
    if (viewId === 'profile') renderProfileEngine();
    if (viewId === 'search') triggerSearch('');
}

// ==========================================================================
// TOAST NOTIFICATION RUNTIME
// ==========================================================================
function showToast(message) {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
}

// ==========================================================================
// CORE DATA RENDER ENGINE (DYNAMIC CARDS)
// ==========================================================================
function buildProductCard(p) {
    const isWish = wishlist.includes(p.id) ? 'active' : '';
    const badgeHtml = p.isSale ? `<span class="product-badge badge-sale">Sale</span>` : 
                      p.isNew ? `<span class="product-badge badge-new">New</span>` : '';
    const oldPriceHtml = p.oldPrice ? `<span class="price-old">$${p.oldPrice}</span>` : '';

    return `
        <div class="product-card">
            <div class="product-img-wrapper">
                ${badgeHtml}
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                <button class="wishlist-toggle-btn ${isWish}" onclick="event.stopPropagation(); toggleWishlist(${p.id}, this)" aria-label="Wishlist">
                    <i class="fa-solid fa-heart"></i>
                </button>
                <div class="product-card-actions">
                    <button class="card-action-btn" onclick="event.stopPropagation(); viewProductDetail(${p.id})">Quick View</button>
                    <button class="card-action-btn" onclick="event.stopPropagation(); addItemToCart(${p.id}, 1)"><i class="fa-solid fa-bag-shopping"></i></button>
                </div>
            </div>
            <div class="product-info" onclick="viewProductDetail(${p.id})">
                <div class="product-cat">${p.category}</div>
                <h3 class="product-title">${p.name}</h3>
                <div class="product-rating"><i class="fa-solid fa-star"></i> ${p.rating}</div>
                <div class="product-price-row">
                    <span class="price-current">$${p.price}</span>
                    ${oldPriceHtml}
                </div>
            </div>
        </div>
    `;
}

// ==========================================================================
// HOME VIEW ENGINE
// ==========================================================================
function renderHomeFeaturedProducts() {
    const grid = document.getElementById("featuredProductGrid");
    if (!grid) return;
    // Extract 4 high-tier products for the landing screen
    const targets = products.slice(0, 4);
    grid.innerHTML = targets.map(p => buildProductCard(p)).join('');
}

// ==========================================================================
// SHOP LOGIC ENGINE (FILTERS, PAGINATION, SORTING)
// ==========================================================================
function renderShopEngine() {
    // Render Filter Sidebar Category Lists Dynamically
    const catList = document.getElementById("categoryFilterList");
    if (catList) {
        catList.innerHTML = `<li class="${currentFilterCategory === 'All' ? 'active' : ''}" onclick="filterByCategory('All')">All Collection</li>` +
            CATEGORIES.map(c => `<li class="${currentFilterCategory === c ? 'active' : ''}" onclick="filterByCategory('${c}')">${c}</li>`).join('');
    }

    let activeSet = [...products];

    // Filter Processing
    if (currentFilterCategory !== "All") {
        activeSet = activeSet.filter(p => p.category === currentFilterCategory);
    }

    // Price Processing
    const maxPrice = parseFloat(document.getElementById("priceRange")?.value || 5000);
    activeSet = activeSet.filter(p => p.price <= maxPrice);

    // Sorting Engine Processing
    const sortVal = document.getElementById("sortBySelect")?.value || "default";
    if (sortVal === "price-low") activeSet.sort((a,b) => a.price - b.price);
    if (sortVal === "price-high") activeSet.sort((a,b) => b.price - a.price);
    if (sortVal === "rating") activeSet.sort((a,b) => b.rating - a.rating);

    // Pagination Logic Integration
    const totalItems = activeSet.length;
    const maxPages = Math.ceil(totalItems / itemsPerPage) || 1;
    if (shopCurrentPage > maxPages) shopCurrentPage = maxPages;

    const startIdx = (shopCurrentPage - 1) * itemsPerPage;
    const sliceSet = activeSet.slice(startIdx, startIdx + itemsPerPage);

    const grid = document.getElementById("shopProductGrid");
    if (grid) {
        if(sliceSet.length === 0) {
            grid.innerHTML = `<div class="text-center w-100 p-5"><h3>No matching structural elements found.</h3></div>`;
        } else {
            grid.innerHTML = sliceSet.map(p => buildProductCard(p)).join('');
        }
    }

    // Structural Pagination Elements Rendering
    const paginationContainer = document.getElementById("shopPagination");
    if (paginationContainer) {
        let pagHtml = "";
        for(let i=1; i<=maxPages; i++) {
            pagHtml += `<span class="page-num ${i === shopCurrentPage ? 'active' : ''}" onclick="setShopPage(${i})">${i}</span>`;
        }
        paginationContainer.innerHTML = maxPages > 1 ? pagHtml : "";
    }
}

function filterByCategory(cat) {
    currentFilterCategory = cat;
    shopCurrentPage = 1;
    navigateTo('shop');
    renderShopEngine();
}

function setShopPage(pNum) {
    shopCurrentPage = pNum;
    renderShopEngine();
}

function resetFilters() {
    currentFilterCategory = "All";
    if(document.getElementById("priceRange")) document.getElementById("priceRange").value = 5000;
    if(document.getElementById("priceRangeValue")) document.getElementById("priceRangeValue").innerText = "$5000";
    if(document.getElementById("sortBySelect")) document.getElementById("sortBySelect").value = "default";
    shopCurrentPage = 1;
    renderShopEngine();
}

// ==========================================================================
// DETAILED PRODUCT OVERVIEW SYSTEM
// ==========================================================================
function viewProductDetail(productId) {
    const target = products.find(p => p.id === productId);
    if (!target) return;

    navigateTo('product-detail');
    const container = document.getElementById("productDetailContainer");
    if(!container) return;

    container.innerHTML = `
        <div class="gallery-container">
            <div class="main-img-holder" id="zoomHolder" onmousemove="zoomImage(event)" onmouseleave="resetZoomImage()">
                <img id="detailMainImg" src="${target.image}" alt="${target.name}">
            </div>
            <div class="gallery-thumbs">
                <div class="thumb-box active" onclick="swapDetailImage('${target.image}', this)"><img src="${target.image}"></div>
                <div class="thumb-box" onclick="swapDetailImage('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80', this)"><img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80"></div>
            </div>
        </div>
        <div class="detail-meta-panel">
            <h1>${target.name}</h1>
            <div class="product-rating" style="font-size:1.1rem; margin-bottom:16px;"><i class="fa-solid fa-star"></i> ${target.rating}</div>
            <div class="detail-price">$${target.price}</div>
            <p class="detail-desc">${target.description}</p>
            
            <div class="options-group">
                <h4>Select Colorway</h4>
                <div class="color-swatches">
                    ${target.colors.map((c, idx) => `<span class="swatch ${idx===0?'active':''}" style="background-color: ${c}" onclick="selectSwatch(this)"></span>`).join('')}
                </div>
            </div>

            <div class="options-group">
                <h4>Allocation Quantity</h4>
                <div class="qty-selector">
                    <button class="qty-btn" onclick="adjustDetailQty(-1)">-</button>
                    <input type="text" id="detailQtyInput" class="qty-input" value="1" readonly>
                    <button class="qty-btn" onclick="adjustDetailQty(1)">+</button>
                </div>
            </div>

            <div class="detail-actions-row">
                <button class="btn btn-primary" style="flex:1;" onclick="executeDetailAddToCart(${target.id})">Secure Allocation</button>
                <button class="btn btn-secondary" onclick="toggleWishlist(${target.id}, null); showToast('Wishlist updated.');"><i class="fa-solid fa-heart"></i></button>
            </div>
        </div>
    `;

    // Render Related Product Grid Items
    const relatedGrid = document.getElementById("relatedProductsGrid");
    if(relatedGrid) {
        const matches = products.filter(p => p.category === target.category && p.id !== target.id).slice(0, 4);
        relatedGrid.innerHTML = matches.map(m => buildProductCard(m)).join('');
    }
}

function swapDetailImage(src, element) {
    document.getElementById("detailMainImg").src = src;
    document.querySelectorAll(".thumb-box").forEach(b => b.classList.remove("active"));
    element.classList.add("active");
}

function zoomImage(e) {
    const img = document.getElementById("detailMainImg");
    const holder = document.getElementById("zoomHolder");
    if(!img || !holder) return;
    const rect = holder.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(1.5)";
}

function resetZoomImage() {
    const img = document.getElementById("detailMainImg");
    if(img) {
        img.style.transformOrigin = "center center";
        img.style.transform = "scale(1)";
    }
}

function selectSwatch(el) {
    el.parentElement.querySelectorAll(".swatch").forEach(s => s.classList.remove("active"));
    el.classList.add("active");
}

function adjustDetailQty(val) {
    const input = document.getElementById("detailQtyInput");
    if(!input) return;
    let curr = parseInt(input.value) + val;
    if(curr < 1) curr = 1;
    input.value = curr;
}

function executeDetailAddToCart(pId) {
    const qty = parseInt(document.getElementById("detailQtyInput").value) || 1;
    addItemToCart(pId, qty);
}

// ==========================================================================
// CORE STATE CONTROLLERS: CART & WISHLIST ENGINE OPERATIONS
// ==========================================================================
function syncGlobalBadges() {
    const cBadge = document.getElementById("cartBadge");
    const wBadge = document.getElementById("wishlistBadge");
    
    if(cBadge) cBadge.innerText = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    if(wBadge) wBadge.innerText = wishlist.length;

    localStorage.setItem("SF_CART", JSON.stringify(cart));
    localStorage.setItem("SF_WISHLIST", JSON.stringify(wishlist));
}

function addItemToCart(productId, qty) {
    const exist = cart.find(item => item.id === productId);
    if(exist) {
        exist.quantity += qty;
    } else {
        cart.push({ id: productId, quantity: qty });
    }
    syncGlobalBadges();
    showToast(`Successfully registered item selection within cart allocation.`);
}

function updateCartQty(pId, amount) {
    const target = cart.find(item => item.id === pId);
    if(!target) return;
    target.quantity += amount;
    if(target.quantity <= 0) {
        cart = cart.filter(item => item.id !== pId);
    }
    syncGlobalBadges();
    renderCartEngine();
}

function removeCartItem(pId) {
    cart = cart.filter(item => item.id !== pId);
    syncGlobalBadges();
    renderCartEngine();
    showToast("Allocation item eliminated.");
}

function toggleWishlist(pId, buttonEl) {
    if(wishlist.includes(pId)) {
        wishlist = wishlist.filter(id => id !== pId);
        if(buttonEl) buttonEl.classList.remove("active");
    } else {
        wishlist.push(pId);
        if(buttonEl) buttonEl.classList.add("active");
    }
    syncGlobalBadges();
}

// ==========================================================================
// CART & WISHLIST UI INJECTION ENGINE
// ==========================================================================
function renderCartEngine() {
    const container = document.getElementById("cartLayoutContainer");
    if(!container) return;

    if(cart.length === 0) {
        container.innerHTML = `<div class="text-center w-100 p-5 glass"><h3>Your active selection queue is vacant.</h3><button class="btn btn-primary mt-4" onclick="navigateTo('shop')">Explore Products</button></div>`;
        container.style.gridTemplateColumns = "1fr";
        return;
    }

    container.style.gridTemplateColumns = "1fr 380px";

    let itemsHtml = "";
    let subtotal = 0;

    cart.forEach(item => {
        const prod = products.find(p => p.id === item.id);
        if(!prod) return;
        const lineTotal = prod.price * item.quantity;
        subtotal += lineTotal;

        itemsHtml += `
            <div class="cart-item-card">
                <img src="${prod.image}" class="cart-item-img" alt="${prod.name}">
                <div class="cart-item-info">
                    <h4>${prod.name}</h4>
                    <p class="cart-item-price">$${prod.price}</p>
                </div>
                <div class="qty-selector">
                    <button class="qty-btn" onclick="updateCartQty(${prod.id}, -1)">-</button>
                    <span style="padding:0 12px; font-weight:600;">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQty(${prod.id}, 1)">+</button>
                </div>
                <button class="nav-icon-btn" style="color:#C15C3D" onclick="removeCartItem(${prod.id})"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `;
    });

    const estTax = Math.floor(subtotal * 0.08);
    const ultimateTotal = subtotal + estTax;

    container.innerHTML = `
        <div class="cart-items-list">${itemsHtml}</div>
        <div class="cart-summary-card glass">
            <h3>Order Logistical Summary</h3>
            <div class="summary-row mt-4"><span>Subtotal Architecture</span><span>$${subtotal}</span></div>
            <div class="summary-row"><span>Logistical Tax (8%)</span><span>$${estTax}</span></div>
            <div class="summary-row"><span>Priority Transit</span><span style="color:#C15C3D; font-weight:600;">Gratis</span></div>
            <div class="summary-row total"><span>Total Gross Cost</span><span>$${ultimateTotal}</span></div>
            <button class="btn btn-primary w-100 mt-4" onclick="processCheckout()">Acquire Asset Pipeline</button>
        </div>
    `;
}

function renderWishlistEngine() {
    const grid = document.getElementById("wishlistGrid");
    if(!grid) return;

    if(wishlist.length === 0) {
        grid.innerHTML = `<div class="text-center w-100 p-5 glass"><h3>Wishlist is currently empty.</h3></div>`;
        return;
    }

    const matches = products.filter(p => wishlist.includes(p.id));
    grid.innerHTML = matches.map(p => buildProductCard(p)).join('');
}

function processCheckout() {
    showToast("Secure allocation processed successfully. Thank you.");
    cart = [];
    syncGlobalBadges();
    navigateTo('home');
}

// ==========================================================================
// SEARCH SUBSYSTEM AUTOMATION
// ==========================================================================
function triggerSearch(term) {
    const input = document.getElementById("searchInput");
    if(input && term !== '') input.value = term;

    const currentTerm = input ? input.value.toLowerCase().trim() : '';
    const grid = document.getElementById("searchResultsGrid");
    if(!grid) return;

    if(currentTerm === '') {
        grid.innerHTML = `<div class="text-center w-100 p-4"><p class="text-muted">Enter search criteria above to scan our high-end framework inventory.</p></div>`;
        return;
    }

    const hits = products.filter(p => p.name.toLowerCase().includes(currentTerm) || p.category.toLowerCase().includes(currentTerm));
    if(hits.length === 0) {
        grid.innerHTML = `<div class="text-center w-100 p-4"><h3>No custom assets matching query details.</h3></div>`;
    } else {
        grid.innerHTML = hits.map(p => buildProductCard(p)).join('');
    }
}

// ==========================================================================
// IDENTITY ASSURANCE ENGINE (PROFILE CONTROLLER)
// ==========================================================================
function renderProfileEngine() {
    const wrapper = document.getElementById("authWrapper");
    if(!wrapper) return;

    if(currentUser) {
        wrapper.innerHTML = `
            <div class="profile-card">
                <div class="profile-avatar">${currentUser.name.charAt(0)}</div>
                <h2>Welcome back, ${currentUser.name}</h2>
                <p class="text-muted mb-4">${currentUser.email}</p>
                <div class="glass p-3 mb-4" style="text-align:left;">
                    <h4>Verification Allocation System Status</h4>
                    <p class="m-0 text-muted" style="font-size:0.9rem;">Tier Status: Premium Design Partner</p>
                </div>
                <button class="btn btn-secondary w-100" onclick="executeUserLogout()">Terminate Session</button>
            </div>
        `;
    } else {
        showLoginCard();
    }
}

function showLoginCard() {
    const wrapper = document.getElementById("authWrapper");
    wrapper.innerHTML = `
        <h2>Identity Portal</h2>
        <form onsubmit="handleLoginSubmit(event)">
            <div class="form-group">
                <label>Email Access Channel</label>
                <input type="email" id="authEmail" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Cryptographic Password</label>
                <input type="password" id="authPass" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary w-100 mt-3">Authorize Session</button>
            <p class="text-center mt-4 m-0" style="font-size:0.9rem;">New partner? <a href="#" style="color:var(--color-primary); font-weight:600;" onclick="showRegisterCard()">Register Credentials</a></p>
        </form>
    `;
}

function showRegisterCard() {
    const wrapper = document.getElementById("authWrapper");
    wrapper.innerHTML = `
        <h2>Create Architecture Profile</h2>
        <form onsubmit="handleRegisterSubmit(event)">
            <div class="form-group">
                <label>Legal Full Name</label>
                <input type="text" id="regName" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" id="regEmail" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Password Creation</label>
                <input type="password" id="regPass" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary w-100 mt-3">Register Profile</button>
            <p class="text-center mt-4 m-0" style="font-size:0.9rem;">Existing Partner? <a href="#" style="color:var(--color-primary); font-weight:600;" onclick="showLoginCard()">Login Here</a></p>
        </form>
    `;
}

function handleLoginSubmit(e) {
    e.preventDefault();
    currentUser = { name: "Arch. Client Partner", email: document.getElementById("authEmail").value };
    localStorage.setItem("SF_USER", JSON.stringify(currentUser));
    showToast("Session authentication sequence accomplished.");
    renderProfileEngine();
}

function handleRegisterSubmit(e) {
    e.preventDefault();
    currentUser = { name: document.getElementById("regName").value, email: document.getElementById("regEmail").value };
    localStorage.setItem("SF_USER", JSON.stringify(currentUser));
    showToast("Registration identity accepted.");
    renderProfileEngine();
}

function executeUserLogout() {
    currentUser = null;
    localStorage.removeItem("SF_USER");
    showToast("Active session cleared safely.");
    renderProfileEngine();
}

// ==========================================================================
// AUXILIARY FORM PROCESSING SYSTEMS
// ==========================================================================
function handleContactSubmit(e) {
    e.preventDefault();
    showToast("Inquiry logged successfully inside communication buffers.");
    document.getElementById("contactForm").reset();
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    showToast("Communication line validated for next product distribution drop.");
    document.getElementById("newsletterForm").reset();
}

// ==========================================================================
// LIFE CYCLE & DOM INTERACTION LAYER HOOKS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Suppress Loader System smoothly
    setTimeout(() => {
        const loader = document.getElementById("pageLoader");
        if(loader) { loader.style.opacity = '0'; setTimeout(() => loader.remove(), 400); }
    }, 600);

    // Initializations
    syncGlobalBadges();
    renderHomeFeaturedProducts();

    // Scroll Monitoring Events
    window.addEventListener("scroll", () => {
        const nav = document.getElementById("navbar");
        const btt = document.getElementById("backToTop");
        
        if (window.scrollY > 50) { nav.classList.add("scrolled"); } else { nav.classList.remove("scrolled"); }
        if (window.scrollY > 400) { btt.classList.add("visible"); } else { btt.classList.remove("visible"); }
    });

    // Back to top event connection
    document.getElementById("backToTop")?.addEventListener("click", () => {
        window.scrollTo({ top:0, behavior: 'smooth' });
    });

    // Theme Management Engine
    const savedTheme = localStorage.getItem("SF_THEME") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    const themeBtn = document.getElementById("themeToggle");
    if(themeBtn) {
        themeBtn.innerHTML = savedTheme === 'dark' ? `<i class="fa-solid fa-sun"></i>` : `<i class="fa-solid fa-moon"></i>`;
        themeBtn.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme");
            const next = current === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("SF_THEME", next);
            themeBtn.innerHTML = next === 'dark' ?  `<i class="fa-solid fa-sun"></i>` : `<i class="fa-solid fa-moon"></i>`;
        });
    }

    // Interactive Filter Event Connections
    document.getElementById("priceRange")?.addEventListener("input", (e) => {
        if(document.getElementById("priceRangeValue")) {
            document.getElementById("priceRangeValue").innerText = `$${e.target.value}`;
        }
        renderShopEngine();
    });
    document.getElementById("sortBySelect")?.addEventListener("change", renderShopEngine);
    document.getElementById("searchInput")?.addEventListener("input", () => triggerSearch(''));

    // Mobile Hamburger Menu Actions Toggle
    document.getElementById("hamburger")?.addEventListener("click", () => {
        document.getElementById("navLinks").classList.toggle("active");
    });
});

// ==========================================================================
// AUTO HERO SLIDER ANIMATION LOOPS
// ==========================================================================
let sliderIndex = 0;
function setSlide(idx) {
    const slides = document.querySelectorAll(".hero-slider .slide");
    const dots = document.querySelectorAll(".slider-dots .dot");
    if(slides.length === 0) return;
    sliderIndex = idx;
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    slides[sliderIndex].classList.add("active");
    dots[sliderIndex].classList.add("active");
}
setInterval(() => {
    const slides = document.querySelectorAll(".hero-slider .slide");
    if(slides.length > 0) {
        let next = (sliderIndex + 1) % slides.length;
        setSlide(next);
    }
}, 6000);
