/**
 * InmunoMedi JavaScript principal
 * Contiene todas las funcionalidades JS extraídas del index.html
 */

// Google Tag Manager
(function(w,d,s,l,i){
  w[l]=w[l]||[];
  w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),
  dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;
  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MCPS5HTD');

// Crear partículas inmunológicas para el fondo
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar sistema de partículas
  initParticles();
  
  // Inicializar carousel y funcionalidades
  initCarousel();
  
  // Inicializar el carrito
  initCart();
  
  // Añadir estilos para animaciones
  addAnimationStyles();
});

/**
 * Inicializa el sistema de partículas del fondo
 */
function initParticles() {
  const particlesContainer = document.getElementById('bg-particles');
  if (!particlesContainer) return;
  
  const particleCount = 15; // Número de partículas
  
  // Tipos de partículas inmunológicas
  const particleTypes = [
    // Células inmunológicas (círculos con gradientes azules)
    function createImmuneCellBlue() {
      const size = Math.random() * 100 + 50;
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.borderRadius = '50%';
      particle.style.background = `radial-gradient(circle, rgba(5, 106, 250, ${Math.random() * 0.1 + 0.05}) 0%, rgba(5, 106, 250, 0) 70%)`;
      particle.style.animation = `float-element ${Math.random() * 10 + 8}s infinite ease-in-out ${Math.random() * 5}s`;
      particle.style.opacity = '0.4';
      particle.style.filter = 'blur(2px)';
      return particle;
    },
    // Células inmunológicas (círculos con gradientes rosados)
    function createImmuneCellPink() {
      const size = Math.random() * 80 + 40;
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.borderRadius = '50%';
      particle.style.background = `radial-gradient(circle, rgba(255, 207, 250, ${Math.random() * 0.1 + 0.05}) 0%, rgba(255, 207, 250, 0) 70%)`;
      particle.style.animation = `float-element ${Math.random() * 12 + 10}s infinite ease-in-out ${Math.random() * 5}s`;
      particle.style.opacity = '0.4';
      particle.style.filter = 'blur(2px)';
      return particle;
    },
    // Moléculas de anticuerpos (círculos con borde)
    function createAntibody() {
      const size = Math.random() * 60 + 30;
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.borderRadius = '50%';
      particle.style.border = `2px solid rgba(5, 106, 250, ${Math.random() * 0.1 + 0.05})`;
      particle.style.animation = `float-element ${Math.random() * 15 + 10}s infinite ease-in-out ${Math.random() * 5}s`;
      particle.style.opacity = '0.3';
      return particle;
    }
  ];
  
  // Crear y posicionar las partículas
  for (let i = 0; i < particleCount; i++) {
    // Seleccionar un tipo aleatorio de partícula
    const createParticle = particleTypes[Math.floor(Math.random() * particleTypes.length)];
    const particle = createParticle();
    
    // Posicionar aleatoriamente en la pantalla
    particle.style.top = (Math.random() * 100) + 'vh';
    particle.style.left = (Math.random() * 100) + 'vw';
    particle.style.zIndex = '-1';
    
    // Añadir al contenedor
    particlesContainer.appendChild(particle);
  }
  
  // Efecto de rotación lenta para algunas partículas
  const particles = particlesContainer.querySelectorAll('div');
  for (let i = 0; i < particles.length; i += 2) {
    const particle = particles[i];
    const currentAnimation = particle.style.animation;
    particle.style.animation = `${currentAnimation}, rotate-slow ${Math.random() * 30 + 20}s linear infinite`;
  }
}

/**
 * Inicializa el carrusel y sus funcionalidades
 */
function initCarousel() {
  const carousel = document.getElementById('carouselMain');
  const backgroundSlider = document.getElementById('background-slider');
  const slideInfo = document.getElementById('slide-info');
  
  if (!carousel) return;
  
  // Arrays con la información de cada producto y textos informativos
  const productInfo = [
    {
      name: "Factor de Transferencia",
      description: "Fortalece tu sistema inmune con nuestra fórmula avanzada.",
      price: "$750.00 MXN",
      image: "recursos/carrusel/CelestinFT__2024_V4.webp",
      infoTitle: "1- Innovación y Fundamento Científico",
      infoContent: "Respaldados por la ciencia y la innovación, como distribuidores de Factor de Transferencia, nos dedicamos a ofrecer soluciones basadas en avances comprobados. Nuestro enfoque se centra en promover tu bienestar a través de productos diseñados con rigor científico."
    },
    {
      name: "Daily Pro 50",
      description: "Equilibrio digestivo e inmunidad en cada cápsula.",
      price: "$650.00 MXN",
      image: "recursos/carrusel/DailyPRO_50_2024_V4.webp",
      infoTitle: "2- Equilibrio Saludable en tu Microbiota",
      infoContent: "Nuestra misión es apoyarte en mantener un equilibrio óptimo en tu microbiota intestinal. Este balance es esencial para una digestión saludable y un cuerpo en armonía, aprovechando los beneficios que la naturaleza y la investigación pueden brindar."
    },
    {
      name: "ArtikOM3",
      description: "Apoyo cardiovascular con omega-3 de krill antártico.",
      price: "$825.00 MXN",
      image: "recursos/carrusel/ArtikOM3__2024_V4.webp",
      infoTitle: "3- Fortalecimiento Natural del Sistema Inmunológico",
      infoContent: "Buscamos fortalecer tu sistema inmunológico de manera natural y efectiva. Con el Factor de Transferencia, te ofrecemos una herramienta que respalda tus defensas, ayudándote a enfrentar los desafíos diarios con mayor resistencia."
    },
    {
      name: "Inm Box",
      description: "Triple apoyo integral para tu salud inmunológica.",
      price: "$1,499.00 MXN",
      image: "recursos/carrusel/InmBox__2024_V4.webp",
      infoTitle: "4- Compromiso con tu Salud",
      infoContent: "Combinamos ciencia y naturaleza para proporcionarte una solución integral. Nuestro objetivo es que disfrutes de una vida más saludable, con un enfoque preventivo y sostenible que potencie tu bienestar a largo plazo."
    }
  ];
  
  // Evento para cambio de slide en el carousel
  carousel.addEventListener('slide.bs.carousel', function(e) {
    const slideIndex = e.to; // Índice de la nueva diapositiva
    
    // Actualizar el fondo con un pequeño retraso para una transición más suave
    setTimeout(() => {
      if (backgroundSlider) {
        backgroundSlider.style.backgroundImage = `url('${productInfo[slideIndex].image}')`;
      }
    }, 300);
    
    // Actualizar el título y contenido informativo en el panel lateral
    if (document.querySelector('#info-panel h3')) {
      document.querySelector('#info-panel h3').textContent = productInfo[slideIndex].infoTitle;
    }
    
    if (document.querySelector('#info-content p')) {
      document.querySelector('#info-content p').textContent = productInfo[slideIndex].infoContent;
    }
    
    // Actualizar la información del producto en la tarjeta lateral
    if (slideInfo) {
      slideInfo.innerHTML = `
        <h4 style="color: #2E5A87; font-size: 1.3rem; margin-bottom: 10px;">${productInfo[slideIndex].name}</h4>
        <p style="font-size: 1rem; margin-bottom: 8px;">${productInfo[slideIndex].description}</p>
        <p class="price" style="font-size: 1.3rem; font-weight: 600; color: #4CAF50; margin-bottom: 15px;">${productInfo[slideIndex].price}</p>
        <div class="cta-buttons" style="display: flex; gap: 15px;">
          <a href="productos.html?producto=${productInfo[slideIndex].name.toLowerCase().replace(/ /g, '-')}" class="btn-primary" style="padding: 8px 15px; font-size: 0.9rem; display: inline-block;">Ver más</a>
          <button class="btn-outline add-to-cart" style="padding: 8px 15px; font-size: 0.9rem; background: rgba(46,90,135,0.1); border: 1px solid #2E5A87; color: #2E5A87; border-radius: 5px; cursor: pointer;"><i class="fas fa-shopping-cart"></i> Añadir</button>
        </div>
      `;
    }
  });
}

/**
 * Inicializa las funcionalidades del carrito
 */
function initCart() {
  // Configurar los botones de añadir al carrito en el carrusel
  const addToCartButtons = document.querySelectorAll('.carousel-caption .add-to-cart, .carousel-item .add-to-cart');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Obtener información del producto desde el carrusel
      const slide = this.closest('.carousel-item');
      if (!slide) return;
      
      const productName = slide.querySelector('h2')?.textContent || "Producto";
      const priceText = slide.querySelector('.price')?.textContent || "$0";
      const price = parseInt(priceText.replace(/[^0-9]/g, ''));
      
      // Añadir al carrito (localStorage)
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find(item => item.product === productName);
      
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ product: productName, price: price, quantity: 1 });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Actualizar contador del carrito
      const cartCountElement = document.querySelector('.cart-count');
      if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'inline-block' : 'none';
      }
      
      // Efecto visual de confirmación
      button.classList.add('added');
      button.innerHTML = '<i class="fas fa-check"></i> Añadido';
      
      // Restaurar botón después de 2 segundos
      setTimeout(() => {
        button.classList.remove('added');
        button.innerHTML = '<i class="fas fa-shopping-cart"></i> Añadir';
      }, 2000);
      
      // Mostrar notificación
      showNotification(productName);
    });
  });
  
  // Evento para abrir y cerrar el mini carrito
  const cartToggle = document.querySelector('.cart-toggle');
  const miniCart = document.querySelector('.mini-cart');
  const closeCartBtn = document.querySelector('.close-cart-btn');
  
  if (cartToggle && miniCart) {
    cartToggle.addEventListener('click', function(e) {
      e.preventDefault();
      miniCart.style.right = '0'; // Mostrar carrito
    });
  }
  
  if (closeCartBtn && miniCart) {
    closeCartBtn.addEventListener('click', function() {
      miniCart.style.right = '-400px'; // Ocultar carrito
    });
  }
  
  // Inicializar mini-carrito si existe
  initMiniCart();
}

/**
 * Inicializa el mini carrito
 */
function initMiniCart() {
  // Cargar los productos del carrito al iniciar
  const miniCartItems = document.querySelector('.mini-cart-items');
  const miniCartTotal = document.querySelector('.mini-cart-price');
  const emptyCartEl = document.querySelector('.empty-cart');
  
  if (!miniCartItems || !miniCartTotal) return;
  
  function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    
    // Limpiar elementos previos (excepto el mensaje de carrito vacío)
    const existingItems = miniCartItems.querySelectorAll('.cart-item');
    existingItems.forEach(item => item.remove());
    
    // Mostrar/ocultar mensaje de carrito vacío
    if (emptyCartEl) {
      emptyCartEl.style.display = cart.length === 0 ? 'block' : 'none';
    }
    
    // Añadir productos al carrito
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      const cartItemEl = document.createElement('div');
      cartItemEl.className = 'cart-item';
      cartItemEl.innerHTML = `
        <div style="display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid rgba(0,0,0,0.06);">
          <div>
            <h5 style="font-size: 1rem; margin-bottom: 5px;">${item.product}</h5>
            <div style="display: flex; align-items: center;">
              <button class="quantity-btn minus" data-product="${item.product}">-</button>
              <span style="margin: 0 10px;">${item.quantity}</span>
              <button class="quantity-btn plus" data-product="${item.product}">+</button>
            </div>
          </div>
          <div style="text-align: right;">
            <p style="font-weight: 600; color: #056afa;">$${itemTotal.toFixed(2)}</p>
            <button class="remove-item" data-product="${item.product}">&times;</button>
          </div>
        </div>
      `;
      
      miniCartItems.appendChild(cartItemEl);
    });
    
    // Actualizar el total
    miniCartTotal.textContent = `$${total.toFixed(2)} MXN`;
    
    // Añadir event listeners a los botones de cantidad
    const quantityBtns = miniCartItems.querySelectorAll('.quantity-btn');
    quantityBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const product = this.dataset.product;
        const isPlus = this.classList.contains('plus');
        
        updateProductQuantity(product, isPlus);
        updateCartDisplay();
      });
    });
    
    // Añadir event listeners a los botones de eliminar
    const removeBtns = miniCartItems.querySelectorAll('.remove-item');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const product = this.dataset.product;
        removeFromCart(product);
        updateCartDisplay();
      });
    });
  }
  
  function updateProductQuantity(product, isIncrement) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.product === product);
    
    if (item) {
      if (isIncrement) {
        item.quantity += 1;
      } else {
        item.quantity -= 1;
        
        // Eliminar si la cantidad llega a 0
        if (item.quantity <= 0) {
          removeFromCart(product);
          return;
        }
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Actualizar contador global
      const cartCountElement = document.querySelector('.cart-count');
      if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'inline-block' : 'none';
      }
    }
  }
  
  function removeFromCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.product !== product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Actualizar contador global
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCountElement.textContent = totalItems;
      cartCountElement.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
  }
  
  // Inicializar al cargar
  updateCartDisplay();
}

/**
 * Función para mostrar notificación de producto añadido
 * @param {string} productName - Nombre del producto añadido
 */
function showNotification(productName) {
  // Verificar si ya existe el contenedor de notificaciones
  let notificationContainer = document.getElementById('notification-container');
  
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999;';
    document.body.appendChild(notificationContainer);
  }
  
  // Crear la notificación
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.style.cssText = 'background-color: #4CAF50; color: white; padding: 15px; border-radius: 5px; margin-bottom: 10px; display: flex; align-items: center; box-shadow: 0 3px 10px rgba(0,0,0,0.2); animation: slideInRight 0.3s forwards;';
  
  notification.innerHTML = `
    <i class="fas fa-check-circle" style="margin-right: 10px; font-size: 1.2rem;"></i>
    <div>
      <div style="font-weight: bold;">Producto añadido</div>
      <div>${productName} ha sido añadido al carrito</div>
    </div>
  `;
  
  notificationContainer.appendChild(notification);
  
  // Eliminar la notificación después de 3 segundos
  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Añade estilos de animaciones al documento
 */
function addAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    
    .add-to-cart.added {
      background-color: #4CAF50 !important;
      border-color: #4CAF50 !important;
      transition: all 0.3s ease;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Función para aplicar efecto hover a botones
 * @param {HTMLElement} button - Botón al que aplicar el efecto
 */
function addHoverEffect(button) {
  if (!button) return;
  
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
    this.style.boxShadow = '0 6px 15px rgba(5,106,250,0.3)';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 10px rgba(5,106,250,0.2)';
  });
}