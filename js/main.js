(() => {
// console.log('holiii');



// VARIABLES
const hotspots = document.querySelectorAll(".Hotspot");

  const infoBoxes = [

    { title: "All-Day. All-Week. All Go.",
      text: "Enjoy up to 36 hours of playtime with the compact, pocket-friendly charging case.",
      image: "images/model-icons/battery.png" },

    { title: "All-Day comfort",
      text: "With four ear tip sizes (XS, S, M, L), the acoustic seal adapts for secure fit and sound.",
      image: "images/model-icons/comfort.png" },

    { title: "Noise Cancelling",
      text: "Active Noise Cancelling continuously blocks external sounds for clear audio.",
      image: "images/model-icons/noisec.png" },

    { title: "Controls - At Your Fingertips",
      text: "On-ear controls let you manage music, modes, calls and voice assistant.",
      image: "images/model-icons/fingertips.png" }
  ]


  // FUNCTIONS
function fillInfo() {
  infoBoxes.forEach((infoBox, index) => {
    
    let selected = document.querySelector(`#hotspot${index + 1}`);

    selected.replaceChildren();

    const imageElement = document.createElement('img');
    imageElement.src = infoBox.image;
    imageElement.alt = infoBox.title;

    const titleElement = document.createElement('h2');
    titleElement.textContent = infoBox.title;

    const textElement = document.createElement('p');
    textElement.textContent = infoBox.text;


    // lets add the p to the selected hotspot
        selected.appendChild(imageElement);
        selected.appendChild(titleElement);
        selected.appendChild(textElement);

  });
}

 fillInfo();

  // since the slot value matches the id value I can use the slot value as a selector to get to the div I want.
  function revealInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, { 
      duration: 1, 
      autoAlpha: 1 });
  }

  function dismissInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, { 
      duration: 1, 
      autoAlpha: 0 });
  }


  // EVENT LISTENERS
  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", revealInfo);
    hotspot.addEventListener("mouseleave", dismissInfo);
    
  });



  
})();
