(() => {
  "use strict";

  const STORAGE_KEY = "mindmirror-plans-v1";
  const MILESTONE_KEY = "mindmirror-milestones-v1";

  const $ = (selector) => document.querySelector(selector);

  let activePlan = null;
  let toastTimer;

  const challenges = {
    consistency: "Build a small daily routine and track it every day.",
    time: "Choose one protected time block and focus on one task.",
    skills: "Learn the basics first and practise with a small project.",
    confidence: "Start with small wins and ask for useful feedback.",
    resources: "Start with free learning resources and tools you already have."
  };

  const skillAdvice = {
    beginner: "Start with the fundamentals. Learn one skill at a time.",
    intermediate: "Strengthen your skills through practical projects.",
    advanced: "Focus on advanced practice, feedback, and portfolio-quality work."
  };

  // Safely read saved browser data
  function readStorage(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.error("Storage read error:", error);
      return fallback;
    }
  }

  // Safely save browser data
  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Storage write error:", error);
      showToast("Could not save data in this browser.");
      return false;
    }
  }

  function getPlans() {
    const plans = readStorage(STORAGE_KEY, []);
    return Array.isArray(plans) ? plans : [];
  }

  function getMilestones() {
    const data = readStorage(MILESTONE_KEY, {});
    return data && typeof data === "object" ? data : {};
  }

  // Prevent HTML injection when displaying user input
  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  // Read the goal form
  function readGoalForm() {
    const title = $("#goalTitle")?.value.trim();

    if (!title) {
      $("#goalTitle")?.focus();
      showToast("Please enter your goal first.");
      return null;
    }

    return {
      title,
      description: $("#goalDescription")?.value.trim() || "",
      skill: $("#skillLevel")?.value || "beginner",
      hours: Number($("#hoursPerDay")?.value || 1),
      duration: Number($("#goalDuration")?.value || 3),
      challenge: $("#mainChallenge")?.value || "consistency"
    };
  }

  // Generate three illustrative scenarios
  function generateScenarios(goal) {
    const weeklyHours = Math.round(goal.hours * 7 * 10) / 10;

    return [
      {
        title: "Best-case scenario",
        tag: "HIGH MOMENTUM",
        color: "#63efc1",
        description:
          `With regular practice of about ${weeklyHours} hours weekly, ` +
          `you may make faster progress toward "${goal.title}". ` +
          `You could reach an early milestone before your target date.`,
        action:
          "Keep practising consistently, build something practical, and seek feedback."
      },
      {
        title: "Realistic scenario",
        tag: "STEADY PROGRESS",
        color: "#54e7ff",
        description:
          `Over ${goal.duration} month(s), regular practice can help you ` +
          `develop your skills gradually. Some weeks may be slower, so review ` +
          `your progress and adjust your plan when needed.`,
        action:
          "Set one weekly target and review your progress every week."
      },
      {
        title: "Risk scenario",
        tag: "PLAN FOR OBSTACLES",
        color: "#ffb16b",
        description:
          `If your main challenge is ${goal.challenge.replace("-", " ")}, ` +
          `your progress may slow down. Preparing for this obstacle can help ` +
          `you stay on track.`,
        action:
          challenges[goal.challenge] || challenges.consistency
      }
    ];
  }

  // Display generated scenarios
  function renderScenarios(goal, scenarios) {
    const container = $("#scenarioResults");
    if (!container) return;

    const scenarioHTML = scenarios.map((scenario) => `
      <article class="scenario-card"
        style="--accent:${scenario.color}">

        <div class="scenario-top">
          <h3>${escapeHTML(scenario.title)}</h3>
          <span class="scenario-tag">
            ${escapeHTML(scenario.tag)}
          </span>
        </div>

        <p>${escapeHTML(scenario.description)}</p>

        <div class="scenario-action">
          <b>Next step →</b>
          ${escapeHTML(scenario.action)}
        </div>

      </article>
    `).join("");

    const personalHTML = `
      <article class="scenario-card" style="--accent:#bd7bff">
        <div class="scenario-top">
          <h3>Your starting point</h3>
          <span class="scenario-tag">PERSONAL PLAN</span>
        </div>

        <p>
          ${escapeHTML(skillAdvice[goal.skill] || skillAdvice.beginner)}
          ${goal.description ? escapeHTML(goal.description) : ""}
        </p>

        <div class="scenario-action">
          <b>First action →</b>
          Spend ${goal.hours} hour(s) working on
          "${escapeHTML(goal.title)}".
        </div>
      </article>
    `;

    container.innerHTML =
      `<div class="scenario-list">${scenarioHTML}${personalHTML}</div>`;
  }

  // Build a personalized roadmap
  function renderRoadmap(goal, planId) {
    const container = $("#roadmapContainer");
    if (!container) return;

    const milestones = [
      {
        day: 7,
        title: "Build your foundation",
        task: `Write your first weekly target for ${goal.title}.`
      },
      {
        day: 30,
        title: "Create a routine",
        task: "Practise regularly and review what you have learned."
      },
      {
        day: 90,
        title: "Show your progress",
        task: "Complete a small project or demonstrate a useful skill."
      },
      {
        day: 180,
        title: "Review and improve",
        task: "Review your progress and set your next realistic target."
      }
    ];

    const saved = getMilestones();
    const completed = saved[planId] || {};

    container.className = "roadmap-list";
    container.dataset.planId = planId;

    container.innerHTML = milestones.map((item) => `
      <article class="milestone">

        <span class="milestone-day">DAY ${item.day}</span>

        <h3>${escapeHTML(item.title)}</h3>

        <p>${escapeHTML(item.task)}</p>

        <label>
          <input
            type="checkbox"
            data-milestone-day="${item.day}"
            ${completed[item.day] ? "checked" : ""}
          >
          Mark complete
        </label>

      </article>
    `).join("");
  }

  function activatePlan(goal, scenarios, id) {
    activePlan = {
      id,
      goal,
      scenarios,
      createdAt: new Date().toISOString()
    };

    const saveButton = $("#savePlanBtn");
    if (saveButton) saveButton.disabled = false;

    const status = $("#saveStatus");
    if (status) status.textContent = "";

    renderRoadmap(goal, id);
  }

  // Simulator form submission
  function simulateGoal(event) {
    event.preventDefault();

    const goal = readGoalForm();
    if (!goal) return;

    const scenarios = generateScenarios(goal);

    const id =
      activePlan && activePlan.goal.title === goal.title
        ? activePlan.id
        : `plan-${Date.now()}`;

    renderScenarios(goal, scenarios);
    activatePlan(goal, scenarios, id);

    showToast("Your scenarios are ready!");

    $("#scenarioResults")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  // Save a generated plan
  function saveActivePlan() {
    if (!activePlan) {
      showToast("Generate a scenario before saving.");
      return;
    }

    const plans = getPlans();

    const record = {
      ...activePlan,
      updatedAt: new Date().toISOString()
    };

    const index = plans.findIndex(
      (plan) => plan.id === activePlan.id
    );

    if (index >= 0) {
      plans[index] = record;
    } else {
      plans.unshift(record);
    }

    if (writeStorage(STORAGE_KEY, plans)) {
      $("#saveStatus").textContent = "✓ Plan saved successfully";
      renderDashboard();
      showToast("Your plan has been saved!");
    }
  }

  // Compare two decisions
  function compareDecisions() {
    const choiceA = $("#choiceA")?.value.trim() || "";
    const choiceB = $("#choiceB")?.value.trim() || "";

    const detailsA = $("#detailsA")?.value.trim() || "";
    const detailsB = $("#detailsB")?.value.trim() || "";

    const results = $("#decisionResults");

    if (!choiceA || !choiceB) {
      showToast("Enter both choices to compare them.");
      (!choiceA ? $("#choiceA") : $("#choiceB"))?.focus();
      return;
    }

    if (choiceA.toLowerCase() === choiceB.toLowerCase()) {
      showToast("Please enter two different choices.");
      return;
    }

    if (!results) return;

    results.innerHTML = `
      <article class="comparison-result">

        <span class="section-kicker">YOUR COMPARISON</span>

        <h3>
          ${escapeHTML(choiceA)}
          <span class="gradient-text">vs</span>
          ${escapeHTML(choiceB)}
        </h3>

        <p>
          Both options may have advantages and disadvantages.
          Consider the factors below before deciding.
        </p>

        <div class="comparison-columns">

          <div>
            <h4>Option A</h4>
            <ul>
              <li>${escapeHTML(choiceA)}</li>
              <li>Check its cost, time, and benefits.</li>
              <li>Your notes: ${escapeHTML(detailsA || "No notes added.")}</li>
            </ul>
          </div>

          <div>
            <h4>Option B</h4>
            <ul>
              <li>${escapeHTML(choiceB)}</li>
              <li>Check its risks, flexibility, and long-term value.</li>
              <li>Your notes: ${escapeHTML(detailsB || "No notes added.")}</li>
            </ul>
          </div>

        </div>

        <p>
          <strong>Next step:</strong>
          Give each option a score from 1 to 5 for cost,
          time, learning, risk, and how well it fits your goal.
          Use those scores to support your decision.
        </p>

      </article>
    `;

    results.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  // Display saved plans and dashboard statistics
  function renderDashboard() {
    const plans = getPlans();
    const milestoneData = getMilestones();

    let completedCount = 0;

    Object.values(milestoneData).forEach((plan) => {
      if (plan && typeof plan === "object") {
        completedCount += Object.values(plan)
          .filter(Boolean).length;
      }
    });

    if ($("#totalPlans")) {
      $("#totalPlans").textContent = plans.length;
    }

    if ($("#activeGoals")) {
      $("#activeGoals").textContent = plans.length;
    }

    if ($("#completedMilestones")) {
      $("#completedMilestones").textContent = completedCount;
    }

    const container = $("#savedPlans");
    if (!container) return;

    if (!plans.length) {
      container.innerHTML = `
        <div class="empty-saved">
          <span>◇</span>
          <p>No saved plans yet. Create your first scenario above.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = plans.map((plan) => `
      <article class="saved-plan">

        <h4>${escapeHTML(plan.goal?.title || "Untitled goal")}</h4>

        <p>
          ${escapeHTML(plan.goal?.duration || 3)} month plan ·
          ${escapeHTML(plan.goal?.skill || "beginner")}
        </p>

        <div class="saved-plan-actions">

          <button
            class="small-button"
            data-open-plan="${escapeHTML(plan.id)}">
            Open plan
          </button>

          <button
            class="small-button danger"
            data-delete-plan="${escapeHTML(plan.id)}">
            Delete
          </button>

        </div>

      </article>
    `).join("");
  }

  // Open an existing saved plan
  function openSavedPlan(id) {
    const plan = getPlans().find((item) => item.id === id);

    if (!plan) {
      showToast("Saved plan not found.");
      return;
    }

    const goal = plan.goal;

    $("#goalTitle").value = goal.title || "";
    $("#goalDescription").value = goal.description || "";
    $("#skillLevel").value = goal.skill || "beginner";
    $("#hoursPerDay").value = String(goal.hours || 1);
    $("#goalDuration").value = String(goal.duration || 3);
    $("#mainChallenge").value = goal.challenge || "consistency";

    const scenarios = plan.scenarios || generateScenarios(goal);

    renderScenarios(goal, scenarios);
    activatePlan(goal, scenarios, plan.id);

    $("#saveStatus").textContent = "Saved plan opened";

    $("#simulator").scrollIntoView({
      behavior: "smooth"
    });
  }

  function deletePlan(id) {
    const plans = getPlans().filter((plan) => plan.id !== id);

    if (!writeStorage(STORAGE_KEY, plans)) return;

    if (activePlan?.id === id) {
      activePlan = null;
      $("#savePlanBtn").disabled = true;
    }

    renderDashboard();
    showToast("Saved plan deleted.");
  }

  function clearPlans() {
    if (!getPlans().length) {
      showToast("There are no saved plans.");
      return;
    }

    const confirmed = window.confirm(
      "Delete all saved plans from this browser?"
    );

    if (!confirmed) return;

    if (!writeStorage(STORAGE_KEY, [])) return;

    activePlan = null;
    $("#savePlanBtn").disabled = true;

    renderDashboard();
    showToast("All saved plans were deleted.");
  }

  // Save roadmap checkbox progress
  function handleMilestoneChange(event) {
    const checkbox = event.target.closest("[data-milestone-day]");
    if (!checkbox) return;

    const planId = $("#roadmapContainer")?.dataset.planId;
    if (!planId) return;

    const saved = getMilestones();

    if (!saved[planId]) {
      saved[planId] = {};
    }

    saved[planId][checkbox.dataset.milestoneDay] = checkbox.checked;

    if (writeStorage(MILESTONE_KEY, saved)) {
      renderDashboard();

      showToast(
        checkbox.checked
          ? "Milestone completed!"
          : "Milestone unchecked."
      );
    }
  }

  // Navigation and mobile menu
  function setupNavigation() {
    const toggle = $("#menuToggle");
    const nav = $("#navLinks");

    toggle?.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        nav?.classList.remove("open");
        toggle?.setAttribute("aria-expanded", "false");
      });
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        });
      }, {
        rootMargin: "-35% 0px -55% 0px"
      });

      document.querySelectorAll("main section[id]").forEach((section) => {
        observer.observe(section);
      });
    }
  }

  // Reveal sections as they enter the screen
  function setupAnimations() {
    const items = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    items.forEach((item) => observer.observe(item));
  }

  // Connect all buttons and forms
  function init() {
    const year = $("#currentYear");
    if (year) year.textContent = new Date().getFullYear();

    $("#simulatorForm")?.addEventListener("submit", simulateGoal);

    $("#savePlanBtn")?.addEventListener("click", saveActivePlan);

    $("#compareBtn")?.addEventListener("click", compareDecisions);

    $("#clearPlansBtn")?.addEventListener("click", clearPlans);

    $("#roadmapContainer")?.addEventListener(
      "change",
      handleMilestoneChange
    );

    $("#savedPlans")?.addEventListener("click", (event) => {
      const openButton = event.target.closest("[data-open-plan]");
      const deleteButton = event.target.closest("[data-delete-plan]");

      if (openButton) {
        openSavedPlan(openButton.dataset.openPlan);
      }

      if (deleteButton) {
        deletePlan(deleteButton.dataset.deletePlan);
      }
    });

    setupNavigation();
    setupAnimations();
    renderDashboard();
  }

  document.addEventListener("DOMContentLoaded", init);
})();