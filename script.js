/**
 * Inmunomedi - JavaScript mejorado
 * Este archivo contiene todas las funcionalidades interactivas del sitio web,
 * incluyendo carruseles, carrito de compras, animaciones, y más.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Elementos DOM principales
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const backToTop = document.querySelector(".back-to-top");
    const miniCart = document.querySelector(".mini-cart");
    const closeMiniCart = document.querySelector(".close-mini-cart");
    const carouselContainer = document.querySelector(".productos-carousel");
    const productosCarousel = document.querySelector(".productos-carousel");
    const prevCarouselBtn = document.querySelector(".carousel-btn.prev");
    const nextCarouselBtn = document.querySelector(".carousel-btn.next");
    const carruselSlides = document.querySelectorAll(".carrusel-slide");
    const carruselPrevBtn = document.querySelector(".carrusel-btn.prev");
    const carruselNextBtn = document.querySelector(".carrusel-btn.next");
    const carruselDots = document.querySelectorAll(".carrusel-dots .dot");
    const productos = document.querySelectorAll(".producto");
    const searchBar = document.getElementById("search-bar");
    const categoryFilter = document.getElementById("category-filter");
    const sortFilter = document.getElementById("sort-filter");
  
    // Preloader
    const preloader = document.getElementById("preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => (preloader.style.display = "none"), 600);
      }, 1500);
    }
  
    // Inicializar Animaciones al Scroll
    initScrollAnimations();
  
    // Header scrolled effect
    window.addEventListener("scroll", () => {
      const header = document.querySelector("header");
      if (header) {
        header.classList.toggle("scrolled", window.scrollY > 10);
      }
    });
  
    // Menú móvil
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.querySelector("i").classList.toggle("fa-bars");
        menuToggle.querySelector("i").classList.toggle("fa-times");
      });
  
      // Cerrar menú al hacer clic en un enlace
      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("active");
          menuToggle.querySelector("i").classList.add("fa-bars");
          menuToggle.querySelector("i").classList.remove("fa-times");
        });
      });
  
      // Cerrar menú al hacer clic fuera
      document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          menuToggle.querySelector("i").classList.add("fa-bars");
          menuToggle.querySelector("i").classList.remove("fa-times");
        }
      });
    }
  
    // Mini Carrito
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });
  
    // Abrir/cerrar mini carrito
    document.querySelectorAll('.nav-link[href="carrito.html"]').forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // Solo prevenir el comportamiento predeterminado si estamos en la página principal
        if (window.location.pathname === "/" || window.location.pathname.includes("index.html")) {
          e.preventDefault();
          miniCart.classList.toggle("active");
        }
      });
    });
  
    if (closeMiniCart) {
      closeMiniCart.addEventListener("click", () => {
        miniCart.classList.remove("active");
      });
  
      // Cerrar mini carrito al hacer clic fuera
      document.addEventListener("click", (e) => {
        if (miniCart && miniCart.classList.contains("active") && 
            !miniCart.contains(e.target) && 
            !e.target.closest('.nav-link[href="carrito.html"]')) {
          miniCart.classList.remove("active");
        }
      });
    }
  
    // Carrusel Principal
    let currentSlide = 0;
    
    function updateCarrusel() {
      // Ocultar todos los slides
      carruselSlides.forEach((slide, index) => {
        slide.style.display = "none";
        slide.classList.remove("active");
        
        // Actualizar dots si existen
        if (carruselDots[index]) {
          carruselDots[index].classList.toggle("active", index === currentSlide);
        }
      });
      
      // Mostrar el slide actual
      carruselSlides[currentSlide].style.display = "block";
      carruselSlides[currentSlide].classList.add("active");
      
      // Activar animación de la descripción
      const caption = carruselSlides[currentSlide].querySelector('.carrusel-caption');
      if (caption) {
        caption.style.animation = 'none';
        setTimeout(() => {
          caption.style.animation = 'slideUp 0.8s ease forwards';
        }, 50);
      }
    }
    
    if (carruselSlides.length > 0 && carruselPrevBtn && carruselNextBtn) {
      carruselPrevBtn.addEventListener("click", () => {
        currentSlide = currentSlide > 0 ? currentSlide - 1 : carruselSlides.length - 1;
        updateCarrusel();
      });
      
      carruselNextBtn.addEventListener("click", () => {
        currentSlide = currentSlide < carruselSlides.length - 1 ? currentSlide + 1 : 0;
        updateCarrusel();
      });
      
      // Dots de navegación
      carruselDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          currentSlide = index;
          updateCarrusel();
        });
      });
      
      // Auto rotación del carrusel
      let autoCarrusel = setInterval(() => {
        currentSlide = currentSlide < carruselSlides.length - 1 ? currentSlide + 1 : 0;
        updateCarrusel();
      }, 5000);
      
      // Pausar auto rotación al interactuar
      const carruselContainer = document.querySelector(".carrusel-container");
      if (carruselContainer) {
        carruselContainer.addEventListener("mouseenter", () => clearInterval(autoCarrusel));
        carruselContainer.addEventListener("mouseleave", () => {
          autoCarrusel = setInterval(() => {
            currentSlide = currentSlide < carruselSlides.length - 1 ? currentSlide + 1 : 0;
            updateCarrusel();
          }, 5000);
        });
      }
    }
  
    // Carrusel de Productos
    if (productosCarousel && prevCarouselBtn && nextCarouselBtn) {
      const scrollAmount = 300; // Cantidad de píxeles a desplazar
  
      prevCarouselBtn.addEventListener("click", () => {
        productosCarousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      });
      
      nextCarouselBtn.addEventListener("click", () => {
        productosCarousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
  
      // Comprobar visibilidad de los botones de navegación
      function checkScrollButtons() {
        const isAtStart = productosCarousel.scrollLeft <= 10;
        const isAtEnd = productosCarousel.scrollLeft + productosCarousel.offsetWidth >= productosCarousel.scrollWidth - 10;
        
        prevCarouselBtn.style.opacity = isAtStart ? "0.5" : "1";
        nextCarouselBtn.style.opacity = isAtEnd ? "0.5" : "1";
      }
  
      productosCarousel.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
      
      // Comprobar inicialmente
      setTimeout(checkScrollButtons, 100);
    }
  
    // Filtros de productos
    function filterProducts() {
      if (!searchBar || !categoryFilter || !sortFilter || !productos.length) return;
  
      const searchText = searchBar.value.toLowerCase();
      const selectedCategory = categoryFilter.value;
      const sortOption = sortFilter.value;
  
      // Filtrar productos
      let filteredProductos = Array.from(productos).filter((producto) => {
        const productName = producto.querySelector("h3").textContent.toLowerCase();
        const productCategory = producto.dataset.category || "all";
  
        const matchesSearch = productName.includes(searchText);
        const matchesCategory = selectedCategory === "all" || productCategory === selectedCategory;
  
        return matchesSearch && matchesCategory;
      });
  
      // Ordenar productos
      if (sortOption === "price-asc") {
        filteredProductos.sort((a, b) => {
          const priceA = parseFloat(a.querySelector(".precio").textContent.match(/[\d\.]+/)[0]);
          const priceB = parseFloat(b.querySelector(".precio").textContent.match(/[\d\.]+/)[0]);
          return priceA - priceB;
        });
      } else if (sortOption === "price-desc") {
        filteredProductos.sort((a, b) => {
          const priceA = parseFloat(a.querySelector(".precio").textContent.match(/[\d\.]+/)[0]);
          const priceB = parseFloat(b.querySelector(".precio").textContent.match(/[\d\.]+/)[0]);
          return priceB - priceA;
        });
      }
  
      // Mostrar u ocultar productos según filtros
      productos.forEach(producto => {
        if (filteredProductos.includes(producto)) {
          producto.style.display = "block";
        } else {
          producto.style.display = "none";
        }
      });
  
      // Si no hay resultados, mostrar mensaje
      const noResultsElement = document.getElementById("no-results");
      if (filteredProductos.length === 0) {
        if (!noResultsElement) {
          const message = document.createElement("div");
          message.id = "no-results";
          message.className = "no-results";
          message.innerHTML = `<p>No se encontraron productos para tu búsqueda. Por favor, intenta con otros términos.</p>`;
          document.querySelector(".productos-carousel").after(message);
        }
      } else if (noResultsElement) {
        noResultsElement.remove();
      }
    }
  
    if (searchBar) searchBar.addEventListener("input", filterProducts);
    if (categoryFilter) categoryFilter.addEventListener("change", filterProducts);
    if (sortFilter) sortFilter.addEventListener("change", filterProducts);
  
    // Carrito de Compras
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));
  
    const updateCartCount = () => {
      const cartCount = document.querySelector(".cart-count");
      if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? "block" : "none";
      }
    };
  
    function showNotification(message, type = "success") {
      // Utilizar Toastify si está disponible
      if (typeof Toastify === "function") {
        Toastify({
          text: message,
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: type === "success" ? "linear-gradient(to right, #4CAF50, #388E3C)" : "linear-gradient(to right, #FF4D4D, #D93636)",
          stopOnFocus: true,
        }).showToast();
        return;
      }
  
      // Alternativa si Toastify no está disponible
      const notification = document.createElement("div");
      notification.className = `notification ${type}`;
      
      notification.innerHTML = `
        <div class="notification-icon">
          <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
        </div>
        <div class="notification-content">
          <div class="notification-title">${type === "success" ? "Éxito" : "Error"}</div>
          <div class="notification-message">${message}</div>
        </div>
        <div class="notification-close">
          <i class="fas fa-times"></i>
        </div>
      `;
      
      document.getElementById("notification-container").appendChild(notification);
      
      notification.querySelector(".notification-close").addEventListener("click", () => {
        notification.style.animation = "slideOutRight 0.3s forwards";
        setTimeout(() => notification.remove(), 300);
      });
      
      setTimeout(() => {
        notification.style.animation = "slideOutRight 0.3s forwards";
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }
  
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const product = button.dataset.product;
        const price = parseFloat(button.dataset.price);
        const existingProduct = cart.find((item) => item.product === product);
  
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.push({ product, price, quantity: 1 });
        }
  
        saveCart();
        updateCartDisplay();
        updateMiniCart();
        updateCartCount();
  
        // Animación del botón
        button.classList.add("added");
        setTimeout(() => button.classList.remove("added"), 1000);
  
        showNotification(`${product} añadido al carrito.`, "success");
      });
    });
  
    const cartItemsContainer = document.querySelector(".carrito-items");
    const cartTotalElement = document.querySelector(".carrito-total h3 span");
    const miniCartItems = document.querySelector(".mini-cart-items");
    const miniCartTotal = document.querySelector(".mini-cart-total span");
  
    const updateCartDisplay = () => {
      if (!cartItemsContainer || !cartTotalElement) return;
      
      // Vaciar el contenedor
      cartItemsContainer.innerHTML = "";
      
      if (cart.length === 0) {
        // Mostrar mensaje de carrito vacío
        const emptyCartMessage = document.createElement("div");
        emptyCartMessage.className = "empty-cart-message";
        emptyCartMessage.innerHTML = `
          <i class="fas fa-shopping-cart"></i>
          <h3>Tu carrito está vacío</h3>
          <p>Añade productos para comenzar tu compra</p>
          <a href="index.html#productos" class="btn-primary">Ver productos</a>
        `;
        cartItemsContainer.appendChild(emptyCartMessage);
        cartTotalElement.textContent = "$0.00";
        return;
      }
  
      let total = 0;
  
      cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
  
        const cartItem = document.createElement("div");
        cartItem.classList.add("carrito-item");
        
        // Determinar la ruta de la imagen basada en el nombre del producto
        let imgSrc = `recursos/${item.product.replace(/\s+/g, "-").toLowerCase()}/${item.product.replace(/\s+/g, "_").toLowerCase()}_2024_V2.webp`;
        
        cartItem.innerHTML = `
          <img src="${imgSrc}" alt="${item.product}" onerror="this.src='recursos/simbolo/SimbFCT.png'" width="90" height="90">
          <div class="carrito-item-info">
            <h4>${item.product}</h4>
            <p>Precio: ${item.price.toFixed(2)} c/u</p>
            <p>Cantidad: <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input"></p>
          </div>
          <div class="carrito-item-precio">${itemTotal.toFixed(2)}</div>
          <button class="btn-primary remove-item" data-index="${index}"><i class="fas fa-trash"></i> Eliminar</button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
      });
  
      cartTotalElement.textContent = `${total.toFixed(2)}`;
      
      // Añadir eventos después de insertar en el DOM
      document.querySelectorAll(".quantity-input").forEach((input) => {
        input.addEventListener("change", (e) => {
          const index = parseInt(e.target.dataset.index);
          const newQuantity = parseInt(e.target.value);
          
          if (newQuantity >= 1) {
            cart[index].quantity = newQuantity;
            saveCart();
            updateCartDisplay();
            updateMiniCart();
            updateCartCount();
          }
        });
      });
  
      document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = parseInt(e.target.closest(".remove-item").dataset.index);
          const removedProduct = cart[index].product;
          
          cart.splice(index, 1);
          saveCart();
          updateCartDisplay();
          updateMiniCart();
          updateCartCount();
  
          showNotification(`${removedProduct} eliminado del carrito.`, "error");
        });
      });
    };
  
    const updateMiniCart = () => {
      if (!miniCartItems || !miniCartTotal) return;
      
      miniCartItems.innerHTML = "";
      let total = 0;
  
      if (cart.length === 0) {
        // Mostrar mensaje de carrito vacío
        const emptyCartMessage = document.createElement("div");
        emptyCartMessage.className = "empty-mini-cart";
        emptyCartMessage.innerHTML = `
          <i class="fas fa-shopping-cart"></i>
          <p>Tu carrito está vacío</p>
        `;
        miniCartItems.appendChild(emptyCartMessage);
        miniCartTotal.textContent = "$0.00";
        return;
      }
  
      cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
  
        // Determinar la ruta de la imagen basada en el nombre del producto
        let imgSrc = `recursos/${item.product.replace(/\s+/g, "-").toLowerCase()}/${item.product.replace(/\s+/g, "_").toLowerCase()}_2024_V2.webp`;
  
        const miniCartItem = document.createElement("div");
        miniCartItem.classList.add("mini-cart-item");
        miniCartItem.innerHTML = `
          <img src="${imgSrc}" alt="${item.product}" onerror="this.src='recursos/simbolo/SimbFCT.png'" width="50" height="50">
          <div class="mini-cart-item-info">
            <h4>${item.product}</h4>
            <p>${item.price.toFixed(2)} x ${item.quantity}</p>
          </div>
          <div class="mini-cart-item-precio">${itemTotal.toFixed(2)}</div>
          <button class="mini-cart-remove" data-index="${index}"><i class="fas fa-times"></i></button>
        `;
        
        miniCartItems.appendChild(miniCartItem);
      });
  
      miniCartTotal.textContent = `${total.toFixed(2)}`;
      
      // Añadir eventos a los botones de eliminación
      document.querySelectorAll(".mini-cart-remove").forEach(button => {
        button.addEventListener("click", (e) => {
          const index = parseInt(e.currentTarget.dataset.index);
          const removedProduct = cart[index].product;
          
          cart.splice(index, 1);
          saveCart();
          updateCartDisplay();
          updateMiniCart();
          updateCartCount();
  
          showNotification(`${removedProduct} eliminado del carrito.`, "error");
        });
      });
    };
  
    // Formulario de checkout
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (cart.length === 0) {
          showNotification("Tu carrito está vacío. Añade productos antes de continuar.", "error");
          return;
        }
        
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        
        if (!nombre || !email || !address) {
          showNotification("Por favor, completa todos los campos.", "error");
          return;
        }
        
        // Crear mensaje para WhatsApp
        let message = `Hola, me gustaría hacer un pedido:\n\n`;
        message += `Nombre: ${nombre}\n`;
        message += `Email: ${email}\n`;
        message += `Dirección: ${address}\n\n`;
        message += `Productos:\n`;
        
        let total = 0;
        cart.forEach(item => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;
          message += `- ${item.product}: ${item.quantity} x ${item.price.toFixed(2)} = ${itemTotal.toFixed(2)}\n`;
        });
        
        message += `\nTotal: ${total.toFixed(2)}`;
        
        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(message);
        
        // Abrir WhatsApp
        window.open(`https://wa.me/55560298059?text=${encodedMessage}`, "_blank");
      });
    }
  
    // Función para vaciar el carrito
    window.vaciarCarrito = function() {
      if (cart.length === 0) {
        showNotification("El carrito ya está vacío.", "info");
        return;
      }
      
      if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        cart = [];
        saveCart();
        updateCartDisplay();
        updateMiniCart();
        updateCartCount();
        showNotification("Carrito vaciado correctamente.", "success");
      }
    };
  
    // Inicializar el carrito al cargar la página
    updateCartDisplay();
    updateMiniCart();
    updateCartCount();
  
    // Botón de volver arriba
    if (backToTop) {
      window.addEventListener("scroll", () => {
        backToTop.classList.toggle("visible", window.scrollY > 400);
      });
      
      backToTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  
    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const targetId = anchor.getAttribute("href");
        if (targetId.length > 1 && targetId.startsWith("#")) {
          e.preventDefault();
          const targetElement = document.getElementById(targetId.substring(1));
          if (targetElement) {
            const headerHeight = document.querySelector("header").offsetHeight;
            window.scrollTo({
              top: targetElement.offsetTop - headerHeight - 20,
              behavior: "smooth"
            });
          }
        }
      });
    });
  
    // Página de Detalle de Producto
    if (window.location.pathname.includes("producto.html")) {
      const urlParams = new URLSearchParams(window.location.search);
      const productoId = urlParams.get("producto");
      
      if (productoId) {
        const productosData = {
          "factor-de-transferencia": {
            nombre: "Factor de Transferencia",
            descripcion: "El Factor de Transferencia es una molécula inmunitaria que ayuda a educar y fortalecer las células de defensa del organismo. Contiene moléculas del calostro bovino que transfieren información inmunitaria al cuerpo humano, ayudando a combatir infecciones y fortalecer el sistema inmune.",
            presentacion: "Frasco con 60 cápsulas (30 días de tratamiento)",
            precio: "$350 c/u ($300 mayoreo)",
            features: [
              "Fortalece el sistema inmunológico",
              "Ayuda a combatir infecciones recurrentes",
              "Acelera la recuperación después de enfermedades",
              "Seguro para uso prolongado"
            ],
            imagen: "recursos/FCT/CelestinFT__2024_V2.webp"
          },
          "null-age-ampolleta": {
            nombre: "Null Age Ampolleta",
            descripcion: "Fórmula rejuvenecedora avanzada que combina extracto de placenta con factores de crecimiento para regenerar la piel y retrasar el envejecimiento celular. Ayuda a renovar los tejidos y mantener un aspecto juvenil.",
            presentacion: "Caja con 10 ampolletas",
            precio: "$4000 c/u ($3500 mayoreo)",
            features: [
              "Regeneración celular avanzada",
              "Reduce arrugas y líneas de expresión",
              "Mejora la elasticidad y firmeza de la piel",
              "Promueve la síntesis de colágeno"
            ],
            imagen: "recursos/Null Age/NullAge3R_caja_abierta.jpg"
          },
          "null-age-capsula": {
            nombre: "Null Age Cápsula",
            descripcion: "Complemento oral para intensificar los efectos del tratamiento Null Age. Contiene antioxidantes, vitaminas y minerales que promueven la regeneración celular desde el interior, retrasando el proceso de envejecimiento.",
            presentacion: "Frasco con 60 cápsulas",
            precio: "$2500 c/u ($2000 mayoreo)",
            features: [
              "Apoyo antioxidante desde el interior",
              "Complemento ideal para el tratamiento con ampolletas",
              "Mejora la salud celular general",
              "Estimula la producción natural de colágeno"
            ],
            imagen: "recursos/Null Age/vista_N3R_03+(1).jpg"
          },
          "artikom": {
            nombre: "Artikom",
            descripcion: "Suplemento premium a base de aceite de krill antártico rico en ácidos grasos omega-3 en forma de fosfolípidos, lo que facilita su absorción. Apoya la salud cardiovascular, reduce inflamación y mejora los niveles de colesterol.",
            presentacion: "Frasco con 30 cápsulas blandas",
            precio: "$800 c/u ($700 mayoreo)",
            features: [
              "Alta biodisponibilidad de omega-3",
              "Reduce triglicéridos y mejora colesterol",
              "Disminuye inflamación en articulaciones",
              "Apoya la función cerebral y cognitiva"
            ],
            imagen: "recursos/Artikom/ArtikOM3__2024_V2.webp"
          },
          "daily-pro": {
            nombre: "Daily Pro",
            descripcion: "Probiótico multiespecie con 50 mil millones de UFC por dosis, diseñado para restaurar el equilibrio de la microbiota intestinal. Contiene cepas clínicamente probadas que sobreviven al ácido estomacal y colonizan efectivamente el intestino.",
            presentacion: "Frasco con 30 cápsulas gastrorresistentes",
            precio: "$600 c/u",
            features: [
              "50 mil millones de bacterias benéficas por dosis",
              "Mejora problemas digestivos como hinchazón y malestar",
              "Fortalece la barrera intestinal",
              "Apoya al sistema inmunológico"
            ],
            imagen: "recursos/DailyPro 50/DailyPRO_50_2024_V2.webp"
          },
          "dk-fort": {
            nombre: "DK Fort",
            descripcion: "Combinación sinérgica de vitamina D3 y K2 en sus formas más activas y biodisponibles. Trabajan juntas para regular el calcio en el cuerpo, fortalecer huesos y apoyar el sistema inmunológico y cardiovascular.",
            presentacion: "Frasco con 60 cápsulas",
            precio: "$800 c/u ($700 mayoreo)",
            features: [
              "Vitamina D3 (colecalciferol) en dosis óptima",
              "Vitamina K2 MK-7, la forma más activa",
              "Fortalece la estructura ósea",
              "Mejora la absorción de calcio"
            ],
            imagen: "recursos/DK Fort/DKFort5__2024_V2.webp"
          },
          "l-ferrin": {
            nombre: "L Ferrín",
            descripcion: "Suplemento de lactoferrina, una glicoproteína con potentes propiedades antimicrobianas, antivirales y antiinflamatorias. Apoya el sistema inmunológico, regula la absorción de hierro y protege contra infecciones.",
            presentacion: "Frasco con 60 cápsulas",
            precio: "$800 c/u ($700 mayoreo)",
            features: [
              "Potente acción antimicrobiana natural",
              "Regula la absorción y metabolismo del hierro",
              "Protege contra infecciones recurrentes",
              "Reduce inflamación"
            ],
            imagen: "recursos/L Ferrín/51MpR08Z6lL._AC_SX569_.jpg"
          },
          "inm-mix": {
            nombre: "Inm Mix",
            descripcion: "Proteína vegetal con blend completo de aminoácidos esenciales, enriquecida con superalimentos y enzimas digestivas. Formulación que aporta nutrición completa y energía sostenida a lo largo del día.",
            presentacion: "Bote con 500g (15 porciones)",
            precio: "$900 c/u ($800 mayoreo)",
            features: [
              "Proteína completa de fuentes vegetales",
              "Con enzimas digestivas para mejor asimilación",
              "Superalimentos para nutrición completa",
              "Libre de lácteos, soya y gluten"
            ],
            imagen: "recursos/Inm Mix/proteinavegetal.png"
          },
          "inm-box": {
            nombre: "Inm Box",
            descripcion: "Kit completo para fortalecer la inmunidad que incluye Factor de Transferencia, Daily Pro y DK Fort. Proporciona un enfoque integral para fortalecer tus defensas desde múltiples ángulos.",
            presentacion: "Caja con 3 productos (tratamiento para 30 días)",
            precio: "$1300 c/u ($1200 mayoreo)",
            features: [
              "Factor de Transferencia para educación inmunitaria",
              "Daily Pro para equilibrio intestinal",
              "DK Fort para optimizar vitaminas esenciales",
              "Ahorro significativo versus compra individual"
            ],
            imagen: "recursos/InmBox/InmBox__2025_V2-01.webp"
          }
        };
        
        // Llenar la información del producto
        const productoData = productosData[productoId];
        if (productoData) {
          const productoNombre = document.getElementById("producto-nombre");
          const productoDescripcion = document.getElementById("producto-descripcion");
          const productoPresentacion = document.getElementById("producto-presentacion");
          const productoPrecio = document.getElementById("producto-precio");
          const productoFeatures = document.getElementById("producto-features");
          const productoImg = document.getElementById("producto-img");
          const addToCartBtn = document.getElementById("add-to-cart-btn");
          
          if (productoNombre) productoNombre.textContent = productoData.nombre;
          if (productoDescripcion) productoDescripcion.textContent = productoData.descripcion;
          if (productoPresentacion) productoPresentacion.textContent = productoData.presentacion;
          if (productoPrecio) productoPrecio.textContent = productoData.precio;
          
          if (productoFeatures) {
            productoFeatures.innerHTML = "";
            productoData.features.forEach(feature => {
              const li = document.createElement("li");
              li.innerHTML = `<i class="fas fa-check-circle"></i> ${feature}`;
              productoFeatures.appendChild(li);
            });
          }
          
          if (productoImg) {
            productoImg.src = productoData.imagen;
            productoImg.alt = productoData.nombre;
          }
          
          if (addToCartBtn) {
            addToCartBtn.setAttribute("data-product", productoData.nombre);
            addToCartBtn.setAttribute("data-price", productoData.precio.match(/\d+/)[0]);
            
            addToCartBtn.addEventListener("click", () => {
              const product = productoData.nombre;
              const price = parseInt(productoData.precio.match(/\d+/)[0]);
              const existingProduct = cart.find((item) => item.product === product);
              
              if (existingProduct) {
                existingProduct.quantity += 1;
              } else {
                cart.push({ product, price, quantity: 1 });
              }
              
              saveCart();
              updateCartCount();
              
              showNotification(`${product} añadido al carrito.`, "success");
            });
          }
        }
      }
    }
  });
  
  // Función para inicializar las animaciones de scroll
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    
    function checkAnimations() {
      const windowHeight = window.innerHeight;
      
      animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const offset = 100;
        
        if (elementPosition < windowHeight - offset) {
          element.classList.add("visible");
        }
      });
    }
    
    // Comprobar al cargar la página
    window.addEventListener("load", checkAnimations);
    
    // Comprobar al hacer scroll
    window.addEventListener("scroll", checkAnimations);
  }