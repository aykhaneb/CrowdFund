let modal_pop = document.querySelector(".modal-pop");
let total_layer = document.querySelector(".total-layer");
let modal_inner = document.querySelectorAll(".modal-inner");
let select_btn = document.querySelectorAll(".select");
let thanks_card = document.getElementById("thanks-card");
let type = document.getElementById("type");
let boxs = document.getElementsByName("pledge");
let input_pledge = document.querySelectorAll(".input-pledge");
let subMenuBtn = document.getElementById("subMenu");
let subMenu = document.querySelector(".subMenu");
let sub_menu_icon = document.getElementById("subMenuIcon");
let isMenuOpen = false;

let bookmark_text = document.querySelector(".bookmark");

// DISPLAY SUBMENU

subMenuBtn.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    subMenu.style.display = "block";
    total_layer.classList.add("show");
    sub_menu_icon.src = "./assets/icons/icon-close-menu.svg";
  } else {
    subMenu.style.display = "none";
    total_layer.classList.remove("show");
    sub_menu_icon.src = "./assets/icons/icon-hamburger.svg";
  }
});

// BORDER ON MODALS BOX PLUS INPUT PLEDGE

for (let i = 0; i < boxs.length; i++) {
  boxs[i].addEventListener("click", (e) => {
    clearBorder();
    e.path[2].style.border = "2px solid gray";
    modal_inner[i].classList.add("display-pledge");
    input_pledge[i].innerHTML = `
    <h3>Enter your pledge</h3>
    <label for="pledge">
      <span>$</span>
      <input type="text" />
    </label>
    <button onclick="displayThanks()">Continue</button>`;
  });
}

function clearBorder() {
  for (let i = 0; i < boxs.length; i++) {
    modal_inner[i].style.border = "1px solid rgba(128, 128, 128, 0.479)";
    modal_inner[i].classList.remove("display-pledge");
    input_pledge[i].innerHTML = "";
  }
}

// CLOSE MODAL & OPEN MODAL

document.getElementById("close-modal").addEventListener("click", () => {
  modal_pop.classList.remove("show");
  total_layer.classList.remove("show");
});
let open = document.querySelectorAll("#open-modal");

open.forEach(item => {
  item.addEventListener("click", () => {
    modal_pop.classList.add("show");
    total_layer.classList.add("show");
  });
});


// THANKS TO THE USER

let isDisplayThanks = true;
// select_btn[0].addEventListener("click", displayThanks);
// select_btn[1].addEventListener("click", displayThanks);


let gotit = document.querySelectorAll("#gotit");
gotit.forEach(item => {
    item.addEventListener("click", () => {
        displayThanks();
        
    });
});

function displayThanks() {
    if (isDisplayThanks) {
        thanks_card.classList.add("show");
        total_layer.classList.add("show");
        modal_pop.classList.remove("show");
        clearBorder();
        type.classList.add("type");
    } else {
        thanks_card.classList.remove("show");
        total_layer.classList.remove("show");
        clearBorder();
        type.classList.remove("type");
    }
    isDisplayThanks = !isDisplayThanks;
}

// Bookmark

let bookmarked = false;

bookmark.addEventListener("click", () => {
  bookmarked = !bookmarked;
  bookmarked
    ? (bookmark_text.innerText = "Bookmarked")
    : (bookmark_text.innerText = "Bookmark");
});
overlay.addEventListener("click", () => {
  if (mobileNav.classList.contains("active")) {
      toggleNav();
      mobileNav.style.opacity = 0;
      mobileNav.style.maxHeight = 0;
  } else {
      resetModal();
      toggleModal();
      toggleOverlay();
  };
});


// Mobile Menu

openNav.addEventListener("click", () => {
  mobileNav.style.opacity = 1;
  mobileNav.style.maxHeight = mobileNav.scrollHeight + "px";
  toggleNav();
});

closeNav.addEventListener("click", () => {
  mobileNav.style.opacity = 0;
  mobileNav.style.maxHeight = 0;
  toggleNav();
});





// Modal

openButtons.forEach(b => {
  b.addEventListener("click", () => {
      toggleModal();
      toggleOverlay();
      if (b.classList.contains("specific")) {
          const inputID = specificButtons[b.id];
          const checkedOption = document.querySelector(inputID);
          checkedOption.checked = true;
          selectNew(checkedOption);
      };
  });
});

closeModal.addEventListener("click", () => {
  resetModal();
  toggleModal();
  toggleOverlay();
});


// Option Selection

selects.forEach(select => {
  select.addEventListener("change", () => {
      clearSelect();
      selectNew(select);
  });
});


// Form Validation

continueButtons.forEach(b => {
  b.addEventListener("click", event => {
      event.preventDefault();
      const input = document.querySelector(".selection.active .amount input");
      const inputID = input.id;
      pledge = Number(input.value);
      if (!pledge || pledge < inputConditions[inputID]) {
          input.parentElement.parentElement.classList.add("error");
      } else {
          input.parentElement.parentElement.classList.remove("error");
          updateStock();
          resetModal();
          overlay.classList.toggle("inactive");
          modal.classList.toggle("active");
          setTimeout(() => {
              confirmation.classList.toggle("active");
          }, 1000);
      };
  });
});


// Confirmation

finalizeButton.addEventListener("click", () => {
  overlay.classList.toggle("inactive");
  overlay.classList.toggle("active");
  confirmation.classList.toggle("active");
  logo.classList.toggle("inactive");
  openNav.classList.toggle("inactive");
  numberSection.classList.toggle("loading");
  const newTotal = Math.round(parseFloat(totalRaised.innerHTML.replace(",", "")) + pledge);
  let totalString = newTotal.toString();
  const newBackers = (parseFloat(totalBackers.innerHTML.replace(",", "")) + 1).toString();
  let backersString = newBackers.toString();
  for (let i = 3; i < totalString.length; i += 4) {
      totalString = totalString.slice(0, -i) + "," + totalString.slice(-i);
  }
  for (let i = 3; i < backersString.length; i += 3) {
      backersString = backersString.slice(0, -i) + "," + backersString.slice(-i);
  }
  setTimeout(() => {
      numberSection.scrollIntoView({ behavior: "smooth" });
      progressBar.style.transition = "width 0s ease-out";
      progressBar.style.maxWidth = 0;
      progressBar.style.width = 0;
      setTimeout(() => {
          totalRaised.innerHTML = totalString;
          totalBackers.innerHTML = backersString;
          numberSection.classList.toggle("loading");
          progressBar.style.maxWidth = "100%";
          let newWidth = newTotal * 100 / 100000;
          if (newWidth < 100) {
              progressBar.style.transition = `width ${newWidth * 0.01 * 2}s ease-out`;
              progressBar.style.width = newWidth + "%";
          } else {
              progressBar.style.transition = "width 2s ease-out";
              progressBar.style.width = "100%";
          };
      }, 500);
  }, 500);
});