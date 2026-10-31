:root {
  --bg: #080b18;
  --panel: #11162b;
  --text: #f4f6ff;
  --muted: #9ba5c2;
  --blue: #6c7dff;
  --cyan: #54e7ff;
  --purple: #bd7bff;
  --green: #63efc1;
  --line: rgba(153, 170, 255, 0.16);
  --font: "DM Sans", sans-serif;
  --display: "Space Grotesk", sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 90px;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  line-height: 1.6;
  overflow-x: hidden;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  opacity: 0.2;
  background-image:
    linear-gradient(rgba(133, 151, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(133, 151, 255, 0.08) 1px, transparent 1px);
  background-size: 55px 55px;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.ambient {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
  pointer-events: none;
  z-index: -1;
}

.ambient-one {
  top: 100px;
  left: -200px;
  background: #4658ff;
}

.ambient-two {
  top: 650px;
  right: -200px;
  background: #8a39ff;
}

/* NAVIGATION */

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 16px max(24px, calc((100vw - 1160px) / 2));
  background: rgba(8, 11, 24, 0.85);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(20px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font: 700 16px var(--display);
  white-space: nowrap;
}

.brand-mark {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 1px solid #54e7ff70;
  border-radius: 11px;
  background: linear-gradient(135deg, #54e7ff25, #bd7bff30);
  box-shadow: 0 0 22px #54e7ff20;
}

.brand-mark span,
.brand-ai {
  color: var(--cyan);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 25px;
}

.nav-link {
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
  transition: 0.25s;
}

.nav-link:hover,
.nav-link.active {
  color: white;
}

.nav-link.active::after {
  content: "";
  display: block;
  height: 2px;
  margin-top: 5px;
  background: linear-gradient(90deg, var(--cyan), var(--purple));
}

.top-cta {
  border: 1px solid var(--line);
  border-radius: 30px;
  padding: 10px 15px;
  font-size: 12px;
}

.top-cta span {
  color: var(--cyan);
  margin-left: 7px;
}

.menu-toggle {
  display: none;
  color: white;
  border: 1px solid var(--line);
  background: var(--panel);
  border-radius: 10px;
  padding: 8px 11px;
}

/* GENERAL LAYOUT */

.section-wrap {
  width: min(1160px, calc(100% - 48px));
  margin-inline: auto;
}

.section-block {
  padding: 65px 0;
}

.section-kicker {
  color: #8c9aff;
  font-size: 10px;
  letter-spacing: 0.19em;
  font-weight: 700;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

.gradient-text {
  background: linear-gradient(100deg, #66e8ff, #8d91ff 50%, #d29aff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.muted-gradient {
  color: #8b94b7;
}

/* BUTTONS */

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 13px 18px;
  font-size: 12px;
  font-weight: 700;
  transition: 0.25s;
}

.button:hover {
  transform: translateY(-3px);
}

.button-primary {
  color: #080b18;
  background: linear-gradient(110deg, #65e9ff, #9c9bff 70%, #c99aff);
  box-shadow: 0 8px 28px #6c7dff35;
}

.button-primary:hover {
  box-shadow: 0 10px 35px #6c7dff65;
}

.button-ghost {
  color: #e7eaff;
  border-color: var(--line);
  background: #ffffff06;
}

.button-ghost:hover {
  border-color: var(--cyan);
}

.full-width {
  width: 100%;
}

/* HERO */

.hero {
  min-height: 650px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 30px;
  padding-top: 45px;
  position: relative;
}

.hero-copy {
  padding: 35px 0 55px;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 25px;
  color: #8c9aff;
  font-size: 10px;
  letter-spacing: 0.19em;
  font-weight: 700;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 12px var(--green);
}

.hero h1 {
  font: 700 clamp(48px, 6vw, 76px)/1.04 var(--display);
  letter-spacing: -0.065em;
  margin-bottom: 24px;
}

.hero-description {
  max-width: 520px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.9;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.trust-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 35px;
}

.trust-row p {
  margin: 0;
  font-size: 11px;
}

.trust-row small {
  color: var(--muted);
}

.avatar-stack {
  display: flex;
}

.avatar-stack span {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  margin-left: -5px;
  border: 2px solid var(--bg);
  border-radius: 50%;
  background: #20294a;
  color: var(--cyan);
}

.avatar-stack span:first-child {
  margin-left: 0;
}

.hero-visual {
  position: relative;
  min-height: 470px;
  display: grid;
  place-items: center;
}

.core-glow {
  position: absolute;
  width: 230px;
  height: 230px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--cyan), var(--blue), var(--purple));
  filter: blur(65px);
  opacity: 0.35;
  animation: pulse 5s ease-in-out infinite;
}

.core {
  width: 190px;
  height: 190px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  position: relative;
  background: radial-gradient(circle at 35% 25%, #3b5a86, #151a40 45%, #0b0e20 75%);
  border: 1px solid #8ecfff;
  box-shadow: 0 0 55px #6c7dff35;
  animation: float 6s ease-in-out infinite;
}

.core::before,
.core::after {
  content: "";
  position: absolute;
  inset: -20px;
  border: 1px solid #54e7ff35;
  border-radius: 50%;
  transform: rotateX(65deg) rotateZ(-20deg);
}

.core::after {
  inset: -35px;
  border-color: #bd7bff35;
  transform: rotateX(68deg) rotateZ(45deg);
}

.core-inner {
  font: 700 55px var(--display);
  letter-spacing: -0.08em;
  text-shadow: 0 0 30px #8beaff75;
}

.core-inner span {
  color: var(--cyan);
  font-size: 18px;
  vertical-align: top;
}

.orbit {
  position: absolute;
  width: 320px;
  height: 320px;
  border: 1px solid #7c8bff25;
  border-radius: 50%;
}

.orbit-a {
  transform: rotateX(66deg) rotateZ(25deg);
}

.orbit-b {
  width: 390px;
  height: 390px;
  transform: rotateX(68deg) rotateZ(-42deg);
}

.orbit-c {
  width: 250px;
  height: 250px;
  transform: rotateY(67deg) rotateZ(12deg);
}

.float-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 13px 15px;
  background: #10162be8;
  border: 1px solid var(--line);
  border-radius: 14px;
  backdrop-filter: blur(14px);
  box-shadow: 0 14px 40px #0005;
  animation: float 5s ease-in-out infinite;
}

.float-card-top {
  top: 70px;
  right: -4px;
}

.float-card-bottom {
  bottom: 65px;
  left: -10px;
  animation-delay: -2s;
}

.float-card small {
  display: block;
  color: #7f8db3;
  font-size: 8px;
  letter-spacing: 0.14em;
}

.float-card strong {
  display: block;
  font-size: 11px;
  margin-top: 3px;
}

.mini-icon {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  font-size: 18px;
}

.cyan {
  color: var(--cyan);
  background: #54e7ff15;
}

.purple {
  color: var(--purple);
  background: #bd7bff18;
}

.tiny-label {
  position: absolute;
  color: #7f8db3;
  font-size: 8px;
  letter-spacing: 0.2em;
}

.label-one {
  top: 35%;
  left: 3%;
}

.label-two {
  bottom: 24%;
  right: 5%;
}

.hero-bottom {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  color: #64708f;
  font-size: 8px;
  letter-spacing: 0.16em;
}

/* INTRO */

.intro-strip {
  display: grid;
  grid-template-columns: 1fr 0.65fr;
  align-items: end;
  gap: 70px;
  padding: 90px 0;
  border-top: 1px solid var(--line);
}

.intro-strip h2,
.section-heading h2,
.closing-cta h2 {
  font: 600 clamp(30px, 4vw, 46px)/1.18 var(--display);
  letter-spacing: -0.045em;
  margin: 14px 0 0;
}

.intro-strip > p {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.9;
  margin-bottom: 5px;
}

/* SECTION HEADINGS */

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 35px;
  margin-bottom: 35px;
}

.section-heading h2 {
  margin-top: 13px;
}

.section-heading > p {
  color: var(--muted);
  max-width: 365px;
  font-size: 12px;
  line-height: 1.8;
  margin-bottom: 4px;
}

/* PANELS AND FORM */

.panel {
  border: 1px solid var(--line);
  background: linear-gradient(145deg, #141b34e0, #0c1021e0);
  border-radius: 22px;
  box-shadow: 0 20px 60px #0002;
}

.simulator-grid {
  display: grid;
  grid-template-columns: 0.92fr 1.08fr;
  gap: 20px;
}

.simulator-form {
  padding: 26px;
}

.panel-heading {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 24px;
}

.panel-icon {
  width: 43px;
  height: 43px;
  display: grid;
  place-items: center;
  color: var(--cyan);
  background: linear-gradient(135deg, #54e7ff1d, #bd7bff20);
  border: 1px solid #7f8aff25;
  border-radius: 13px;
  font-size: 22px;
}

.panel-heading h3,
.saved-heading h3 {
  font: 600 17px var(--display);
  margin: 0 0 4px;
}

.panel-heading p,
.saved-heading p {
  color: var(--muted);
  font-size: 11px;
  margin: 0;
}

label {
  display: block;
  color: #d9def3;
  font-size: 11px;
  font-weight: 600;
  margin: 15px 0 7px;
}

input,
textarea,
select {
  width: 100%;
  color: #f5f6ff;
  background: #090d1e;
  border: 1px solid #99aaff2b;
  border-radius: 10px;
  padding: 12px 13px;
  outline: none;
  font-size: 12px;
  transition: 0.2s;
}

input::placeholder,
textarea::placeholder {
  color: #626d8b;
}

input:focus,
textarea:focus,
select:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px #6c7dff18;
}

textarea {
  resize: vertical;
  min-height: 76px;
}

select {
  color-scheme: dark;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;
}

.full-width {
  margin-top: 22px;
}

.form-note {
  text-align: center;
  color: #7884a5;
  font-size: 9px;
  margin: 13px 0 0;
}

/* SIMULATOR RESULTS */

.results-area {
  min-height: 100%;
}

.results-placeholder {
  height: 100%;
  min-height: 430px;
  padding: 38px;
  border: 1px dashed #99aaff35;
  border-radius: 22px;
  background: #0c102162;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.placeholder-orb {
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  border: 1px solid #7b8aff45;
  border-radius: 20px;
  color: var(--cyan);
  font-size: 35px;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #54e7ff10, #bd7bff12);
}

.results-placeholder h3 {
  max-width: 340px;
  font: 600 24px/1.25 var(--display);
  margin: 13px 0;
}

.results-placeholder p {
  max-width: 350px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.8;
}

.placeholder-lines {
  width: 100%;
  margin-top: 20px;
}

.placeholder-lines i {
  display: block;
  width: 100%;
  height: 7px;
  background: #9da8ff12;
  border-radius: 10px;
  margin-top: 9px;
}

.placeholder-lines i:nth-child(2) {
  width: 80%;
}

.placeholder-lines i:nth-child(3) {
  width: 60%;
}

.scenario-list {
  display: grid;
  gap: 12px;
}

.scenario-card {
  position: relative;
  padding: 18px 19px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 17px;
  background: linear-gradient(135deg, #151c36, #0e1328);
  animation: slideUp 0.45s both;
}

.scenario-card:nth-child(2) {
  animation-delay: 0.08s;
}

.scenario-card:nth-child(3) {
  animation-delay: 0.16s;
}

.scenario-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 7px;
}

.scenario-top h3 {
  margin: 0;
  font: 600 15px var(--display);
}

.scenario-tag {
  color: var(--accent);
  background: #ffffff08;
  border: 1px solid var(--accent);
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 8px;
  letter-spacing: 0.1em;
}

.scenario-card p {
  color: #b4bdd7;
  font-size: 11px;
  line-height: 1.75;
  margin-bottom: 9px;
}

.scenario-action {
  color: #e7eaff;
  font-size: 10px;
  padding-top: 9px;
  border-top: 1px solid #ffffff0b;
}

.scenario-action b {
  color: var(--accent);
}

.save-row {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 18px;
}

.save-row .button {
  padding: 10px 15px;
}

.save-row button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.inline-status {
  color: var(--green);
  font-size: 11px;
}

/* DECISION BATTLE */

.battle-grid {
  display: grid;
  grid-template-columns: 1fr 54px 1fr;
  align-items: center;
  gap: 16px;
}

.choice-card {
  border: 1px solid var(--line);
  background: linear-gradient(145deg, #151b34, #0d1227);
  border-radius: 20px;
  padding: 23px;
}

.choice-a {
  border-top: 2px solid #55e7ff85;
}

.choice-b {
  border-top: 2px solid #c082ff85;
}

.choice-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #8e9bbd;
  font-size: 9px;
  letter-spacing: 0.16em;
  font-weight: 700;
}

.choice-symbol {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  color: var(--cyan);
  background: #54e7ff12;
}

.choice-b .choice-symbol {
  color: var(--purple);
  background: #bd7bff15;
}

.versus {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid #9c9aff55;
  border-radius: 50%;
  background: #171b37;
  color: #c5c3ff;
  font: 700 12px var(--display);
}

.battle-action {
  display: flex;
  align-items: center;
  gap: 17px;
  margin-top: 22px;
}

.subtle-note {
  color: #7d88a8;
  font-size: 10px;
}

.decision-results {
  margin-top: 22px;
}

.comparison-result {
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 23px;
  background: var(--panel);
  animation: slideUp 0.4s both;
}

.comparison-result h3 {
  font: 600 19px var(--display);
}

.comparison-result p,
.comparison-result li {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.8;
}

.comparison-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 15px;
}

.comparison-columns h4 {
  font-size: 12px;
}

.comparison-columns ul {
  padding-left: 18px;
}

/* ROADMAP */

.roadmap-empty {
  padding: 45px 20px;
  text-align: center;
}

.roadmap-empty-icon {
  display: grid;
  place-items: center;
  margin: 0 auto 15px;
  width: 54px;
  height: 54px;
  border-radius: 17px;
  color: var(--cyan);
  font-size: 30px;
  background: #54e7ff10;
  border: 1px solid #54e7ff20;
}

.roadmap-empty h3 {
  font: 600 18px var(--display);
}

.roadmap-empty p {
  max-width: 400px;
  margin: 0 auto 15px;
  color: var(--muted);
  font-size: 12px;
}

.text-link {
  color: var(--cyan);
  font-size: 11px;
  font-weight: 700;
}

.roadmap-list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.milestone {
  position: relative;
  padding: 21px 17px;
  border: 1px solid var(--line);
  border-radius: 17px;
  background: var(--panel);
  min-height: 195px;
}

.milestone::before {
  content: "";
  position: absolute;
  top: 31px;
  left: 0;
  width: 3px;
  height: 25px;
  background: linear-gradient(var(--cyan), var(--purple));
}

.milestone-day {
  color: var(--cyan);
  font: 700 11px var(--display);
  letter-spacing: 0.1em;
}

.milestone h3 {
  font: 600 15px var(--display);
  margin: 12px 0 8px;
}

.milestone p {
  color: var(--muted);
  font-size: 11px;
  line-height: 1.7;
}

.milestone label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-top: 14px;
  font-size: 10px;
}

.milestone input {
  width: 14px;
  height: 14px;
  accent-color: var(--cyan);
  padding: 0;
}

/* DASHBOARD */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.stat-card {
  padding: 23px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: linear-gradient(145deg, #141a33, #0e1328);
}

.stat-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: #bd7bff15;
  color: var(--purple);
  margin-bottom: 18px;
}

.cyan-icon {
  color: var(--cyan);
  background: #54e7ff12;
}

.green-icon {
  color: var(--green);
  background: #63efc112;
}

.stat-label {
  display: block;
  color: #8b97b7;
  font-size: 9px;
  letter-spacing: 0.15em;
  font-weight: 700;
}

.stat-card strong {
  display: block;
  font
