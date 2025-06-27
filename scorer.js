/**
 * scorer.js: Professional-Grade MBTI Psychometric Engine
 *
 * This module is responsible for calculating an individual's MBTI preferences
 * (E-I, S-N, T-F, J-P) and their clarity of preference, based on their responses
 * to the MBTI Form M questionnaire. It implements an Item Response Theory (IRT)
 * scoring model, leveraging professionally calibrated item parameters from
 * `itemParameterMatrix.js`.
 *
 * The core logic involves:
 * 1. Defining the MBTI dichotomies, their poles, facets, and tie-breaking rules.
 * 2. Pre-processing the item parameters to efficiently map facets to their
 *    corresponding question indices.
 * 3. For each MBTI 'facet' (a sub-preference within a dichotomy), it employs
 *    Maximum Likelihood Estimation (MLE) to find the 'theta' (latent trait level)
 *    that best explains the respondent's answers to the questions associated
 *    with that specific facet. This is done by iteratively calculating the
 *    probability of observed responses across a range of theta values.
 * 4. These facet-level theta scores are then combined to compute a composite
 *    theta for each of the four main MBTI dichotomies.
 * 5. Finally, the composite dichotomy theta scores are converted into a
 *    Preference Clarity Index (PCI) and a qualitative Preference Clarity Category (PCC),
 *    which indicate the strength and consistency of the respondent's reported preference.
 *
 * The use of IRT, specifically a 2-Parameter Logistic (2PL) model (simplified here
 * by pre-calibrated 'a' and 'b' parameters), allows for more precise and
 * theoretically sound measurement compared to traditional raw-score counting.
 * The 'a' (discrimination) and 'b' (difficulty/location) parameters for each item
 * are sourced from a robust empirical calibration study, ensuring the reliability
 * and validity of the results.
 *
 *
 * MBTI Form M Measurement Properties
 * Reliability of Preferences (Cronbach's alpha) Range Generally .90 or higher
 * Test Re-test - Dichotomies .84 to .96
 * Test-Retest – Continuous
 * Scores
 * .83 to .97
 * Best Fit Type Higher in Form M due to IRT scoring
 */

import { itemParameters } from './itemParameterMatrix.js';

// --- Model Configuration ---
// Defines the facets (sub-preferences) that align with the 'positive' pole of each dichotomy.
// For example, 'Enthusiastic' is a facet of 'Extraversion' (E).
const POSITIVE_POLE_FACETS = {
    'E-I': ['Initiating', 'Expressive', 'Gregarious', 'Active', 'Enthusiastic'],
    'S-N': ['Concrete', 'Realistic', 'Practical', 'Experiential', 'Traditional'],
    'T-F': ['Logical', 'Reasonable', 'Questioning', 'Critical', 'Tough'],
    'J-P': ['Systematic', 'Planful', 'Early Starting', 'Scheduled', 'Methodical']
};
// Defines the facets that align with the 'negative' pole of each dichotomy.
// For example, 'Quiet' is a facet of 'Introversion' (I).
const NEGATIVE_POLE_FACETS = {
    'E-I': ['Receiving', 'Contained', 'Intimate', 'Reflective', 'Quiet'],
    'S-N': ['Abstract', 'Imaginative', 'Conceptual', 'Theoretical', 'Original'],
    'T-F': ['Empathetic', 'Compassionate', 'Accommodating', 'Accepting', 'Tender'],
    'J-P': ['Casual', 'Open-ended', 'Pressure Prompted', 'Spontaneous', 'Emergent']
};

// Configuration for each of the four MBTI dichotomies.
// - 'poles': The two opposing preferences (e.g., ['E', 'I']).
// - 'tieBreaker': The preference pole assigned if the composite theta score is exactly zero.
//                 This follows the MBTI convention of leaning towards the less common or
//                 less socially sanctioned preference (I, N, F, P).
// - 'facets': An array of all facets belonging to this dichotomy, combining positive and negative.
const DICHOTOMY_CONFIG = {
    'E-I': { poles: ['E', 'I'], tieBreaker: 'I', facets: [...POSITIVE_POLE_FACETS['E-I'], ...NEGATIVE_POLE_FACETS['E-I']] },
    'S-N': { poles: ['S', 'N'], tieBreaker: 'N', facets: [...POSITIVE_POLE_FACETS['S-N'], ...NEGATIVE_POLE_FACETS['S-N']] },
    'T-F': { poles: ['T', 'F'], tieBreaker: 'F', facets: [...POSITIVE_POLE_FACETS['T-F'], ...NEGATIVE_POLE_FACETS['T-F']] },
    'J-P': { poles: ['J', 'P'], tieBreaker: 'P', facets: [...POSITIVE_POLE_FACETS['J-P'], ...NEGATIVE_POLE_FACETS['J-P']] }
};

// Consolidated list of all unique facets across all dichotomies.
const ALL_FACETS = Object.values(DICHOTOMY_CONFIG).flatMap(d => d.facets);
// A Set for quick lookup of facets associated with the 'negative' pole.
const NEGATIVE_FACET_SET = new Set(Object.values(NEGATIVE_POLE_FACETS).flat());

// --- Pre-computation for efficiency ---
// A map to quickly find all question indices associated with a specific facet.
// This is built once when the module loads.
const facetToQuestionMap = new Map();
for (const [index, params] of Object.entries(itemParameters)) {
    // 'primaryFacet' is directly used from the calibrated item parameter matrix.
    const facetName = params.primaryFacet;
    if (!facetName) continue; // Skip if a facet is not defined for an item (shouldn't happen with valid data)

    if (!facetToQuestionMap.has(facetName)) {
        facetToQuestionMap.set(facetName, []);
    }
    facetToQuestionMap.get(facetName).push(parseInt(index, 10)); // Store question index (0-based)
}

/**
 * Calculates the probability of a positive response (e.g., "correct" or "endorse positive pole")
 * for a given item based on the respondent's latent trait level (theta) and the item's
 * discrimination ('a') and difficulty ('b') parameters. This is the core of the
 * 2-Parameter Logistic (2PL) IRT model.
 *
 * @param {number} theta - The latent trait level of the respondent (e.g., their E-I preference strength).
 * @param {number} a - The discrimination parameter of the item (how well it differentiates people).
 * @param {number} b - The difficulty/location parameter of the item (the theta level at which
 *                     there's a 50% chance of a positive response).
 * @returns {number} The probability of a positive response, ranging from 0 to 1.
 */
function probability(theta, a, b) {
    return 1 / (1 + Math.exp(-a * (theta - b)));
}

/**
 * Converts a Preference Clarity Index (PCI) numerical score into a qualitative
 * Preference Clarity Category (PCC) string, based on defined ranges.
 *
 * @param {number} pci - The Preference Clarity Index (1-30).
 * @returns {string} The Preference Clarity Category (e.g., "Very Clear", "Clear").
 */
function getPccCategory(pci) {
    if (pci >= 26) return "Very Clear";
    if (pci >= 16) return "Clear";
    if (pci >= 6) return "Moderate";
    return "Slight";
}

/**
 * Estimates the latent trait level (theta) for a specific MBTI facet using Maximum Likelihood Estimation.
 * It iterates through a range of possible theta values and finds the one that maximizes
 * the likelihood of the respondent's actual answers to questions associated with that facet.
 *
 * @param {string} facetName - The name of the facet (e.g., 'Enthusiastic', 'Imaginative').
 * @param {object} answers - An object where keys are 1-based question numbers and values are
 *                           the chosen option ('A' or 'B').
 * @param {object} allQuestions - The full questions.json data, providing question details and options.
 * @returns {number} The estimated theta score for the given facet, rounded to two decimal places.
 */
function findBestThetaForFacet(facetName, answers, allQuestions) {
    // Get the 0-based indices of questions related to this facet.
    const questionIndices = facetToQuestionMap.get(facetName) || [];
    if (questionIndices.length === 0) {
        // If no questions are mapped to this facet, return a neutral theta.
        return 0;
    }

    let bestTheta = 0; // Initialize best theta to neutral
    let maxLogLikelihood = -Infinity; // Initialize max likelihood to negative infinity for comparison

    // Iterate through a range of possible theta values (from -3.0 to 3.0, with 0.05 steps).
    // This range typically covers most human trait variations in IRT.
    for (let theta = -3.0; theta <= 3.0; theta += 0.05) {
        let currentLogLikelihood = 0; // Accumulator for the log-likelihood of answers at current theta

        // For each question belonging to this facet:
        questionIndices.forEach(qIndex => {
            // Retrieve the item parameters (a, b) from the pre-calibrated matrix.
            const params = itemParameters[qIndex];
            // Get the respondent's answer for this question (note: answers are 1-based index, qIndex is 0-based).
            const answer = answers[qIndex + 1];

            if (!answer) {
                // If a question was skipped, it doesn't contribute to the likelihood for this facet.
                return;
            }

            const { a, b } = params.params; // Item discrimination and difficulty
            // Calculate the probability of endorsing the 'positive' pole (defined as the first pole in DICHOTOMY_CONFIG).
            const probPositivePole = probability(theta, a, b);

            // Get the specific question data from the full questions JSON.
            const questionData = allQuestions.MBTI_Form_M[qIndex];
            // Determine which pole the user's chosen option corresponds to.
            const userChoicePole = questionData.options[answer.choice].pole;
            // Get the defined positive pole for this question's dichotomy (e.g., 'E' for E-I).
            const positivePole = DICHOTOMY_CONFIG[params.dichotomy].poles[0];

            // Add the log-likelihood of the observed answer:
            // If user chose the positive pole, add log(P(positive response | theta)).
            // If user chose the negative pole, add log(1 - P(positive response | theta)).
            // Add a small epsilon (1e-9) to prevent Math.log(0) which results in -Infinity.
            if (userChoicePole === positivePole) {
                currentLogLikelihood += Math.log(probPositivePole || 1e-9);
            } else {
                currentLogLikelihood += Math.log(1 - probPositivePole || 1e-9);
            }
        });

        // If the current theta yields a higher total log-likelihood, it's a better fit.
        if (currentLogLikelihood > maxLogLikelihood) {
            maxLogLikelihood = currentLogLikelihood;
            bestTheta = theta;
        }
    }
    return bestTheta;
}

/**
 * Computes composite theta scores for each of the four main MBTI dichotomies
 * by averaging the estimated theta scores of their constituent facets.
 * It also calculates the Preference Clarity Index (PCI) and Category (PCC).
 *
 * @param {object} facetThetas - An object containing estimated theta scores for each facet.
 * @returns {object} An object with results for each dichotomy (preference, PCI, PCC, theta).
 */
function computeCompositeDichotomyScores(facetThetas) {
    const dichotomyResults = {};

    // Iterate through each main MBTI dichotomy (E-I, S-N, T-F, J-P).
    for (const [dichotomy, config] of Object.entries(DICHOTOMY_CONFIG)) {
        let compositeThetaSum = 0;
        let facetCount = 0;

        // Sum up the theta scores of all facets belonging to this dichotomy.
        for (const facet of config.facets) {
            const theta = facetThetas[facet];
            if (theta === undefined) continue; // Skip if facet theta wasn't calculated

            // FIX: The original code incorrectly inverted the theta for "negative" facets.
            // The theta calculated by findBestThetaForFacet is already on the correct scale
            // for the entire dichotomy (e.g., positive for J, negative for P).
            // No correction based on the facet's polarity is needed. We simply sum the thetas.
            compositeThetaSum += theta;
            facetCount++;
        }

        if (facetCount === 0) {
            // If no valid facets were found for this dichotomy, skip.
            continue;
        }

        // Calculate the average theta for the dichotomy.
        const compositeTheta = compositeThetaSum / facetCount;

        // Determine the preferred pole based on the composite theta.
        // A small neutral range (-0.01 to 0.01) is used to handle floating-point precision
        // and trigger the tie-breaker for near-zero scores.
        const [pole1, pole2] = config.poles;
        let preference;
        if (compositeTheta > 0.01) {
            preference = pole1; // e.g., 'E', 'S', 'T', 'J'
        } else if (compositeTheta < -0.01) {
            preference = pole2; // e.g., 'I', 'N', 'F', 'P'
        } else {
            preference = config.tieBreaker; // Apply the tie-breaking rule (I, N, F, P)
        }

        // Calculate the Preference Clarity Index (PCI) from the absolute composite theta.
        // The absolute value is capped at 3 to normalize it to a 0-1 range, then scaled to 1-30.
        // This scaling aligns with the MBTI's PCI range.
        const normalizedClarity = Math.min(Math.abs(compositeTheta), 3) / 3;
        const pci = Math.round(normalizedClarity * 29 + 1);
        // Convert PCI to the qualitative Preference Clarity Category (PCC).
        const pcc = getPccCategory(pci);

        dichotomyResults[dichotomy] = {
            preference,      // The assigned preference (E, I, S, N, T, F, J, P)
            pci,             // Numerical Preference Clarity Index (1-30)
            pcc,             // Qualitative Preference Clarity Category (Slight, Moderate, Clear, Very Clear)
            theta: parseFloat(compositeTheta.toFixed(2)), // Raw composite theta for research/internal use
            dichotomyName: dichotomy // The dichotomy name (e.g., 'E-I')
        };
    }
    return dichotomyResults;
}

/**
 * Main function to calculate MBTI results.
 * Orchestrates the facet-level theta estimation and composite dichotomy scoring.
 *
 * @param {object} answers - An object where keys are 1-based question numbers and values are
 *                           objects containing the chosen option (e.g., { choice: 'A' }).
 *                           Example: { "1": { "choice": "A" }, "2": { "choice": "B" }, ... }
 * @param {object} allQuestions - The full JSON data containing all MBTI questions and their options.
 * @returns {object} An object containing 'dichotomyResults' (final preferences, PCI, PCC for each)
 *                   and 'facetScores' (theta scores for individual facets).
 */
export function calculateResults(answers, allQuestions) {
    const facetScores = {};
    // Calculate theta for each individual facet.
    ALL_FACETS.forEach(facet => {
        // Only process facets for which there are mapped questions.
        if (facetToQuestionMap.has(facet)) {
            const theta = findBestThetaForFacet(facet, answers, allQuestions);
            facetScores[facet] = parseFloat(theta.toFixed(2)); // Store rounded theta
        }
    });

    // Compute the main dichotomy results by combining facet scores.
    const dichotomyResults = computeCompositeDichotomyScores(facetScores);

    return {
        dichotomyResults,
        facetScores
    };
}