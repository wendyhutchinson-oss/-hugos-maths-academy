const worlds = [
  {
    title: "🔢 Number Kingdom",
    intro: "Place value, rounding, ordering, negative numbers and Roman numerals.",
    questions: [
      { q: "What is the value of the 7 in 5,742,318?", options: ["7,000", "70,000", "700,000", "7,000,000"], answer: "700,000" },
      { q: "Round 48,761 to the nearest 1,000.", options: ["48,000", "48,800", "49,000", "50,000"], answer: "49,000" },
      { q: "Which number is largest?", options: ["3,456,789", "3,465,789", "3,455,999", "3,406,789"], answer: "3,465,789" }
    ]
  },
  {
    title: "🏰 Calculation Castle",
    intro: "Addition, subtraction, multiplication, division and multi-step problems.",
    questions: [
      { q: "386 + 729 =", options: ["1,015", "1,105", "1,115", "1,125"], answer: "1,115" },
      { q: "34 × 27 =", options: ["718", "818", "918", "1,018"], answer: "918" },
      { q: "864 ÷ 12 =", options: ["62", "70", "72", "82"], answer: "72" }
    ]
  },
  {
    title: "🍕 Fraction Fortress",
    intro: "Equivalent fractions, simplifying, adding, subtracting and fractions of amounts.",
    questions: [
      { q: "Simplify 12/18.", options: ["2/3", "3/4", "6/9", "4/6"], answer: "2/3" },
      { q: "What is 3/4 of 40?", options: ["10", "20", "30", "35"], answer: "30" },
      { q: "1/3 + 1/6 =", options: ["1/9", "2/9", "1/2", "2/6"], answer: "1/2" }
    ]
  },
  {
    title: "💯 Decimal Dungeon",
    intro: "Decimals, percentages and money-style problems.",
    questions: [
      { q: "0.75 as a fraction is...", options: ["1/2", "3/4", "2/5", "7/10"], answer: "3/4" },
      { q: "35% of 200 =", options: ["35", "60", "70", "80"], answer: "70" },
      { q: "0.2 as a percentage is...", options: ["2%", "12%", "20%", "200%"], answer: "20%" }
    ]
  },
  {
    title: "📐 Geometry Galaxy",
    intro: "Angles, area, perimeter, shape properties and measurement.",
    questions: [
      { q: "Angles in a triangle add up to...", options: ["90°", "180°", "270°", "360°"], answer: "180°" },
      { q: "Area of a rectangle 9cm by 6cm =", options: ["15cm²", "30cm²", "54cm²", "60cm²"], answer: "54cm²" },
      { q: "Perimeter of a square with sides of 8cm =", options: ["16cm", "24cm", "32cm", "64cm"], answer: "32cm" }
    ]
  },
  {
    title: "🏏 Cricket Cup",
    intro: "Cricket-themed maths using averages, run rates and problem solving.",
    questions: [
      { q: "Hugo scores 42, 35 and 23. Total runs?", options: ["90", "95", "100", "105"], answer: "100" },
      { q: "A team needs 48 runs from 6 overs. Required run rate?", options: ["6", "7", "8", "9"], answer: "8" },
      { q: "Scores are 20, 30 and 40. Mean average?", options: ["25", "30", "35", "40"], answer: "30" }
    ]
  },
  {
    title: "👑 Maths Master Challenge",
    intro: "Mixed SATs-style reasoning to prepare for Year 7.",
    questions: [
      { q: "Share 40 sweets in the ratio 3:5. What is the larger share?", options: ["15", "20", "25", "30"], answer: "25" },
      { q: "Find x: x + 17 = 42.", options: ["15", "20", "25", "59"], answer: "25" },
      { q: "2.5 litres is how many millilitres?", options: ["25ml", "250ml", "2,500ml", "25,000ml"], answer: "2,500ml" }
    ]
  }
];

let xp = Number(localStorage.getItem("hugoXP") || 0);
let badges = Number(localStorage.getItem("hugoBadges") || 0);
let currentWorld = null;
let currentQuestion = 0;

function updateStats() {
  document.getElementById("xp").textContent = xp;
  document.getElementById("level").textContent = Math.max(1, Math.floor(xp / 100) + 1);
  document.getElementById("badges").textContent = badges;
  localStorage.setItem("hugoXP", xp);
  localStorage.setItem("hugoBadges", badges);
}

function renderWorlds() {
  const box = document.getElementById("worlds");
  box.innerHTML = "";
  worlds.forEach((world, index) => {
    const card = document.createElement("div");
    card.className = "world";
    card.onclick = () => openWorld(index);
    card.innerHTML = `<h3>${world.title}</h3><p>${world.intro}</p><strong>${world.questions.length} questions</strong>`;
    box.appendChild(card);
  });
}

function startCourse() {
  document.querySelector(".world").scrollIntoView({ behavior: "smooth" });
}

function openWorld(index) {
  currentWorld = index;
  currentQuestion = 0;
  document.getElementById("lesson").classList.remove("hidden");
  document.getElementById("lessonTitle").textContent = worlds[index].title;
  document.getElementById("lessonIntro").textContent = worlds[index].intro;
  showQuestion();
  document.getElementById("lesson").scrollIntoView({ behavior: "smooth" });
}

function showQuestion() {
  const item = worlds[currentWorld].questions[currentQuestion];
  document.getElementById("question").textContent = item.q;
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").className = "";
  const answers = document.getElementById("answers");
  answers.innerHTML = "";
  item.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    answers.appendChild(btn);
  });
}

function checkAnswer(option) {
  const item = worlds[currentWorld].questions[currentQuestion];
  const feedback = document.getElementById("feedback");
  if (option === item.answer) {
    xp += 10;
    feedback.textContent = "Correct! +10 XP ⭐";
    feedback.className = "correct";
  } else {
    feedback.textContent = `Nearly! The correct answer is ${item.answer}.`;
    feedback.className = "incorrect";
  }
  updateStats();
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion >= worlds[currentWorld].questions.length) {
      xp += 25;
      badges += 1;
      updateStats();
      feedback.textContent = "Mission complete! Badge earned 🏆";
      feedback.className = "correct";
      document.getElementById("answers").innerHTML = `<button onclick="showHome()">Choose another world</button>`;
    } else {
      showQuestion();
    }
  }, 900);
}

function showHome() {
  document.getElementById("lesson").classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

renderWorlds();
updateStats();
