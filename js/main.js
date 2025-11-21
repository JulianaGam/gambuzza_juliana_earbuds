(() => {

  // 1. variables 
      // 1.1 variable hotspots and info cards
      // 1.2 variables burger menu 
      // 1.3 variables scroll animation
      // 1.4 variables procust section
      // 1.5 variables Xray slider
      // 1.6 variables Box cards 

  // 2.  Functions 
      // 2.1 Hotspots
      // 2.2 Burger menu
      // 2.3 Scroll animation
      // 2.4 products secrtion
      // 2.5 Xray 
      // 2.6 box cards

  // 3.  Event listeners 
      // 3.1 Hotspots
      // 3.2 Burger menu
      // 3.3 Scroll animation
      // 3.4 products secrtion
      // 3.5 Xray 
      // 3.6 box cards


// ----------------- Variables ----------------
  // ---------- Hotspots ----------
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

  // ---------- burger menu ----------
  const burgerButton = document.querySelector("#burger-button");
  const burgerCon = document.querySelector("#burger-con");

  // ---------- scroll animation ----------
  const canvas = document.querySelector("#explode-view");
  let canvasContext = null;
  const scrollFrameCount = 294;
  const scrollImages = [];
  const buds = { frame: 0 };

  // ---------- product section ----------
  const productSection = document.querySelector("#product-section");
  const mainProductImage = document.querySelector("#product-main img");
  const thumbnailButtons = document.querySelectorAll(".product-thumb");
  const colourButtons = document.querySelectorAll("#colour-picker .colour-dot");
  const colourNameLabel = document.querySelector("#product-colour-name");

  const productImagesByColour = {
    hp: [
      { src: "images/products/hp.jpg",  alt: "Beats Studio Buds HP view 1" },
      { src: "images/products/hp2.png", alt: "Beats Studio Buds HP view 2" },
      { src: "images/products/hp3.png", alt: "Beats Studio Buds HP view 3" }
    ],
    gry: [
      { src: "images/products/gry.jpg",  alt: "Beats Studio Buds Gryffindor view 1" },
      { src: "images/products/gry2.png", alt: "Beats Studio Buds Gryffindor view 2" },
      { src: "images/products/gry3.png", alt: "Beats Studio Buds Gryffindor view 3" }
    ],
    sly: [
      { src: "images/products/sly.jpg",  alt: "Beats Studio Buds Slytherin view 1" },
      { src: "images/products/sly2.png", alt: "Beats Studio Buds Slytherin view 2" },
      { src: "images/products/sly3.png", alt: "Beats Studio Buds Slytherin view 3" }
    ],
    huff: [
      { src: "images/products/huff.jpg",  alt: "Beats Studio Buds Hufflepuff view 1" },
      { src: "images/products/huff2.png", alt: "Beats Studio Buds Hufflepuff view 2" },
      { src: "images/products/huff3.png", alt: "Beats Studio Buds Hufflepuff view 3" }
    ],
    rav: [
      { src: "images/products/rav.jpg",  alt: "Beats Studio Buds Ravenclaw view 1" },
      { src: "images/products/rav2.png", alt: "Beats Studio Buds Ravenclaw view 2" },
      { src: "images/products/rav3.png", alt: "Beats Studio Buds Ravenclaw view 3" }
    ]
  };

  const productColourNames = {
    hp: "HP Black / Gold",
    gry: "Gryffindor Red",
    sly: "Slytherin Green",
    huff: "Hufflepuff Yellow",
    rav: "Ravenclaw Blue"
  };

  let currentColourKey = "hp";
  let currentImageIndex = 0;

  // ---------- xray slider----------
  const divisor = document.querySelector("#divisor");
  const slider = document.querySelector("#slider");

  // ---------- box cards ----------
  const boxCards = document.querySelectorAll(".box-card");

// ----------------- functions ----------------

  // ---------- Hotspots  ----------
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

  // ---------- burger menu ----------
  function hamburgerMenu() {
    if (!burgerCon || !burgerButton) {
      return;
    }
    burgerCon.classList.toggle("slide-toggle");
    burgerButton.classList.toggle("expanded");
  }

  // ---------- scroll animation ----------

  function drawScrollFrame() {
    if (!canvas || !canvasContext) {
      return;
    }

    const safeIndex = Math.min(buds.frame, scrollImages.length - 1);
    const frameImage = scrollImages[safeIndex];

    if (!frameImage) {
      return;
    }

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.drawImage(frameImage, 0, 0);
  }

  function initScrollAnimation() {
    if (!canvas) {
      return;
    }

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    canvasContext = canvas.getContext("2d");
    canvas.width = 1920;
    canvas.height = 1080;

    for (let i = 0; i < scrollFrameCount; i++) {
      const img = new Image();
      img.src = `images/scroll/animation-case-final${(i + 1).toString().padStart(4, "0")}.webp`;
      scrollImages.push(img);
    }

    if (scrollImages[0]) {
      scrollImages[0].addEventListener("load", drawScrollFrame);
    }

    gsap.to(buds, {
      frame: scrollFrameCount - 1,
      snap: "frame",
      scrollTrigger: {
        trigger: "#explode-view",
        pin: true,
        start: "top top",
        end: "900% bottom",
        scrub: 2
      },
      onUpdate: drawScrollFrame
    });
  }

  // ---------- product section ----------

  
  function paintThumbnails(colourKey) {
      // This gets the image array for the current color
    const imagesForColour = productImagesByColour[colourKey];

    thumbnailButtons.forEach(function fillThumb(button) {
      // This reads which image belongs to this button
      const index = Number(button.dataset.index);
      const imageData = imagesForColour[index];

      if (imageData) {
        // This makes sure the thumbnail is visible when there is an image
        button.classList.remove("is-hidden");

        // This tries to find an existing <img> inside the button
        let thumbImg = button.querySelector("img");

        // This creates the <img> if the button does not have one yet
        if (!thumbImg) {
          thumbImg = document.createElement("img");
          button.appendChild(thumbImg);
        }


        // This updates the thumbnail image source and description
        thumbImg.src = imageData.src;
        thumbImg.alt = imageData.alt;
      } else {
        button.classList.add("is-hidden");
      }
    });
  }

  function showMainProductImage(newIndex) {
    const imagesForColour = productImagesByColour[currentColourKey];
    const imageData = imagesForColour[newIndex];

    
  // This checks if there is actually a img data 
  if (imageData == null) {
    return;
  }

  // This checks if the main product img exists
  if (mainProductImage == null) {
    return;
  }

  // This updates the current index so the app knows which img is cative
    currentImageIndex = newIndex;
    mainProductImage.src = imageData.src;
    mainProductImage.alt = imageData.alt;

    thumbnailButtons.forEach(function updateThumbState(button) {
      
      const thumbIndex = Number(button.dataset.index);


    //mark the active thumbnail and removes it from the others
      if (thumbIndex === currentImageIndex) {
        button.classList.add("is-selected");
      } else {
        button.classList.remove("is-selected");
      }
    });
  }

  // function for the selected tiem changes color, thumbs, img, text
  function setActiveColour(newColourKey) {
    currentColourKey = newColourKey;
    currentImageIndex = 0;
    colourButtons.forEach(function updateColourState(button) {

      if (button.id === currentColourKey) {
        button.classList.add("is-selected");
      } else {
        button.classList.remove("is-selected");
      }
    });

    paintThumbnails(currentColourKey);
    showMainProductImage(0);

    if (colourNameLabel) {
      colourNameLabel.textContent = productColourNames[currentColourKey];
    }
  }

  // This function makes the big image change to specific view and visual status of “selected” to be updated
  function handleColourButtonClick(event) {
    const clickedButton = event.currentTarget;
    const newColourKey = clickedButton.id;

    if (newColourKey === currentColourKey) {
      return;
    }

    setActiveColour(newColourKey);
  }

  function handleThumbnailClick(event) {
    const clickedButton = event.currentTarget;
    const thumbIndex = Number(clickedButton.dataset.index);

    showMainProductImage(thumbIndex);
  }

  function initProductFilters() {
    if (!productSection) {
      return;
    }

    if (!mainProductImage || thumbnailButtons.length === 0 || colourButtons.length === 0) {
      return;
    }

    setActiveColour(currentColourKey);

    colourButtons.forEach(function attachColourListener(button) {
      button.addEventListener("click", handleColourButtonClick);
    });

    thumbnailButtons.forEach(function attachThumbListener(button) {
      button.addEventListener("click", handleThumbnailClick);
    });
  }

  // ---------- xray ----------

  function moveDivisor() {
    // console.log(slider.value);
    divisor.style.width = `${slider.value}%`;
  }

  function resetSlider() {
    slider.value = 50;
  }

  function animateBoxCards() {
    if (boxCards.length === 0) {
      return;
    }

// ----- box cards gsap -------
    gsap.from(boxCards, {
      scrollTrigger: {
        trigger: "#box-section",
        start: "top 70%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 150,
      duration: 0.8,
      ease: "ease-in",
      stagger: 0.25
    });
  }

// ---------- Event Listener -------------

  // ------ Hotspots ------ 
  handleResponsive();
  toggleCardsForViewport();
  window.addEventListener("resize", handleResponsive);
  window.addEventListener("resize", toggleCardsForViewport);

  //------  Burger menu------ 
  if (burgerButton && burgerCon) {
    burgerButton.addEventListener("click", hamburgerMenu);
  }

  //------  Scroll animation ------ 
  initScrollAnimation();

  // ------ Product section ------ 
  initProductFilters();

  // ------ Xray slider ------ 
  if (slider) {
    slider.addEventListener("input", moveDivisor);
  }
  window.addEventListener("load", resetSlider);

  // ------  Box cards animation ------ 
  animateBoxCards();
})();
