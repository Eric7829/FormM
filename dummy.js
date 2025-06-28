// dummy.js

import { calculateResults } from './scorer.js';

/**
 * Generates a dummy answers object for testing purposes.
 * @param {object} questionsData - The loaded questions.json data.
 * @param {string} preferredTypeString - A 4-letter string like 'ESTJ', 'INFP', or 'ENTJ'.
 * @param {boolean} includeOmissions - If true, random questions will be omitted (marked as null).
 * @param {number} omissionRate - Probability (0 to 1) of omitting a question if includeOmissions is true.
 * @returns {object} An answers object formatted for the scorer.
 */
function generateDummyAnswers(questionsData, preferredTypeString, includeOmissions = false, omissionRate = 0.1) {
    const answers = {};
    const questionBank = questionsData.MBTI_Form_M;

    // Define the preferred poles based on the input type string
    // This mapping ensures that the generateDummyAnswers function understands which
    // pole of a dichotomy (e.g., E or I for E-I) corresponds to the
    // desired type string (e.g., if typeString starts with 'E', prefer E-pole items).
    const typePreferenceMap = {
        'E-I': preferredTypeString[0],
        'S-N': preferredTypeString[1],
        'T-F': preferredTypeString[2],
        'J-P': preferredTypeString[3],
    };

    questionBank.forEach((q, index) => {
        const questionNumber = q.number; // 1-based question number

        if (includeOmissions && Math.random() < omissionRate) {
            // Simulate an omission
            answers[questionNumber] = null;
            return;
        }

        let chosenOptionKey = null;
        const targetPole = typePreferenceMap[q.dichotomy]; // Get the preferred pole for this question's dichotomy

        // Iterate through options 'A' and 'B' to find the one matching the target pole
        if (q.options.A.pole === targetPole) {
            chosenOptionKey = 'A';
        } else if (q.options.B.pole === targetPole) {
            chosenOptionKey = 'B';
        } else {
            // Fallback for unexpected cases or balanced items, defaults to 'A'
            // or could be randomized if desired for more variability.
            chosenOptionKey = 'A';
        }

        answers[questionNumber] = { choice: chosenOptionKey };
    });

    return answers;
}

// --- Asynchronous Test Runner ---
async function runTests() {
    let questionsData;
    try {
        const response = await fetch('./questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        questionsData = await response.json();
    } catch (error) {
        console.error("Failed to load questions.json:", error);
        return; // Stop execution if questions can't be loaded
    }

    // --- Define Test Cases (now passing questionsData to generator) ---
    const testCases = [
        {
            name: "Test Case 1: Strong ESTJ (Ideal, No Omissions)",
            answers: generateDummyAnswers(questionsData, "ESTJ", false)
        },
        {
            name: "Test Case 2: Strong INFP (Ideal, No Omissions)",
            answers: generateDummyAnswers(questionsData, "INFP", false)
        },
        {
            name: "Test Case 3: Mixed Type (ENTP, No Omissions)",
            answers: generateDummyAnswers(questionsData, "ENTP", false)
        },
        {
            name: "Test Case 4: ESTJ with Moderate Omissions (15%)",
            answers: generateDummyAnswers(questionsData, "ESTJ", true, 0.15)
        },
        {
            name: "Test Case 5: INFP with High Omissions (30%)",
            answers: generateDummyAnswers(questionsData, "INFP", true, 0.30)
        },
        {
            name: "Test Case 6: All Omissions (Should result in INFP due to tie-breakers, Slight Clarity)",
            answers: (() => {
                const emptyAnswers = {};
                for (let i = 1; i <= questionsData.MBTI_Form_M.length; i++) {
                    emptyAnswers[i] = null;
                }
                return emptyAnswers;
            })()
        },
        // Add more specific test cases here if needed, e.g., to test a specific range of theta or PCI
    ];

    // --- Run Tests ---
    console.log("--- Running MBTI Scorer Test Cases ---");

    testCases.forEach((testCase, index) => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`Number of questions in bank: ${questionsData.MBTI_Form_M.length}`);

        // Count omissions
        const omittedCount = Object.values(testCase.answers).filter(a => a === null).length;
        const answeredCount = Object.values(testCase.answers).filter(a => a !== null).length;
        console.log(`Answered: ${answeredCount}, Omitted: ${omittedCount}`);

        const results = calculateResults(testCase.answers, questionsData);

        let typeCode = '';
        const DICHOTOMY_ORDER = ['E-I', 'S-N', 'T-F', 'J-P'];

        if (results && results.dichotomyResults) {
            DICHOTOMY_ORDER.forEach(dichotomyKey => {
                const dichotomyResult = results.dichotomyResults[dichotomyKey];
                if (dichotomyResult) {
                    typeCode += dichotomyResult.preference;
                    console.log(`  ${dichotomyKey}: Preference=${dichotomyResult.preference}, Theta=${dichotomyResult.theta}, PCI=${dichotomyResult.pci} (${dichotomyResult.pcc})`);
                } else {
                    typeCode += '?'; // Indicate missing result
                    console.log(`  ${dichotomyKey}: No result calculated.`);
                }
            });
            console.log(`\nOverall Reported Type: ${typeCode}`);
        } else {
            console.error("Scoring results structure is unexpected:", results);
        }
    });

    console.log("\n--- Test Cases Finished ---");
}

// Execute the asynchronous test runner
runTests();