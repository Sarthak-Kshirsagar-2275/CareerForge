
window.addEventListener("load", () => {

    loadSavedResult();

    const title = document.getElementById("heroTitle");
    const subtitle = document.getElementById("heroSubtitle");

    const originalText = title.textContent;

    title.textContent = "";

    let i = 0;

    function typeText() {

        if (i < originalText.length) {

            title.textContent += originalText.charAt(i);
            i++;

            setTimeout(typeText, 70);

        } else {

            title.style.borderRight = "none";

            setTimeout(() => {

                subtitle.style.transition =
                    "opacity 0.8s ease, transform 0.8s ease";

                subtitle.style.opacity = "1";
                subtitle.style.transform = "translateY(0)";

            }, 600);

        }
    }

    typeText();

});

const form = document.getElementById("careerForm");
const loading = document.getElementById("loading");
const results = document.getElementById("results");
const errorBox = document.getElementById("error");
const formSection = document.getElementById("formSection");
const retakeBtn = document.getElementById("retakeBtn");
const STORAGE_KEY = "careerpilot_result";

const loadingTitle = document.getElementById("loadingTitle");
const progressBar = document.getElementById("progressBar");
const stepItems = document.querySelectorAll(".loading-steps li");
const stepMessages = [
    "Understanding your goals...",
    "Matching career paths...",
    "Building your roadmap...",
    "Curating resources..."
];

let stepInterval;

function startLoadingAnimation() {
    let current = 0;

    stepItems.forEach(li => li.classList.remove("active", "done"));
    stepItems[0].classList.add("active");
    loadingTitle.textContent = stepMessages[0];
    progressBar.style.width = "8%";

    stepInterval = setInterval(() => {
        if (current < stepItems.length - 1) {
            stepItems[current].classList.remove("active");
            stepItems[current].classList.add("done");
            current++;
            stepItems[current].classList.add("active");
            loadingTitle.textContent = stepMessages[current];
        }

        const pct = Math.min(90, ((current + 1) / stepItems.length) * 90);
        progressBar.style.width = pct + "%";
    }, 1100);
}

function finishLoadingAnimation() {
    clearInterval(stepInterval);
    stepItems.forEach(li => {
        li.classList.remove("active");
        li.classList.add("done");
    });
    progressBar.style.width = "100%";
    loadingTitle.textContent = "All set!";
}

function stopLoadingAnimation() {
    clearInterval(stepInterval);
}

form.addEventListener("submit", generateRoadmap);

function loadSavedResult() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        document.querySelector(".hero-split").style.display = "none";
        retakeBtn.style.display = "block";
        gotoResourcesBtn.style.display = "block";
        results.style.display = "block";
        displayResults(JSON.parse(saved));
    }
}

function saveResult(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function clearResult() {
    localStorage.removeItem(STORAGE_KEY);
    document.querySelector(".hero-split").style.display = "flex";
    retakeBtn.style.display = "none";
    gotoResourcesBtn.style.display = "none";
    results.style.display = "none";
    errorBox.style.display = "none";
}

retakeBtn.addEventListener("click", clearResult);
const gotoResourcesBtn = document.getElementById("goToResourcesBtn");
gotoResourcesBtn.addEventListener("click", () => {
    window.location.href = "resources.html";
});

async function generateRoadmap(e) {

    e.preventDefault();

    errorBox.style.display = "none";
    results.style.display = "none";
    loading.style.display = "block";
    loading.scrollIntoView({behavior: "smooth",block: "center"});
    startLoadingAnimation();

    const name = document.getElementById("name").value;
    const education = document.getElementById("education").value;
    const interests = document.getElementById("interests").value;
    const skills = document.getElementById("skills").value;
    const goal = document.getElementById("goal").value;

    const prompt = `
You are an expert career counselor.

Student Information:

Name: ${name}
Education: ${education}
Interests: ${interests}
Current Skills: ${skills}
Career Goal: ${goal}

Return ONLY valid JSON.

{
  "career":"",
  "why":"",
  "roadmap":["","","","","",""],
  "skills":["","","","",""],
  "resources":["","",""]
}
`;

    try {

        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt
            })
        });

        const data = await response.json();

        const text =
            data.candidates[0].content.parts[0].text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

        const result = JSON.parse(text);

        finishLoadingAnimation();
        await new Promise(r => setTimeout(r, 500));

        saveResult(result);
        displayResults(result);

        document.querySelector(".hero-split").style.display = "none";
        retakeBtn.style.display = "block";
        gotoResourcesBtn.style.display = "block";
        results.style.display = "block";
        
        results.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 0);
    } catch (err) {

        stopLoadingAnimation();

        errorBox.style.display = "block";
        errorBox.innerHTML =
            "Something went wrong. Check your API key and internet connection.";

        console.error(err);
    }

    loading.style.display = "none";
}

function displayResults(data) {

    document.getElementById("career").textContent =
        data.career;

    document.getElementById("why").textContent =
        data.why;

    const roadmap = document.getElementById("roadmap");
    roadmap.innerHTML = ""; 

    data.roadmap.forEach(step => {
        const li = document.createElement("li");
        li.textContent = step;
        roadmap.appendChild(li);
    });

    const skills = document.getElementById("skillsList");
    skills.innerHTML = "";

    data.skills.forEach(skill => {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = skill;
        skills.appendChild(tag);
    });

    const resources =
        document.getElementById("resources");

    resources.innerHTML = "";

    data.resources.forEach(resource => {
        const li = document.createElement("li");
        li.textContent = resource;
        resources.appendChild(li);
    });

    results.style.display = "block";

    results.scrollIntoView({
        behavior: "smooth"
    });
}
const formCard = document.querySelector('.form-card');
const genBtn = document.querySelector('button[type="submit"]');

document.addEventListener('mousemove', (e) => {

    // Form card shadow
    const cardRect = formCard.getBoundingClientRect();
    const cardCX = cardRect.left + cardRect.width / 2;
    const cardCY = cardRect.top + cardRect.height / 2;
    const cardDx = e.clientX - cardCX;
    const cardDy = e.clientY - cardCY;
    const cardDist = Math.sqrt(cardDx * cardDx + cardDy * cardDy);
    const cardIntensity = Math.max(0, 1 - cardDist / 600);
    const cardShadowX = (cardDx / Math.max(cardDist, 1)) * 20 * cardIntensity;
    const cardShadowY = (cardDy / Math.max(cardDist, 1)) * 20 * cardIntensity;
    const cardBlur = 30 + cardIntensity * 20;
    const cardAlpha = 0.5 + cardIntensity * 0.4;
    formCard.style.boxShadow = `${cardShadowX}px ${cardShadowY}px ${cardBlur}px rgba(5,90,120,${cardAlpha.toFixed(2)})`;

    // Button shadow
    const btnRect = genBtn.getBoundingClientRect();
    const btnCX = btnRect.left + btnRect.width / 2;
    const btnCY = btnRect.top + btnRect.height / 2;
    const btnDx = e.clientX - btnCX;
    const btnDy = e.clientY - btnCY;
    const btnDist = Math.sqrt(btnDx * btnDx + btnDy * btnDy);
    const btnIntensity = Math.max(0, 1 - btnDist / 400);
    const btnShadowX = (btnDx / Math.max(btnDist, 1)) * 9 * btnIntensity;
    const btnShadowY = (btnDy / Math.max(btnDist, 1)) * 9 * btnIntensity;
    const btnBlur = 20 + btnIntensity * 15;
    const btnAlpha = 0.6 + btnIntensity * 0.3;
    genBtn.style.boxShadow = `${btnShadowX}px ${btnShadowY}px ${btnBlur}px rgba(6,144,199,${btnAlpha.toFixed(2)})`;

});
window.addEventListener("load", loadSavedResult);

