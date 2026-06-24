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

let state = {
  exerciseIndex: 0,
  setIndex: 0,
  repModifier: 0,
  active: false
};

function getToday() {
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
}

function getWorkout() {
  return workoutPlan[getToday()] || workoutPlan.Monday;
}

function currentExercise(workout) {
  return workout[state.exerciseIndex];
}

function isLastExercise(workout) {
  return state.exerciseIndex === workout.length - 1;
}

function isLastSet(ex) {
  return state.setIndex === ex.sets - 1;
}

function render() {
  const workout = getWorkout();
  const ex = currentExercise(workout);

  if (!ex) return;

  document.getElementById("exerciseName").innerText = ex.name;
  document.getElementById("exerciseImg").src = ex.image;

  const value = ex.value + state.repModifier;
  const unit = ex.type === "sec" ? "sec" : "reps";

  document.getElementById("exerciseReps").innerText = value + " " + unit;

  const showFinish = isLastExercise(workout) && isLastSet(ex);

  document.getElementById("controls").style.display = showFinish ? "none" : "block";
  document.getElementById("finishBtn").style.display = showFinish ? "block" : "none";
}

document.getElementById("startBtn").onclick = () => {
  state.exerciseIndex = 0;
  state.setIndex = 0;
  state.repModifier = 0;
  state.active = true;

  document.getElementById("home").style.display = "none";
  document.getElementById("workout").style.display = "block";

  render();
};

document.getElementById("nextBtn").onclick = () => {
  const workout = getWorkout();
  const ex = currentExercise(workout);

  if (!ex) return;

  // move set forward FIRST
  state.setIndex++;

  // if finished all sets → next exercise
  if (state.setIndex >= ex.sets) {
    state.setIndex = 0;
    state.exerciseIndex++;
  }

  render();
};

document.getElementById("endBtn").onclick = () => {
  document.getElementById("workout").style.display = "none";
  document.getElementById("home").style.display = "block";
};

document.getElementById("finishBtn").onclick = () => {
  document.getElementById("workout").style.display = "none";
  document.getElementById("home").style.display = "block";
};

document.getElementById("addRepsBtn").onclick = () => {
  state.repModifier++;
  render();
};
