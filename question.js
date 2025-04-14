const questions = [
  {
    question: "Which country does Kevin De Bruyne represent internationally?",
    answers: ["Netherlands", "Germany", "Belgium", "France"],
    correct: "Belgium"
  },
  {
    question: "What jersey number does Kevin De Bruyne wear at Belgium?",
    answers: ["7", "17", "8", "10"],
    correct: "7"
  },
  {
    question: "Which Mancity player did Kevin De Bruyne assist the most?",
    answers: ["Raheem Sterling", "Sergio Aguero", "Erling Haaland", "Gabriel Jesus"],
    correct: "Sergio Aguero"
  },
  {
    question: "Against which spanish team, Kevin De Bruyne has the most UCL knockout G/A's?",
    answers: ["Barcelona", "Real Madrid", "Atletico Madrid", "Sevilla"],
    correct: "Real Madrid"
  },
  {
    question: "How many Premier League titles had Kevin De Bruyne won?",
    answers: ["3", "4", "5", "6"],
    correct: "6"
  },
  {
    question: "Who assisted Kevin De Bruyne's goal in the 2023 UEFA Champions League final?",
    answers: ["Erling Haaland", "Phil Foden", "Ilkay Gundogan", "Bernardo Silva"],
    correct: "Ilkay Gundogan"
  },
  {
    question: "How many assists did Kevin De Bruyne register in the 2019–20 Premier League season?",
    answers: ["20", "18", "21", "22"],
    correct: "20"
  },
  {
    question: "Which Bundesliga club did Kevin De Bruyne play for?",
    answers: ["Bayern Munich", "Borussia Dortmund", "Wolfsburg", "RB Leipzig"],
    correct: "Wolfsburg"
  },
  {
    question: "Which manager gave Kevin De Bruyne his Manchester City debut?",
    answers: ["Roberto Mancini", "Manuel Pellegrini", "Pep Guardiola", "Mark Hughes"],
    correct: "Manuel Pellegrini"
  },
  {
    question: "Which match did Kevin De Bruyne score a weak-foot hat-trick in?",
    answers: ["Vs Wolves", "Vs Tottenham", "Vs Arsenal", "Vs Leicester"],
    correct: "Vs Wolves"
  }
];

  
  let currentQuestion = 0;
  let selectedAnswers = Array(questions.length).fill(null);
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const scoreEl = document.getElementById("score-container");
  
  function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
  
    q.answers.forEach(answer => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.value = answer;
  
      if (selectedAnswers[currentQuestion] === answer) {
        radio.checked = true;
      }
  
      label.appendChild(radio);
      label.appendChild(document.createTextNode(answer));
      answersEl.appendChild(label);
      answersEl.appendChild(document.createElement("br"));
    });
  
    prevBtn.style.display = currentQuestion === 0 ? "none" : "inline-block";
    nextBtn.textContent = currentQuestion === questions.length - 1 ? "Finish" : "Next";
  }
  
  function saveAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
      selectedAnswers[currentQuestion] = selected.value;
    }
  }
  
  function calculateScore() {
    score = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct) {
        score++;
      }
    });
    localStorage.setItem("quizScore", score);
  }
  
  nextBtn.addEventListener("click", () => {
    saveAnswer();
  
    if (!selectedAnswers[currentQuestion]) {
      alert("Please select an answer.");
      return;
    }
  
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion();
    } else {
      calculateScore();
      showScore();
    }
  });
  
  prevBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion();
    }
  });
  
  function showScore() {
    document.getElementById("quiz-container").style.display = "none";
    const savedScore = localStorage.getItem("quizScore");
    scoreEl.textContent = `Your score: ${savedScore} out of ${questions.length}`;
    scoreEl.style.display = "block";
  }
  
  showQuestion();
  