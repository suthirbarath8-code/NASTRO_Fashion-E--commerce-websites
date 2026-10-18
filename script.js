/* ==========================================================================
   NOSTRA+ New World  -  script.js
   Shared script for index.html, collections.html and contact.html

   Structure
     1. SHARED      - footer back-to-top button + dead "#" links
     2. PAGE: HOME        runs only when <html class="page-home">
     3. PAGE: COLLECTIONS runs only when <html class="page-collections">
     4. PAGE: CONTACT     runs only when <html class="page-contact">

   Each page block is wrapped in its own function so the three pages can use
   the same variable and function names without clashing. Functions that are
   called from inline onclick="..." attributes are exposed on window at the
   end of the block.
   ========================================================================== */

/* ==========================================================================
   SHARED
   ========================================================================== */
    (function () {
      var top = document.getElementById("sfTop");
      if (top) top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
      document.querySelectorAll("footer.site-footer a[href='#']").forEach(function (a) {
        a.addEventListener("click", function (e) { e.preventDefault(); });
      });
    })();
  

/* ==========================================================================
   PAGE: HOME
   ========================================================================== */
if (document.documentElement.classList.contains("page-home")) {
  (function () {
    // HERO SLIDES
    const slides = [
      { t: "Style in motion", s: "Performance apparel, footwear and gear for a stronger, more confident game.", c: "#f26a1b", k: "RE", img: "Fashion%20Model%20and%20Orange%20Disc%20Cutouts.png", bg: "g.jpg" },
      { t: "Court ready", s: "Lightweight layers built for long rallies and quick changes.", c: "#0f7f74", k: "NEW", img: "green (2).png", bg: "green (1).png" },
      { t: "Sun on your side", s: "Sunglasses with sharp lenses and frames that stay put.", c: "#c9892b", k: "UV", img: "iii.png", bg: "i.jpg_2K_20261017150142.jpg" }
    ];

    const svgs = {
      women: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3l3 2 3-2 3 7-2 11H8L6 10z"/><path d="M10 5a2 2 0 0 0 4 0"/></svg>`,
      men: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>`,
      sunglass: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="14" r="4"/><circle cx="18" cy="14" r="4"/><path d="M10 14h4"/><path d="M3.5 10.5 5 14"/><path d="M20.5 10.5 19 14"/></svg>`,
      footwear: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 17h20v3H2z"/><path d="M4 17V8l4-2h5l3 5 4 1v5"/></svg>`,
      accessories: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9h12v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>`,
      flower: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2a4 4 0 0 0 0 8 4 4 0 0 0 0-8Z"/><path d="M12 14a4 4 0 0 0 0 8 4 4 0 0 0 0-8Z"/><path d="M2 12a4 4 0 0 0 8 0 4 4 0 0 0-8 0Z"/><path d="M14 12a4 4 0 0 0 8 0 4 4 0 0 0-8 0Z"/></svg>`
    };

    const cartSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.7 12.4a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 7H6"/></svg>`;

    const cats = [
      ["Women", "#f26a1b", svgs.women],
      ["Men", "#0f7f74", svgs.men],
      ["Sunglass", "#c9892b", svgs.sunglass],
      ["Footwear", "#d94a5b", svgs.footwear],
      ["Accessories", "#3a5bd9", svgs.accessories]
    ];

    const prods = [
      ["Court Dress", "Women", 64, svgs.women],
      ["Print Sundress", "Women", 58, svgs.flower],
      ["Rally Tee", "Men", 32, svgs.men],
      ["Track Jacket", "Men", 78, svgs.men],
      ["Aviator Shades", "Sunglass", 45, svgs.sunglass],
      ["Round Shades", "Sunglass", 39, svgs.sunglass],
      ["Court Sneakers", "Footwear", 92, svgs.footwear],
      ["Weekend Tote", "Accessories", 36, svgs.accessories]
    ];

    const categoryGradients = {
      "Women": "linear-gradient(135deg, #ffece2 0%, #ffd7c7 100%)",
      "Men": "linear-gradient(135deg, #e4f5f3 0%, #c8ede8 100%)",
      "Sunglass": "linear-gradient(135deg, #fdf4e4 0%, #fae6c3 100%)",
      "Footwear": "linear-gradient(135deg, #fde9ec 0%, #fad2d9 100%)",
      "Accessories": "linear-gradient(135deg, #ebf0fd 0%, #d8e2fa 100%)"
    };

    let i = 0;
    let filter = "All";

    let cart = [];
    try {
      const savedCart = localStorage.getItem("fplus_cart");
      if (savedCart) cart = JSON.parse(savedCart);
    } catch (e) { }

    let favourites = new Set();
    try {
      const savedFavs = localStorage.getItem("fplus_favs");
      if (savedFavs) favourites = new Set(JSON.parse(savedFavs));
    } catch (e) { }

    let currentUser = null;
    try {
      const savedUser = localStorage.getItem("fplus_user");
      if (savedUser) currentUser = JSON.parse(savedUser);
    } catch (e) { }

    const $ = id => document.getElementById(id);

    function toast(m) {
      const t = $("toast");
      t.textContent = m;
      t.classList.add("show");
      clearTimeout(t._h);
      t._h = setTimeout(() => t.classList.remove("show"), 2400);
    }

    function launchCelebration() {
      const count = 30;
      for (let j = 0; j < count; j++) {
        const p = document.createElement("div");
        p.className = "auth-confetti";
        p.style.left = (Math.random() * 80 + 10) + "vw";
        p.style.top = (Math.random() * 30 + 10) + "vh";
        p.style.backgroundColor = ["#f26a1b", "#0f7f74", "#ffd166", "#e11d48", "#3a5bd9"][Math.floor(Math.random() * 5)];
        p.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1200);
      }
    }

    // 1. MOUSE FOLLOWER & HEADER SCROLL STATE
    const mouseGlow = $("mouseGlowFollower");
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateMouseGlow() {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      if (mouseGlow) {
        mouseGlow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animateMouseGlow);
    }
    animateMouseGlow();

    function handleScrollAndProgress() {
      const header = $("mainHeader");
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 35) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    window.addEventListener("scroll", handleScrollAndProgress, { passive: true });
    handleScrollAndProgress();

    // 2. HERO: 3D PARALLAX & SLIDES
    const heroEl = $("hero");
    const modelContainer = $("model");
    const bigTextEl = document.querySelector(".big");
    const copyEl = document.querySelector(".copy");

    heroEl.addEventListener("mousemove", (e) => {
      const rect = heroEl.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      if (modelContainer) {
        modelContainer.style.transform = `translateX(-50%) translate3d(${normX * 24}px, ${normY * 12}px, 0) rotateY(${normX * 10}deg) rotateX(${-normY * 6}deg)`;
      }
      if (bigTextEl) {
        bigTextEl.style.transform = `translate3d(${-normX * 36}px, ${-normY * 18}px, 0)`;
      }
      if (copyEl) {
        copyEl.style.transform = `translate3d(${normX * 12}px, ${normY * 8}px, 0)`;
      }
    });

    heroEl.addEventListener("mouseleave", () => {
      if (modelContainer) {
        modelContainer.style.transform = "translateX(-50%) translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)";
      }
      if (bigTextEl) bigTextEl.style.transform = "translate3d(0, 0, 0)";
      if (copyEl) copyEl.style.transform = "translate3d(0, 0, 0)";
    });

    function show(n) {
      i = (n + slides.length) % slides.length;
      const s = slides[i];

      const titleEl = $("title");
      const subEl = $("sub");
      const im = $("modelImg");

      titleEl.classList.remove("slide-enter-text");
      subEl.classList.remove("slide-enter-text");
      im.classList.remove("slide-enter-model");

      void titleEl.offsetWidth;

      titleEl.textContent = s.t;
      subEl.textContent = s.s;

      titleEl.classList.add("slide-enter-text");
      subEl.classList.add("slide-enter-text");
      im.classList.add("slide-enter-model");

      $("hero").style.setProperty("--c1", s.c);
      $("hero").style.backgroundImage = 'url("' + s.bg + '")';

      const m = $("model");
      m.classList.remove("noimg");
      im.src = s.img;
      m.querySelector(".ph-text").innerHTML = "Add your image at<br>" + s.img;

      const orb1 = $("heroOrb1");
      if (orb1) orb1.style.backgroundColor = s.c;

      document.querySelectorAll(".thumb").forEach((e, j) => e.classList.toggle("on", j === i));
    }

    $("thumbList").style.cssText = "display:flex;flex-direction:column;gap:10px";
    $("prev").onclick = () => { show(i - 1); reset(); };
    $("next").onclick = () => { show(i + 1); reset(); };

    let timer;
    function reset() {
      clearInterval(timer);
      timer = setInterval(() => show(i + 1), 3500);
    }
    if (!matchMedia("(prefers-reduced-motion:reduce)").matches) reset();
    show(0);

    function setFilter(f) {
      filter = f;
      render();
    }

    function render() {
      const chipsEl = $("chips");
      const resultsEl = $("results");
      const gridEl = $("grid");
      if (!chipsEl || !gridEl) return;

      chipsEl.innerHTML = "";
      ["All", ...cats.map(c => c[0])].forEach(f => {
        const b = document.createElement("button");
        b.className = "chip" + (f === filter ? " on" : "");
        b.textContent = f;
        b.onclick = () => setFilter(f);
        chipsEl.appendChild(b);
      });

      const list = prods.filter(p => filter === "All" || p[1] === filter);
      if (resultsEl) {
        resultsEl.textContent = list.length
          ? `Showing ${list.length} product${list.length > 1 ? "s" : ""}`
          : "No products found. Try another category.";
      }

      gridEl.innerHTML = "";
      list.forEach(p => {
        const isFav = favourites.has(p[0]);
        const d = document.createElement("div");
        d.className = "card";
        d.innerHTML = `
          <div class="ph" style="background:${categoryGradients[p[1]] || 'var(--card)'}">
            <button class="fav-btn ${isFav ? 'active' : ''}" data-name="${p[0]}" aria-label="Favourite ${p[0]}">
              ${isFav ? '&#9829;' : '&#9825;'}
            </button>
            <div class="card-icon">${p[3]}</div>
            <span class="card-category-tag">${p[1]}</span>
          </div>
          <h3>${p[0]}</h3>
          <span>$${p[2]}</span>
          <button class="add" data-name="${p[0]}">Add to Cart</button>
        `;

        const favBtn = d.querySelector(".fav-btn");
        favBtn.onclick = (e) => {
          e.stopPropagation();
          toggleFavourite(p[0], p[1], p[2], p[3], favBtn);
        };

        const addBtn = d.querySelector(".add");
        addBtn.onclick = (e) => {
          e.stopPropagation();
          addToCart(p[0], p[1], p[2], p[3], addBtn);
        };

        gridEl.appendChild(d);
      });
    }

    // REFERENCE SECTIONS INTERACTIVITY (THE BEST COLLECTION & LOOKBOOK)
    function handleRefAdd(name, category, price, icon = svgs.women, sourceBtn = null) {
      addToCart(name, category, price, icon, sourceBtn);
      if (sourceBtn) {
        const originalText = sourceBtn.textContent;
        sourceBtn.textContent = "✓ Added to Bag";
        sourceBtn.style.background = "var(--teal)";
        sourceBtn.style.borderColor = "var(--teal)";
        setTimeout(() => {
          sourceBtn.textContent = originalText;
          sourceBtn.style.background = "";
          sourceBtn.style.borderColor = "";
        }, 1500);
      }
    }

    function handleRefFav(name, category, price, icon = svgs.women, sourceBtn = null) {
      toggleFavourite(name, category, price, icon, sourceBtn);
    }

    // 3. AUTHENTICATION & PROFILE
    function updateUserUI() {
      const userBtn = $("userBtn");
      const mAccountLabel = $("mAccountLabel");
      const mAccountBadge = $("mAccountBadge");

      if (currentUser) {
        userBtn.classList.remove("signin-btn");
        userBtn.innerHTML = `<span class="user-avatar-badge">${currentUser.initials}</span>`;
        userBtn.title = `${currentUser.name} (${currentUser.tier})`;
        userBtn.setAttribute("aria-label", "Account");

        $("profileName").textContent = currentUser.name;
        $("profileEmail").textContent = currentUser.email;
        $("profileAvatar").textContent = currentUser.initials;
        $("profilePoints").textContent = `${currentUser.points} pts`;
        $("profileTierBadge").textContent = currentUser.tier;

        if (mAccountLabel) mAccountLabel.textContent = currentUser.name;
        if (mAccountBadge) mAccountBadge.textContent = currentUser.tier;
      } else {
        userBtn.textContent = "Sign In";
        userBtn.classList.add("signin-btn");
        userBtn.title = "Sign In / Join VIP";
        userBtn.setAttribute("aria-label", "Sign In");

        if (mAccountLabel) mAccountLabel.textContent = "Sign In / Join VIP";
        if (mAccountBadge) mAccountBadge.textContent = "VIP";
      }
    }

    function openAuthModal(defaultTab = "signIn") {
      $("authModal").classList.add("open");
      $("authModal").setAttribute("aria-hidden", "false");
      closeProfileDrawer();
      closeCartDrawer();
      closeFavDrawer();
      closeMobileMenu();
      setAuthTab(defaultTab === "signUp" ? "signUp" : "signIn");
    }

    function closeAuthModal() {
      $("authModal").classList.remove("open");
      $("authModal").setAttribute("aria-hidden", "true");
    }

    function openProfileDrawer() {
      $("profileDrawer").classList.add("open");
      $("profileOverlay").classList.add("open");
      closeAuthModal();
      closeCartDrawer();
      closeFavDrawer();
      closeMobileMenu();
    }

    function closeProfileDrawer() {
      $("profileDrawer").classList.remove("open");
      $("profileOverlay").classList.remove("open");
    }

    function setAuthTab(tab) {
      if (tab === "signIn") {
        $("tabSignIn").classList.add("on");
        $("tabSignUp").classList.remove("on");
        $("signInForm").style.display = "flex";
        $("signUpForm").style.display = "none";
        $("authSubtitle").textContent = "Welcome back to NOSTRA+";
      } else {
        $("tabSignUp").classList.add("on");
        $("tabSignIn").classList.remove("on");
        $("signUpForm").style.display = "flex";
        $("signInForm").style.display = "none";
        $("authSubtitle").textContent = "Create your account for VIP Gold benefits";
      }
    }

    function loginUser(name, email, tier = "VIP Gold", points = 640) {
      const parts = name.trim().split(" ");
      const initials = parts.length > 1
        ? (parts[0][0] + parts[1][0]).toUpperCase()
        : name.slice(0, 2).toUpperCase();

      currentUser = { name, email, initials, tier, points };
      try {
        localStorage.setItem("fplus_user", JSON.stringify(currentUser));
      } catch (e) { }

      updateUserUI();
      launchCelebration();
      toast(`Welcome, ${name}! VIP Gold active.`);
      closeAuthModal();
    }

    function logoutUser() {
      currentUser = null;
      try {
        localStorage.removeItem("fplus_user");
      } catch (e) { }
      updateUserUI();
      closeProfileDrawer();
      toast("You have been signed out.");
    }

    $("userBtn").onclick = () => {
      if (currentUser) {
        openProfileDrawer();
      } else {
        openAuthModal("signIn");
      }
    };

    $("closeAuthModal").onclick = closeAuthModal;
    $("authBackdrop").onclick = closeAuthModal;
    $("closeProfile").onclick = closeProfileDrawer;
    $("profileOverlay").onclick = closeProfileDrawer;
    $("profileShopBtn").onclick = () => {
      closeProfileDrawer();
      location.hash = "#shop";
    };
    $("logoutBtn").onclick = logoutUser;

    $("tabSignIn").onclick = () => setAuthTab("signIn");
    $("tabSignUp").onclick = () => setAuthTab("signUp");

    $("demoLoginBtn").onclick = () => {
      loginUser("Alex Rivera", "alex@nostra.fashion", "VIP Gold", 640);
    };

    $("signInForm").onsubmit = (e) => {
      e.preventDefault();
      const email = $("loginEmail").value.trim();
      const pass = $("loginPass").value.trim();
      if (!email || !pass) {
        toast("Please fill in email and password.");
        return;
      }
      const displayName = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      loginUser(displayName, email, "VIP Gold", 520);
    };

    $("signUpForm").onsubmit = (e) => {
      e.preventDefault();
      const name = $("registerName").value.trim();
      const email = $("registerEmail").value.trim();
      const pass = $("registerPass").value.trim();
      if (!name || !email || pass.length < 6) {
        toast("Please enter your name, email and password (6+ chars).");
        return;
      }
      loginUser(name, email, "VIP Gold", 200);
      toast(`Account created! +200 Welcome VIP points added.`);
    };

    $("toggleLoginPass").onclick = () => {
      const inp = $("loginPass");
      inp.type = inp.type === "password" ? "text" : "password";
    };
    $("toggleRegisterPass").onclick = () => {
      const inp = $("registerPass");
      inp.type = inp.type === "password" ? "text" : "password";
    };

    $("registerPass").addEventListener("input", (e) => {
      const val = e.target.value;
      const fill = $("passStrength");
      if (!val) {
        fill.style.width = "0%";
      } else if (val.length < 6) {
        fill.style.width = "30%";
        fill.style.backgroundColor = "#e11d48";
      } else if (val.length < 10) {
        fill.style.width = "65%";
        fill.style.backgroundColor = "#f59e0b";
      } else {
        fill.style.width = "100%";
        fill.style.backgroundColor = "#10b981";
      }
    });

    $("forgotPassLink").onclick = (e) => {
      e.preventDefault();
      const email = $("loginEmail").value.trim() || "your email";
      toast(`Password reset link sent to ${email}`);
    };

    $("mAccountBtn").onclick = () => {
      closeMobileMenu();
      if (currentUser) {
        openProfileDrawer();
      } else {
        openAuthModal("signIn");
      }
    };

    // 4. CART
    function triggerAddAnimation(sourceBtn, productName) {
      const cartBtn = $("cartBtn");
      if (sourceBtn && cartBtn) {
        const srcRect = sourceBtn.getBoundingClientRect();
        const targetRect = cartBtn.getBoundingClientRect();

        const flyer = document.createElement("div");
        flyer.className = "cart-flyer";
        flyer.innerHTML = cartSvg;
        flyer.style.left = (srcRect.left + srcRect.width / 2 - 16) + "px";
        flyer.style.top = (srcRect.top + srcRect.height / 2 - 16) + "px";
        document.body.appendChild(flyer);

        requestAnimationFrame(() => {
          flyer.style.transform = `translate(${targetRect.left - srcRect.left}px, ${targetRect.top - srcRect.top}px) scale(0.3) rotate(360deg)`;
          flyer.style.opacity = "0.2";
        });

        setTimeout(() => {
          flyer.remove();
          cartBtn.classList.remove("cart-bump");
          void cartBtn.offsetWidth;
          cartBtn.classList.add("cart-bump");
        }, 650);
      }

      if (sourceBtn) {
        const origText = sourceBtn.innerHTML;
        sourceBtn.classList.add("added");
        sourceBtn.innerHTML = "Added!";
        setTimeout(() => {
          sourceBtn.classList.remove("added");
          sourceBtn.innerHTML = origText;
        }, 1100);
      }

      toast(`${productName} added to cart`);
    }

    function addToCart(name, category, price, icon = svgs.women, sourceBtn = null) {
      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name, category, price, icon, qty: 1 });
      }
      saveCart();
      triggerAddAnimation(sourceBtn, name);
      updateCartUI();
    }

    function updateCartQty(name, delta) {
      const item = cart.find(i => i.name === name);
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) {
        cart = cart.filter(i => i.name !== name);
      }
      saveCart();
      updateCartUI();
    }

    function removeFromCart(name) {
      cart = cart.filter(i => i.name !== name);
      saveCart();
      updateCartUI();
      toast("Item removed from cart");
    }

    function clearCart() {
      if (!cart.length) return;
      cart = [];
      saveCart();
      updateCartUI();
      toast("Cart cleared");
    }

    function saveCart() {
      try {
        localStorage.setItem("fplus_cart", JSON.stringify(cart));
      } catch (e) { }
    }

    function updateCartUI() {
      const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
      $("count").textContent = totalCount;
      $("cartDrawerCount").textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;
      $("mCartBadge").textContent = totalCount;

      const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
      $("cartSubtotal").textContent = `$${subtotal.toFixed(2)}`;

      const container = $("cartItems");
      if (!cart.length) {
        container.innerHTML = `
          <div class="empty-drawer">
            <div class="empty-drawer-icon"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.7 12.4a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 7H6"/></svg></div>
            <h4>Your cart is empty</h4>
            <p>Explore our latest performance sportswear and add your favourites!</p>
            <a href="#shop" class="btn" onclick="closeCartDrawer()">Start Shopping &rarr;</a>
          </div>
        `;
        $("cartFooter").style.display = "none";
        return;
      }

      $("cartFooter").style.display = "flex";
      container.innerHTML = "";
      cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "drawer-item";
        div.innerHTML = `
          <div class="item-thumb" style="background:${categoryGradients[item.category] || 'var(--card)'}">
            ${item.icon || svgs.women}
          </div>
          <div class="item-info">
            <h4>${item.name}</h4>
            <p>${item.category}</p>
            <div class="item-price">$${(item.price * item.qty).toFixed(2)}</div>
            <div class="qty-controls">
              <button class="qty-btn qty-minus" aria-label="Decrease">&minus;</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn qty-plus" aria-label="Increase">&plus;</button>
            </div>
          </div>
          <button class="item-remove" aria-label="Remove item">&times;</button>
        `;
        div.querySelector(".qty-minus").onclick = () => updateCartQty(item.name, -1);
        div.querySelector(".qty-plus").onclick = () => updateCartQty(item.name, 1);
        div.querySelector(".item-remove").onclick = () => removeFromCart(item.name);
        container.appendChild(div);
      });
    }

    function openCartDrawer() {
      updateCartUI();
      $("cartDrawer").classList.add("open");
      $("cartOverlay").classList.add("open");
      closeFavDrawer();
      closeProfileDrawer();
      closeAuthModal();
      closeMobileMenu();
    }

    function closeCartDrawer() {
      $("cartDrawer").classList.remove("open");
      $("cartOverlay").classList.remove("open");
    }

    $("cartBtn").onclick = openCartDrawer;
    $("closeCart").onclick = closeCartDrawer;
    $("cartOverlay").onclick = closeCartDrawer;
    $("clearCartBtn").onclick = clearCart;
    $("checkoutBtn").onclick = () => {
      if (!cart.length) return;
      toast("Thank you for your order! Checkout simulated successfully.");
      clearCart();
      closeCartDrawer();
    };

    // 5. FAVOURITES
    function toggleFavourite(name, category, price, icon = svgs.women, btnElement = null) {
      if (favourites.has(name)) {
        favourites.delete(name);
        if (btnElement) {
          btnElement.classList.remove("active");
          btnElement.innerHTML = "&#9825;";
        }
        toast(`${name} removed from favourites`);
      } else {
        favourites.add(name);
        if (btnElement) {
          btnElement.classList.add("active");
          btnElement.classList.add("pop");
          btnElement.innerHTML = "&#9829;";
          setTimeout(() => btnElement.classList.remove("pop"), 400);
        }
        toast(`${name} saved to favourites`);
      }
      saveFavourites();
      updateFavouritesUI();
      document.querySelectorAll(`.fav-btn[data-name="${name}"]`).forEach(b => {
        b.classList.toggle("active", favourites.has(name));
        b.innerHTML = favourites.has(name) ? "&#9829;" : "&#9825;";
      });
    }

    function saveFavourites() {
      try {
        localStorage.setItem("fplus_favs", JSON.stringify(Array.from(favourites)));
      } catch (e) { }
    }

    function updateFavouritesUI() {
      const count = favourites.size;
      $("favBtn").classList.toggle("has-favs", count > 0);
      $("favCount").textContent = count;
      $("favDrawerCount").textContent = `${count} item${count === 1 ? '' : 's'}`;
      $("mFavBadge").textContent = count;

      const container = $("favItems");
      if (!count) {
        container.innerHTML = `
          <div class="empty-drawer">
            <div class="empty-drawer-icon"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/></svg></div>
            <h4>No favourites yet</h4>
            <p>Tap the heart icon on any product to save it here for quick access!</p>
            <a href="#shop" class="btn" onclick="closeFavDrawer()">Explore Styles &rarr;</a>
          </div>
        `;
        return;
      }

      container.innerHTML = "";
      favourites.forEach(name => {
        const prodData = prods.find(p => p[0] === name);
        const category = prodData ? prodData[1] : "Apparel";
        const price = prodData ? prodData[2] : 50;
        const icon = prodData ? prodData[3] : svgs.women;

        const div = document.createElement("div");
        div.className = "drawer-item";
        div.innerHTML = `
          <div class="item-thumb" style="background:${categoryGradients[category] || 'var(--card)'}">
            ${icon}
          </div>
          <div class="item-info">
            <h4>${name}</h4>
            <p>${category}</p>
            <div class="item-price">$${price}</div>
            <button class="btn btn-fav-add" style="padding:6px 14px;font-size:11px;margin-top:6px">Add to Cart</button>
          </div>
          <button class="item-remove" aria-label="Remove favourite">&times;</button>
        `;
        div.querySelector(".btn-fav-add").onclick = (e) => {
          addToCart(name, category, price, icon, e.target);
        };
        div.querySelector(".item-remove").onclick = () => {
          toggleFavourite(name, category, price, icon);
        };
        container.appendChild(div);
      });
    }

    function openFavDrawer() {
      updateFavouritesUI();
      $("favDrawer").classList.add("open");
      $("favOverlay").classList.add("open");
      closeCartDrawer();
      closeProfileDrawer();
      closeAuthModal();
      closeMobileMenu();
    }

    function closeFavDrawer() {
      $("favDrawer").classList.remove("open");
      $("favOverlay").classList.remove("open");
    }

    $("favBtn").onclick = openFavDrawer;
    $("closeFav").onclick = closeFavDrawer;
    $("favOverlay").onclick = closeFavDrawer;
    $("clearFavBtn").onclick = () => {
      if (!favourites.size) return;
      favourites.clear();
      saveFavourites();
      updateFavouritesUI();
      render();
      toast("Favourites cleared");
    };
    $("addAllFavToCartBtn").onclick = (e) => {
      if (!favourites.size) {
        toast("No favourites to add");
        return;
      }
      favourites.forEach(name => {
        const p = prods.find(item => item[0] === name);
        if (p) addToCart(p[0], p[1], p[2], p[3], null);
      });
      triggerAddAnimation(e.target, "All favourites");
      openCartDrawer();
    };

    // 6. MOBILE MENU
    function toggleMobileMenu() {
      const isOpen = $("mobileDrawer").classList.toggle("open");
      $("mobileOverlay").classList.toggle("open", isOpen);
      $("menuBtn").classList.toggle("active", isOpen);
    }

    function closeMobileMenu() {
      $("mobileDrawer").classList.remove("open");
      $("mobileOverlay").classList.remove("open");
      $("menuBtn").classList.remove("active");
    }

    $("menuBtn").onclick = toggleMobileMenu;
    $("closeMobileMenu").onclick = closeMobileMenu;
    $("mobileOverlay").onclick = closeMobileMenu;

    document.querySelectorAll(".mobile-nav-link").forEach(a => {
      a.onclick = () => {
        if (a.dataset.f) setFilter(a.dataset.f);
        document.querySelectorAll(".mobile-nav-link").forEach(l => l.classList.remove("on"));
        a.classList.add("on");
        closeMobileMenu();
      };
    });

    $("mCartBtn").onclick = () => {
      closeMobileMenu();
      openCartDrawer();
    };

    $("mFavBtn").onclick = () => {
      closeMobileMenu();
      openFavDrawer();
    };

    // Open sign-in modal when arriving from collections.html (index.html#signin)
    window.addEventListener("load", () => {
      if (location.hash === "#signin") {
        history.replaceState(null, "", location.pathname + location.search);
        window.scrollTo(0, 0);
        setTimeout(() => { if (currentUser) openProfileDrawer(); else openAuthModal("signIn"); }, 300);
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeCartDrawer();
        closeFavDrawer();
        closeAuthModal();
        closeProfileDrawer();
        closeMobileMenu();
      }
    });

    // =========================================================
    // 3D CATEGORIES CARD DECK & CENTER POP-UP ANIMATION LOGIC
    // =========================================================
    const cardDeckData = [
      { id: "neon", title: "NEON DREAMS", fullTitle: "NEON DREAMS CAPSULE", cat: "All", tag: "Cyber Street & Ambient Glow", count: "14 Items", desc: "Futuristic digital edge meets nocturnal street culture. High-contrast luminescence and technical silhouettes." },
      { id: "urban", title: "URBAN STUDIO", fullTitle: "URBAN STUDIO COUTURE", cat: "Accessories", tag: "Minimalist Layers & Architecture", count: "18 Items", desc: "Structured minimalist silhouettes and calm architectural lines made for modern atelier living." },
      { id: "studio", title: "STUDIO LIGHT", fullTitle: "STUDIO LIGHT COLLECTION", cat: "Sunglass", tag: "Iridescent Lilac & Portraiture", count: "24 Items", desc: "Dramatic studio lighting, bold high-fashion portraits, and iridescent lilac hues tailored for high impact." },
      { id: "golden", title: "GOLDEN HOUR", fullTitle: "GOLDEN HOUR GEAR", cat: "Men", tag: "Scenic Earth & High Sun Warmth", count: "20 Items", desc: "Sun-drenched alpine warmth and rugged performance tailoring built for elevation and motion." },
      { id: "monochrome", title: "MONOCHROME", fullTitle: "MONOCHROME ATELIER", cat: "Women", tag: "Artisanal Haute Drape & Wave Contour", count: "30 Items", desc: "Sculptural draping and fluid wave spectrums. Pure artistic expression and refined form." }
    ];

    let deckMode = "scatter"; // "scatter" (Pop-Up Grid) or "stack" (3D Stack)
    let activeCardIndex = 2; // STUDIO LIGHT in center by default
    let cardSlots = { 0: "tl", 1: "tr", 2: "center", 3: "bl", 4: "br" };

    function applyDeckState() {
      const cards = document.querySelectorAll(".deck-card");
      if (!cards.length) return;

      cards.forEach((card) => {
        const idx = parseInt(card.dataset.index, 10);
        if (deckMode === "scatter") {
          const slot = cardSlots[idx] || "tl";
          card.setAttribute("data-slot", slot);
          card.classList.toggle("is-front", slot === "center");
        } else {
          // Stack mode: activeCardIndex is pos 4 (front)
          const pos = (idx - activeCardIndex + 4 + 5) % 5;
          card.setAttribute("data-pos", pos);
          card.classList.toggle("is-front", pos === 4);
        }
      });

      // Update pill tabs
      document.querySelectorAll(".cat-tab-pill").forEach((pill) => {
        const idx = parseInt(pill.dataset.index, 10);
        pill.classList.toggle("active", idx === activeCardIndex);
      });

      // Update active panel details
      const activeData = cardDeckData[activeCardIndex] || cardDeckData[2];
      const titleEl = $("activeCatTitle");
      const descEl = $("activeCatDesc");
      const countEl = $("activeCatCount");
      const exploreBtn = $("btnExploreCat");

      if (titleEl) titleEl.textContent = activeData.fullTitle;
      if (descEl) descEl.textContent = activeData.desc;
      if (countEl) countEl.textContent = activeData.count;
      if (exploreBtn) {
        exploreBtn.innerHTML = `Explore ${activeData.title} &rarr;`;
        exploreBtn.onclick = () => {
          const catMap = {
            "neon": "t-shirt",
            "urban": "shirts",
            "studio": "glasses",
            "golden": "jacktes",
            "monochrome": "pants"
          };
          const targetCat = catMap[activeData.id] || "";
          location.href = targetCat ? `collections.html?category=${targetCat}` : "collections.html";
        };
      }
    }

    function popCardToCenter(clickedIdx) {
      if (cardSlots[clickedIdx] !== "center") {
        // Find whichever card currently has the 'center' slot
        const prevCenterStr = Object.keys(cardSlots).find(k => cardSlots[k] === "center");
        const prevCenter = parseInt(prevCenterStr !== undefined ? prevCenterStr : 2, 10);
        const clickedSlot = cardSlots[clickedIdx] || "tl";

        // Swap slots: previous center gets clicked card's slot, clicked card gets 'center'
        cardSlots[prevCenter] = clickedSlot;
        cardSlots[clickedIdx] = "center";
      }

      activeCardIndex = clickedIdx;
      applyDeckState();

      // Trigger pop animation feedback on the popped center card
      const centerCard = document.querySelector('.deck-card[data-slot="center"]');
      if (centerCard) {
        centerCard.style.transition = "transform 0.65s cubic-bezier(0.34, 1.45, 0.64, 1), box-shadow 0.65s ease";
        centerCard.classList.remove("card-pop-bounce");
        void centerCard.offsetWidth; // force reflow
        centerCard.classList.add("card-pop-bounce");
        setTimeout(() => {
          centerCard.classList.remove("card-pop-bounce");
        }, 600);
      }
    }

    function handleDeckCardClick(index) {
      if (deckMode === "scatter") {
        popCardToCenter(index);
      } else {
        activeCardIndex = index;
        applyDeckState();
        const stage = $("deck3dStage");
        if (stage) {
          stage.classList.remove("animate-idle");
          clearTimeout(stage._t);
          stage._t = setTimeout(() => {
            if (deckMode === "stack") stage.classList.add("animate-idle");
          }, 1200);
        }
      }
    }

    function handleCategoryPillClick(index) {
      if (deckMode === "scatter") {
        popCardToCenter(index);
      } else {
        activeCardIndex = index;
        applyDeckState();
      }
    }

    // Backward-compatible alias
    function selectCategoryCard(index) {
      handleDeckCardClick(index);
    }

    function setDeckMode(mode) {
      deckMode = mode;
      const stage = $("deck3dStage");
      const btnScatter = $("btnModeScatter");
      const btnStack = $("btnModeStack");

      if (btnScatter) btnScatter.classList.toggle("active", mode === "scatter");
      if (btnStack) btnStack.classList.toggle("active", mode === "stack");

      if (stage) {
        if (mode === "scatter") {
          stage.classList.remove("mode-stack", "animate-idle");
          stage.classList.add("mode-scatter");
          stage.style.transform = "";
        } else {
          stage.classList.remove("mode-scatter");
          stage.classList.add("mode-stack", "animate-idle");
          stage.style.transform = "rotateX(16deg) rotateY(-22deg) rotateZ(8deg)";
        }
      }

      applyDeckState();
    }

    // 3D Gyroscope Mouse Parallax on Stage (active only in stack mode)
    const stageWrapper = $("deckStageWrapper");
    const stage = $("deck3dStage");
    if (stageWrapper && stage) {
      stageWrapper.addEventListener("mousemove", (e) => {
        if (deckMode !== "stack") return;
        const rect = stageWrapper.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        stage.style.transform = `rotateX(${16 - normY * 14}deg) rotateY(${-22 + normX * 18}deg) rotateZ(${8 + normX * 3}deg)`;
      });

      stageWrapper.addEventListener("mouseleave", () => {
        if (deckMode === "stack") {
          stage.style.transform = "rotateX(16deg) rotateY(-22deg) rotateZ(8deg)";
        } else {
          stage.style.transform = "";
        }
      });
    }

    // Initialize 3D deck state
    applyDeckState();

    // Newsletter subscription
    const subBtn = $("sub-btn");
    if (subBtn) {
      subBtn.onclick = () => {
        const email = $("email").value.trim();
        if (email && email.includes("@")) {
          toast("Welcome to the NOSTRA VIP circle!");
          $("email").value = "";
          launchCelebration();
        } else {
          toast("Please enter a valid email address.");
        }
      };
    }

    // Reference section "Start your project" VIP CTA
    const startProjectBtn = $("startProjectBtn");
    if (startProjectBtn) {
      startProjectBtn.onclick = () => { location.href = "contact.html"; };
    }

    render();
    updateCartUI();
    updateFavouritesUI();
    updateUserUI();

    document.querySelectorAll("nav a").forEach(a => {
      a.addEventListener("click", () => {
        document.querySelectorAll("nav a").forEach(x => x.classList.remove("on"));
        a.classList.add("on");
      });
    });
  
    // Expose functions used by inline onclick="..." attributes
    window.closeCartDrawer = closeCartDrawer;
    window.closeFavDrawer = closeFavDrawer;
    window.handleDeckCardClick = handleDeckCardClick;
    window.handleRefAdd = handleRefAdd;
    window.handleRefFav = handleRefFav;
    window.svgs = svgs;
  })();
}

/* ==========================================================================
   PAGE: COLLECTIONS
   ========================================================================== */
if (document.documentElement.classList.contains("page-collections")) {
  (function () {
    // -------------------------------------------------------------
    // 1. PRODUCT CATALOG DATASET (73 REAL ASSETS & CURATED EDITORIALS)
    // -------------------------------------------------------------
    const PRODUCTS = [
      // == ATELIER JACKETS & COATS (15 SIGNATURE PIECES) ==
      {
        id: "mj_01",
        name: "Technical Utility Field Bomber",
        gender: "men",
        category: "jacktes",
        price: 185,
        originalPrice: 220,
        badge: "NEW",
        rating: 4.9,
        reviews: 38,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["S", "M", "L", "XL"],
        image: "mj/0c5d1592181bfb592cd8dd44367f85b9.jpg",
        fabric: "High-Density Weatherproof Japanese Twill",
        description: "Engineered with articulated raglan sleeves, stormproof taped seams, and signature matte titanium hardware."
      },
      {
        id: "mj_02",
        name: "Sartorial Architectural Trench",
        gender: "men",
        category: "jacktes",
        price: 240,
        originalPrice: null,
        badge: "BESTSELLER",
        rating: 4.8,
        reviews: 52,
        color: "Olive",
        colorHex: "#3f6212",
        sizes: ["M", "L", "XL"],
        image: "mj/49432250a4dda5c2eff6bfa612a02ee6.jpg",
        fabric: "Virgin Italian Wool Blend, 380 GSM",
        description: "Classic double-breasted trench updated with a relaxed dropped-shoulder silhouette and belted cuff details."
      },
      {
        id: "mj_03",
        name: "Minimalist Leather Flight Jacket",
        gender: "men",
        category: "jacktes",
        price: 295,
        originalPrice: 340,
        badge: "LIMITED",
        rating: 5.0,
        reviews: 24,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["S", "M", "L"],
        image: "mj/mj.jpg",
        fabric: "Supple Full-Grain Lambskin with Cupro Lining",
        description: "Handcrafted blouson jacket featuring a rib-knit hem, streamlined zip closure, and interior welt pockets."
      },
      {
        id: "mj_04",
        name: "Oversized Studio Wool Blazer",
        gender: "men",
        category: "jacktes",
        price: 210,
        originalPrice: null,
        badge: null,
        rating: 4.7,
        reviews: 19,
        color: "Navy",
        colorHex: "#1e3a8a",
        sizes: ["S", "M", "L", "XL"],
        image: "mj/mj..jpg",
        fabric: "100% Merino Wool Flannel",
        description: "Modern unstructured blazer with peak lapels and horn buttons. Tailored for effortless day-to-evening wear."
      },
      {
        id: "mj_05",
        name: "Insulated Quilted Overshirt",
        gender: "men",
        category: "jacktes",
        price: 160,
        originalPrice: 195,
        badge: "SALE",
        rating: 4.6,
        reviews: 28,
        color: "Earthy",
        colorHex: "#78716c",
        sizes: ["M", "L", "XL"],
        image: "mj/mj...jpg",
        fabric: "Ripstop Nylon with Recycled Down Insulation",
        description: "Thermal outerwear hybrid functioning seamlessly as a lightweight jacket or mid-layer in cold weather."
      },
      {
        id: "mj_06",
        name: "Sculptural Hooded Windbreaker",
        gender: "men",
        category: "jacktes",
        price: 175,
        originalPrice: null,
        badge: "NEW",
        rating: 4.9,
        reviews: 14,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["S", "M", "L"],
        image: "mj/mj....jpg",
        fabric: "Micro-Ripstop Water-Repellent Shell",
        description: "Geometric paneling, dual-direction waterproof zips, and an adjustable ergonomic storm hood."
      },
      {
        id: "mj_07",
        name: "Tailored Hourglass Studio Blazer",
        gender: "women",
        category: "jacktes",
        price: 225,
        originalPrice: null,
        badge: "BESTSELLER",
        rating: 4.8,
        reviews: 44,
        color: "Rose",
        colorHex: "#fda4af",
        sizes: ["XS", "S", "M"],
        image: "mj/mj......jpg",
        fabric: "Structured Crepe Fabric with Silk Lining",
        description: "Sculpted shoulder pads and nipped waist contouring for powerful architectural elegance."
      },
      {
        id: "mj_08",
        name: "Cropped Minimalist Puffer Jacket",
        gender: "women",
        category: "jacktes",
        price: 195,
        originalPrice: null,
        badge: null,
        rating: 4.7,
        reviews: 22,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["S", "M", "L"],
        image: "mj/mj.......jpg",
        fabric: "Matte Technical Satin with Eco-Down",
        description: "Voluminous high-stand collar and bungee drawstring hem for adaptable styling in modern temperatures."
      },
      {
        id: "mj_09",
        name: "Shearling Collar Heritage Coat",
        gender: "women",
        category: "jacktes",
        price: 320,
        originalPrice: 380,
        badge: "LIMITED",
        rating: 5.0,
        reviews: 16,
        color: "Earthy",
        colorHex: "#78716c",
        sizes: ["S", "M"],
        image: "mj/mj.........jpg",
        fabric: "Natural Toscana Shearling & Nubuck Leather",
        description: "An heirloom archival masterpiece featuring plush shearling trims and tailored leather welt pockets."
      },
      {
        id: "mj_10",
        name: "Atelier Double-Breasted Peacoat",
        gender: "men",
        category: "jacktes",
        price: 275,
        originalPrice: 310,
        badge: "NEW",
        rating: 4.9,
        reviews: 31,
        color: "Navy",
        colorHex: "#1e3a8a",
        sizes: ["S", "M", "L", "XL"],
        image: "mj/mj...........jpg",
        fabric: "Heavyweight 800 GSM Melange Wool",
        description: "Broad notched lapels, anchored anchor buttons, and dual hand-warmer fleece-lined welt pockets."
      },
      {
        id: "mj_11",
        name: "Fluid Drape Cashmere Wrap Coat",
        gender: "women",
        category: "jacktes",
        price: 290,
        originalPrice: 335,
        badge: "BESTSELLER",
        rating: 4.9,
        reviews: 40,
        color: "White",
        colorHex: "#f8fafc",
        sizes: ["XS", "S", "M", "L"],
        image: "mj/mj.............jpg",
        fabric: "Pure Mongolian Cashmere Blend",
        description: "Cascading shawl collar with a detachable tie belt that cinches gracefully for classic cold-weather silhouette."
      },
      {
        id: "mj_12",
        name: "Heritage Corduroy Workwear Jacket",
        gender: "men",
        category: "jacktes",
        price: 170,
        originalPrice: null,
        badge: null,
        rating: 4.7,
        reviews: 25,
        color: "Earthy",
        colorHex: "#78716c",
        sizes: ["M", "L", "XL"],
        image: "mj/mj...............jpg",
        fabric: "8-Wale Vintage Cotton Corduroy",
        description: "Chore-coat inspired workwear jacket with four front utility patch pockets and branded antique bronze studs."
      },
      {
        id: "mj_13",
        name: "Heavyweight Melton Wool Bomber",
        gender: "unisex",
        category: "jacktes",
        price: 230,
        originalPrice: 260,
        badge: "NEW",
        rating: 4.8,
        reviews: 33,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["S", "M", "L", "XL"],
        image: "mj/mj.................jpg",
        fabric: "Dense Melton Wool with Cupro Satin Lining",
        description: "Ribbed stand collar, articulated raglan sleeves, and heavy-gauge double zip closure."
      },
      {
        id: "mj_14",
        name: "Tailored Leather Biker Blouson",
        gender: "women",
        category: "jacktes",
        price: 310,
        originalPrice: 360,
        badge: "LIMITED",
        rating: 5.0,
        reviews: 18,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["XS", "S", "M"],
        image: "mj/mj...................jpg",
        fabric: "Full-Grain Waxed Italian Calfskin",
        description: "Asymmetric front zipper, snap-down notch lapels, and zipped expanding gussets at cuffs."
      },
      {
        id: "mj_15",
        name: "Editorial Longline Cashmere Duster",
        gender: "unisex",
        category: "jacktes",
        price: 330,
        originalPrice: 385,
        badge: "BESTSELLER",
        rating: 4.9,
        reviews: 47,
        color: "Olive",
        colorHex: "#3f6212",
        sizes: ["S", "M", "L"],
        image: "mj/mj.....................jpg",
        fabric: "Double-Faced Wool & Cashmere Loom",
        description: "Clean edge-to-edge silhouette with deep side vents, unstructured shoulders, and tonal sash tie."
      },

      // == MEN'S SHIRTS ==
      {
        id: "ms_01",
        name: "Relaxed Linen Camp Collar Shirt",
        gender: "men",
        category: "shirts",
        price: 85,
        originalPrice: null,
        badge: "NEW",
        rating: 4.9,
        reviews: 64,
        color: "White",
        colorHex: "#f8fafc",
        sizes: ["S", "M", "L", "XL"],
        image: "mshirt/ms (1).jpg",
        fabric: "100% Normandy Pure French Linen",
        description: "Breezy open collar with a straight boxy hem, shell buttons, and garment-washed softness."
      },
      {
        id: "ms_02",
        name: "Structured Oxford Overshirt",
        gender: "men",
        category: "shirts",
        price: 92,
        originalPrice: 110,
        badge: "BESTSELLER",
        rating: 4.8,
        reviews: 82,
        color: "Navy",
        colorHex: "#1e3a8a",
        sizes: ["S", "M", "L", "XL"],
        image: "mshirt/ms (2).jpg",
        fabric: "Heavyweight 2-Ply Oxford Cotton",
        description: "Robust everyday tailoring engineered with reinforced stitching and a curved split yoke."
      },
      {
        id: "ms_03",
        name: "Monogram Silk Resort Shirt",
        gender: "men",
        category: "shirts",
        price: 120,
        originalPrice: null,
        badge: "LIMITED",
        rating: 5.0,
        reviews: 29,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["M", "L", "XL"],
        image: "mshirt/ms (3).jpg",
        fabric: "100% Mulberry Silk Twill",
        description: "Subtle tone-on-tone NOSTRA atelier crest jacquard with fluid drape and mother-of-pearl buttons."
      },
      {
        id: "ms_04",
        name: "Textured Seersucker Summer Shirt",
        gender: "men",
        category: "shirts",
        price: 78,
        originalPrice: null,
        badge: null,
        rating: 4.6,
        reviews: 18,
        color: "Olive",
        colorHex: "#3f6212",
        sizes: ["S", "M", "L"],
        image: "mshirt/ms (4).jpg",
        fabric: "Organic Crinkle Cotton Seersucker",
        description: "Breathable puckered texture that floats off the body in humid metropolitan conditions."
      },
      {
        id: "ms_05",
        name: "Minimalist Mandarin Collar Shirt",
        gender: "men",
        category: "shirts",
        price: 88,
        originalPrice: 105,
        badge: "SALE",
        rating: 4.7,
        reviews: 33,
        color: "White",
        colorHex: "#f8fafc",
        sizes: ["S", "M", "L", "XL"],
        image: "mshirt/ms (5).jpg",
        fabric: "Crisp Egyptian Giza Cotton",
        description: "Clean band collar with concealed front placket for an immaculate architectural aesthetic."
      },
      {
        id: "ms_06",
        name: "Flannel Plaid Studio Overshirt",
        gender: "men",
        category: "shirts",
        price: 98,
        originalPrice: null,
        badge: null,
        rating: 4.8,
        reviews: 27,
        color: "Earthy",
        colorHex: "#78716c",
        sizes: ["M", "L", "XL"],
        image: "mshirt/ms (6).jpg",
        fabric: "Brushed Cotton Twill Flannel",
        description: "Dual chest flap pockets and thick horn buttons, cut for easy layering over our essential tees."
      },

      // == WOMEN'S SHIRTS ==
      {
        id: "ws_01",
        name: "Asymmetric Drape Poplin Blouse",
        gender: "women",
        category: "shirts",
        price: 95,
        originalPrice: null,
        badge: "NEW",
        rating: 4.9,
        reviews: 41,
        color: "White",
        colorHex: "#f8fafc",
        sizes: ["XS", "S", "M", "L"],
        image: "wshirt/04282f4304721ca4b34d885d36c3230a.jpg",
        fabric: "Fine Organic Cotton Poplin",
        description: "Dramatic diagonal hemline with buttoned side vents and extended French cuffs."
      },
      {
        id: "ws_02",
        name: "Fluid Silk Buttoned Tunic",
        gender: "women",
        category: "shirts",
        price: 135,
        originalPrice: 160,
        badge: "BESTSELLER",
        rating: 4.9,
        reviews: 58,
        color: "Lilac",
        colorHex: "#c084fc",
        sizes: ["XS", "S", "M"],
        image: "wshirt/23ffd8c6eda283c8ae3cb4dc256ff36b.jpg",
        fabric: "100% Habotai Sand-Washed Silk",
        description: "Soft luminescence with a delicate band collar and elongated relaxed silhouette."
      },
      {
        id: "ws_03",
        name: "Oversized Boyfriend Linen Shirt",
        gender: "women",
        category: "shirts",
        price: 88,
        originalPrice: null,
        badge: null,
        rating: 4.7,
        reviews: 35,
        color: "Amber",
        colorHex: "#d97706",
        sizes: ["S", "M", "L"],
        image: "wshirt/399b98e0eb1126be4bb4950a3d54c795.jpg",
        fabric: "Pre-Washed Pure European Flax",
        description: "Generous dropped shoulders and rolled-cuff styling tailored for relaxed luxury."
      },
      {
        id: "ws_04",
        name: "Sculpted Collar Wrap Blouse",
        gender: "women",
        category: "shirts",
        price: 105,
        originalPrice: null,
        badge: "LIMITED",
        rating: 4.8,
        reviews: 20,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["XS", "S", "M"],
        image: "wshirt/3b8ac50be54dd263ae8e52386194cb1c.jpg",
        fabric: "Sateen Weave Organic Cotton",
        description: "Architectural crossover neckline with self-tie waist ribbons that sculpt the silhouette."
      },
      {
        id: "ws_05",
        name: "Pleated Cuff Evening Shirt",
        gender: "women",
        category: "shirts",
        price: 110,
        originalPrice: 130,
        badge: "SALE",
        rating: 4.8,
        reviews: 17,
        color: "Olive",
        colorHex: "#3f6212",
        sizes: ["S", "M", "L"],
        image: "wshirt/6c2dd2754c57c984bd386dafcf4f7b42.jpg",
        fabric: "Viscose & Mulberry Silk Blend",
        description: "Intricate accordion-pleated cuffs and high-neck button closure with refined tonal sheen."
      },
      {
        id: "ws_06",
        name: "Minimalist Resort Camp Blouse",
        gender: "women",
        category: "shirts",
        price: 82,
        originalPrice: null,
        badge: null,
        rating: 4.6,
        reviews: 23,
        color: "Rose",
        colorHex: "#fda4af",
        sizes: ["XS", "S", "M", "L"],
        image: "wshirt/71f87c142864362b1701528d1d8cc806.jpg",
        fabric: "Modal & Lyocell Featherweight Weave",
        description: "Soft open lapel collar, side slit details, and breathable fabric that stays crisp all day."
      },

      // == MEN'S PANTS ==
      {
        id: "mp_01",
        name: "Double-Pleated Tailored Trouser",
        gender: "men",
        category: "pants",
        price: 125,
        originalPrice: null,
        badge: "NEW",
        rating: 4.9,
        reviews: 73,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["S", "M", "L", "XL"],
        image: "mpant/010d7acc06f439f629ac9f8a529cbc29.jpg",
        fabric: "Italian Tropical Wool Blend with Stretch",
        description: "Deep forward pleats, tapered ankle break, and an adjustable side-tab waistband."
      },
      {
        id: "mp_02",
        name: "Wide-Leg Relaxed Chino",
        gender: "men",
        category: "pants",
        price: 105,
        originalPrice: 125,
        badge: "BESTSELLER",
        rating: 4.8,
        reviews: 89,
        color: "Earthy",
        colorHex: "#78716c",
        sizes: ["S", "M", "L", "XL"],
        image: "mpant/1370116b1d9afb23d233c7a96b0355b5.jpg",
        fabric: "Heavyweight Organic Cotton Drill",
        description: "Straight-cut wide leg with slash pockets and reinforced bar-tacks for enduring utility."
      },
      {
        id: "mp_03",
        name: "Technical Studio Cargo Trouser",
        gender: "men",
        category: "pants",
        price: 135,
        originalPrice: null,
        badge: "LIMITED",
        rating: 4.9,
        reviews: 42,
        color: "Olive",
        colorHex: "#3f6212",
        sizes: ["M", "L", "XL"],
        image: "mpant/295e23618e023859e0bb58a3ebecea3a.jpg",
        fabric: "Water-Resistant Cotton-Cordura Weave",
        description: "Low-profile gusseted cargo pockets with magnetic closures and adjustable ankle toggles."
      },
      {
        id: "mp_04",
        name: "Raw Japanese Selvedge Denim",
        gender: "men",
        category: "pants",
        price: 155,
        originalPrice: null,
        badge: "NEW",
        rating: 5.0,
        reviews: 55,
        color: "Navy",
        colorHex: "#1e3a8a",
        sizes: ["S", "M", "L", "XL"],
        image: "mpant/2cd55bec900d35af351f9b707559002f.jpg",
        fabric: "14 oz. Kurabo Mills Shuttle-Loomed Denim",
        description: "Classic 5-pocket architecture with red selvedge id line, copper rivets, and leather back patch."
      },
      {
        id: "mp_05",
        name: "Relaxed Drawstring Linen Pant",
        gender: "men",
        category: "pants",
        price: 95,
        originalPrice: 115,
        badge: "SALE",
        rating: 4.7,
        reviews: 31,
        color: "White",
        colorHex: "#f8fafc",
        sizes: ["S", "M", "L"],
        image: "mpant/3b3f051682719efbfc463179390b7dd6.jpg",
        fabric: "100% Pre-Shrunk Breathable Linen",
        description: "Elasticated back waistband with woven cotton drawstring, tailored for relaxed resort ease."
      },

      // == WOMEN'S PANTS ==
      {
        id: "wp_01",
        name: "High-Rise Wide Palazzo Trouser",
        gender: "women",
        category: "pants",
        price: 130,
        originalPrice: null,
        badge: "NEW",
        rating: 4.9,
        reviews: 62,
        color: "White",
        colorHex: "#f8fafc",
        sizes: ["XS", "S", "M", "L"],
        image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=800&auto=format&fit=crop&q=80",
        fabric: "Fluid Crepe Drape with Satin Pocket Bags",
        description: "Ultra high-waist rise that cascades into a wide sweeping hemline, elongating the silhouette."
      },
      {
        id: "wp_02",
        name: "Tailored Pleated Studio Pant",
        gender: "women",
        category: "pants",
        price: 118,
        originalPrice: 140,
        badge: "BESTSELLER",
        rating: 4.8,
        reviews: 74,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["XS", "S", "M", "L"],
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=80",
        fabric: "Structured Wool-Twill Blend",
        description: "Clean pressed front creases, blind-stitched hem, and an interior curtain waistband for luxury comfort."
      },
      {
        id: "wp_03",
        name: "Sculpted Flare Linen Trousers",
        gender: "women",
        category: "pants",
        price: 110,
        originalPrice: null,
        badge: null,
        rating: 4.7,
        reviews: 29,
        color: "Earthy",
        colorHex: "#78716c",
        sizes: ["XS", "S", "M"],
        image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&auto=format&fit=crop&q=80",
        fabric: "Pure Belgian Linen & Cotton Blend",
        description: "Fitted through the hip with a subtle architectural flare at the hem and concealed side-zip closure."
      },
      {
        id: "wp_04",
        name: "Relaxed Straight-Leg Raw Denim",
        gender: "women",
        category: "pants",
        price: 125,
        originalPrice: null,
        badge: "LIMITED",
        rating: 4.8,
        reviews: 36,
        color: "Navy",
        colorHex: "#1e3a8a",
        sizes: ["XS", "S", "M", "L"],
        image: "mpant/3e119da2ac0cfc1debe7466e829a0f7e.jpg",
        fabric: "12 oz. Organic Cotton Selvedge",
        description: "Vintage 90s straight leg silhouette with high rise, copper hardware, and slight taper."
      },

      // == T-SHIRTS (MEN, WOMEN, UNISEX) ==
      {
        id: "ts_01",
        name: "Heavyweight Boxy Drop-Shoulder Tee",
        gender: "unisex",
        category: "t-shirt",
        price: 48,
        originalPrice: null,
        badge: "NEW",
        rating: 4.9,
        reviews: 115,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["XS", "S", "M", "L", "XL"],
        image: "tshirt/07c13f0804c058819c839fc5f4fbbc86.jpg",
        fabric: "300 GSM Heavy Combed Cotton",
        description: "Thick 1-inch ribbed collar, dropped shoulders, and a structured silhouette that maintains its form."
      },
      {
        id: "ts_02",
        name: "Vintage Mineral Wash Atelier Tee",
        gender: "men",
        category: "t-shirt",
        price: 54,
        originalPrice: 65,
        badge: "BESTSELLER",
        rating: 4.8,
        reviews: 94,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["S", "M", "L", "XL"],
        image: "tshirt/210958ed0680d7af1a61ebc11124a068.jpg",
        fabric: "Custom Acid-Washed Organic Cotton",
        description: "Each garment features unique mineral fade variations and hand-distressed collar edges."
      },
      {
        id: "ts_03",
        name: "Pure Pima Cotton Essential Tee",
        gender: "unisex",
        category: "t-shirt",
        price: 42,
        originalPrice: null,
        badge: null,
        rating: 4.9,
        reviews: 86,
        color: "White",
        colorHex: "#f8fafc",
        sizes: ["XS", "S", "M", "L", "XL"],
        image: "tshirt/2aab885689403d0732d0068c8fcceeb4.jpg",
        fabric: "100% Peruvian Long-Staple Pima Cotton",
        description: "Silky hand-feel with natural breathability and reinforced twin-needle stitching."
      },
      {
        id: "ts_04",
        name: "Nocturnal Graphic Capsule Tee",
        gender: "men",
        category: "t-shirt",
        price: 52,
        originalPrice: null,
        badge: "LIMITED",
        rating: 4.8,
        reviews: 47,
        color: "Earthy",
        colorHex: "#78716c",
        sizes: ["M", "L", "XL"],
        image: "tshirt/33de2651549a7eea670c6fa58d2b89e3.jpg",
        fabric: "280 GSM Organic Jersey Cotton",
        description: "Abstract cyber geometry silkscreen on back, minimal NOSTRA coordinates embroidered on front."
      },
      {
        id: "ts_05",
        name: "Boxy Cropped Atelier Tee",
        gender: "women",
        category: "t-shirt",
        price: 45,
        originalPrice: null,
        badge: "NEW",
        rating: 4.8,
        reviews: 52,
        color: "White",
        colorHex: "#f8fafc",
        sizes: ["XS", "S", "M", "L"],
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
        fabric: "Heavy Jersey Cotton, 260 GSM",
        description: "Slightly cropped hem designed to align precisely with high-waisted trousers."
      },
      {
        id: "ts_06",
        name: "Ribbed Mock-Neck Studio Tee",
        gender: "women",
        category: "t-shirt",
        price: 48,
        originalPrice: 60,
        badge: "SALE",
        rating: 4.7,
        reviews: 38,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["XS", "S", "M"],
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
        fabric: "Fine Ribbed Modal & Cotton Stretch",
        description: "Contoured form-fitting silhouette with clean high mock neckline and soft micro-ribs."
      },

      // == SHOES & FOOTWEAR (10 ARTISAN PAIRS) ==
      {
        id: "sh_01",
        name: "Court High-Top Leather Sneaker",
        gender: "unisex",
        category: "shoes",
        price: 175,
        originalPrice: null,
        badge: "NEW",
        rating: 4.9,
        reviews: 46,
        color: "White",
        colorHex: "#f8fafc",
        sizes: ["40", "41", "42", "43", "44"],
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
        fabric: "Italian Nappa Leather & Rubber Cupsole",
        description: "Padded collar, perforated toe box, and hand-stitched Margom rubber sole for enduring comfort."
      },
      {
        id: "sh_02",
        name: "Minimalist Leather Low Trainer",
        gender: "unisex",
        category: "shoes",
        price: 145,
        originalPrice: 165,
        badge: "BESTSELLER",
        rating: 4.8,
        reviews: 79,
        color: "White",
        colorHex: "#f8fafc",
        sizes: ["39", "40", "41", "42", "43", "44"],
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
        fabric: "Full-Grain Calfskin & Memory Insole",
        description: "Unadorned luxury silhouette with gold foil serial number stamping and tonal waxed laces."
      },
      {
        id: "sh_03",
        name: "Italian Suede Chelsea Boot",
        gender: "men",
        category: "shoes",
        price: 220,
        originalPrice: null,
        badge: "LIMITED",
        rating: 5.0,
        reviews: 34,
        color: "Earthy",
        colorHex: "#78716c",
        sizes: ["41", "42", "43", "44"],
        image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80",
        fabric: "Waxed Weatherproof Calf Suede",
        description: "Elastic side gussets, pull tabs, and a Goodyear-welted leather sole with rubber heel insert."
      },
      {
        id: "sh_04",
        name: "Chunky Lug-Sole Derby Shoe",
        gender: "men",
        category: "shoes",
        price: 195,
        originalPrice: 230,
        badge: "SALE",
        rating: 4.7,
        reviews: 28,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["40", "41", "42", "43"],
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
        fabric: "Polished Spazzolato Box Leather",
        description: "Exaggerated commando tread sole, blind eyelets, and round toe with sartorial presence."
      },
      {
        id: "sh_05",
        name: "Sculptural Kitten Heel Mule",
        gender: "women",
        category: "shoes",
        price: 180,
        originalPrice: null,
        badge: "NEW",
        rating: 4.8,
        reviews: 21,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["36", "37", "38", "39", "40"],
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80",
        fabric: "Soft Glove Leather & Hand-Turned Heel",
        description: "Square open toe, cushioned footbed, and a 45mm architectural curved kitten heel."
      },
      {
        id: "sh_06",
        name: "Archival Trail Running Sneaker",
        gender: "unisex",
        category: "shoes",
        price: 165,
        originalPrice: null,
        badge: null,
        rating: 4.9,
        reviews: 43,
        color: "Olive",
        colorHex: "#3f6212",
        sizes: ["40", "41", "42", "43", "44"],
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80",
        fabric: "Ripstop Mesh, Cordura & Vibram Sole",
        description: "Speed-lacing system, reflective 3M accents, and aggressive multi-surface lug geometry."
      },
      {
        id: "sh_07",
        name: "Classic Goodyear Oxford Brogue",
        gender: "men",
        category: "shoes",
        price: 210,
        originalPrice: 245,
        badge: "NEW",
        rating: 4.9,
        reviews: 37,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["40", "41", "42", "43", "44"],
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80",
        fabric: "Hand-Burnished French Calfskin & Goodyear Welt",
        description: "Timeless closed-lacing dress shoe with bespoke medallion perforation and stacked oak bark leather sole."
      },
      {
        id: "sh_08",
        name: "Sartorial Penny Loafer",
        gender: "men",
        category: "shoes",
        price: 190,
        originalPrice: null,
        badge: "BESTSELLER",
        rating: 4.8,
        reviews: 52,
        color: "Earthy",
        colorHex: "#78716c",
        sizes: ["39", "40", "41", "42", "43", "44"],
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80",
        fabric: "Waxed Tuscan Suede with Hand-Stitched Apron",
        description: "Slip-on heritage silhouette featuring traditional saddle strap, leather lining, and flex-channel sole."
      },
      {
        id: "sh_09",
        name: "Minimalist Strappy Leather Sandal",
        gender: "women",
        category: "shoes",
        price: 155,
        originalPrice: 175,
        badge: "NEW",
        rating: 4.9,
        reviews: 19,
        color: "White",
        colorHex: "#f8fafc",
        sizes: ["36", "37", "38", "39", "40"],
        image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800&auto=format&fit=crop&q=80",
        fabric: "Supple Nappa Leather with Cushioned Footbed",
        description: "Geometric thin straps, squared footbed, and ankle buckle closure designed for effortless resort poise."
      },
      {
        id: "sh_10",
        name: "Atelier Sculpted Leather Combat Boot",
        gender: "unisex",
        category: "shoes",
        price: 260,
        originalPrice: 300,
        badge: "LIMITED",
        rating: 5.0,
        reviews: 41,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["40", "41", "42", "43", "44"],
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80",
        fabric: "Full-Grain Oiled Leather & Commando Tread",
        description: "8-eye lace-up profile with medial side zipper, speed hooks, and shock-absorbing crepe mid-layer."
      },

      // == GLASSES & EYEWEAR (10 OPTICAL SHADES) ==
      {
        id: "gl_01",
        name: "Titanium Geometric Aviator Shades",
        gender: "unisex",
        category: "glasses",
        price: 115,
        originalPrice: null,
        badge: "NEW",
        rating: 4.9,
        reviews: 58,
        color: "Amber",
        colorHex: "#d97706",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
        fabric: "Japanese Aerospace Titanium & UV400 Glass",
        description: "Ultra-lightweight 14g frames with gold-tone finish and anti-reflective polarized green lenses."
      },
      {
        id: "gl_02",
        name: "Bold Hexagonal Acetate Frames",
        gender: "unisex",
        category: "glasses",
        price: 98,
        originalPrice: 120,
        badge: "BESTSELLER",
        rating: 4.8,
        reviews: 65,
        color: "Amber",
        colorHex: "#d97706",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&auto=format&fit=crop&q=80",
        fabric: "Mazzucchelli Bio-Acetate & 5-Barrel Hinges",
        description: "Thick faceted rims in rich amber tortoiseshell with hand-beveled edges and keyhole bridge."
      },
      {
        id: "gl_03",
        name: "Cyber Obsidian Rimless Shades",
        gender: "unisex",
        category: "glasses",
        price: 125,
        originalPrice: null,
        badge: "LIMITED",
        rating: 5.0,
        reviews: 32,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&auto=format&fit=crop&q=80",
        fabric: "Shatterproof Polycarbonate & Steel Wire",
        description: "Wrap-around aerodynamic lens with dark smoke gradient and laser-etched temple insignias."
      },
      {
        id: "gl_04",
        name: "Architectural Wire Optical Spectacles",
        gender: "unisex",
        category: "glasses",
        price: 88,
        originalPrice: null,
        badge: null,
        rating: 4.7,
        reviews: 29,
        color: "White",
        colorHex: "#f8fafc",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&auto=format&fit=crop&q=80",
        fabric: "Stainless Steel with Silicone Nosepads",
        description: "Minimalist round silhouette fitted with blue-light filtering lenses for digital atelier work."
      },
      {
        id: "gl_05",
        name: "Warm Honey Studio Sunglasses",
        gender: "women",
        category: "glasses",
        price: 92,
        originalPrice: 110,
        badge: "SALE",
        rating: 4.8,
        reviews: 24,
        color: "Amber",
        colorHex: "#d97706",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&auto=format&fit=crop&q=80",
        fabric: "Translucent Honey Resin & Category 3 Lenses",
        description: "Cat-eye softness paired with sharp temple cuts for an elegant retro-futurist statement."
      },
      {
        id: "gl_06",
        name: "Vintage Round Tortoiseshell P3 Frames",
        gender: "unisex",
        category: "glasses",
        price: 105,
        originalPrice: null,
        badge: "NEW",
        rating: 4.9,
        reviews: 42,
        color: "Amber",
        colorHex: "#d97706",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f68?w=800&auto=format&fit=crop&q=80",
        fabric: "Japanese Cellulose Bio-Acetate & Mineral Glass",
        description: "Mid-century round silhouette with vintage keyhole bridge, custom wire-core temples, and anti-glare lenses."
      },
      {
        id: "gl_07",
        name: "Minimalist Square Wireframe Spectacles",
        gender: "unisex",
        category: "glasses",
        price: 95,
        originalPrice: 115,
        badge: "BESTSELLER",
        rating: 4.8,
        reviews: 36,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&auto=format&fit=crop&q=80",
        fabric: "Matte Black Surgical Titanium & Blue Light Filter",
        description: "Ultra-thin geometric frame engineered with screwless barrel hinges for featherweight daylong wearing."
      },
      {
        id: "gl_08",
        name: "Oversized 70s Square Gradient Shades",
        gender: "unisex",
        category: "glasses",
        price: 130,
        originalPrice: null,
        badge: "LIMITED",
        rating: 5.0,
        reviews: 27,
        color: "Amber",
        colorHex: "#d97706",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80",
        fabric: "Beveled Champagne Acetate with Warm Brown Gradient",
        description: "Dramatic 1970s continental styling with thick sculptural browline and 100% UVA/UVB optical protection."
      },
      {
        id: "gl_09",
        name: "Sleek Rectangular Matrix Shades",
        gender: "unisex",
        category: "glasses",
        price: 110,
        originalPrice: null,
        badge: "NEW",
        rating: 4.7,
        reviews: 18,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&auto=format&fit=crop&q=80",
        fabric: "Ultra-Flat Obsidian Acetate with Scratch-Proof Coating",
        description: "Low-profile horizontal rectangular lenses creating an immaculate, sharp runway attitude."
      },
      {
        id: "gl_10",
        name: "Classic Clubmaster Horn-Rim Glasses",
        gender: "unisex",
        category: "glasses",
        price: 118,
        originalPrice: 135,
        badge: "SALE",
        rating: 4.9,
        reviews: 49,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&auto=format&fit=crop&q=80",
        fabric: "Polished Acetate Browline with Gold-Plated Chassis",
        description: "Atelier interpretation of the quintessential browline archetype, featuring grooved rims and diamond rivets."
      },

      // == BAGS & ACCESSORIES (10 ATELIER GOODS) ==
      {
        id: "ac_01",
        name: "Full-Grain Leather Weekend Holdall",
        gender: "unisex",
        category: "accessories",
        price: 245,
        originalPrice: 285,
        badge: "NEW",
        rating: 5.0,
        reviews: 39,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80",
        fabric: "Vegetable-Tanned Italian Calf Leather",
        description: "Luggage tag, two-way YKK Excella zippers, reinforced base studs, and a detachable padded shoulder strap."
      },
      {
        id: "ac_02",
        name: "Structured Minimalist Crossbody Bag",
        gender: "women",
        category: "accessories",
        price: 165,
        originalPrice: null,
        badge: "BESTSELLER",
        rating: 4.9,
        reviews: 51,
        color: "White",
        colorHex: "#f8fafc",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
        fabric: "Box-Calf Leather & Suede Microfiber Lining",
        description: "Magnetic flap closure, internal card slot, and an adjustable slim leather strap."
      },
      {
        id: "ac_03",
        name: "Bifold Minimalist Calfskin Wallet",
        gender: "unisex",
        category: "accessories",
        price: 48,
        originalPrice: null,
        badge: null,
        rating: 4.8,
        reviews: 67,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80",
        fabric: "Waxed Bridle Leather with RFID Shield",
        description: "Ultra-slim 6-card profile with central banknote fold, hand-burnished edge finishing."
      },
      {
        id: "ac_04",
        name: "Sculpted Solid Brass Leather Belt",
        gender: "men",
        category: "accessories",
        price: 68,
        originalPrice: null,
        badge: "LIMITED",
        rating: 4.8,
        reviews: 33,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["S", "M", "L"],
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
        fabric: "35mm English Saddle Leather & Cast Brass",
        description: "Custom geometric buckle in brushed matte brass paired with 4mm thick bridle leather."
      },
      {
        id: "ac_05",
        name: "Silk Twill Geometric Atelier Scarf",
        gender: "women",
        category: "accessories",
        price: 78,
        originalPrice: 95,
        badge: "SALE",
        rating: 4.9,
        reviews: 21,
        color: "Amber",
        colorHex: "#d97706",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&auto=format&fit=crop&q=80",
        fabric: "100% Organic Silk Twill (90 x 90 cm)",
        description: "Hand-rolled edges featuring bespoke architectural wave graphics in amber and midnight navy."
      },
      {
        id: "ac_06",
        name: "Atelier Chronograph Minimalist Watch",
        gender: "unisex",
        category: "accessories",
        price: 290,
        originalPrice: 330,
        badge: "LIMITED",
        rating: 5.0,
        reviews: 45,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
        fabric: "316L Brushed Steel, Sapphire Crystal & Horween Strap",
        description: "Sleek 38mm bauhaus dial with bespoke sub-dials, Swiss quartz movement, and quick-release leather band."
      },
      {
        id: "ac_07",
        name: "Saffiano Leather Document Folio & Sleeve",
        gender: "unisex",
        category: "accessories",
        price: 140,
        originalPrice: null,
        badge: "NEW",
        rating: 4.9,
        reviews: 31,
        color: "Navy",
        colorHex: "#1e3a8a",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
        fabric: "Crosshatch Saffiano Leather & Microfiber Cushion",
        description: "Accommodates 14-inch laptops, documents, and stylus pens with gold-stamped NOSTRA monogram."
      },
      {
        id: "ac_08",
        name: "Handwoven Cashmere Fringe Throw Scarf",
        gender: "unisex",
        category: "accessories",
        price: 115,
        originalPrice: 135,
        badge: "BESTSELLER",
        rating: 4.8,
        reviews: 56,
        color: "Earthy",
        colorHex: "#78716c",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80",
        fabric: "100% Grade-A Mongolian Pure Cashmere",
        description: "Ultra-soft ripple finish woven on heritage looms with twisted tassel fringes for winter elegance."
      },
      {
        id: "ac_09",
        name: "Pebbled Leather Cardholder Lanyard",
        gender: "unisex",
        category: "accessories",
        price: 55,
        originalPrice: null,
        badge: "NEW",
        rating: 4.8,
        reviews: 24,
        color: "Black",
        colorHex: "#0f172a",
        sizes: ["One Size"],
        image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&auto=format&fit=crop&q=80",
        fabric: "Full-Grain Pebbled Calf Leather with Lobster Clasp",
        description: "Three card slots, clear ID window, and detachable braided leather neck strap with gunmetal hardware."
      },
      {
        id: "ac_10",
        name: "Sculptural Sterling Silver Signet Ring",
        gender: "unisex",
        category: "accessories",
        price: 120,
        originalPrice: null,
        badge: "LIMITED",
        rating: 4.9,
        reviews: 38,
        color: "White",
        colorHex: "#f8fafc",
        sizes: ["S", "M", "L"],
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80",
        fabric: "Solid 925 Sterling Silver Hand-Polished",
        description: "Brutalist oval crest signet with subtle contouring, stamped with the NOSTRA atelier hallmark inside."
      }
    ];

    // -------------------------------------------------------------
    // 2. STATE & STORAGE MANAGEMENT
    // -------------------------------------------------------------
    let currentGender = "all";
    let selectedCategories = new Set();
    let maxPrice = 350;
    let selectedColors = new Set();
    let selectedSizes = new Set();
    let selectedBadges = new Set();
    let searchQuery = "";
    let currentSort = "featured";
    let currentGridDensity = "4";

    // Cart and Favourites synchronization with index.html
    let cart = [];
    try {
      const savedCart = localStorage.getItem("fplus_cart");
      if (savedCart) cart = JSON.parse(savedCart);
    } catch(e) {}

    let favourites = new Set();
    try {
      const savedFavs = localStorage.getItem("fplus_favs");
      if (savedFavs) favourites = new Set(JSON.parse(savedFavs));
    } catch(e) {}

    let currentUser = null;
    try {
      const savedUser = localStorage.getItem("fplus_user");
      if (savedUser) currentUser = JSON.parse(savedUser);
    } catch(e) {}

    const $ = id => document.getElementById(id);

    // Save states
    function saveCart() {
      try {
        localStorage.setItem("fplus_cart", JSON.stringify(cart));
      } catch(e) {}
      updateCartUI();
    }

    function saveFavs() {
      try {
        localStorage.setItem("fplus_favs", JSON.stringify([...favourites]));
      } catch(e) {}
      updateFavUI();
    }

    // Toast alert
    function toast(msg, icon = "✦") {
      const t = $("toastPill");
      $("toastMsg").textContent = msg;
      $("toastIcon").textContent = icon;
      t.classList.add("show");
      clearTimeout(t._timer);
      t._timer = setTimeout(() => t.classList.remove("show"), 2600);
    }

    // -------------------------------------------------------------
    // 3. PARSE URL SEARCH PARAMS (DEEP LINKING SUPPORT)
    // -------------------------------------------------------------
    function parseURLParams() {
      const params = new URLSearchParams(window.location.search);
      const g = params.get("gender");
      const c = params.get("category");
      const q = params.get("search");
      const b = params.get("badge");

      if (g && ["all", "men", "women", "unisex"].includes(g.toLowerCase())) {
        currentGender = g.toLowerCase();
      }

      if (c) {
        c.split(",").forEach(cat => {
          const cleanCat = cat.trim().toLowerCase();
          if (["shirts", "pants", "jacktes", "t-shirt", "shoes", "glasses", "accessories"].includes(cleanCat)) {
            selectedCategories.add(cleanCat);
          }
        });
      }

      if (q) {
        searchQuery = q.trim();
        $("searchInput").value = searchQuery;
        $("btnClearSearch").style.display = "block";
      }

      if (b) {
        selectedBadges.add(b.toUpperCase());
      }
    }

    // -------------------------------------------------------------
    // 4. FILTERING & SORTING LOGIC
    // -------------------------------------------------------------
    function getFilteredProducts() {
      return PRODUCTS.filter(p => {
        // Gender / Department
        if (currentGender !== "all") {
          if (currentGender === "unisex" && p.gender !== "unisex") return false;
          if (currentGender === "men" && p.gender !== "men" && p.gender !== "unisex") return false;
          if (currentGender === "women" && p.gender !== "women" && p.gender !== "unisex") return false;
        }

        // Category checkboxes
        if (selectedCategories.size > 0 && !selectedCategories.has(p.category)) {
          return false;
        }

        // Max price
        if (p.price > maxPrice) return false;

        // Color swatches
        if (selectedColors.size > 0 && !selectedColors.has(p.color)) {
          return false;
        }

        // Sizes
        if (selectedSizes.size > 0) {
          const hasSize = p.sizes.some(s => selectedSizes.has(s));
          if (!hasSize) return false;
        }

        // Badges
        if (selectedBadges.size > 0 && (!p.badge || !selectedBadges.has(p.badge))) {
          return false;
        }

        // Search Query
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchCat = p.category.toLowerCase().includes(query);
          const matchDesc = p.description.toLowerCase().includes(query);
          const matchFabric = p.fabric.toLowerCase().includes(query);
          if (!matchName && !matchCat && !matchDesc && !matchFabric) return false;
        }

        return true;
      }).sort((a, b) => {
        if (currentSort === "price-asc") return a.price - b.price;
        if (currentSort === "price-desc") return b.price - a.price;
        if (currentSort === "rating") return b.rating - a.rating;
        if (currentSort === "newest") return (b.badge === "NEW" ? 1 : 0) - (a.badge === "NEW" ? 1 : 0);
        return 0; // "featured"
      });
    }

    // -------------------------------------------------------------
    // 5. RENDER PRODUCTS GRID
    // -------------------------------------------------------------
    function renderProductGrid() {
      const grid = $("productGrid");
      const list = getFilteredProducts();

      // Update counters
      $("resultsCount").innerHTML = `Showing <strong>${list.length}</strong> crafted piece${list.length === 1 ? '' : 's'}`;
      if ($("applyCount")) $("applyCount").textContent = list.length;
      $("crumbCurrent").textContent = `${currentGender === "all" ? "All Archive" : currentGender.toUpperCase()} (${list.length} Pieces)`;

      // Render active pills
      renderActivePills();

      if (list.length === 0) {
        grid.innerHTML = `
          <div class="empty-results">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            <h3>No garments match your filters</h3>
            <p>Try resetting specific price ranges, color swatches, or selecting another department.</p>
            <button class="btn-reset" onclick="resetAllFilters()">Reset All Filters</button>
          </div>
        `;
        return;
      }

      grid.innerHTML = "";
      list.forEach((p, idx) => {
        const isFav = favourites.has(p.name);
        const card = document.createElement("div");
        card.className = "product-card";
        card.style.animationDelay = `${Math.min(idx * 0.04, 0.4)}s`;

        // Badge markup
        let badgeHtml = "";
        if (p.badge) {
          const badgeClass = {
            "NEW": "badge-new",
            "SALE": "badge-sale",
            "LIMITED": "badge-limited",
            "BESTSELLER": "badge-bestseller"
          }[p.badge] || "badge-new";
          badgeHtml = `<span class="prod-badge ${badgeClass}">${p.badge}</span>`;
        }

        // Original price markup
        const origPriceHtml = p.originalPrice ? `<span class="price-original">$${p.originalPrice}</span>` : "";

        card.innerHTML = `
          <div class="product-media">
            <div class="product-badges">
              ${badgeHtml}
            </div>
            <button class="btn-card-fav ${isFav ? 'active' : ''}" data-name="${p.name}" aria-label="Save to favourites">
              ${isFav ? '&#9829;' : '&#9825;'}
            </button>
            <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy" onerror="this.onerror=null; this.src='Fashion Model and Orange Disc Cutouts.png';">
            
            <div class="card-hover-actions">
              <button class="btn-quick-add" data-id="${p.id}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.7 12.4a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 7H6"/></svg>
                <span>Add to Bag</span>
              </button>
              <button class="btn-quick-view" data-id="${p.id}" title="Quick Look">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/></svg>
              </button>
            </div>
          </div>

          <div class="product-details">
            <div class="product-meta-row">
              <span class="product-dept-tag">${p.gender} &bull; ${p.category}</span>
              <div class="product-rating">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>${p.rating} (${p.reviews})</span>
              </div>
            </div>

            <h3 class="product-name">${p.name}</h3>

            <div class="product-price-row">
              <span class="price-current">$${p.price}</span>
              ${origPriceHtml}
              <span class="product-sizes-hint">${p.sizes.join(", ")}</span>
            </div>
          </div>
        `;

        // 3D Parallax tilt effect on mouse movement
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "";
        });

        // Clicking card opens quick view unless clicking buttons
        card.addEventListener("click", (e) => {
          if (e.target.closest(".btn-card-fav") || e.target.closest(".btn-quick-add") || e.target.closest(".btn-quick-view")) {
            return;
          }
          openQuickView(p.id);
        });

        // Fav button
        const favBtn = card.querySelector(".btn-card-fav");
        favBtn.onclick = (e) => {
          e.stopPropagation();
          toggleFavourite(p.name);
        };

        // Quick add button
        const addBtn = card.querySelector(".btn-quick-add");
        addBtn.onclick = (e) => {
          e.stopPropagation();
          addToCart(p, p.sizes[0] || "M");
        };

        // Quick view button
        const qvBtn = card.querySelector(".btn-quick-view");
        qvBtn.onclick = (e) => {
          e.stopPropagation();
          openQuickView(p.id);
        };

        grid.appendChild(card);
      });
    }

    // -------------------------------------------------------------
    // 6. ACTIVE FILTER TAGS BAR
    // -------------------------------------------------------------
    function renderActivePills() {
      const container = $("activePillsContainer");
      const bar = $("activeFiltersBar");
      let count = 0;
      let html = "";

      if (currentGender !== "all") {
        count++;
        html += `<span class="active-pill">Dept: ${currentGender} <button onclick="setGenderFilter('all')">&times;</button></span>`;
      }

      selectedCategories.forEach(cat => {
        count++;
        html += `<span class="active-pill">${cat} <button onclick="toggleCategory('${cat}')">&times;</button></span>`;
      });

      if (maxPrice < 350) {
        count++;
        html += `<span class="active-pill">Up to $${maxPrice} <button onclick="resetPriceFilter()">&times;</button></span>`;
      }

      selectedColors.forEach(col => {
        count++;
        html += `<span class="active-pill">${col} <button onclick="toggleColor('${col}')">&times;</button></span>`;
      });

      selectedSizes.forEach(sz => {
        count++;
        html += `<span class="active-pill">Size ${sz} <button onclick="toggleSize('${sz}')">&times;</button></span>`;
      });

      selectedBadges.forEach(bg => {
        count++;
        html += `<span class="active-pill">${bg} <button onclick="toggleBadge('${bg}')">&times;</button></span>`;
      });

      if (searchQuery) {
        count++;
        html += `<span class="active-pill">"${searchQuery}" <button onclick="clearSearch()">&times;</button></span>`;
      }

      container.innerHTML = html;
      bar.style.display = count > 0 ? "flex" : "none";

      const mobileBadge = $("mobileFilterBadge");
      if (mobileBadge) {
        mobileBadge.textContent = count;
        mobileBadge.style.display = count > 0 ? "inline-block" : "none";
      }
    }

    // -------------------------------------------------------------
    // 7. EVENT HANDLERS & FILTER MUTATORS
    // -------------------------------------------------------------
    function setGenderFilter(gender) {
      currentGender = gender;
      document.querySelectorAll(".btn-gender-tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.gender === gender);
      });
      const radio = document.querySelector(`input[name="sideGender"][value="${gender}"]`);
      if (radio) radio.checked = true;
      renderProductGrid();
    }

    function toggleCategory(cat) {
      if (selectedCategories.has(cat)) {
        selectedCategories.delete(cat);
      } else {
        selectedCategories.add(cat);
      }
      syncCategoryUI();
      renderProductGrid();
    }

    function syncCategoryUI() {
      // Sync quick strip
      document.querySelectorAll(".cat-strip-card").forEach(c => {
        const cat = c.dataset.cat;
        if (cat === "all") {
          c.classList.toggle("active", selectedCategories.size === 0);
        } else {
          c.classList.toggle("active", selectedCategories.has(cat));
        }
      });

      // Sync sidebar checkboxes
      document.querySelectorAll("#categoryCheckboxes input").forEach(cb => {
        cb.checked = selectedCategories.has(cb.value);
      });
    }

    function toggleColor(col) {
      if (selectedColors.has(col)) {
        selectedColors.delete(col);
      } else {
        selectedColors.add(col);
      }
      document.querySelectorAll(".color-swatch-item").forEach(item => {
        item.classList.toggle("active", selectedColors.has(item.dataset.color));
      });
      renderProductGrid();
    }

    function toggleSize(sz) {
      if (selectedSizes.has(sz)) {
        selectedSizes.delete(sz);
      } else {
        selectedSizes.add(sz);
      }
      document.querySelectorAll(".size-chip-btn").forEach(btn => {
        btn.classList.toggle("active", selectedSizes.has(btn.dataset.size));
      });
      renderProductGrid();
    }

    function toggleBadge(bg) {
      if (selectedBadges.has(bg)) {
        selectedBadges.delete(bg);
      } else {
        selectedBadges.add(bg);
      }
      document.querySelectorAll('input[name="sideBadge"]').forEach(cb => {
        cb.checked = selectedBadges.has(cb.value);
      });
      renderProductGrid();
    }

    function resetPriceFilter() {
      maxPrice = 350;
      $("priceRange").value = 350;
      $("priceDisplay").textContent = "$0 – $350";
      document.querySelectorAll(".price-bracket-chip").forEach(b => b.classList.remove("active"));
      renderProductGrid();
    }

    function resetAllFilters() {
      currentGender = "all";
      selectedCategories.clear();
      maxPrice = 350;
      selectedColors.clear();
      selectedSizes.clear();
      selectedBadges.clear();
      searchQuery = "";
      $("searchInput").value = "";
      $("btnClearSearch").style.display = "none";

      document.querySelectorAll(".btn-gender-tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.gender === "all");
      });
      const allRadio = document.querySelector('input[name="sideGender"][value="all"]');
      if (allRadio) allRadio.checked = true;

      $("priceRange").value = 350;
      $("priceDisplay").textContent = "$0 – $350";
      document.querySelectorAll(".price-bracket-chip").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".color-swatch-item").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".size-chip-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll('input[name="sideBadge"]').forEach(cb => cb.checked = false);

      syncCategoryUI();
      renderProductGrid();
      toast("All filters cleared");
    }

    function clearSearch() {
      searchQuery = "";
      $("searchInput").value = "";
      $("btnClearSearch").style.display = "none";
      renderProductGrid();
    }

    // -------------------------------------------------------------
    // 8. QUICK VIEW MODAL
    // -------------------------------------------------------------
    let currentQvProduct = null;
    let selectedQvSize = "M";

    function openQuickView(id) {
      const p = PRODUCTS.find(prod => prod.id === id);
      if (!p) return;
      currentQvProduct = p;

      $("qvImg").src = p.image;
      $("qvDept").textContent = `${p.gender.toUpperCase()} / ${p.category.toUpperCase()}`;
      $("qvTitle").textContent = p.name;
      $("qvPrice").textContent = `$${p.price}`;
      $("qvDesc").textContent = p.description;
      $("qvFabric").textContent = p.fabric;

      const origEl = $("qvOrigPrice");
      if (p.originalPrice) {
        origEl.textContent = `$${p.originalPrice}`;
        origEl.style.display = "inline";
      } else {
        origEl.style.display = "none";
      }

      // Sizes chips
      const chipsContainer = $("qvSizeChips");
      chipsContainer.innerHTML = "";
      selectedQvSize = p.sizes[0] || "One Size";
      p.sizes.forEach((sz, i) => {
        const btn = document.createElement("button");
        btn.className = `qv-size-chip ${i === 0 ? 'active' : ''}`;
        btn.textContent = sz;
        btn.onclick = () => {
          chipsContainer.querySelectorAll(".qv-size-chip").forEach(c => c.classList.remove("active"));
          btn.classList.add("active");
          selectedQvSize = sz;
        };
        chipsContainer.appendChild(btn);
      });

      // Fav button state in modal
      const qvFav = $("btnQvFav");
      const isFav = favourites.has(p.name);
      qvFav.style.color = isFav ? "#ef4444" : "var(--text)";
      qvFav.onclick = () => {
        toggleFavourite(p.name);
        const nowFav = favourites.has(p.name);
        qvFav.style.color = nowFav ? "#ef4444" : "var(--text)";
      };

      $("quickViewOverlay").classList.add("open");
    }

    function closeQuickView() {
      $("quickViewOverlay").classList.remove("open");
    }

    // -------------------------------------------------------------
    // 9. CART & FAVOURITES INTERACTIONS
    // -------------------------------------------------------------
    function addToCart(p, size = "M") {
      const existing = cart.find(item => item.id === p.id && item.size === size);
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        cart.push({
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image,
          size: size,
          qty: 1
        });
      }
      saveCart();
      toast(`Added "${p.name}" (${size}) to your bag`, "✓");
    }

    function removeFromCart(index) {
      cart.splice(index, 1);
      saveCart();
    }

    function toggleFavourite(name) {
      if (favourites.has(name)) {
        favourites.delete(name);
        toast(`Removed from Wishlist`);
      } else {
        favourites.add(name);
        toast(`Saved "${name}" to Wishlist`, "♥");
      }
      saveFavs();
      renderProductGrid();
    }

    function updateCartUI() {
      const badge = $("cartBadge");
      const totalCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
      badge.textContent = totalCount;
      $("cartDrawerCount").textContent = totalCount;

      const container = $("cartDrawerItems");
      if (cart.length === 0) {
        container.innerHTML = `
          <div style="text-align:center;padding:50px 10px;color:var(--text-muted)">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:12px"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.7 12.4a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 7H6"/></svg>
            <p style="font-size:15px;font-weight:600;color:var(--acc-dark)">Your shopping bag is empty</p>
            <p style="font-size:12.5px;margin-top:4px">Discover handcrafted garments across our collections archive.</p>
          </div>
        `;
        $("cartDrawerFooter").style.display = "none";
        return;
      }

      $("cartDrawerFooter").style.display = "flex";
      let total = 0;
      let html = "";
      cart.forEach((item, idx) => {
        const itemTotal = item.price * (item.qty || 1);
        total += itemTotal;
        html += `
          <div class="cart-drawer-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null; this.src='Fashion Model and Orange Disc Cutouts.png';">
            <div class="cart-item-details">
              <h4 class="cart-item-name">${item.name}</h4>
              <div style="font-size:11.5px;color:var(--text-muted);margin-bottom:4px">Size: <strong>${item.size || 'M'}</strong> &bull; Qty: ${item.qty || 1}</div>
              <div class="cart-item-price">$${itemTotal}</div>
              <div class="cart-item-actions">
                <button class="btn-remove-item" onclick="removeFromCart(${idx})">Remove</button>
              </div>
            </div>
          </div>
        `;
      });
      container.innerHTML = html;
      $("cartSubtotal").textContent = `$${total}`;
    }

    function updateFavUI() {
      const badge = $("favBadge");
      badge.textContent = favourites.size;
      $("favDrawerCount").textContent = favourites.size;

      const container = $("favDrawerItems");
      if (favourites.size === 0) {
        container.innerHTML = `
          <div style="text-align:center;padding:50px 10px;color:var(--text-muted)">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:12px"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/></svg>
            <p style="font-size:15px;font-weight:600;color:var(--acc-dark)">No wishlisted pieces yet</p>
            <p style="font-size:12.5px;margin-top:4px">Click the heart on any item to curate your personal wardrobe.</p>
          </div>
        `;
        return;
      }

      let html = "";
      favourites.forEach(name => {
        const p = PRODUCTS.find(item => item.name === name);
        if (!p) return;
        html += `
          <div class="cart-drawer-item">
            <img src="${p.image}" alt="${p.name}" class="cart-item-img" onerror="this.onerror=null; this.src='Fashion Model and Orange Disc Cutouts.png';">
            <div class="cart-item-details">
              <h4 class="cart-item-name">${p.name}</h4>
              <div class="cart-item-price">$${p.price}</div>
              <div class="cart-item-actions">
                <button style="font-size:11.5px;font-weight:700;color:var(--acc);background:none;border:none;cursor:pointer" onclick="addToCart(PRODUCTS.find(x => x.name === '${p.name}')); toggleFavourite('${p.name}');">Move to Bag &rarr;</button>
                <button class="btn-remove-item" onclick="toggleFavourite('${p.name}')">Remove</button>
              </div>
            </div>
          </div>
        `;
      });
      container.innerHTML = html;
    }

    // -------------------------------------------------------------
    // 10. INITIALIZATION & EVENT LISTENERS
    // -------------------------------------------------------------
    document.addEventListener("DOMContentLoaded", () => {
      parseURLParams();

      // Mouse glow follower
      const glow = $("mouseGlow");
      window.addEventListener("mousemove", (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      });

      // Gender Tabs
      document.querySelectorAll(".btn-gender-tab").forEach(tab => {
        tab.onclick = () => setGenderFilter(tab.dataset.gender);
      });

      // Quick Category Strip
      document.querySelectorAll(".cat-strip-card").forEach(card => {
        card.onclick = () => {
          const cat = card.dataset.cat;
          if (cat === "all") {
            selectedCategories.clear();
          } else {
            if (selectedCategories.has(cat)) {
              selectedCategories.delete(cat);
            } else {
              selectedCategories.clear(); // One-click focus on category
              selectedCategories.add(cat);
            }
          }
          syncCategoryUI();
          renderProductGrid();
        };
      });

      // Sidebar Category Checkboxes
      document.querySelectorAll("#categoryCheckboxes input").forEach(cb => {
        cb.onchange = () => toggleCategory(cb.value);
      });

      // Sidebar Gender Radio
      document.querySelectorAll('input[name="sideGender"]').forEach(rb => {
        rb.onchange = () => setGenderFilter(rb.value);
      });

      // Price Slider
      const range = $("priceRange");
      range.oninput = () => {
        maxPrice = parseInt(range.value, 10);
        $("priceDisplay").textContent = `$0 – $${maxPrice}`;
        document.querySelectorAll(".price-bracket-chip").forEach(b => b.classList.remove("active"));
        renderProductGrid();
      };

      // Price Brackets
      document.querySelectorAll(".price-bracket-chip").forEach(btn => {
        btn.onclick = () => {
          document.querySelectorAll(".price-bracket-chip").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          maxPrice = parseInt(btn.dataset.max, 10);
          range.value = maxPrice;
          $("priceDisplay").textContent = `$0 – $${maxPrice}`;
          renderProductGrid();
        };
      });

      // Color Swatches
      document.querySelectorAll(".color-swatch-item").forEach(swatch => {
        swatch.onclick = () => toggleColor(swatch.dataset.color);
      });

      // Size Chips
      document.querySelectorAll(".size-chip-btn").forEach(btn => {
        btn.onclick = () => toggleSize(btn.dataset.size);
      });

      // Badge checkboxes
      document.querySelectorAll('input[name="sideBadge"]').forEach(cb => {
        cb.onchange = () => toggleBadge(cb.value);
      });

      // Search bar
      const searchInput = $("searchInput");
      const clearSearchBtn = $("btnClearSearch");
      searchInput.oninput = () => {
        searchQuery = searchInput.value.trim();
        clearSearchBtn.style.display = searchQuery ? "block" : "none";
        renderProductGrid();
      };
      clearSearchBtn.onclick = clearSearch;

      // Sort Select
      $("sortSelect").onchange = (e) => {
        currentSort = e.target.value;
        renderProductGrid();
      };

      // Grid Density Switcher
      document.querySelectorAll(".btn-density").forEach(btn => {
        btn.onclick = () => {
          document.querySelectorAll(".btn-density").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          const mode = btn.dataset.cols;
          const grid = $("productGrid");
          grid.classList.remove("cols-3", "cols-2", "mode-list");
          if (mode === "3") grid.classList.add("cols-3");
          else if (mode === "2") grid.classList.add("cols-2");
          else if (mode === "list") grid.classList.add("mode-list");
        };
      });

      // Reset Buttons
      $("btnClearAllFilters").onclick = resetAllFilters;
      $("btnSidebarClear").onclick = resetAllFilters;

      // Mobile Filter Drawer Toggle
      const mobileFilterBtn = $("btnToggleMobileFilter");
      const sidebar = $("filterSidebar");
      function setFilterSheet(open) {
        sidebar.classList.toggle("mobile-open", open);
        $("filterApplyBar").classList.toggle("mobile-open", open);
        $("filterOverlay").classList.toggle("open", open);
        document.body.style.overflow = open ? "hidden" : "";
      }
      window.closeFilterSheet = () => setFilterSheet(false);
      mobileFilterBtn.onclick = () => setFilterSheet(!sidebar.classList.contains("mobile-open"));
      $("btnCloseFilter").onclick = () => setFilterSheet(false);
      $("filterOverlay").onclick = () => setFilterSheet(false);
      $("btnFilterApply").onclick = () => setFilterSheet(false);
      window.addEventListener("resize", () => { if (window.innerWidth > 900) setFilterSheet(false); });

      // Collapsible filter sections (minimised by default on mobile)
      document.querySelectorAll(".filter-group").forEach((group, i) => {
        if (i !== 1) group.classList.add("collapsed"); // keep Category open
        group.querySelector(".filter-group-title").addEventListener("click", () => {
          if (window.innerWidth <= 900) group.classList.toggle("collapsed");
        });
      });

      // Modals and Drawers
      $("btnQvClose").onclick = closeQuickView;
      $("quickViewOverlay").onclick = (e) => {
        if (e.target === $("quickViewOverlay")) closeQuickView();
      };

      $("btnQvAddBag").onclick = () => {
        if (currentQvProduct) {
          addToCart(currentQvProduct, selectedQvSize);
          closeQuickView();
        }
      };

      // Cart Drawer
      $("btnCartDrawer").onclick = () => {
        $("cartDrawer").classList.add("open");
        $("cartOverlay").classList.add("open");
      };
      $("btnCloseCart").onclick = () => {
        $("cartDrawer").classList.remove("open");
        $("cartOverlay").classList.remove("open");
      };
      $("cartOverlay").onclick = () => {
        $("cartDrawer").classList.remove("open");
        $("cartOverlay").classList.remove("open");
      };

      // Favourites Drawer
      $("btnFavDrawer").onclick = () => {
        $("favDrawer").classList.add("open");
        $("favOverlay").classList.add("open");
      };
      $("btnCloseFav").onclick = () => {
        $("favDrawer").classList.remove("open");
        $("favOverlay").classList.remove("open");
      };
      $("favOverlay").onclick = () => {
        $("favDrawer").classList.remove("open");
        $("favOverlay").classList.remove("open");
      };

      // Checkout Button
      $("btnCheckout").onclick = () => {
        toast("Redirecting to Bespoke VIP Checkout...", "🔒");
        setTimeout(() => {
          alert(`Checkout confirmed for ${cart.length} item(s)! Thank you for shopping with NOSTRA+ Atelier.`);
          cart = [];
          saveCart();
          $("cartDrawer").classList.remove("open");
          $("cartOverlay").classList.remove("open");
        }, 600);
      };

      // VIP Sign In CTA
      $("btnSignIn").onclick = () => {
        toast("Connecting to VIP Concierge...", "✦");
        setTimeout(() => {
          location.href = "index.html#signin";
        }, 400);
      };

      // Mobile Menu (same behaviour as index.html)
      function closeMobileMenu() {
        $("mobileMenuDrawer").classList.remove("open");
        $("mobileMenuOverlay").classList.remove("open");
        $("mobileMenuBtn").classList.remove("active");
      }
      $("mobileMenuBtn").onclick = () => {
        const isOpen = $("mobileMenuDrawer").classList.toggle("open");
        $("mobileMenuOverlay").classList.toggle("open", isOpen);
        $("mobileMenuBtn").classList.toggle("active", isOpen);
      };
      $("btnCloseMobileMenu").onclick = closeMobileMenu;
      $("mobileMenuOverlay").onclick = closeMobileMenu;
      document.querySelectorAll(".mobile-menu-nav a").forEach(a => a.addEventListener("click", closeMobileMenu));
      $("mAccountBtn").onclick = () => { closeMobileMenu(); location.href = "index.html#signin"; };
      window.addEventListener("resize", () => { if (window.innerWidth > 900) closeMobileMenu(); });

      // Escape key closes modals/drawers
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeQuickView();
          closeMobileMenu();
          $("cartDrawer").classList.remove("open");
          $("cartOverlay").classList.remove("open");
          $("favDrawer").classList.remove("open");
          $("favOverlay").classList.remove("open");
          setFilterSheet(false);
        }
      });

      // Synchronize category UI and render
      syncCategoryUI();
      renderProductGrid();
      updateCartUI();
      updateFavUI();
    });
  
    // Expose functions used by inline onclick="..." attributes
    window.addToCart = addToCart;
    window.clearSearch = clearSearch;
    window.removeFromCart = removeFromCart;
    window.resetAllFilters = resetAllFilters;
    window.resetPriceFilter = resetPriceFilter;
    window.setGenderFilter = setGenderFilter;
    window.toggleBadge = toggleBadge;
    window.toggleCategory = toggleCategory;
    window.toggleColor = toggleColor;
    window.toggleFavourite = toggleFavourite;
    window.toggleSize = toggleSize;
    window.PRODUCTS = PRODUCTS;
  })();
}

/* ==========================================================================
   PAGE: CONTACT
   ========================================================================== */
if (document.documentElement.classList.contains("page-contact")) {
  (function () {
    const $ = id => document.getElementById(id);
    function toast(msg) {
      const t = $("toast");
      t.textContent = msg;
      t.classList.add("show");
      clearTimeout(t._t);
      t._t = setTimeout(() => t.classList.remove("show"), 2400);
    }

    // Header scroll state
    const header = $("mainHeader");
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mobile menu (same behaviour as index.html)
    function closeMobileMenu() {
      $("mobileDrawer").classList.remove("open");
      $("mobileOverlay").classList.remove("open");
      $("menuBtn").classList.remove("active");
    }
    $("menuBtn").onclick = () => {
      const open = $("mobileDrawer").classList.toggle("open");
      $("mobileOverlay").classList.toggle("open", open);
      $("menuBtn").classList.toggle("active", open);
    };
    $("closeMobileMenu").onclick = closeMobileMenu;
    $("mobileOverlay").onclick = closeMobileMenu;
    document.querySelectorAll(".mobile-nav-links a").forEach(a => a.addEventListener("click", closeMobileMenu));
    $("mAccountBtn").onclick = () => { closeMobileMenu(); location.href = "index.html#signin"; };
    window.addEventListener("keydown", e => { if (e.key === "Escape") closeMobileMenu(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 900) closeMobileMenu(); });

    // ---- Mouse-hover animation: background parallax + spotlight ----
    const root = document.documentElement;
    window.addEventListener("mousemove", (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;   // -0.5 .. 0.5
      const ny = e.clientY / window.innerHeight - 0.5;
      root.style.setProperty("--mx", (nx * 2).toFixed(3));
      root.style.setProperty("--my", (ny * 2).toFixed(3));
    });

    // ---- Single image: 3D tilt + shine following the cursor ----
    const stage = $("imageStage");
    stage.addEventListener("mousemove", (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      stage.style.setProperty("--ix", x.toFixed(3));
      stage.style.setProperty("--iy", y.toFixed(3));
    });
    stage.addEventListener("mouseleave", () => {
      stage.style.setProperty("--ix", 0);
      stage.style.setProperty("--iy", 0);
    });
    $("modelWrap").addEventListener("click", () => toast("Say hello — we'd love to style you ✦"));

    // Scroll reveal
    const items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0.12 });
      items.forEach(el => io.observe(el));
    } else { items.forEach(el => el.classList.add("in")); }

    // Live studio status (Mon–Sat 10:00–19:00, visitor's local time)
    const now = new Date();
    const open = now.getDay() !== 0 && now.getHours() >= 10 && now.getHours() < 19;
    $("status").classList.toggle("closed", !open);
    $("statusText").textContent = open ? "Studio open now · replies in minutes" : "Studio closed · we reply next working day";

    // Click-to-copy cards
    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", () => {
        const text = card.dataset.copy;
        const done = () => toast("Copied: " + text);
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
        else done();
      });
    });

    // Topic chips
    let topic = "Bespoke Styling";
    document.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".chip").forEach(c => c.classList.remove("on"));
        chip.classList.add("on");
        topic = chip.dataset.topic;
      });
    });

    // Form
    const form = $("contactForm"), nameEl = $("cName"), emailEl = $("cEmail"), msgEl = $("cMsg");
    msgEl.addEventListener("input", () => { $("cCount").textContent = msgEl.value.length + " / 500"; });
    [nameEl, emailEl, msgEl].forEach(f => f.addEventListener("input", () => f.parentElement.classList.remove("error")));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const checks = [
        [nameEl, nameEl.value.trim().length >= 2],
        [emailEl, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())],
        [msgEl, msgEl.value.trim().length >= 10]
      ];
      let ok = true;
      checks.forEach(([f, valid]) => {
        f.parentElement.classList.remove("error");
        if (!valid) { void f.offsetWidth; f.parentElement.classList.add("error"); ok = false; }
      });
      if (!ok) { toast("Please complete the highlighted fields."); return; }

      const btn = $("cSubmit");
      btn.classList.add("loading");
      $("cSubmitText").textContent = "Sending...";
      setTimeout(() => {
        btn.classList.remove("loading");
        $("cSubmitText").textContent = "Send Message";
        $("cSuccessText").textContent = "Thank you, " + nameEl.value.trim().split(" ")[0] + " — our concierge will reply about \"" + topic + "\" within one working day.";
        $("formCard").classList.add("sent");
      }, 1300);
    });

    $("cAgain").addEventListener("click", () => {
      form.reset();
      $("cCount").textContent = "0 / 500";
      $("formCard").classList.remove("sent");
    });
  
  })();
}
