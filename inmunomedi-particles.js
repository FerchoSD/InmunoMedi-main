document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    canvas.id = "inmuno-particles-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = 0;
    canvas.style.pointerEvents = "none";
    document.getElementById("bg-particles").appendChild(canvas);
  
    const ctx = canvas.getContext("2d");
    let particles = [];
    const numParticles = 80;
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
  
    class Particle {
      constructor() {
        this.reset();
      }
  
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 1 + Math.random() * 3;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.alpha = 0.2 + Math.random() * 0.3;
      }
  
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
  
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
  
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(5, 106, 250, ${this.alpha})`;
        ctx.fill();
      }
    }
  
    function initParticles() {
      particles = Array.from({ length: numParticles }, () => new Particle());
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
  
    initParticles();
    animate();
  });
  