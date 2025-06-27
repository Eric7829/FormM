import { calculateResults } from './scorer.js';
// Import the parameter matrix so the scorer has access to it.
// Even though we don't use it directly here, JavaScript modules need the full import graph.
import { itemParameters } from './itemParameterMatrix.js';


document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    let allQuestions = [];
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let reportedType = {}; // This will now store JUST the dichotomy results
    let bestFitType = {};
    let currentVerificationIndex = 0;

    const DICHOTOMY_ORDER = ['E-I', 'S-N', 'T-F', 'J-P'];

    // Descriptions for verification step
    const VERIFICATION_DESCRIPTIONS = {
        'E': { title: "Extraversion (E)", text: "You direct your energy outwards towards people and things. You feel energized by interacting with others and prefer to be active and engaged in the world." },
        'I': { title: "Introversion (I)", text: "You direct your energy inwards towards ideas and experiences. You feel energized by time spent alone and prefer to reflect before taking action." },
        'S': { title: "Sensing (S)", text: "You prefer to take in information that is real and tangible. You focus on facts, details, and your own direct experience, trusting what is concrete and measurable." },
        'N': { title: "Intuition (N)", text: "You prefer to take in information by seeing the big picture. You focus on patterns, connections, and future possibilities, trusting symbols and metaphors." },
        'T': { title: "Thinking (T)", text: "You prefer to make decisions based on logic and objective analysis. You focus on cause-and-effect and strive for fairness and consistency." },
        'F': { title: "Feeling (F)", text: "You prefer to make decisions based on personal values and the impact on people. You focus on harmony, empathy, and what is important to yourself and others." },
        'J': { title: "Judging (J)", text: "You prefer to live in a planned, orderly way. You enjoy making decisions, having things settled, and organizing your world to achieve goals." },
        'P': { title: "Perceiving (P)", text: "You prefer to live in a flexible, spontaneous way. You enjoy keeping your options open, staying curious, and adapting to new information as it comes." },
    };


    // --- DOM ELEMENTS ---
    const screens = {
        welcome: document.getElementById('welcome-screen'),
        quiz: document.getElementById('quiz-screen'),
        results: document.getElementById('results-screen'),
        verification: document.getElementById('verification-screen'),
        final: document.getElementById('final-screen')
    };

    const startBtn = document.getElementById('start-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const verifyBtn = document.getElementById('verify-btn');
    const restartBtn = document.getElementById('restart-btn');

    const progressBar = document.getElementById('progress-bar');
    const questionContainer = document.getElementById('question-container');
    const errorMessage = document.getElementById('error-message');
    const resultsDisplay = document.getElementById('results-display');
    const verificationOptions = document.getElementById('verification-options');
    const verificationTitle = document.getElementById('verification-title');
    const verificationInstruction = document.getElementById('verification-instruction');
    const clarityText = document.getElementById('clarity-text');
    const finalTypeDisplay = document.getElementById('final-type-display');

    // --- INITIALIZATION ---
    fetch('./questions.json')
        .then(response => response.json())
        .then(data => {
            allQuestions = data.MBTI_Form_M;
            userAnswers = new Array(allQuestions.length).fill(null);
            startBtn.disabled = false;
        })
        .catch(error => {
            console.error("Failed to load questions:", error);
            document.querySelector('.container').innerHTML = "<h1>Error</h1><p>Could not load assessment questions. Please try again later.</p>";
        });
    startBtn.disabled = true;


    // --- FLOW CONTROL ---
    function switchScreen(activeScreen) {
        for (const screen in screens) {
            screens[screen].classList.remove('active');
        }
        activeScreen.classList.add('active');
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        showQuestion();
        switchScreen(screens.quiz);
    }

    function showResults() {
        // 1. CONVERT THE `userAnswers` ARRAY TO THE OBJECT FORMAT THE SCORER EXPECTS
        // The scorer is documented to need an object with 1-based question numbers as keys.
        const answersForScorer = {};
        userAnswers.forEach((answer, index) => {
            if (answer) {
                // The key is the 1-based question number (index + 1)
                answersForScorer[index + 1] = answer;
            }
        });

        // 2. CALL THE SCORER WITH THE CORRECTLY FORMATTED DATA
        const fullResults = calculateResults(answersForScorer, { MBTI_Form_M: allQuestions });

        // 3. UNPACK THE NESTED `dichotomyResults` OBJECT
        reportedType = fullResults.dichotomyResults;

        console.log("Full Scoring Results:", fullResults); // For debugging and insight

        // 4. DISPLAY THE RESULTS
        displayResults(reportedType);
        switchScreen(screens.results);
    }

    function startVerification() {
        currentVerificationIndex = 0;
        bestFitType = {};
        displayVerificationDichotomy();
        switchScreen(screens.verification);
    }

    function showFinalResults() {
        const finalTypeCode = DICHOTOMY_ORDER.map(d => bestFitType[d]).join('');
        finalTypeDisplay.innerHTML = `<h3>${finalTypeCode}</h3>`;
        switchScreen(screens.final);
    }

    // --- QUIZ LOGIC ---
    function showQuestion() {
        const question = allQuestions[currentQuestionIndex];
        let questionHTML = `<div class="question-text">${question.part === 'II' ? 'Which word in each pair appeals to you more?' : question.question}</div><div class="options-container">`;

        for (const key in question.options) {
            const option = question.options[key];
            questionHTML += `
                <label class="option-label" for="option-${key}">
                    <input type="radio" id="option-${key}" name="answer" value="${key}">
                    <span class="radio-custom"></span>
                    <span>${option.text}</span>
                </label>
            `;
        }
        questionHTML += '</div>';
        questionContainer.innerHTML = questionHTML;

        // Add event listeners to new options
        document.querySelectorAll('input[name="answer"]').forEach(input => {
            input.addEventListener('change', (e) => {
                document.querySelectorAll('.option-label').forEach(label => label.classList.remove('selected'));
                e.target.parentElement.classList.add('selected');
                nextBtn.disabled = false;
                errorMessage.textContent = '';
            });
        });

        const savedAnswer = userAnswers[currentQuestionIndex];
        if (savedAnswer) {
            const selectedInput = document.querySelector(`input[value="${savedAnswer.choice}"]`);
            if (selectedInput) {
                selectedInput.checked = true;
                selectedInput.parentElement.classList.add('selected');
                nextBtn.disabled = false;
            }
        } else {
            nextBtn.disabled = true;
        }

        updateProgress();
        updateNavigationButtons();
    }

    function nextQuestion() {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (!selected) {
            errorMessage.textContent = "Please select an answer.";
            return;
        }

        userAnswers[currentQuestionIndex] = {
            questionIndex: currentQuestionIndex,
            choice: selected.value
        };

        currentQuestionIndex++;
        if (currentQuestionIndex < allQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function previousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
        }
    }

    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function updateNavigationButtons() {
        if (currentQuestionIndex === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-block';
        }
    }

    // --- RESULTS & VERIFICATION DISPLAY ---
    function displayResults(results) {
        resultsDisplay.innerHTML = '';
        DICHOTOMY_ORDER.forEach(key => {
            const result = results[key];
            const [pole1, pole2] = result.dichotomyName.split('-');
            const dichotomyName = `${VERIFICATION_DESCRIPTIONS[pole1].title.split(' ')[0]} / ${VERIFICATION_DESCRIPTIONS[pole2].title.split(' ')[0]}`;

            resultsDisplay.innerHTML += `
                <div class="result-card">
                    <div class="letter">${result.preference}</div>
                    <div class="clarity">${result.pcc}</div>
                    <div class="dichotomy-name">${dichotomyName}</div>
                </div>
            `;
        });
    }

    function displayVerificationDichotomy() {
        const dichotomyKey = DICHOTOMY_ORDER[currentVerificationIndex];
        const [pole1, pole2] = dichotomyKey.split('-');

        verificationTitle.textContent = `Verify: ${VERIFICATION_DESCRIPTIONS[pole1].title} vs. ${VERIFICATION_DESCRIPTIONS[pole2].title}`;
        verificationInstruction.textContent = "Which of these two descriptions feels more like your natural, default way of being?";
        clarityText.textContent = reportedType[dichotomyKey].pcc.toLowerCase();

        verificationOptions.innerHTML = '';
        [pole1, pole2].forEach(pole => {
            const info = VERIFICATION_DESCRIPTIONS[pole];
            verificationOptions.innerHTML += `
                <div class="verification-card">
                    <h3>${info.title}</h3>
                    <p>${info.text}</p>
                    <button class="btn btn-secondary verify-choice-btn" data-choice="${pole}">This is me</button>
                </div>
            `;
        });

        document.querySelectorAll('.verify-choice-btn').forEach(button => {
            button.addEventListener('click', handleVerificationChoice);
        });
    }

    function handleVerificationChoice(e) {
        const choice = e.target.dataset.choice;
        const dichotomyKey = DICHOTOMY_ORDER[currentVerificationIndex];
        bestFitType[dichotomyKey] = choice;

        currentVerificationIndex++;
        if (currentVerificationIndex < DICHOTOMY_ORDER.length) {
            displayVerificationDichotomy();
        } else {
            showFinalResults();
        }
    }


    // --- EVENT LISTENERS ---
    startBtn.addEventListener('click', startQuiz);
    prevBtn.addEventListener('click', previousQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    verifyBtn.addEventListener('click', startVerification);
    restartBtn.addEventListener('click', () => location.reload());
});