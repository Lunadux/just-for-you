const pages =
  document.querySelectorAll(".page");

let currentPage = 0;

let transitioning = false;


const answers = {

  activity: null,

  food: null,

  after: null,

  date: null

};


/* =========================================
   NEXT PAGE
   ========================================= */

function nextPage() {

  if (currentPage >= pages.length - 1) {
    return;
  }


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


/* =========================================
   OPTIONS
   ========================================= */

document
  .querySelectorAll(".option")
  .forEach(option => {

    option.addEventListener(
      "click",
      () => {

        if (transitioning) {
          return;
        }


        const group =
          option.dataset.group;


        const value =
          option.dataset.value;


        /* Save answer */

        answers[group] =
          value;


        /* Remove existing selection */

        document
          .querySelectorAll(
            `[data-group="${group}"]`
          )
          .forEach(item => {

            item.classList.remove(
              "selected"
            );

          });


        /* Select clicked option */

        option.classList.add(
          "selected"
        );


        transitioning = true;


        /* Briefly show selection */

        setTimeout(
          () => {

            nextPage();

            transitioning = false;

          },
          550
        );

      }

    );

  });


/* =========================================
   MAYBE BUTTON
   ========================================= */

const maybeButton =
  document.getElementById(
    "maybeButton"
  );


if (maybeButton) {

  const maybeMessages = [

    "are you sure? 👀",

    "think about it...",

    "I have good taste",

    "okay but consider it ♡"

  ];


  let maybeCount = 0;


  maybeButton.addEventListener(
    "click",
    () => {

      maybeButton.textContent =
        maybeMessages[
          maybeCount %
          maybeMessages.length
        ];


      maybeCount++;

    }

  );

}


/* =========================================
   FINISH DATE
   ========================================= */

async function finishDate() {

  const dateInput =
    document.getElementById(
      "datePicker"
    );


  answers.date =
    dateInput.value;


  /* Require date */

  if (!answers.date) {

    dateInput.focus();

    return;

  }


  /* =====================================
     SUMMARY
     ===================================== */

  document.getElementById(
    "summaryActivity"
  ).textContent =
    answers.activity || "Surprise";


  document.getElementById(
    "summaryFood"
  ).textContent =
    answers.food || "We'll decide";


  document.getElementById(
    "summaryAfter"
  ).textContent =
    answers.after || "We'll see";


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

        weekday: "long",

        day: "numeric",

        month: "long"

      }
    );


  /* =====================================
     FORMSPREE

     Add your Formspree endpoint here
     when you're ready.

     Example:

     https://formspree.io/f/abcdwxyz
     ===================================== */


  const FORMSPREE_URL = "https://formspree.io/f/mwlpyygv";


  if (FORMSPREE_URL) {

    try {

      await fetch(
        FORMSPREE_URL,
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            "Accept":
              "application/json"

          },


          body:
            JSON.stringify({

              activity:
                answers.activity,

              food:
                answers.food,

              after:
                answers.after,

              date:
                answers.date

            })

        }
      );

    }

    catch (error) {

      console.error(
        "Couldn't send choices:",
        error
      );

    }

  }


  nextPage();

}
