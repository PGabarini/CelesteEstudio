document.addEventListener("DOMContentLoaded", () => {
  const slidesData = [
    {
      title: "Diseño web corporativo",
      subtitle: "Una estética limpia con foco en conversión y confianza.",
      image: "imagenes/heroimg.jpg"
    },
    {
      title: "Landing de alto impacto",
      subtitle: "Jerarquía visual fuerte para captar atención desde el primer segundo.",
      image: "imagenes/heroimg2.jpg"
    },
    {
      title: "Experiencia mobile-first",
      subtitle: "Interfaces pensadas para verse impecables en cualquier dispositivo.",
      image: "imagenes/heroimg3.jpg"
    },
    {
      title: "Sitio con identidad premium",
      subtitle: "Detalles visuales más finos, modernos y memorables.",
      image: "imagenes/heroimg.jpg"
    },
    {
      title: "Página enfocada en resultados",
      subtitle: "Diseño + estructura para vender mejor tus servicios.",
      image: "imagenes/heroimg2.jpg"
    }
  ];

  const stage = document.getElementById("carouselStage");
  const slides = Array.from(stage.querySelectorAll(".slide"));
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let current = 0;

  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  function render() {
    const prev = mod(current - 1, slidesData.length);
    const next = mod(current + 1, slidesData.length);

    const positions = [
      { el: slides[0], data: slidesData[prev], className: "slide-prev" },
      { el: slides[1], data: slidesData[current], className: "slide-active" },
      { el: slides[2], data: slidesData[next], className: "slide-next" }
    ];

    positions.forEach(({ el, data, className }, index) => {
      el.className = `slide ${className}`;
      el.style.backgroundImage = `url("${data.image}")`;

      const h3 = el.querySelector("h3");
      const p = el.querySelector("p");
      const kicker = el.querySelector(".slide-kicker");

      h3.textContent = data.title;
      p.textContent = data.subtitle;
      kicker.textContent = String(index + 1).padStart(2, "0");

      el.setAttribute("aria-label", data.title);
      el.classList.remove("is-animating");
      void el.offsetWidth;
      el.classList.add("is-animating");
    });
  }

  function nextSlide() {
    current = mod(current + 1, slidesData.length);
    render();
  }

  function prevSlide() {
    current = mod(current - 1, slidesData.length);
    render();
  }

  slides.forEach((slide) => {
    slide.addEventListener("click", nextSlide);
  });

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  render();
});