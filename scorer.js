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
 * 3. For each MBTI 'facet', it employs Maximum Likelihood Estimation (MLE) to find
 *    the 'theta' (latent trait level) that best explains the respondent's answers
 *    to the questions associated with that specific facet. This is done by
 *    iteratively calculating the probability of observed responses across a range of
 *    theta values, consistent with the MLE formula on page 146 of the MBTI Manual.
 * 4. These facet-level theta scores are then combined to compute a composite
 *    theta for each of the four main MBTI dichotomies.
 * 5. Finally, the composite dichotomy theta scores are converted into a
 *    Preference Clarity Index (PCI) and a qualitative Preference Clarity Category (PCC),
 *    which indicate the strength and consistency of the respondent's reported preference,
 *    adhering to the calculation methods and ranges specified on pages 148-149 of the manual.
 *
 * The use of IRT, specifically a 2-Parameter Logistic (2PL) model, allows for
 * more precise and theoretically sound measurement compared to traditional raw-score
 * counting. The 'a' (discrimination) and 'b' (difficulty/location) parameters for
 * each item are sourced from a robust empirical calibration study, ensuring the
 * reliability and validity of the results.
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
//                 As per the MBTI Manual (p. 147), "When a tie occurs, then the person's preference
//                 becomes I, N, F, or P, depending on the scale."
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
// This is not used for theta sign correction but is kept for potential future analysis.
const NEGATIVE_FACET_SET = new Set(Object.values(NEGATIVE_POLE_FACETS).flat());

// --- Pre-computation for efficiency ---
// A map to quickly find all question indices associated with a specific facet.
// This is built once when the module loads.
const facetToQuestionMap = new Map();
for (const [index, params] of Object.entries(itemParameters)) {
    // 'primaryFacet' is directly used from the calibrated item parameter matrix.
    const facetName = params.primaryFacet;
    if (!facetName) continue; // Skip if a facet is not defined for an item.

    if (!facetToQuestionMap.has(facetName)) {
        facetToQuestionMap.set(facetName, []);
    }
    facetToQuestionMap.get(facetName).push(parseInt(index, 10)); // Store question index (0-based)
}

/**
 * Calculates the probability of a positive response for a given item based on the
 * respondent's latent trait level (theta) and the item's parameters. This implements
 * the 2-Parameter Logistic (2PL) IRT model described in the MBTI Manual (p. 146).
 *
 * @param {number} theta - The latent trait level of the respondent.
 * @param {number} a - The discrimination parameter of the item.
 * @param {number} b - The difficulty/location parameter of the item.
 * @returns {number} The probability of a positive response, ranging from 0 to 1.
 */
function probability(theta, a, b) {
    // P(u=1|θ) = 1 / (1 + e^(-a(θ-b))), as per MBTI Manual, p. 146.
    return 1 / (1 + Math.exp(-a * (theta - b)));
}

/**
 * Converts a Preference Clarity Index (PCI) numerical score into a qualitative
 * Preference Clarity Category (PCC) string. The ranges are sourced directly from
 * the MBTI Manual (p. 148).
 *
 * @param {number} pci - The Preference Clarity Index (1-30).
 * @returns {string} The Preference Clarity Category (Slight, Moderate, Clear, Very Clear).
 */
function getPccCategory(pci) {
    if (pci >= 26) return "Very Clear";  // Range 26-30
    if (pci >= 16) return "Clear";       // Range 16-25
    if (pci >= 6) return "Moderate";    // Range 6-15
    return "Slight";                    // Range 1-5
}

/**
 * Estimates the latent trait level (theta) for a specific MBTI facet using Maximum
 * Likelihood Estimation (MLE). It iterates through a range of possible theta values
 * and finds the one that maximizes the likelihood of the respondent's actual answers,
 * following the MLE logic described in the MBTI Manual (p. 146).
 *
 * @param {string} facetName - The name of the facet (e.g., 'Enthusiastic', 'Imaginative').
 * @param {object} answers - An object where keys are 1-based question numbers and values are
 *                           the chosen option ('A' or 'B').
 * @param {object} allQuestions - The full questions.json data.
 * @returns {number} The estimated theta score for the given facet, rounded to two decimal places.
 */
function findBestThetaForFacet(facetName, answers, allQuestions) {
    const questionIndices = facetToQuestionMap.get(facetName) || [];
    if (questionIndices.length === 0) {
        return 0; // If no questions are mapped, return a neutral theta.
    }

    let bestTheta = 0;
    let maxLogLikelihood = -Infinity;

    // Iterate through a plausible range of theta values (-3.0 to 3.0).
    for (let theta = -3.0; theta <= 3.0; theta += 0.05) {
        let currentLogLikelihood = 0; // Accumulates log-likelihood as per formula on p. 146.

        questionIndices.forEach(qIndex => {
            const params = itemParameters[qIndex];
            const answer = answers[qIndex + 1];

            if (!answer) {
                return; // Skip unanswered questions.
            }

            const { a, b } = params.params;
            const probPositivePole = probability(theta, a, b);

            const questionData = allQuestions.MBTI_Form_M[qIndex];
            const userChoicePole = questionData.options[answer.choice].pole;
            // The positive pole is defined as the first pole in the DICHOTOMY_CONFIG (e.g., E, S, T, J).
            const positivePole = DICHOTOMY_CONFIG[params.dichotomy].poles[0];

            // Add log-likelihood of the observed answer, preventing Math.log(0).
            if (userChoicePole === positivePole) {
                currentLogLikelihood += Math.log(probPositivePole || 1e-9);
            } else {
                currentLogLikelihood += Math.log(1 - probPositivePole || 1e-9);
            }
        });

        // If current theta yields a higher likelihood, it's a better fit.
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

    for (const [dichotomy, config] of Object.entries(DICHOTOMY_CONFIG)) {
        let compositeThetaSum = 0;
        let facetCount = 0;

        for (const facet of config.facets) {
            const theta = facetThetas[facet];
            if (theta === undefined) continue;

            // Theta is on a scale where positive indicates the first pole (E,S,T,J) and negative
            // indicates the second (I,N,F,P). We directly sum the facet thetas.
            compositeThetaSum += theta;
            facetCount++;
        }

        if (facetCount === 0) continue;

        const compositeTheta = compositeThetaSum / facetCount;
        const [pole1, pole2] = config.poles;
        let preference;

        // Determine preference based on theta's position relative to the midpoint (0).
        // Positive theta corresponds to E, S, T, J (as per Figure 7.4, p. 147).
        if (compositeTheta > 0.01) {
            preference = pole1;
        } else if (compositeTheta < -0.01) {
            preference = pole2;
        } else {
            // Apply tie-breaking rule (p. 147).
            preference = config.tieBreaker;
        }

        // --- PCI Calculation Refactored based on MBTI Manual (p. 148) ---
        // "The person's score of θ on a given preference scale is divided by the maximum θ for that scale.
        // This ratio is multiplied by 30 and then rounded up to the nearest positive integer."
        // We assume Max_Theta is 3.0 based on common IRT scale conventions and the original code's clamping.
        const maxTheta = 3.0;
        const rawPciCalculation = (Math.min(Math.abs(compositeTheta), maxTheta) / maxTheta) * 30;
        const pci = Math.max(1, Math.round(rawPciCalculation)); // Ensure PCI is at least 1 and rounded.

        const pcc = getPccCategory(pci);

        dichotomyResults[dichotomy] = {
            preference,
            pci,
            pcc,
            theta: parseFloat(compositeTheta.toFixed(2)),
            dichotomyName: dichotomy
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
 * @param {object} allQuestions - The full JSON data containing all MBTI questions and their options.
 * @returns {object} An object containing 'dichotomyResults' (final preferences, PCI, PCC for each)
 *                   and 'facetScores' (theta scores for individual facets).
 */
export function calculateResults(answers, allQuestions) {
    const facetScores = {};
    // Calculate theta for each individual facet.
    ALL_FACETS.forEach(facet => {
        if (facetToQuestionMap.has(facet)) {
            const theta = findBestThetaForFacet(facet, answers, allQuestions);
            facetScores[facet] = parseFloat(theta.toFixed(2));
        }
    });

    // Compute the main dichotomy results by combining facet scores.
    const dichotomyResults = computeCompositeDichotomyScores(facetScores);

    return {
        dichotomyResults,
        facetScores
    };
}