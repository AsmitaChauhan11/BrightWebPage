document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".checkbox-item");
  const checklist = document.querySelector(".checklist");
  checklist.addEventListener("animationend", function () {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });
  });
});

document.querySelectorAll(".accordion-button").forEach((button) => {
  button.addEventListener("click", () => {
    const accordionContent = button.nextElementSibling;
    const isActive = button.classList.contains("active");

    document.querySelectorAll(".accordion-button").forEach((btn) => {
      btn.classList.remove("active");
      btn.nextElementSibling.style.maxHeight = null;
    });

    if (!isActive) {
      button.classList.add("active");
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    }
  });
});

const firstAccordionButton = document.querySelector(".accordion-button");
const firstAccordionContent = firstAccordionButton.nextElementSibling;
firstAccordionButton.classList.add("active");
firstAccordionContent.style.maxHeight =
  firstAccordionContent.scrollHeight + "px";

const track = document.querySelector(".review-container");
const cards = Array.from(track.children);
const nextButton = document.querySelector(".next-btn");
const prevButton = document.querySelector(".prev-btn");

let cardIndex = 0;
let cardWidth = cards[0].getBoundingClientRect().width;

const setCardPosition = (card, index) => {
  card.style.left = cardWidth * index + "px";
};

cards.forEach(setCardPosition);

const moveToCard = (track, currentIndex, targetIndex) => {
  track.style.transform = `translateX(-${cardWidth * targetIndex}px)`;
  cardIndex = targetIndex;
};

const updateCarousel = () => {
  cardWidth = cards[0].getBoundingClientRect().width;
  cards.forEach(setCardPosition);
  moveToCard(track, cardIndex, cardIndex);
};

nextButton.addEventListener("click", () => {
  const nextIndex = (cardIndex + 1) % cards.length;
  moveToCard(track, cardIndex, nextIndex);
});

prevButton.addEventListener("click", () => {
  const prevIndex = (cardIndex - 1 + cards.length) % cards.length;
  moveToCard(track, cardIndex, prevIndex);
});

window.addEventListener("resize", updateCarousel);

updateCarousel();
