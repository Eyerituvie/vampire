const continentData = {
  Africa: {
    emoji: "🌍",
    description:
      "Africa is home to huge savannas, the Sahara Desert, and famous animals like elephants and giraffes.",
    highlights: ["Sahara Desert", "Nile River", "Mount Kilimanjaro"],
    animals: ["Elephant", "Lion", "Giraffe"]
  },
  Asia: {
    emoji: "🌏",
    description:
      "Asia is the largest continent and includes busy cities, giant mountains, and many different cultures.",
    highlights: ["Mount Everest", "Mount Fuji", "Gobi Desert", "Yangtze River"],
    animals: ["Panda", "Tiger", "Snow Leopard"]
  },
  Europe: {
    emoji: "🇪🇺",
    description:
      "Europe has old castles, rolling hills, and many countries with different languages and traditions.",
    highlights: ["Alps", "Danube River", "Eiffel Tower"],
    animals: ["Fox", "Wolf", "Bear"]
  },
  "North America": {
    emoji: "🌎",
    description:
      "North America stretches from the Arctic to warm tropical places, with forests, deserts, and great lakes.",
    highlights: ["Rocky Mountains", "Grand Canyon", "Mississippi River"],
    animals: ["Bison", "Moose", "Bear"]
  },
  "South America": {
    emoji: "🌎",
    description:
      "South America is full of rainforests, tall mountains, and colorful birds like parrots and toucans.",
    highlights: ["Amazon Rainforest", "Andes Mountains", "Angel Falls"],
    animals: ["Capybara", "Jaguar", "Sloth"]
  },
  Australia: {
    emoji: "🦘",
    description:
      "Australia is known for its unique wildlife, sunny beaches, and the Great Barrier Reef.",
    highlights: ["Great Barrier Reef", "Outback", "Uluru"],
    animals: ["Kangaroo", "Koala", "Dingo"]
  },
  Antarctica: {
    emoji: "❄️",
    description:
      "Antarctica is the coldest continent, covered in ice and home to penguins and seals.",
    highlights: ["Ice sheets", "Penguin colonies", "South Pole"],
    animals: ["Penguin", "Seal", "Albatross"]
  }
};

const quizQuestions = [
  {
    question: "Which continent is the biggest?",
    options: ["Africa", "Asia", "Europe"],
    answer: "Asia"
  },
  {
    question: "What is the name of the tallest mountain on Earth?",
    options: ["K2", "Mount Fuji", "Mount Everest"],
    answer: "Mount Everest"
  },
  {
    question: "Which ocean is the largest?",
    options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "Which animal is famous in Australia?",
    options: ["Penguin", "Kangaroo", "Wolf"],
    answer: "Kangaroo"
  }
];

const continentCards = document.getElementById("continentCards");
const continentInfo = document.getElementById("continentInfo");

function renderContinentCards() {
  Object.entries(continentData).forEach(([name, data]) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "continent-card";
    card.dataset.name = name;
    card.innerHTML = `
      <span class="emoji">${data.emoji}</span>
      <h3>${name}</h3>
      <p>${data.highlights[0]}</p>
    `;
    continentCards.appendChild(card);
  });

  const firstButton = continentCards.querySelector(".continent-card");
  if (firstButton) {
    firstButton.classList.add("active");
    updateContinentInfo(Object.keys(continentData)[0]);
  }

  continentCards.addEventListener("click", (event) => {
    const card = event.target.closest(".continent-card");
    if (!card) return;

    document.querySelectorAll(".continent-card").forEach((button) => {
      button.classList.toggle("active", button === card);
    });

    updateContinentInfo(card.dataset.name);
  });
}

function updateContinentInfo(name) {
  const data = continentData[name];
  continentInfo.innerHTML = `
    <div class="info-header">
      <span class="emoji">${data.emoji}</span>
      <h3>${name}</h3>
    </div>
    <p>${data.description}</p>
    <div class="info-list">
      <div><strong>Famous places:</strong> ${data.highlights.join(", ")}</div>
      <div><strong>Animals you might spot:</strong> ${data.animals.join(", ")}</div>
    </div>
  `;
}

const questionText = document.getElementById("questionText");
const answerButtons = document.getElementById("answerButtons");
const scoreDisplay = document.getElementById("scoreDisplay");
const questionNumber = document.getElementById("questionNumber");
const totalQuestions = document.getElementById("totalQuestions");
const nextButton = document.getElementById("nextButton");

let currentQuestionIndex = 0;
let score = 0;

function renderQuiz() {
  const question = quizQuestions[currentQuestionIndex];
  totalQuestions.textContent = String(quizQuestions.length);
  questionNumber.textContent = String(currentQuestionIndex + 1);
  questionText.textContent = question.question;
  scoreDisplay.textContent = `Score: ${score}`;
  answerButtons.innerHTML = "";
  nextButton.hidden = true;

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = option;
    button.addEventListener("click", () => handleAnswer(button, option, question.answer));
    answerButtons.appendChild(button);
  });
}

function handleAnswer(button, selected, correctAnswer) {
  const buttons = [...answerButtons.children];
  buttons.forEach((item) => {
    item.disabled = true;
    if (item.textContent === correctAnswer) {
      item.classList.add("correct");
    }
    if (item === button && selected !== correctAnswer) {
      item.classList.add("wrong");
    }
  });

  if (selected === correctAnswer) {
    score += 1;
    scoreDisplay.textContent = `Score: ${score}`;
  }

  nextButton.hidden = false;
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex += 1;

  if (currentQuestionIndex < quizQuestions.length) {
    renderQuiz();
    return;
  }

  questionText.textContent = `You finished the quiz! Final score: ${score}/${quizQuestions.length}`;
  answerButtons.innerHTML = "";
  nextButton.textContent = "Play again";
  nextButton.hidden = false;
  questionNumber.textContent = String(quizQuestions.length);

  nextButton.addEventListener(
    "click",
    () => {
      currentQuestionIndex = 0;
      score = 0;
      nextButton.textContent = "Next question";
      renderQuiz();
    },
    { once: true }
  );
});

renderContinentCards();
renderQuiz();
