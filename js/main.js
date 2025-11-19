(() => {
  // VARIABLES 

  const hotspots = document.querySelectorAll(".Hotspot");
  const infoCardsContainer = document.querySelector(".info-cards");

  const infoBoxes = [
    {
      title: "All-Day. All-Week. All Go.",
      text: "Enjoy up to 36 hours of playtime with the compact, pocket-friendly charging case.",
      image: "images/model-icons/battery.png"
    },
    {
      title: "All-Day comfort",
      text: "With four ear tip sizes (XS, S, M, L), the acoustic seal adapts for secure fit and sound.",
      image: "images/model-icons/comfort.png"
    },
    {
      title: "Noise Cancelling",
      text: "Active Noise Cancelling continuously blocks external sounds for clear audio.",
      image: "images/model-icons/noisec.png"
    },
    {
      title: "Controls - At Your Fingertips",
      text: "On-ear controls let you manage music, modes, calls and voice assistant.",
      image: "images/model-icons/fingertips.png"
    }
  ];

    // Burger menu
    const burgerButton = document.querySelector("#burger-button");
    const burgerCon = document.querySelector("#burger-con");

  // FUNCTIONS 

  // create desktop hotspots
  function fillHotspots() {
    infoBoxes.forEach((infoBox, index) => {
      const selected = document.querySelector(`#hotspot${index + 1}`);
      if (!selected) return;

      selected.replaceChildren();

      const img = document.createElement("img");
      img.src = infoBox.image;
      img.alt = infoBox.title;

      const title = document.createElement("h2");
      title.textContent = infoBox.title;

      const text = document.createElement("p");
      text.textContent = infoBox.text;

      selected.appendChild(img);
      selected.appendChild(title);
      selected.appendChild(text);
    });
  }

  // create mobile cards
  function fillMobileCards() {
    if (!infoCardsContainer) return;

    infoCardsContainer.innerHTML = "";

    infoBoxes.forEach((box) => {
      const card = document.createElement("div");
      card.classList.add("info-card");

      const img = document.createElement("img");
      img.src = box.image;
      img.alt = box.title;

      const title = document.createElement("h3");
      title.textContent = box.title;

      const text = document.createElement("p");
      text.textContent = box.text;

      const textWrap = document.createElement("div");
      textWrap.appendChild(title);
      textWrap.appendChild(text);

      card.appendChild(img);
      card.appendChild(textWrap);

      infoCardsContainer.appendChild(card);
    });
  }

  // hide/show cards container based on viewport
  function toggleCardsForViewport() {
    const isDesktop = window.innerWidth > 768;
    if (!infoCardsContainer) return;

    if (isDesktop) {
      infoCardsContainer.style.display = "none";
      infoCardsContainer.textContent = "";
    } else {
      infoCardsContainer.style.display = "";
      if (!infoCardsContainer.hasChildNodes()) {
        fillMobileCards();
      }
    }
  }

  function revealInfo() {
    const selected = document.querySelector(`#${this.slot}`);
    if (selected) gsap.to(selected, { duration: 1, autoAlpha: 1 });
  }

  function dismissInfo() {
    const selected = document.querySelector(`#${this.slot}`);
    if (selected) gsap.to(selected, { duration: 1, autoAlpha: 0 });
  }

  // responsive mob-desk
  function handleResponsive() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      fillMobileCards();

      hotspots.forEach((hotspot) => {
        hotspot.addEventListener("mouseenter", revealInfo);
        hotspot.addEventListener("mouseleave", dismissInfo);
      });
    } else {
      fillHotspots();

      hotspots.forEach((hotspot) => {
        hotspot.addEventListener("mouseenter", revealInfo);
        hotspot.addEventListener("mouseleave", dismissInfo);
      });
    }
  }
// Hamburger menu toggle - open close
    function hamburgerMenu() {
    if (!burgerCon || !burgerButton) return;
    burgerCon.classList.toggle("slide-toggle");
    burgerButton.classList.toggle("expanded");
  }

// EVENT LISTENERS 

  handleResponsive();
  toggleCardsForViewport();
  window.addEventListener("resize", handleResponsive);
  window.addEventListener("resize", toggleCardsForViewport);

    // listener for burger
  if (burgerButton && burgerCon) {
    burgerButton.addEventListener("click", hamburgerMenu, false);
  }

})();
