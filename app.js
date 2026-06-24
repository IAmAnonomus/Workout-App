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
  repModifier: 0
};

function getToday() {
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
}

function getWorkout() {
  return workoutPlan[getToday()] || workoutPlan.Monday;
}

function render() {
  const workout = getWorkout();
  const ex = workout[state.exerciseIndex];

  if (!ex) return;

  document.getElementById("exerciseName").innerText = ex.name;
  document.getElementById("exerciseImg").src = ex.image;

  const value = ex.value + state.repModifier;
  const unit = ex.type === "sec" ? "sec" : "reps";

  document.getElementById("exerciseReps").innerText = value + " " + unit;

  const isLastExercise = state.exerciseIndex === workout.length - 1;
  const isLastSet = state.setIndex === ex.sets - 1;

  const controls = document.getElementById("controls");
  const finishBtn = document.getElementById("finishBtn");

  if (isLastExercise && isLastSet) {
    controls.style.display = "none";
    finishBtn.style.display = "block";
  } else {
    controls.style.display = "block";
    finishBtn.style.display = "none";
  }
}

document.getElementById("startBtn").onclick = () => {
  state.exerciseIndex = 0;
  state.setIndex = 0;
  state.repModifier = 0;

  document.getElementById("home").style.display = "none";
  document.getElementById("workout").style.display = "block";

  render();
};

document.getElementById("nextBtn").onclick = () => {
  const workout = getWorkout();
  const ex = workout[state.exerciseIndex];

  state.setIndex++;

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
  state.repModifier += 1;
  render();
};
