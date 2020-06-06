// Time reamining variable
var timeRemaining = document.querySelector("#timer");
// Variable for value of Time remaining
var timeValue = document.querySelector("#quiz-time");

// BUTTON VARIABLES
// Display High Score page
var highScoresBtn = document.querySelector("#high-scores");
// Start Quiz
var startQuiztBtn = document.querySelector("#start-quiz-btn");
// Answer multiple choice
var ansChoiceBtn1 = document.querySelector("#ans-choice-1");
var ansChoiceBtn2 = document.querySelector("#ans-choice-2");
var ansChoiceBtn3 = document.querySelector("#ans-choice-3");
var ansChoiceBtn4 = document.querySelector("#ans-choice-4");
// Quit Quiz
var quitterButton = document.querySelector("#quitter");
// Name submission
var nameRegBtn = document.querySelector("#registered-name");
// Try again quiz
var tryAgainBtn = document.querySelector("#try-again");
// Restart quiz
var restartQuizBtn = document.querySelector("#restart");
// Clear High Scores
var clearHighScoresBtn = document.querySelector("#clear-high-scores");

// PAGE DISPLAY VARIABLES
// Splash Page
var splashPageDisp = document.querySelector("#splash-page");
//  Questions Page
var questionsPageDisp = document.querySelector("#questions-page");
// End Page All questions answered
var endPageCompDisp = document.querySelector("#end-page-complete");
// End Page timer run out
var endPageTimerOutDisp = document.querySelector("#end-page-time-out");
// High Scores Page
var hiScoresPageDisp = document.querySelector("#hi-score-page");

//  QUESTIONS ALERT DISPLAY VARIABLES
//  Parent div of corret-wrong alert
var correctWrongContainer = document.querySelector("#question-result");
//  Correct answer alert
var correctAlert = document.querySelector("#correct-answer");
//  Incorrect answer alert
var wrongAlert = document.querySelector("#wrong-answer");

// OTHER VARIABLES
//  End page Name Input variable
var nameReg = document.querySelector("#inputLarge");
// Display current question
var showCurrentQuestion = document.querySelector("#question-current");
// Display question counter
var showQuestionCount = document.querySelector("#question-count");
// Display ordered list of high scores
var ordHiscoresList = document.querySelector("#ordered-hi-scores");
// Questions, choices & correct answer object array
var questionsAndAnswers = [{
        question: "What was Javascript initially called?",
        choice1: "Java",
        choice2: "LiveScript",
        choice3: "EngineScript",
        choice4: "AwesomeScript",
        answer: "LiveScript",
    },
    {
        question: "What does DOM stand for?",
        choice1: "Document Object Model",
        choice2: "Dirty Old Man",
        choice3: "Document Object Manipulation",
        choice4: "Dominic Toretto",
        answer: "Document Object Model",
    },
    {
        question: "What is the correct JavaScript syntax to change the content of this HTML element: <p id='demo'>This is a demonstration.</p>?",
        choice1: "#demo.innetHTML = 'Hello World'",
        choice2: "document.getElment('p').innerHTML = 'Hello World'",
        choice3: "document.getElmentById('demo').textContent = 'Hello World",
        choice4: "document.getElmentByName('p').textContent = 'Hello World",
        answer: "document.getElmentById('demo').textContent = 'Hello World",
    },
    {
        question: "How do you create a function in JavaScript?",
        choice1: "function:myFunction ()",
        choice2: "function myFunction()",
        choice3: "function = myFunction()",
        choice4: "function (myFunction())",
        answer: "function myFunction()",
    },
    {
        question: "How does a FOR loop start?",
        choice1: "for i=0; i <= 9; i++",
        choice2: "for (i=0; i <= 9)",
        choice3: "for (i <= 9; i++)",
        choice4: "for (i=0; i <= 9; i++)",
        answer: "for (i=0; i <= 9; i++)",
    }
];

// INITIAL EMPTY VARIABLES
//Time interval variable
var timeInterval = "";
// Time display variable
var timeRunning = "";
// End time variable
var endTime = "";
// Correct Answer variable
var correctAns = "";
// High Score variable
var highScores = [];
// Question count variable
var questionCount = 0;
// Question loop variable
var q = 0;


// QUIZ FUNCTIONALITY

// Start quiz on click event
startQuiztBtn.addEventListener("click", dispQuestions);

// Questions page display function
function dispQuestions() {
    event.preventDefault();
    splashPageDisp.style.display = "none";
    questionsPageDisp.style.display = "block";
    hiScoresPageDisp.style.display = "none";
    correctWrongContainer.style.display = "none";
    highScoresBtn.style.visibility = "visible";
    timeRemaining.style.visibility = "visible";
    initialTime();
    timerStart();
    runQandA();
}

// Time display
function startCountdown() {
    timeValue.textContent = timeRunning;
}

// Show start time at 100 secs
function initialTime() {
    timeRunning = 100;
    startCountdown();
}

// Timer set interval at 1000 milliseconds
function timerStart() {
    timeInterval = setInterval(function() {
        var currentTime = timeValue.textContent - 1;
        timeRunning = currentTime;
        startCountdown();

        // If statement when timer reaches 0, timer displayed as 0 and display End Page 
        if (currentTime === 0) {
            clearInterval(timeInterval);
            endTime = timeRunning;
            dispEndPageTimeOut();
        }
    }, 1000);
}

// End page timer run out display function
function dispEndPageTimeOut() {
    splashPageDisp.style.display = "none";
    questionsPageDisp.style.display = "none";
    endPageCompDisp.style.display = "none";
    hiScoresPageDisp.style.display = "none";
    endPageTimerOutDisp.style.display = "block";
    highScoresBtn.style.visibility = "visible";
    timeRemaining.style.visibility = "visible";
}

// End timer
function resetTime() {
    timeRunning = 0;
    startCountdown();
}

// Run the Q&A
function runQandA() {
    if (q < questionsAndAnswers.length) {
        showCurrentQuestion.textContent = questionsAndAnswers[q].question;
        ansChoiceBtn1.textContent = questionsAndAnswers[q].choice1;
        ansChoiceBtn2.textContent = questionsAndAnswers[q].choice2;
        ansChoiceBtn3.textContent = questionsAndAnswers[q].choice3;
        ansChoiceBtn4.textContent = questionsAndAnswers[q].choice4;
        correctAns = questionsAndAnswers[q].answer;
    } else {
        // Timer stops when all questions are answered
        clearInterval(timeInterval);
        endTime = timeRunning;
        setTimeout(dispEndPageComp(), 3000);
        // Reset variable for when the quiz is restarted
        q = 0;
    }
    // Display Question count and increment
    questionCount++;
    showQuestionCount.textContent = questionCount + "/" + "5";
}

// Click Event for selecting Answers
questionsPageDisp.addEventListener("click", selectAns);

// Select answer function 
function selectAns() {
    // if they click on an answer button
    if (event.target.matches("button")) {
        // Increment variable q 
        q = q + 1;
        // Initialize answer checker function
        answerCheck();
        // Pop in next question in the array
        runQandA();
    }
}

// Function to check if the answer clicked matches with correcAns variable
function answerCheck() {
    // User clicked incorrect answer
    if (event.target.textContent != correctAns) {
        correctWrongContainer.style.display = "block";
        wrongAlert.style.visibility = "visible";
        correctAlert.style.visibility = "hidden";
        incorrectAns();
    } else {
        // User clicked correct answer        
        correctWrongContainer.style.display = "block";
        wrongAlert.style.visibility = "hidden";
        correctAlert.style.visibility = "visible";
    }
}

// Function if user clicks incorrect answer
function incorrectAns() {
    // If timer has more than 5 seconds remaining
    if (timeValue.textContent > 20) {
        // New variable declared with penalised time
        var penalisedTime = timeValue.textContent - 20;
        timeRunning = penalisedTime;
        startCountdown();
    } else {
        // If timer has less than 5 seconds remaining
        timeRunning = 0;
        startCountdown();
    }
}

// End page complete display function -- when user answered all the questions
function dispEndPageComp() {
    event.preventDefault();
    splashPageDisp.style.display = "none";
    questionsPageDisp.style.display = "none";
    endPageCompDisp.style.display = "block";
    hiScoresPageDisp.style.display = "none";
    endPageTimerOutDisp.style.display = "none";
    highScoresBtn.style.visibility = "visible";
    timeRemaining.style.visibility = "visible";
}

// Click event for Try Again button
tryAgainBtn.addEventListener("click", function() {
    dispSplashPage();
    questionCount = 0;
});

// Click event for Quiz restart
restartQuizBtn.addEventListener("click", function() {
    dispSplashPage();
    questionCount = 0;
});

// Click event for Quitters
quitterButton.addEventListener("click", function() {
    dispSplashPage();
    questionCount = 0;
});

// Splash page display function
function dispSplashPage() {
    event.preventDefault();
    splashPageDisp.style.display = "block";
    questionsPageDisp.style.display = "none";
    endPageCompDisp.style.display = "none";
    hiScoresPageDisp.style.display = "none";
    endPageTimerOutDisp.style.display = "none";
    highScoresBtn.style.visibility = "visible";
    timeRemaining.style.visibility = "visible";
    resetTime();
}

//  Click event for High Scores Page
highScoresBtn.addEventListener("click", dispHiscorePage);

// High Score page display function
function dispHiscorePage() {
    event.preventDefault();
    splashPageDisp.style.display = "none";
    questionsPageDisp.style.display = "none";
    endPageCompDisp.style.display = "none";
    hiScoresPageDisp.style.display = "block";
    endPageTimerOutDisp.style.display = "none";
    highScoresBtn.style.visibility = "hidden";
    timeRemaining.style.visibility = "hidden";
}

// add event listener to clear high score button
clearHighScoresBtn.addEventListener("click", purgeHiscoreStorage);

// Clear local strorage of any saved high score values
function purgeHiscoreStorage() {
    localStorage.clear();
    highScores = [];
    printNameAndScore();
}

// Click Event for user input submit button
nameRegBtn.addEventListener("click", function(event) {
    event.preventDefault();

    // New variable for user 
    var textHiscores = nameReg.value.trim();

    // create variable for score from final time
    var finalScore = endTime;

    // Input will be blank if user ingnored input
    if (textHiscores === "") {
        return;
    }

    // New object to store user name & score
    var regNameHiscoresObj = {};
    regNameHiscoresObj.name = textHiscores;
    regNameHiscoresObj.score = finalScore;

    // Push the new object in the highScores array
    highScores.push(regNameHiscoresObj);

    // Reset values to enpty
    textHiscores.value = "";
    nameReg.value = "";
    storeName();
    printNameAndScore();
});

// Save user input Name & Score to local storage function
function storeName() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Print registered name and score in to the high score list function
function printNameAndScore() {
    ordHiscoresList.innerHTML = "";

    // Get stored name & scores from localStorage
    // Parsing the JSON string to an object
    var savedHiscores = JSON.parse(localStorage.getItem("highScores"));

    // Sort High Score entries in decending order
    savedHiscores.sort(function(a, b) {
        return b.score - a.score;
    });

    // Render a new li for each High Score entry
    for (i = 0; i < highScores.length; i++) {

        // Create <li> elements
        var li = document.createElement("li");

        // Create variables and assign the saved entries from local storage
        var printName = savedHiscores[i].name;
        var printScore = savedHiscores[i].score;
        var printText = (printName + "  :  " + printScore);

        // List elements assigned with prinText variable
        li.textContent = printText;

        // Give "data-index" to each created <li> element with the value of i
        li.setAttribute("data-index", i);

        // Append each High Score entry into the list 
        ordHiscoresList.appendChild(li);
    }
    dispHiscorePage();
}