// --------------------
// WORKOUT DATA
// --------------------

const workoutPlan = {
  Monday: [
    { name: "Dead bug", reps: "10 per side", sets: 3, image: "images/deadbug.jpg" },
    { name: "Reverse crunch", reps: "15", sets: 3, image: "images/reversecrunch.jpg" },
    { name: "Straight-leg raise", reps: "12", sets: 3, image: "images/legraise.jpg" },
    { name: "Push-up", reps: "max reps", sets: 3, image: "images/pushup.jpg" },
    { name: "Pike push-up", reps: "8–12", sets: 3, image: "images/pike.jpg" },
    { name: "Hollow hold", reps: "40 sec", sets: 2, image: "images/hollow.jpg" }
  ],

  Tuesday: [
    { name: "Bicycle crunch", reps: "20", sets: 3, image: "images/bicycle.jpg" },
    { name: "Side plank dips", reps: "12 per side", sets: 3, image: "images/sideplank.jpg" },
    { name: "V-up", reps: "10", sets: 3, image: "images/vup.jpg" },
    { name: "Dip", reps: "max reps", sets: 3, image: "images/dip.jpg" },
    { name: "Inverted row", reps: "8–12", sets: 3, image: "images/row.jpg" },
    { name: "Plank shoulder tap", reps: "30 taps", sets: 2, image: "images/planktap.jpg" }
  ]
};

// --------------------
// STATE
// --------------------

let state = {
  day: getToday(),
  exerciseIndex: 0,
  setIndex: 0,
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
// DATE
// --------------------

function getToday() {
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
}

// --------------------
// STREAK
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
// WORKOUT
// --------------------

function getWorkoutForToday() {
  return workoutPlan[getToday()] || workoutPlan.Monday;
}

function loadExercise() {
  const workout = getWorkoutForToday();
  const ex = workout[state.exerciseIndex];

  if (!ex) {
    showFinish();
    return;
  }

  // If sets complete → next exercise
  if (state.setIndex >= ex.sets) {
    state.exerciseIndex++;
    state.setIndex = 0;
    loadExercise();
    return;
  }

  document.getElementById("exerciseName").innerText =
    ex.name + ` (Set ${state.setIndex + 1}/${ex.sets})`;

  document.getElementById("exerciseReps").innerText =
    ex.reps;

  document.getElementById("exerciseImg").src = ex.image;

  document.getElementById("controls").classList.remove("hidden");
  document.getElementById("finishBtn").classList.add("hidden");
}

// --------------------
// UI
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
  state.exerciseIndex = 0;
  state.setIndex = 0;
  state.inWorkout = true;

  document.getElementById("home").classList.add("hidden");
  document.getElementById("workout").classList.remove("hidden");

  loadExercise();
};

// --------------------
// BUTTONS
// --------------------

document.getElementById("nextBtn").onclick = () => {
  state.setIndex++;
  loadExercise();
};

document.getElementById("endBtn").onclick = () => {
  exitWorkout();
};

document.getElementById("finishBtn").onclick = () => {
  markCompletedToday();

  state.exerciseIndex = 0;
  state.setIndex = 0;

  document.getElementById("workout").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");

  updateUI();
};

// --------------------
// EXIT
// --------------------

function exitWorkout() {
  state.exerciseIndex = 0;
  state.setIndex = 0;

  document.getElementById("workout").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}

// --------------------
// INIT
// --------------------

updateUI();
