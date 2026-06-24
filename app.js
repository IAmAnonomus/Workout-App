// --------------------
// WORKOUT DATA
// --------------------

const workoutPlan = {
  Monday: [
    { name: "Dead bug", reps: 10, sets: 3, image: "images/deadbug.jpg" },
    { name: "Reverse crunch", reps: 15, sets: 3, image: "images/reversecrunch.jpg" },
    { name: "Straight-leg raise", reps: 12, sets: 3, image: "images/legraise.jpg" },
    { name: "Push-up", reps: 10, sets: 3, image: "images/pushup.jpg" },
    { name: "Pike push-up", reps: 8, sets: 3, image: "images/pike.jpg" },
    { name: "Hollow hold", reps: 40, sets: 2, image: "images/hollow.jpg" }
  ]
};

// --------------------
// STATE
// --------------------

let state = {
  exerciseIndex: 0,
  setIndex: 0,
  repModifier: 0
};

// --------------------
// HELPERS
// --------------------

function getToday() {
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
}

function getWorkout() {
  return workoutPlan[getToday()] || workoutPlan.Monday;
}

// --------------------
// UI LOAD
// --------------------

function loadExercise() {
  const workout = getWorkout();
  const ex = workout[state.exerciseIndex];

  if (!ex) {
    showFinish();
    return;
  }

  document.getElementById("exerciseName").innerText = ex.name;

  document.getElementById("exerciseImg").src = ex.image;

  const adjustedReps = ex.reps + state.repModifier;

  document.getElementById("exerciseReps").innerText =
    adjustedReps + " reps";

  document.getElementById("controls").classList.remove("hidden");
  document.getElementById("finishBtn").classList.add("hidden");
}

// --------------------
// NEXT BUTTON
// --------------------

document.getElementById("nextBtn").onclick = () => {
  const workout = getWorkout();
  const ex = workout[state.exerciseIndex];

  state.setIndex++;

  if (state.setIndex >= ex.sets) {
    state.setIndex = 0;
    state.exerciseIndex++;
  }

  loadExercise();
};

// --------------------
// ADD REP BUTTON (NEW FEATURE)
// --------------------

document.getElementById("addRepsBtn").onclick = () => {
  state.repModifier += 1;
  loadExercise();
};

// --------------------
// START
// --------------------

document.getElementById("startBtn").onclick = () => {
  state.exerciseIndex = 0;
  state.setIndex = 0;
  state.repModifier = 0;

  document.getElementById("home").classList.add("hidden");
  document.getElementById("workout").classList.remove("hidden");

  loadExercise();
};

// --------------------
// END WORKOUT
// --------------------

document.getElementById("endBtn").onclick = () => {
  document.getElementById("workout").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
};

document.getElementById("finishBtn").onclick = () => {
  document.getElementById("workout").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
};

// --------------------
// FINISH LOGIC
// --------------------

function showFinish() {
  document.getElementById("controls").classList.add("hidden");
  document.getElementById("finishBtn").classList.remove("hidden");
}
