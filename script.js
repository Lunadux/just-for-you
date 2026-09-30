const pages =
  document.querySelectorAll(".page");

let currentPage = 0;

const answers = {
  activity: null,
  food: null,
  after: null,
  date: null
};


/* NEXT PAGE */

function nextPage() {

  pages[currentPage]
    .classList.remove("active");

  currentPage++;

  pages[currentPage]
    .classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* CARD SELECTION */

document
  .querySelectorAll(".choice-card")
  .forEach(card => {

    card.addEventListener(
      "click",
      () => {

        const group =
          card.dataset.group;

        document
          .querySelectorAll(
            `[data-group="${group}"]`
          )
          .forEach(item =>
            item.classList.remove(
              "selected"
            )
          );

        card.classList.add(
          "selected"
        );

        answers[group] =
          card.dataset.value;

      }
    );

  });


/* RUNAWAY NO BUTTON */

const noButton =
  document.getElementById("noButton");

let escapeCount = 0;

const noMessages = [
  "Are you sure?",
  "Really? 🤨",
  "Wrong button",
  "Try again",
  "Nice try",
  "♡"
];


function escapeNoButton() {

  escapeCount++;

  noButton.textContent =
    noMessages[
      Math.min(
        escapeCount - 1,
        noMessages.length - 1
      )
    ];

  noButton.style.position =
    "fixed";

  const maxX =
    window.innerWidth -
    noButton.offsetWidth -
    20;

  const maxY =
    window.innerHeight -
    noButton.offsetHeight -
    20;

  noButton.style.left =
    Math.max(
      20,
      Math.random() * maxX
    ) + "px";

  noButton.style.top =
    Math.max(
      20,
      Math.random() * maxY
    ) + "px";

}


noButton.addEventListener(
  "mouseenter",
  escapeNoButton
);


noButton.addEventListener(
  "touchstart",
  event => {

    event.preventDefault();

    escapeNoButton();

  }
);


/* FINAL SCREEN */

function finishDate() {

  const dateInput =
    document.getElementById(
      "datePicker"
    );

  answers.date =
    dateInput.value;


  document.getElementById(
    "summaryActivity"
  ).textContent =
    answers.activity ||
    "Surprise";


  document.getElementById(
    "summaryFood"
  ).textContent =
    answers.food ||
    "We'll decide";


  document.getElementById(
    "summaryAfter"
  ).textContent =
    answers.after ||
    "We'll see 👀";


  if (answers.date) {

    const date =
      new Date(
        answers.date +
        "T00:00:00"
      );

    document.getElementById(
      "summaryDate"
    ).textContent =
      date.toLocaleDateString(
        "en-AU",
        {
          day: "numeric",
          month: "long",
          year: "numeric"
        }
      );

  } else {

    document.getElementById(
      "summaryDate"
    ).textContent =
      "TBD";

  }


  nextPage();

}