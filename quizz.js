const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
  { question: "Capital of France?", options: ["Rome", "Madrid", "Paris"], answer: "Paris" },

];

let current = 0;
let score = 0;
let timer;
const duration = 10;

const qContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const modal = document.getElementById("result-modal");
const scoreText = document.getElementById("score");
const starText = document.getElementById("star-rating");
const leaderboard = document.getElementById("leaderboard");

function loadQuestion() {
  clearInterval(timer);
  progressBar.style.transform = "scaleX(1)";
  progressBar.style.transition = "none";

  const q = questions[current];
  let html = `<div class="question">${q.question}</div><div class="options">`;
  q.options.forEach(opt => {
    html += `
      <label>
        <input type="radio" name="option" value="${opt}">
        <span>${opt}</span>
      </label>`;
  });
  html += "</div>";
  qContainer.innerHTML = html;

  
  setTimeout(() => {
    progressBar.style.transition = `transform ${duration}s linear`;
    progressBar.style.transform = "scaleX(0)";
  }, 50);

  
  let time = duration;
  timerDisplay.textContent = `Time: ${time}s`;
  timer = setInterval(() => {
    time--;
    timerDisplay.textContent = `Time: ${time}s`;
    if (time === 0) {
      clearInterval(timer);
      nextBtn.click();
    }
  }, 1000);
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector("input[name='option']:checked");
  if (selected && selected.value === questions[current].answer) {
    score++;
  }

  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector(".quiz-container").style.display = "none";
  modal.style.display = "flex";
  scoreText.textContent = `Your Score: ${score}/${questions.length}`;

  const percent = (score / questions.length) * 100;
  const stars = percent >= 80 ? "⭐⭐⭐" : percent >= 50 ? "⭐⭐" : "⭐";
  starText.textContent = `Rating: ${stars}`;

  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  scores.push(score);
  scores.sort((a, b) => b - a);
  const top5 = scores.slice(0, 5);
  localStorage.setItem("quizScores", JSON.stringify(top5));

  leaderboard.innerHTML = top5.map(s => `<li>${s} / ${questions.length}</li>`).join("");
}

loadQuestion();

