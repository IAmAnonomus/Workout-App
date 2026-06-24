// --------------------
// WORKOUT DATA
// --------------------

const workoutPlan = {
  Monday: [
    { name: "Dead bug", reps: "3×10 per side", image: "images/deadbug.jpg" },
    { name: "Reverse crunch", reps: "3×15", image: "images/reversecrunch.jpg" },
    { name: "Straight-leg raise", reps: "3×12", image: "images/legraise.jpg" },
    { name: "Push-up", reps: "3×max reps", image: "images/pushup.jpg" },
    { name: "Pike push-up", reps: "3×8–12", image: "images/pike.jpg" },
    { name: "Hollow hold", reps: "2×40 sec", image: "images/hollow.jpg" }
  ],

  Tuesday: [
    { name: "Bicycle crunch", reps: "3×20", image: "images/bicycle.jpg" },
    { name: "Side plank dips", reps: "3×12/side", image: "images/sideplank.jpg" },
    { name: "V-up", reps: "3×10", image: "images/vup.jpg" },
    { name: "Dip", reps: "3×max reps", image: "images/dip.jpg" },
    { name: "Inverted row", reps: "3×8–12", image: "images/row.jpg" },
    { name: "Plank shoulder tap", reps: "2×30 taps", image: "images/planktap.jpg" }
  ]
};

// --------------------
// STATE
// --------------------

let state = {
  day: getToday(),
  index: 0,
  inWorkout: false
};

// --------------------
// STORAGE
// --------------------

function getData() {
  return JSON.parse(localStorage.getItem("workoutData")) || {
    streak: 0,
    lastCompleted: null
  };
}

function saveData(data) {
  localStorage.setItem("workoutData", JSON.stringify(data));
}

// --------------------
// DATE HELPERS
// --------------------

function getToday() {
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
}

// --------------------
// STREAK LOGIC
// --------------------

function markCompletedToday() {
  const data = getData();
  const today = new Date().toDateString();

  if (data.lastCompleted === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (data.lastCompleted === yesterday.toDateString()) {
    data.streak += 1;
  } else {
    data.streak = 1;
  }

  data.lastCompleted = today;
  saveData(data);
}

// --------------------
// WORKOUT FLOW
// --------------------

function getWorkoutForToday() {
  return workoutPlan[getToday()] || workoutPlan.Monday;
}

function loadExercise() {
  const workout = getWorkoutForToday();
  const ex = workout[state.index];

  if (!ex) {
    showFinish();
    return;
  }

  document.getElementById("exerciseName").innerText = ex.name;
  document.getElementById("exerciseReps").innerText = ex.reps;
  document.getElementById("exerciseImg").src = ex.image;

  document.getElementById("controls").classList.remove("hidden");
  document.getElementById("finishBtn").classList.add("hidden");
}

// --------------------
// UI UPDATE
// --------------------

function updateUI() {
  const data = getData();

  document.getElementById("streak").innerText = "Streak: " + data.streak;

  const today = new Date().toDateString();
  document.getElementById("status").innerText =
    data.lastCompleted === today ? "Daily Workout Complete!" : "";
}

// --------------------
// START
// --------------------

document.getElementById("startBtn").onclick = () => {
  state.inWorkout = true;
  state.index = 0;

  document.getElementById("home").classList.add("hidden");
  document.getElementById("workout").classList.remove("hidden");

  loadExercise();
};

// --------------------
// BUTTONS
// --------------------

document.getElementById("nextBtn").onclick = () => {
  state.index++;
  loadExercise();
};

document.getElementById("endBtn").onclick = () => {
  exitWorkout();
};

document.getElementById("finishBtn").onclick = () => {
  markCompletedToday();

  document.getElementById("workout").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");

  state.index = 0;
  updateUI();
};

// --------------------
// EXIT
// --------------------

function exitWorkout() {
  document.getElementById("workout").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");

  state.index = 0;
}

// --------------------
// INIT
// --------------------

updateUI();
