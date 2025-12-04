let cart = [];
const CART_STORAGE_KEY = 'ecommerce_cart';
const CURRENT_PAGE_KEY = 'current_page';

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeModal = document.querySelector('.close-modal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const checkoutBtn = document.querySelector('.checkout-btn');
const continueBtn = document.querySelector('.continue-btn');
const subtotal = document.getElementById('subtotal');
const shipping = document.getElementById('shipping');
const contactForm = document.getElementById('contactForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    setupEventListeners();
    setupScrollAnimations();
    updateCartCount();
});

// ===== STORAGE MANAGEMENT =====
function saveCartToStorage() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function navigateToCartPage() {
    localStorage.setItem(CURRENT_PAGE_KEY, 'cart');
    window.location.href = 'cart.html';
}

function navigateToHome() {
    localStorage.setItem(CURRENT_PAGE_KEY, 'home');
    window.location.href = 'index.html';
}

// ===== HAMBURGER MENU =====
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close menu when nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
            else{
                entry.target.classList.remove('animated');            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .fade-in-up, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// SEARCH FUNCTIONALITY 
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query.length < 1) {
        searchResults.classList.remove('active');
        return;
    }

    let allProducts = document.querySelectorAll('.product-card');
    const results = [];

    allProducts.forEach(card => {
        const name = card.querySelector('.product-name').textContent.toLowerCase();
        const description = card.querySelector('.product-description').textContent.toLowerCase();
        const category = card.querySelector('.product-category').textContent.toLowerCase();
        
        if (name.includes(query) || description.includes(query) || category.includes(query)) {
            navMenu.classList.add('show');
            results.push(card);
        }
        else{
            navMenu.classList.add('show')
        }
    });

    displaySearchResults(results);
}

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div style="padding: 20px; text-align: center; color: #5a5a6e; font-weight: 500;">No products found</div>';
        searchResults.classList.add('active');
       
        return;
    }


    results.slice(0, 8).forEach(card => {
        const name = card.getAttribute('data-name');
        const price = card.querySelector('.product-price').textContent;
        const category = card.querySelector('.product-category').textContent;
        
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <strong>${name}</strong>
                    <p style="font-size: 0.8rem; color: #5a5a6e; margin-top: 4px;">${category}</p>
                </div>
                <span style="font-weight: 600; color: #1a2f5a;">${price}</span>
            </div>
        `;
        resultItem.addEventListener('click', () => {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            searchResults.classList.remove('active');
            searchInput.value = '';
        });
        searchResults.appendChild(resultItem);
    });
    
    searchResults.classList.add('active');
}

// Close search when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        searchResults.classList.remove('active');
    }
});

//CART FUNCTIONALITY 
function setupEventListeners() {
    // Hamburger Menu
    hamburger.addEventListener('click', toggleMenu);
    
    // Search
    searchInput.addEventListener('input', handleSearch);
    
    // Add to Cart Buttons
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            addToCart(e);
            btn.textContent= 'Added To Cart';
            setTimeout(()=> {
                btn.textContent= 'Add To Cart'
            }, 2500)
        });
    });

    // Cart Icon
    cartIcon.addEventListener('click', openCart);
    
    // Close Modal
    closeModal.addEventListener('click', closeCart);
    
    // Close modal when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) closeCart();
    });

    // Checkout and Continue
    checkoutBtn.addEventListener('click', checkout);
    continueBtn.addEventListener('click', closeCart);

    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

function addToCart(e) {
    e.preventDefault();
    const btn = e.target;
    const product = btn.getAttribute('data-product');
    const price = parseFloat(btn.getAttribute('data-price'));
    const productCard = btn.closest('.product-card');
    const image = productCard.querySelector('.product-image img').src;

    const existingItem = cart.find(item => item.name === product);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            name: product, 
            price: price,
            image: image,
            quantity: 1 
        });
    }

    updateCartCount();
    saveCartToStorage();
    showNotification(`✓ ${product} added to cart!`);
    
    // Add animation to button
    e.target.style.transform = 'scale(0.95)';
    setTimeout(() => {
        e.target.style.transform = 'scale(1)';
    }, 200);
}/*
function displaycartMessage(){
    if(addToCartBtns){
        addToCartBtns.textContent= "Added To Cart"
    }
}*/

function openCart() {
    // Navigate to dedicated cart page
    navigateToCartPage();
}

function closeCart() {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function displayCart() {
    cartItems.innerHTML = '';
    let subtotalAmount = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="padding: 40px 20px; text-align: center;">
                <i class="fas fa-shopping-bag" style="font-size: 3rem; color: #ddd; margin-bottom: 20px; display: block;"></i>
                <p style="color: #5a5a6e; font-weight: 500;">Your cart is empty</p>
                <p style="color: #999; font-size: 0.9rem; margin-top: 8px;">Add items to get started</p>
            </div>
        `;
    } else {
        cart.forEach((item, index) => {
            const item_image = document.querySelector('.product-image img').src;
            const itemTotal = item.price * item.quantity;
            subtotalAmount += itemTotal;
            
            innerHTML += `
                <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #f5f5f8; border-radius: 8px; margin-bottom: 12px; border: 1px solid #ddd;">
                    <div style="flex: 1;">
                    <img style="width:70px;height: 70px; object-fit: contain" src="${item_img}"
                        <strong style="display: block; margin-bottom: 8px;">${item.name}</strong>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <button onclick="updateQuantity(${index}, ${item.quantity - 1})" style="background: white; border: 1px solid #ddd; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-weight: 600;">-</button>
                            <span style="min-width: 30px; text-align: center; font-weight: 600;">${item.quantity}</span>
                            <button onclick="updateQuantity(${index}, ${item.quantity + 1})" style="background: white; border: 1px solid #ddd; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-weight: 600;">+</button>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: 700; color: #1a2f5a; margin-bottom: 8px;">$${itemTotal.toFixed(2)}</div>
                        <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #d32f2f; cursor: pointer; font-size: 0.85rem; font-weight: 600; transition: all 0.3s;">Remove</button>
                    </div>
                </div>
            `;
        });
    }

    const shippingCost = subtotalAmount > 100 ? 0 : 15;
    const total = subtotalAmount + shippingCost;

    subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
    shipping.textContent = shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToStorage();
    updateCartCount();
    displayCart();
    showNotification('✓ Item removed from cart');
}

function updateQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(index);
        return;
    }
    cart[index].quantity = newQuantity;
    saveCartToStorage();
    updateCartCount();
    displayCart();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = subtotalAmount > 100 ? 0 : 15;
    const total = subtotalAmount + shippingCost;
    
    showNotification(`✓ Order placed! Total: $${total.toFixed(2)}`);
    cart = [];
    saveCartToStorage();
    updateCartCount();
    closeCart();
}

// ===== CONTACT FORM =====
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const subject = e.target.querySelectorAll('input[type="text"]')[1].value;
    const message = e.target.querySelector('textarea').value;

    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill out all fields');
        return;
    }

    // Show success message
    showNotification(`✓ Message sent! We'll get back to you soon, ${name}`);
    
    // Reset form
    contactForm.reset();
    
    // In a real application, you would send this data to a server
    console.log({
        name: name,
        email: email,
        subject: subject,
        message: message
    });
}

// ===== NOTIFICATIONS =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgb(160, 36, 36);
        color: white;
        padding: 16px 28px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInNotif 0.3s ease-out;
        font-weight: 500;
        box-shadow: 0 20px 48px rgba(0, 0, 0, 0.15);
        font-size: 0.9rem;
        max-width: 90vw;
    `;
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInNotif {
        from { 
            transform: translateX(400px); 
            opacity: 0; 
        }
        to { 
            transform: translateX(0); 
            opacity: 1; 
        }
    }
    
    @keyframes slideOut {
        from { 
            transform: translateX(0); 
            opacity: 1; 
        }
        to { 
            transform: translateX(400px); 
            opacity: 0; 
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .fade-in {
        opacity: 0;
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .fade-in-up.animated {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .slide-in-left {
        opacity: 0;
        transform: translateX(-30px);
    }
    
    .slide-in-left.animated {
        animation: slideInLeft 0.6s ease-out forwards;
    }
    
    .slide-in-right {
        opacity: 0;
        transform: translateX(30px);
    }
    
    .slide-in-right.animated {
        animation: slideInRight 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);

// ===== SMOOTH SCROLL ENHANCEMENT =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== LAZY LOAD IMAGES (if using real images) =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== MOBILE MENU ACCESSIBILITY =====
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
});

// ===== CART RESPONSIVE HANDLING =====
if (window.innerWidth < 768) {
    cartModal.addEventListener('touchmove', (e) => {
        e.preventDefault();
    });
}
/*hero background image change
const urls  = ["./camera-canon-close-up-250455.jpg","./backgroundimg2.webp","./epicphoto5.jpg","./backgroundimg1.webp"];
const herobg = document.querySelector('.hero');


function changeHeroBg(){

herobg.style.backgroundImage = `url('${urls[Math.floor(Math.random() * urls.length)]}')`;
herobg.style.animation = 'fadeIn 1s';
herobg.style.backgroundPosition = 'center';
herobg.style.backgroundSize = 'cover';
herobg.style.opacity= 0;
setTimeout(()=>{
    herobg.style.opacity= 1
},2000)
}*//*
const urls = [
  "./r5bgimg.webp",
  "./r5dcanon.webp",
  "./r6moving.webp",
  "./r5latest.webp"
];

const herobg = document.querySelector('.hero');*/
/*
function changeHeroBg() {
  // Pick random image
  const newBg = urls[Math.floor(Math.random() * urls.length)];

  // Trigger slide-in animation
  herobg.classList.remove("slide-in");
  void herobg.offsetWidth; // forces reflow so animation restarts
  herobg.style.backgroundImage = `url('${newBg}')`;
  herobg.classList.add("slide-in");
}
setInterval(()=>{
    herobg.style.backgroundImage=urls[indexbg];
    herobg.classList.add('slide-in')
    indexbg= (indexbg + 1)% urls.length;
    setTimeout(()=>{
        herobg.classList.remove('slide-in')
    },1000)
},4000)
*/
const heroImages = [
    "./R.webp",
    "./r5latest.webp",
    "./bestbgimg2.webp"
    ,"./bestbgimg.jpeg"
];

const heroTexts = [
    "Upgrade Your Photography & Videography – high-quality cameras, lenses, lighting kits, audio gear, tripods, and everything you need to create.",
    "Your Creative Journey Starts Here – top-tier cameras, lenses, lighting, audio equipment, tripods, and all essential accessories.","Everything You Need to Capture Your Vision – premium cameras, lenses, lighting, audio gear, tripods, and more.","Everything You Need For Your Photography & Videography - premium cameras, lenses, lighting, audio,tripods and more",
    "Everything You Need to Create – advanced cameras, lenses, lighting setups, audio equipment, tripods, and all your creative essentials."
];

let currentIndexbg = -1;

// Reference your hero elements
const herobg = document.querySelector(".hero"); // background div
const heroTextEl = document.querySelector(".hero-text"); // the text element inside hero

function getRandomIndex() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * heroImages.length);
    } while (newIndex === currentIndexbg); // prevent same image twice
    return newIndex;
}

function changeHeroBG() {
    // Fade-out & blur for both image and text
    herobg.style.transition = "filter 1s ease, opacity 1s ease";
    heroTextEl.style.transition = "opacity 1s ease, transform 1s ease";
    
    herobg.style.filter = "blur(8px)";
    herobg.style.opacity = "0.3";
    
    heroTextEl.style.opacity = "0";
    heroTextEl.style.transform = "translateY(20px)"; // slide down effect
    
    // Change image and text after fade-out
    setTimeout(() => {
        currentIndexbg = getRandomIndex();
        herobg.style.backgroundImage = `url(${heroImages[currentIndexbg]})`;
        heroTextEl.textContent = heroTexts[currentIndexbg];
        
        // Fade-in & remove blur
        herobg.style.filter = "blur(0px)";
        herobg.style.opacity = "1";
        
        heroTextEl.style.opacity = "1";
        heroTextEl.style.textAlign = "center";
        heroTextEl.style.transform = "translateY(0px)"; // back to original
    }, 1000);
}

// Wait 4s before first change
setTimeout(() => {
    changeHeroBG();
    setInterval(changeHeroBG, 7000); // continue every 5 seconds
}, 8000);
function nextHero() {
    changeHeroBG();
}

function prevHero() {
    // Go backwards: index - 1
    currentIndexbg = (currentIndexbg - 1 + heroImages.length) % heroImages.length;

    // Manually update with animation
    herobg.style.transition = "filter 1s ease, opacity 1s ease";
    heroTextEl.style.transition = "opacity 1s ease, transform 1s ease";

    herobg.style.filter = "blur(8px)";
    herobg.style.opacity = "0.3";

    heroTextEl.style.opacity = "0";
    heroTextEl.style.transform = "translateY(20px)";

    setTimeout(() => {
        herobg.style.backgroundImage = `url(${heroImages[currentIndexbg]})`;
        heroTextEl.textContent = heroTexts[currentIndexbg];

        herobg.style.filter = "blur(0px)";
        herobg.style.opacity = "1";

        heroTextEl.style.opacity = "1";
        heroTextEl.style.transform = "translateY(0px)";
    }, 1000);
}
/*
   const heroImages = [
    "r5bgimg.webp",
    "./R.webp",
    "./r5latest.webp"
];

let currentIndexbg = -1;

function getRandomIndex() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * heroImages.length);
    } while (newIndex === currentIndexbg); // prevent same image twice
    return newIndex;
}

function changeHeroBG() {
    // Fade-out & blur
    herobg.style.transition = "filter 1s ease, opacity 1s ease";
    herobg.style.filter = "blur(8px)";
    herobg.style.opacity = "0.3";
    
    // Change image after fade-out completes (1s)
    setTimeout(() => {
        currentIndexbg = getRandomIndex();
        herobg.style.backgroundImage = `url(${heroImages[currentIndexbg]})`;
        
        // Fade-in & remove blur
        herobg.style.filter = "blur(0px)";
        herobg.style.opacity = "1";
    }, 1000);
}

// Wait 4s before the first change
setTimeout(() => {
    changeHeroBG();
    setInterval(changeHeroBG, 5000); // Continue every 5 seconds
}, 4000); */

    /*// Initial background
    herobg.style.backgroundImage = `url(${heroImages[currentIndexbg]})`;

    function changeHeroBG() {
        // Start blur + fade-out
        hero.style.filter = "blur(8px)";
        hero.style.opacity = "0.3";

        setTimeout(() => {
            // Switch image while blurred
            currentIndexbg = (currentIndex + 1) % heroImages.length;
            herobg.style.backgroundImage = `url(${heroImages[currentIndexbg]})`;

            // Fade-in & remove blur
            herobg.style.filter = "blur(0px)";
            herobg.style.opacity = "1";
        }, 500); // wait half of the transition to swap image
    }

    // Change every 5 seconds
    setInterval(changeHeroBG, 1000);*/
/*
setInterval(changeHeroBg,4000)
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slides img');
/*
if(carousel){
    let currentIndex = 0;
    function showNextSlide() {
        slides.forEach((slide, index) => {
            slide.style.display = 'none';
    });
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].style.display = 'block';
    }

    const navigationKeys = document.querySelector('.navigation-keys');
    navigationKeys.addEventListener('click', () => {
        const previousButton = navigationKeys.querySelector('p:first-child');
        const nextButton = navigationKeys.querySelector('p:last-child');
        if (previousButton) {
            slides.forEach((slide) => {
                slide.style.display = 'none';
        });
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            slides[currentIndex].style.display = 'block';
    }
        if (nextButton) {
            slides.forEach((slide) => {
                slide.style.display = 'none';
        });
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].style.display = 'block';
    }

    });

/*
function showSlides() {
    const slides = document.querySelectorAll('.slides img');
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 3000); */
    const logo = document.querySelector('.logo')
    logo.addEventListener('click',()=> {
        window.location.href='https://epicshutterhub.vercel.app/';
    })
    window.addEventListener('scroll', ()=> {
        let totalHeight = window.scrollY; 
        if(totalHeight > 200 && window.innerWidth < 480){
            hamburger.style.transform = 'scale(.8)';
            logo.style.transform='scale(.8)'       }else{
                           hamburger.style.transform = 'scale(1)';
            logo.style.transform = 'scale(1)' 
            }
        })
        const searchContainer = document.querySelector('.search-container');
        const searchDown = document.getElementById('sec-searchBtn').addEventListener('click',()=> {
            searchContainer.classList.add('active')
        })
        /* for url search Params eg product.html?id=canon&price=2000*/
    
let allProducts = document.querySelectorAll('.product-card');
allProducts.forEach(product => {
  product.addEventListener('click', () => {
    const name = encodeURIComponent(product.dataset.name); // encode for URL
    window.location.href = `product.html?name=${name}`;
  });
});
document.querySelectorAll('.nav-link a').forEach((link)=>{
    if (link.getAttribute('href') === location.pathname){
        link.classList.add('active')
    }
})
/*
const loadBtn = document.querySelector('.loadBtn')
let countVisible = 4 ;
for (var i = 0; i < countVisible; i++) {
    allProducts[i].classList.add('show')
}i
loadBtn.addEventListener('click', function(){
    for (var i = countVisible; i < countVisible +4; i++) {
        if(allProducts[i])
        allProducts[i].classList.add('show')
    }
    if(countVisible >= allProducts.length){
        loadBtn.style.display= 'none'
    }
})*/