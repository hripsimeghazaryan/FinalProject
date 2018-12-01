const questions = myQuestions;

const all = function(){

  console.log(questions);

  function Random() {
        let display = questions;
        let questionAmount = 10;
        let questionTracker = [];
        let randomQuestion;
        for (let i = 0; i < questionAmount; i++) {
          do {
           randomQuestion = Math.floor(Math.random() * display.length);
             } while (existingQuestions());

            // display.innerHTML = display[randomQuestion] + '<br>';
            questionTracker.push(randomQuestion);
            console.log(questionTracker);

            

         }


     function existingQuestions() {
          for (let i = 0; i < questionTracker.length; i++) {
            if (questionTracker[i] === randomQuestion) {
              return true;
             }
            }
            return false;
        }
    };


  function buildQuiz(){
  // we'll need a place to store the HTML output
    const output = [];
  // for each question

    

    questions.forEach(
      function(currentQuestion,questionNumber){
        const answers = [];
        // we'll want to store the list of answers choices
        for(letter in currentQuestion.answers){ 
  //for/in - loops through the properties of an object
  // at that time currentQuestion is object with the answers
  // ... add an HTML radio button
  answers.push(
    `<label>
          <input type = "radio" name = "question${questionNumber}" value = "${letter}">
           ${letter} :
           ${currentQuestion.answers[letter]}
    </label>`
    );
  // When a user clicks on a radio-button, it becomes checked, and all other radio-buttons with equal name become unchecked
}
  output.push(
    `<div class = "slide">
          <div class = "question"> ${currentQuestion.question} </div>
          <div class = "answers"> ${answers.join("")}</div>
     </div>`
    );
      });

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join("");
  //The join() method joins the elements of an array into a string, and returns the string.
}

  function showResults(){
   
    const answerContainers = quizContainer.querySelectorAll(".answers");

    let numCorrect = 0;

    questions.forEach(function(currentQuestion,questionNumber){

        const rightAnswers = answerContainers[questionNumber];
        const selector = `input [name = question${questionNumber}]:checked`;
        const userAnswer = (rightAnswers.querySelector(selector) || {}).value;
  //The value property sets or returns the value of the value attribute of a text field.

    if  (userAnswer === currentQuestion.correctAnswer){

      numCorrect ++;

      answerContainers[questionNumber].style.color = "green";
    
    }
    
    else{

      answerContainers[questionNumber].style.color = "red";
    
    }
  });

  resultsContainer.innerHTML = `${numCorrect} out of ${questions.length}`;
  }

  function showSlide(n){

    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0){
      nextButton.style.display = "none";
    }
    else{
      previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1){
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    }
    else{
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide(){
      showSlide(currentSlide + 1);
    }
  function showPreviousSlide(){
      showSlide(currentSlide - 1);
    }

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");


buildQuiz();

Random();



const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;


showSlide(0);


submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

};

all();
