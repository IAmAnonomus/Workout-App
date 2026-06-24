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
  ],

  Tuesday: [
    { name: "Bicycle crunch", reps: 20, sets: 3, image: "images/bicycle.jpg" },
    { name: "Side plank dips", reps: 12, sets: 3, image: "images/sideplank.jpg" },
    { name: "V-up", reps: 10, sets: 3, image: "images/vup.jpg" },
    { name: "Dip", reps: 10, sets: 3, image: "images/dip.jpg" },
    { name: "Inverted row", reps: 10, sets: 3, image: "images/row.jpg" },
    { name: "Plank shoulder tap", reps: 30, sets: 2, image: "images/planktap.jpg" }
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

function isLastExercise() {
  const workout = getWorkout();
  return state.exerciseIndex === workout.length - 1;
}

// --------------------
// UI UPDATE
// --------------------

function loadExercise() {
  const workout = getWorkout();
  const ex = workout[state.exerciseIndex];

  if (!ex) {
    return;
  }

  document.getElementById("exerciseName").innerText = ex.name;

  document.getElementById("exerciseImg").src = ex.image;

  const adjustedReps = ex.reps + state.repModifier;

  document.getElementById("exerciseReps").innerText =
    adjustedReps + " reps";

  // If LAST EXERCISE AND LAST SET → show FINISH ONLY
  const lastSet = state.setIndex >= ex.sets - 1;

  if (isLastExercise() && lastSet) {
    document.getElementById("controls").classList.add("hidden");
    document.getElementById("finishBtn").classList.remove("hidden");
  } else {
    document.getElementById("controls").classList.remove("hidden");
    document.getElementById("finishBtn").classList.add("hidden");
  }
}

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
// NEXT BUTTON (SET + EXERCISE FLOW)
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
// END BUTTON
// --------------------

document.getElementById("endBtn").onclick = () => {
  document.getElementById("workout").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
};

// --------------------
// FINISH BUTTON
// --------------------

document.getElementById("finishBtn").onclick = () => {
  document.getElementById("workout").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
};

// --------------------
// ADD REP (GLOBAL MODIFIER)
// --------------------

document.getElementById("addRepsBtn").onclick = () => {
  state.repModifier += 1;
  loadExercise();
};
