// --------------------
// WORKOUT DATA
// --------------------

const workoutPlan = {
  Monday: [
    { name: "Dead bug", type: "reps", value: 10, sets: 3, image: "images/deadbug.jpg" },
    { name: "Reverse crunch", type: "reps", value: 15, sets: 3, image: "images/reversecrunch.jpg" },
    { name: "Straight-leg raise", type: "reps", value: 12, sets: 3, image: "images/legraise.jpg" },
    { name: "Push-up", type: "reps", value: 10, sets: 3, image: "images/pushup.jpg" },
    { name: "Pike push-up", type: "reps", value: 8, sets: 3, image: "images/pike.jpg" },
    { name: "Hollow hold", type: "sec", value: 40, sets: 2, image: "images/hollow.jpg" }
  ],

  Tuesday: [
    { name: "Bicycle crunch", type: "reps", value: 20, sets: 3, image: "images/bicycle.jpg" },
    { name: "Side plank dips", type: "reps", value: 12, sets: 3, image: "images/sideplank.jpg" },
    { name: "V-up", type: "reps", value: 10, sets: 3, image: "images/vup.jpg" },
    { name: "Dip", type: "reps", value: 10, sets: 3, image: "images/dip.jpg" },
    { name: "Inverted row", type: "reps", value: 10, sets: 3, image: "images/row.jpg" },
    { name: "Plank shoulder tap", type: "reps", value: 30, sets: 2, image: "images/planktap.jpg" }
  ]
};

// --------------------
// STATE
// --------------------

let state = {
  exerciseIndex: 0,
  setIndex: 0,
  repModifier: 0,
  started: false
};

// --------------------
// DAY SAFE FETCH (FIXED)
// --------------------

function getToday() {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return days[new Date().getDay()];
}

function getWorkout() {
  const day = getToday();
  return workoutPlan[day] || workoutPlan.Monday;
}

// --------------------
// SAFE RENDER
// --------------------

function render() {
  const workout = getWorkout();

  if (!workout || workout.length === 0) return;

  const ex = workout[state.exerciseIndex];

  if (!ex) return;

  const nameEl = document.getElementById("exerciseName");
  const imgEl = document.getElementById("exerciseImg");
  const repsEl = document.getElementById("exerciseReps");

  if (!nameEl || !imgEl || !repsEl) return;

  nameEl.innerText = ex.name;
  imgEl.src = ex.image;

  const adjusted = ex.value + state.repModifier;
  const unit = ex.type === "sec" ? "sec" : "reps";

  repsEl.innerText = adjusted + " " + unit;

  const lastExercise = state.exerciseIndex === workout.length - 1;
  const lastSet = state.setIndex >= ex.sets - 1;

  const controls = document.getElementById("controls");
  const finishBtn = document.getElementById("finishBtn");

  if (!controls || !finishBtn) return;

  if (lastExercise && lastSet) {
    controls.style.display = "none";
    finishBtn.style.display = "block";
  } else {
    controls.style.display = "block";
    finishBtn.style.display = "none";
  }
}

// --------------------
// START (FIXED VISIBILITY)
// --------------------

document.getElementById("startBtn").onclick = () => {
  state.exerciseIndex = 0;
  state.setIndex = 0;
  state.repModifier = 0;
  state.started = true;

  const home = document.getElementById("home");
  const workout = document.getElementById("workout");

  if (!home || !workout) return;

  home.style.display = "none";
  workout.style.display = "block";

  render();
};

// --------------------
// NEXT (FIXED FLOW)
// --------------------

document.getElementById("nextBtn").onclick = () => {
  const workout = getWorkout();
  const ex = workout[state.exerciseIndex];

  if (!ex) return;

  state.setIndex++;

  if (state.setIndex >= ex.sets) {
    state.setIndex = 0;
    state.exerciseIndex++;
  }

  render();
};

// --------------------
// END
// --------------------

document.getElementById("endBtn").onclick = () => {
  document.getElementById("workout").style.display = "none";
  document.getElementById("home").style.display = "block";
};

// --------------------
// FINISH
// --------------------

document.getElementById("finishBtn").onclick = () => {
  document.getElementById("workout").style.display = "none";
  document.getElementById("home").style.display = "block";
};

// --------------------
// ADD REP
// --------------------

document.getElementById("addRepsBtn").onclick = () => {
  state.repModifier += 1;
  render();
};
