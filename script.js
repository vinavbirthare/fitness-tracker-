const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".content-section");
const currentViewLabel = document.getElementById("current-view-label");

const workoutForm = document.getElementById("workout-form");
const workoutNameInput = document.getElementById("exercise-name");
const workoutValueInput = document.getElementById("exercise-value");
const workoutCaloriesInput = document.getElementById("exercise-calories");
const workoutDateInput = document.getElementById("exercise-date");
const workoutTableBody = document.getElementById("workout-table-body");
const workoutCount = document.getElementById("workout-count");
const workoutFeedback = document.getElementById("workout-feedback");

const bmiForm = document.getElementById("bmi-form");
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const bmiValue = document.getElementById("bmi-value");
const bmiMessage = document.getElementById("bmi-message");

const themeToggle = document.getElementById("theme-toggle");
const themeStatus = document.getElementById("theme-status");
const themeDisplay = document.getElementById("theme-display");
const focusLabel = document.getElementById("focus-label");
const storageStatus = document.getElementById("storage-status");
const caloriesTotal = document.getElementById("calories-total");
const clearWorkoutsButton = document.getElementById("clear-workouts");
const exerciseSearchInput = document.getElementById("exercise-search");
const exerciseCategorySelect = document.getElementById("exercise-category");
const exerciseMuscleSelect = document.getElementById("exercise-muscle");
const exerciseLibrary = document.getElementById("exercise-library");
const lineChartCanvas = document.getElementById("line-chart");
const barChartCanvas = document.getElementById("bar-chart");
const pieChartCanvas = document.getElementById("pie-chart");
const histogramChartCanvas = document.getElementById("histogram-chart");
const pieLegend = document.getElementById("pie-legend");

const WORKOUTS_STORAGE_KEY = "fitness-workouts";
const chartPalette = ["#0d8fe7", "#18b779", "#f5c25b", "#ff7a59", "#6d63ff", "#2dd08f"];
const exerciseCatalog = [
  { name: "Push-Ups", category: "Strength", target: "Chest", description: "A bodyweight press that builds chest, shoulders, and triceps." },
  { name: "Incline Push-Ups", category: "Strength", target: "Upper Chest", description: "A beginner-friendly push-up variation with reduced load." },
  { name: "Decline Push-Ups", category: "Strength", target: "Upper Chest", description: "A harder push-up variation that shifts more work to shoulders and upper chest." },
  { name: "Bench Press", category: "Strength", target: "Chest", description: "A classic gym lift focused on upper-body pushing strength." },
  { name: "Chest Fly", category: "Strength", target: "Chest", description: "An isolation exercise that stretches and contracts the chest muscles." },
  { name: "Pull-Ups", category: "Strength", target: "Back", description: "An upper-body pull that develops lats, biceps, and control." },
  { name: "Chin-Ups", category: "Strength", target: "Back", description: "A pulling variation that emphasizes lats and biceps." },
  { name: "Bent-Over Rows", category: "Strength", target: "Upper Back", description: "Builds thickness in the upper back and improves posture." },
  { name: "Deadlift", category: "Strength", target: "Posterior Chain", description: "A compound lift that trains glutes, hamstrings, back, and grip." },
  { name: "Lat Pulldown", category: "Strength", target: "Lats", description: "A machine-based pulling exercise for back width." },
  { name: "Face Pulls", category: "Strength", target: "Rear Delts", description: "Excellent for upper-back health and rear-shoulder strength." },
  { name: "Shoulder Press", category: "Strength", target: "Shoulders", description: "Builds overhead pressing strength and upper-body stability." },
  { name: "Lateral Raises", category: "Strength", target: "Side Delts", description: "An isolation move that builds wider-looking shoulders." },
  { name: "Front Raises", category: "Strength", target: "Front Delts", description: "Targets the front shoulder muscles and control." },
  { name: "Bicep Curls", category: "Strength", target: "Biceps", description: "An isolation exercise for biceps and elbow control." },
  { name: "Hammer Curls", category: "Strength", target: "Biceps", description: "A curl variation that also trains forearms and grip." },
  { name: "Tricep Dips", category: "Strength", target: "Triceps", description: "Targets triceps, chest, and shoulder stability." },
  { name: "Tricep Pushdowns", category: "Strength", target: "Triceps", description: "A cable exercise that isolates the triceps effectively." },
  { name: "Squats", category: "Strength", target: "Quads", description: "A lower-body staple for quads, glutes, and core stability." },
  { name: "Goblet Squats", category: "Strength", target: "Quads", description: "A squat variation that improves form and lower-body control." },
  { name: "Lunges", category: "Strength", target: "Glutes", description: "Great for balance, glutes, and single-leg strength." },
  { name: "Bulgarian Split Squats", category: "Strength", target: "Glutes", description: "A challenging unilateral leg exercise for strength and balance." },
  { name: "Step-Ups", category: "Strength", target: "Legs", description: "Improves single-leg power and coordination." },
  { name: "Leg Press", category: "Strength", target: "Quads", description: "A machine exercise for building lower-body strength safely." },
  { name: "Romanian Deadlifts", category: "Strength", target: "Hamstrings", description: "Targets hamstrings and glutes with a hip-hinge pattern." },
  { name: "Glute Bridges", category: "Strength", target: "Glutes", description: "A strong glute activation movement that also helps the lower back." },
  { name: "Hip Thrusts", category: "Strength", target: "Glutes", description: "A powerful glute-builder for strength and performance." },
  { name: "Calf Raises", category: "Strength", target: "Calves", description: "Builds ankle strength and calf muscle endurance." },
  { name: "Plank", category: "Core", target: "Core", description: "An isometric hold that strengthens your core and posture." },
  { name: "Side Plank", category: "Core", target: "Obliques", description: "Challenges lateral core stability and shoulder support." },
  { name: "Russian Twists", category: "Core", target: "Obliques", description: "A rotational core exercise that hits obliques and control." },
  { name: "Leg Raises", category: "Core", target: "Lower Abs", description: "Strengthens lower abdominal muscles and hip flexors." },
  { name: "Crunches", category: "Core", target: "Upper Abs", description: "A classic abdominal exercise for trunk flexion." },
  { name: "Bicycle Crunches", category: "Core", target: "Abs", description: "Combines rotation and flexion to challenge the full core." },
  { name: "Mountain Climbers", category: "Cardio", target: "Core", description: "A fast-paced movement that raises heart rate and works the core." },
  { name: "Burpees", category: "Cardio", target: "Full Body", description: "An explosive exercise combining squat, plank, and jump." },
  { name: "Jump Rope", category: "Cardio", target: "Cardiovascular System", description: "Improves coordination, footwork, and cardiovascular fitness." },
  { name: "Cycling", category: "Cardio", target: "Legs", description: "A low-impact endurance option for stamina and leg power." },
  { name: "Running", category: "Cardio", target: "Legs", description: "Builds endurance, aerobic capacity, and lower-body stamina." },
  { name: "High Knees", category: "Cardio", target: "Cardiovascular System", description: "A fast movement that elevates heart rate and works hip flexors." },
  { name: "Jumping Jacks", category: "Cardio", target: "Full Body", description: "A simple warm-up or conditioning exercise for whole-body movement." },
  { name: "Rowing", category: "Cardio", target: "Full Body", description: "A low-impact cardio exercise that also trains the back and legs." },
  { name: "Yoga Flow", category: "Flexibility", target: "Mobility", description: "Improves flexibility, control, and breathing." },
  { name: "Hamstring Stretch", category: "Recovery", target: "Hamstrings", description: "Helps improve flexibility and reduce tension in the back of the legs." },
  { name: "Quad Stretch", category: "Recovery", target: "Quads", description: "Releases tightness in the front thighs after training." },
  { name: "Shoulder Mobility Drill", category: "Recovery", target: "Shoulders", description: "Supports shoulder range of motion and joint comfort." },
  { name: "Stretching", category: "Recovery", target: "Mobility", description: "Supports recovery and reduces tightness after training." }
];

let workouts = [];
let totalWorkouts = 0;

initializeTheme();
loadWorkouts();
populateMuscleGroupFilter();
renderExerciseLibrary();
window.addEventListener("resize", renderCharts);

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const targetSection = item.dataset.section;
    const label = item.querySelector("span:last-child").textContent;

    navItems.forEach((navButton) => {
      navButton.classList.remove("active");
      navButton.removeAttribute("aria-current");
    });

    sections.forEach((section) => {
      section.classList.remove("active");
      section.hidden = true;
    });

    item.classList.add("active");
    item.setAttribute("aria-current", "page");

    const activeSection = document.getElementById(`${targetSection}-section`);
    activeSection.classList.add("active");
    activeSection.hidden = false;

    currentViewLabel.textContent = label;
    focusLabel.textContent = label;
  });
});

workoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = workoutNameInput.value.trim();
  const value = Number(workoutValueInput.value);
  const calories = Number(workoutCaloriesInput.value);
  const date = workoutDateInput.value;

  if (!name || !Number.isFinite(value) || value <= 0 || !Number.isFinite(calories) || calories <= 0 || !date) {
    workoutFeedback.textContent = "Please fill in all workout fields with valid values.";
    workoutFeedback.classList.remove("success");
    return;
  }

  workouts.unshift({
    name,
    value,
    calories,
    date
  });

  saveWorkouts();
  renderWorkouts();
  workoutFeedback.textContent = `${name} added successfully.`;
  workoutFeedback.classList.add("success");

  workoutForm.reset();
});

bmiForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const weight = Number(weightInput.value);
  const height = Number(heightInput.value);

  if (!Number.isFinite(weight) || !Number.isFinite(height) || weight <= 0 || height <= 0) {
    bmiValue.textContent = "--";
    bmiMessage.textContent = "Please enter valid weight and height values.";
    return;
  }

  const bmi = weight / (height * height);
  bmiValue.textContent = bmi.toFixed(1);
  bmiMessage.textContent = getBmiCategory(bmi);
});

themeToggle.addEventListener("change", () => {
  const isDarkTheme = themeToggle.checked;
  document.body.classList.toggle("dark-theme", isDarkTheme);
  themeStatus.textContent = isDarkTheme ? "Dark mode active" : "Light mode active";
  themeDisplay.textContent = isDarkTheme ? "Dark mode" : "Light mode";
  localStorage.setItem("fitness-theme", isDarkTheme ? "dark" : "light");
  renderCharts();
});

clearWorkoutsButton.addEventListener("click", () => {
  workouts = [];
  saveWorkouts();
  renderWorkouts();
  workoutFeedback.textContent = "Saved workouts cleared.";
  workoutFeedback.classList.remove("success");
});

exerciseSearchInput.addEventListener("input", () => {
  renderExerciseLibrary(
    exerciseSearchInput.value,
    exerciseCategorySelect.value,
    exerciseMuscleSelect.value
  );
});

exerciseCategorySelect.addEventListener("change", () => {
  renderExerciseLibrary(
    exerciseSearchInput.value,
    exerciseCategorySelect.value,
    exerciseMuscleSelect.value
  );
});

exerciseMuscleSelect.addEventListener("change", () => {
  renderExerciseLibrary(
    exerciseSearchInput.value,
    exerciseCategorySelect.value,
    exerciseMuscleSelect.value
  );
});

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function getBmiCategory(bmi) {
  if (bmi < 18.5) {
    return "Underweight range";
  }

  if (bmi < 25) {
    return "Healthy weight range";
  }

  if (bmi < 30) {
    return "Overweight range";
  }

  return "Obesity range";
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("fitness-theme");
  const isDarkTheme = savedTheme === "dark";

  document.body.classList.toggle("dark-theme", isDarkTheme);
  themeToggle.checked = isDarkTheme;
  themeStatus.textContent = isDarkTheme ? "Dark mode active" : "Light mode active";
  themeDisplay.textContent = isDarkTheme ? "Dark mode" : "Light mode";
}

function loadWorkouts() {
  const savedWorkouts = localStorage.getItem(WORKOUTS_STORAGE_KEY);

  if (!savedWorkouts) {
    renderWorkouts();
    return;
  }

  try {
    const parsedWorkouts = JSON.parse(savedWorkouts);
    workouts = Array.isArray(parsedWorkouts)
      ? parsedWorkouts.map((workout) => ({
          name: workout.name || "",
          value: Number(workout.value) || 0,
          calories: Number(workout.calories) || 0,
          date: workout.date || ""
        }))
      : [];
  } catch (error) {
    workouts = [];
  }

  renderWorkouts();
}

function saveWorkouts() {
  localStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(workouts));
}

function renderWorkouts() {
  workoutTableBody.innerHTML = "";

  if (workouts.length === 0) {
    workoutTableBody.innerHTML = `
      <tr class="empty-row">
        <td colspan="4">No workouts added yet.</td>
      </tr>
    `;
  } else {
    workouts.forEach((workout) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const valueCell = document.createElement("td");
      const caloriesCell = document.createElement("td");
      const dateCell = document.createElement("td");

      nameCell.textContent = workout.name;
      valueCell.textContent = String(workout.value);
      caloriesCell.textContent = `${workout.calories} kcal`;
      dateCell.textContent = formatDate(workout.date);

      row.append(nameCell, valueCell, caloriesCell, dateCell);
      workoutTableBody.append(row);
    });
  }

  totalWorkouts = workouts.length;
  workoutCount.textContent = totalWorkouts;
  storageStatus.textContent = `${totalWorkouts} saved workout${totalWorkouts === 1 ? "" : "s"}`;
  caloriesTotal.textContent = `${getTotalCalories()} kcal`;
  renderCharts();
}

function renderCharts() {
  drawLineChart();
  drawBarChart();
  drawPieChart();
  drawHistogramChart();
}

function drawLineChart() {
  const { ctx, width, height } = prepareCanvas(lineChartCanvas, 520, 280);
  const textColor = getChartTextColor();
  const gridColor = getChartGridColor();
  const accentColor = getComputedStyle(document.body).getPropertyValue("--accent-strong").trim();

  ctx.clearRect(0, 0, width, height);

  const data = workouts.slice(0, 7).reverse();
  if (data.length === 0) {
    drawEmptyState(ctx, width, height, "Add workouts to see the line graph.");
    return;
  }

  const padding = { top: 28, right: 18, bottom: 38, left: 42 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const values = data.map((workout) => Number(workout.value));
  const maxValue = Math.max(...values, 10);

  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;

  for (let index = 0; index <= 4; index += 1) {
    const y = padding.top + (chartHeight / 4) * index;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + chartWidth, y);
    ctx.stroke();
  }

  ctx.fillStyle = textColor;
  ctx.font = "12px 'Segoe UI', sans-serif";
  ctx.textAlign = "right";

  for (let index = 0; index <= 4; index += 1) {
    const value = Math.round(maxValue - (maxValue / 4) * index);
    const y = padding.top + (chartHeight / 4) * index + 4;
    ctx.fillText(String(value), padding.left - 8, y);
  }

  const points = values.map((value, index) => {
    const x = padding.left + (chartWidth / Math.max(data.length - 1, 1)) * index;
    const y = padding.top + chartHeight - (value / maxValue) * chartHeight;
    return { x, y, label: formatShortDate(data[index].date), value };
  });

  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = accentColor;
  points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  points.forEach((point) => {
    ctx.fillText(point.label, point.x, height - 12);
  });
}

function drawBarChart() {
  const { ctx, width, height } = prepareCanvas(barChartCanvas, 520, 280);
  const textColor = getChartTextColor();
  const gridColor = getChartGridColor();

  ctx.clearRect(0, 0, width, height);

  const grouped = groupWorkoutsByExercise();
  const entries = Object.entries(grouped).slice(0, 6);

  if (entries.length === 0) {
    drawEmptyState(ctx, width, height, "Add workouts to build the bar graph.");
    return;
  }

  const padding = { top: 24, right: 18, bottom: 52, left: 42 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...entries.map(([, value]) => value), 10);
  const barWidth = chartWidth / entries.length * 0.58;

  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;

  for (let index = 0; index <= 4; index += 1) {
    const y = padding.top + (chartHeight / 4) * index;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + chartWidth, y);
    ctx.stroke();
  }

  ctx.font = "12px 'Segoe UI', sans-serif";
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";

  entries.forEach(([name, value], index) => {
    const x = padding.left + (chartWidth / entries.length) * index + (chartWidth / entries.length - barWidth) / 2;
    const barHeight = (value / maxValue) * chartHeight;
    const y = padding.top + chartHeight - barHeight;
    const color = chartPalette[index % chartPalette.length];

    ctx.fillStyle = color;
    roundRect(ctx, x, y, barWidth, barHeight, 12);
    ctx.fill();

    ctx.fillStyle = textColor;
    ctx.fillText(truncateLabel(name, 10), x + barWidth / 2, height - 14);
    ctx.fillText(String(value), x + barWidth / 2, y - 8);
  });
}

function drawPieChart() {
  const { ctx, width, height } = prepareCanvas(pieChartCanvas, 320, 320);

  ctx.clearRect(0, 0, width, height);
  pieLegend.innerHTML = "";

  const grouped = groupWorkoutsByExercise();
  const entries = Object.entries(grouped).slice(0, 6);

  if (entries.length === 0) {
    drawEmptyState(ctx, width, height, "Add workouts to show the pie chart.");
    pieLegend.innerHTML = `<p class="legend-empty">No workout categories yet.</p>`;
    return;
  }

  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 26;

  let startAngle = -Math.PI / 2;

  entries.forEach(([name, value], index) => {
    const sliceAngle = (value / total) * Math.PI * 2;
    const color = chartPalette[index % chartPalette.length];

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    startAngle += sliceAngle;

    const percentage = `${Math.round((value / total) * 100)}%`;
    const legendItem = document.createElement("div");
    legendItem.className = "legend-item";
    legendItem.innerHTML = `
      <span class="legend-label">
        <span class="legend-swatch" style="background:${color}"></span>
        <span class="legend-name">${name}</span>
      </span>
      <span class="legend-value">${percentage}</span>
    `;
    pieLegend.append(legendItem);
  });

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.48, 0, Math.PI * 2);
  ctx.fillStyle = getChartCenterFill();
  ctx.fill();

  ctx.fillStyle = getChartTextColor();
  ctx.textAlign = "center";
  ctx.font = "bold 16px 'Segoe UI', sans-serif";
  ctx.fillText("Volume", centerX, centerY - 6);
  ctx.font = "13px 'Segoe UI', sans-serif";
  ctx.fillText(String(total), centerX, centerY + 16);
}

function drawHistogramChart() {
  const { ctx, width, height } = prepareCanvas(histogramChartCanvas, 520, 280);
  const textColor = getChartTextColor();
  const gridColor = getChartGridColor();
  const values = workouts.map((workout) => Number(workout.value)).filter((value) => Number.isFinite(value) && value > 0);

  ctx.clearRect(0, 0, width, height);

  if (values.length === 0) {
    drawEmptyState(ctx, width, height, "Add workouts to build the histogram.");
    return;
  }

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const binCount = Math.min(5, Math.max(3, values.length));
  const range = Math.max(maxValue - minValue, 1);
  const binSize = Math.ceil(range / binCount) || 1;
  const bins = Array.from({ length: binCount }, (_, index) => ({
    start: minValue + index * binSize,
    end: minValue + (index + 1) * binSize - 1,
    count: 0
  }));

  values.forEach((value) => {
    const index = Math.min(Math.floor((value - minValue) / binSize), binCount - 1);
    bins[index].count += 1;
  });

  const padding = { top: 24, right: 18, bottom: 52, left: 42 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxCount = Math.max(...bins.map((bin) => bin.count), 1);

  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;

  for (let index = 0; index <= 4; index += 1) {
    const y = padding.top + (chartHeight / 4) * index;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + chartWidth, y);
    ctx.stroke();
  }

  const barWidth = chartWidth / bins.length * 0.72;
  ctx.font = "12px 'Segoe UI', sans-serif";
  ctx.textAlign = "center";

  bins.forEach((bin, index) => {
    const x = padding.left + (chartWidth / bins.length) * index + (chartWidth / bins.length - barWidth) / 2;
    const barHeight = (bin.count / maxCount) * chartHeight;
    const y = padding.top + chartHeight - barHeight;

    ctx.fillStyle = chartPalette[(index + 1) % chartPalette.length];
    roundRect(ctx, x, y, barWidth, barHeight, 10);
    ctx.fill();

    ctx.fillStyle = textColor;
    ctx.fillText(`${bin.start}-${bin.end}`, x + barWidth / 2, height - 14);
    ctx.fillText(String(bin.count), x + barWidth / 2, y - 8);
  });
}

function groupWorkoutsByExercise() {
  return workouts.reduce((accumulator, workout) => {
    const key = workout.name.trim();
    accumulator[key] = (accumulator[key] || 0) + Number(workout.value);
    return accumulator;
  }, {});
}

function getTotalCalories() {
  return workouts.reduce((sum, workout) => sum + (Number(workout.calories) || 0), 0);
}

function renderExerciseLibrary(searchTerm = "", selectedCategory = "All", selectedMuscle = "All") {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredExercises = exerciseCatalog.filter((exercise) => {
    const haystack = `${exercise.name} ${exercise.category} ${exercise.target} ${exercise.description}`.toLowerCase();
    const matchesSearch = haystack.includes(normalizedSearch);
    const matchesCategory = selectedCategory === "All" || exercise.category === selectedCategory;
    const matchesMuscle = selectedMuscle === "All" || exercise.target === selectedMuscle;
    return matchesSearch && matchesCategory && matchesMuscle;
  });

  exerciseLibrary.innerHTML = "";

  if (filteredExercises.length === 0) {
    exerciseLibrary.innerHTML = `<div class="exercise-empty">No exercises matched your search.</div>`;
    return;
  }

  filteredExercises.forEach((exercise) => {
    const card = document.createElement("article");
    card.className = "exercise-item";
    card.innerHTML = `
      <span class="exercise-tag">${exercise.category}</span>
      <h4>${exercise.name}</h4>
      <p>${exercise.description}</p>
      <div class="exercise-meta">
        <div class="exercise-meta-row">
          <span>Muscle Group:</span>
          <strong>${exercise.target}</strong>
        </div>
      </div>
      <div class="exercise-tags">
        <span class="exercise-tag">${exercise.target}</span>
      </div>
    `;
    exerciseLibrary.append(card);
  });
}

function populateMuscleGroupFilter() {
  const muscleGroups = [...new Set(exerciseCatalog.map((exercise) => exercise.target))].sort((left, right) =>
    left.localeCompare(right)
  );

  exerciseMuscleSelect.innerHTML = '<option value="All">All</option>';

  muscleGroups.forEach((muscleGroup) => {
    const option = document.createElement("option");
    option.value = muscleGroup;
    option.textContent = muscleGroup;
    exerciseMuscleSelect.append(option);
  });
}

function prepareCanvas(canvas, width, height) {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, width, height };
}

function drawEmptyState(ctx, width, height, message) {
  ctx.fillStyle = getChartTextColor();
  ctx.font = "14px 'Segoe UI', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(message, width / 2, height / 2);
}

function getChartTextColor() {
  return getComputedStyle(document.body).getPropertyValue("--text").trim();
}

function getChartGridColor() {
  return document.body.classList.contains("dark-theme") ? "rgba(255, 255, 255, 0.1)" : "rgba(24, 51, 64, 0.12)";
}

function getChartCenterFill() {
  return document.body.classList.contains("dark-theme") ? "#11242d" : "#ffffff";
}

function formatShortDate(dateString) {
  const [year, month, day] = dateString.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short"
  });
}

function truncateLabel(label, maxLength) {
  if (label.length <= maxLength) {
    return label;
  }

  return `${label.slice(0, maxLength - 1)}…`;
}

function roundRect(ctx, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
}
