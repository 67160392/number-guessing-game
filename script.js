// filepath: script.js
// ตัวแปรเก็บตัวเลขลับ
let secretNumber = 0;
// ตัวแปรนับจํานวนครั้งที่ทาย
let attemptCount = 0;
// ตัวแปรสำหรับ Timer
let timeLeft = 30; // เวลาที่เหลือ
let timerId = null;

// ฟังก์ชันเริ่มเกมใหม่
function initializeGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attemptCount = 0;
  // เปิด input ทุกครั้งที่เริ่มเกม
  document.getElementById("guessInput").disabled = false;

  // เริ่มจับเวลา
  startTimer();
  updateDisplay();
}

// ฟังก์ชันตรวจสอบการทาย
function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const guessValue = parseInt(guessInput.value);
  const resultContainer = document.getElementById("resultContainer");
  // Validation: ตรวจสอบว่าใส่ตัวเลขหรือไม่
  if (isNaN(guessValue) || guessInput.value === "") {
    resultContainer.innerHTML = `
 <div class="alert alert-danger" role="alert">
 กรุณาใส่ตัวเลข!
 </div>
 `;
    return;
  }

  // Validation: ตรวจสอบว่าอยู่ในช่วง 1-100 หรือไม่
  if (guessValue < 1 || guessValue > 100) {
    resultContainer.innerHTML = `
 <div class="alert alert-danger" role="alert">
 กรุณาใส่ตัวเลขระหว่าง 1 ถึง 100!
 </div>
 `;
    return;
  }
  attemptCount++;
  if (guessValue === secretNumber) {
    clearInterval(timerId); // หยุด Timer เมื่อทายถูก
    guessInput.disabled = true; // ปิด input ไม่ให้ทายต่อ
    resultContainer.innerHTML = `
 <div class="alert alert-success" role="alert">
 <h5>✓ ถูกต้อง!</h5>
 <p>คุณทายถูกในครั้งที่ ${attemptCount}</p>
 </div>
 `;
  } else if (guessValue > secretNumber) {
    resultContainer.innerHTML = `
 <div class="alert alert-warning" role="alert">
 ↓ ตัวเลขสูงไป
 </div>
 `;
  } else {
    resultContainer.innerHTML = `
 <div class="alert alert-info" role="alert">
 ↑ ตัวเลขตํ่าไป
 </div>
 `;
  }
  updateDisplay();
  guessInput.value = "";
  guessInput.focus();
}
// ...existing code...
// ฟังก์ชันอัปเดตจํานวนครั้ง
function updateDisplay() {
  const attemptsContainer = document.getElementById("attemptsContainer");
  attemptsContainer.textContent = `ทายแล้ว: ${attemptCount} ครั้ง`;
}
// ฟังก์ชันเริ่มเกมใหม่
function resetGame() {
  initializeGame();
  document.getElementById("resultContainer").innerHTML = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();
}
// เริ่มเกมเมื่อโหลดหน้า
window.addEventListener("load", initializeGame);
// เพิ่มการ select text เมื่อคลิก input
document.addEventListener("DOMContentLoaded", function () {
  const guessInput = document.getElementById("guessInput");
  guessInput.addEventListener("focus", function () {
    this.select();
  });
});

// เพิ่มการรองรับ Enter key
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("guessInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        checkGuess();
      }
    });
});
// ฟังก์ชันเริ่มจับเวลา
function startTimer() {
  clearInterval(timerId); // เคลียร์ timer เดิม
  timeLeft = 30; // รีเซ็ตเวลา
  updateTimerDisplay(); // แสดงเวลาเริ่มต้น

  timerId = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    // เมื่อหมดเวลา
    if (timeLeft <= 0) {
      clearInterval(timerId);
      endGameByTimeout();
    }
  }, 1000);
}
// แสดงเวลาบนหน้าเว็บ
function updateTimerDisplay() {
  document.getElementById(
    "timerContainer"
  ).textContent = `เวลาที่เหลือ: ${timeLeft} วินาที`;
}
// จบเกมเมื่อหมดเวลา
function endGameByTimeout() {
  document.getElementById("resultContainer").innerHTML = `
    <div class="alert alert-danger">วร้ายยยย ไม่ทันอะดิ</div>
  `;

  // ปิด input ไม่ให้ทายต่อ
  document.getElementById("guessInput").disabled = true;
}
