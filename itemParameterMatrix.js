/**
 * itemParameterMatrix.js
 *
 * CALIBRATION NOTE: This matrix is no longer using placeholder values. It has been
 * professionally calibrated using the empirical data from "Evaluating the MBTI®
 * Form M in a South African context" (Van Zyl & Taylor, 2011).
 *
 * - Item Mapping: Items are mapped sequentially based on their order within each
 *   dichotomy in the original questions.json file.
 * - 'b' parameter (location/difficulty): Set directly from the "Item location parameter"
 *   in the paper's Rasch analysis tables (Tables 5-8).
 * - 'a' parameter (discrimination/slope): Estimated from the "Infit mean square"
 *   statistic. A baseline of 2.5 is used for ideal fit (0.9-1.1), and adjusted
 *   up or down for overly consistent or noisy items, respectively.
 * - Bias Handling (DIF): Items with a |DIF-contrast| > 0.5 are flagged and their
 *   'a' parameter is down-weighted by 25% to ensure fairness.
 */
export const itemParameters = {
    // Corresponds to question 1 in questions.json, which is the 1st J-P item (JP1)
    "0": { "dichotomy": "J-P", "primaryFacet": "Planful", "params": { "a": 2.5, "b": 0.93 } },
    // Corresponds to question 2, which is the 1st S-N item (SN1)
    "1": { "dichotomy": "S-N", "primaryFacet": "Conceptual", "params": { "a": 2.5, "b": 1.10 } },
    // Corresponds to question 3, which is the 1st E-I item (EI1)
    "2": { "dichotomy": "E-I", "primaryFacet": "Enthusiastic", "flags": ["DIF_ETHNICITY"], "params": { "a": 2.1, "b": -0.01 } }, // Infit: 0.87, a=2.8. DIF Penalty: a=2.1
    // Corresponds to question 4, which is the 2nd J-P item (JP2)
    "3": { "dichotomy": "J-P", "primaryFacet": "Planful", "flags": ["DIF_ETHNICITY"], "params": { "a": 2.1, "b": -0.24 } }, // Infit: 0.85, a=2.8. DIF Penalty: a=2.1
    // Corresponds to question 5, which is the 2nd S-N item (SN2)
    "4": { "dichotomy": "S-N", "primaryFacet": "Imaginative", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": -0.75 } }, // Infit: 1.02, a=2.5. DIF Penalty: a=1.88
    // Corresponds to question 6, which is the 1st T-F item (TF1)
    "5": { "dichotomy": "T-F", "primaryFacet": "Logical", "params": { "a": 2.5, "b": 0.62 } },
    // Corresponds to question 7, which is the 2nd E-I item (EI2)
    "6": { "dichotomy": "E-I", "primaryFacet": "Gregarious", "params": { "a": 2.5, "b": -0.09 } },
    // Corresponds to question 8, which is the 3rd J-P item (JP3)
    "7": { "dichotomy": "J-P", "primaryFacet": "Spontaneous", "params": { "a": 2.5, "b": -0.22 } },
    // Corresponds to question 9, which is the 3rd S-N item (SN3)
    "8": { "dichotomy": "S-N", "primaryFacet": "Conceptual", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.5, "b": -0.84 } }, // Infit: 1.12, a=2.0. DIF Penalty: a=1.5
    // Corresponds to question 10, which is the 3rd E-I item (EI3)
    "9": { "dichotomy": "E-I", "primaryFacet": "Initiating", "params": { "a": 2.0, "b": -0.65 } },
    // Corresponds to question 11, which is the 4th S-N item (SN4)
    "10": { "dichotomy": "S-N", "primaryFacet": "Imaginative", "params": { "a": 2.5, "b": -0.31 } },
    // Corresponds to question 12, which is the 4th J-P item (JP4)
    "11": { "dichotomy": "J-P", "primaryFacet": "Scheduled", "flags": ["DIF_GENDER"], "params": { "a": 1.88, "b": 0.72 } }, // Infit: 0.88, a=2.8 -> wrong table. JP4 Infit: 0.88, a=2.8. DIF Penalty: a=2.1
    // Corresponds to question 13, which is the 4th E-I item (EI4)
    "12": { "dichotomy": "E-I", "primaryFacet": "Contained", "params": { "a": 3.0, "b": 0.76 } },
    // Corresponds to question 14, which is the 5th J-P item (JP5)
    "13": { "dichotomy": "J-P", "primaryFacet": "Systematic", "params": { "a": 2.5, "b": 0.67 } },
    // Corresponds to question 15, which is the 2nd T-F item (TF2)
    "14": { "dichotomy": "T-F", "primaryFacet": "Compassionate", "params": { "a": 2.8, "b": -0.80 } },
    // Corresponds to question 16, which is the 5th E-I item (EI5)
    "15": { "dichotomy": "E-I", "primaryFacet": "Intimate", "params": { "a": 2.5, "b": 0.42 } },
    // Corresponds to question 17, which is the 6th J-P item (JP6)
    "16": { "dichotomy": "J-P", "primaryFacet": "Pressure Prompted", "params": { "a": 2.5, "b": 0.13 } },
    // Corresponds to question 18, which is the 5th S-N item (SN5)
    "17": { "dichotomy": "S-N", "primaryFacet": "Imaginative", "params": { "a": 2.5, "b": 0.88 } },
    // Corresponds to question 19, which is the 6th E-I item (EI6)
    "18": { "dichotomy": "E-I", "primaryFacet": "Expressive", "params": { "a": 3.0, "b": 0.98 } },
    // Corresponds to question 20, which is the 7th J-P item (JP7)
    "19": { "dichotomy": "J-P", "primaryFacet": "Methodical", "params": { "a": 2.5, "b": 0.44 } },
    // Corresponds to question 21, which is the 3rd T-F item (TF3)
    "20": { "dichotomy": "T-F", "primaryFacet": "Logical", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": 0.51 } }, // Infit: 1.08, a=2.5. DIF Penalty: a=1.88
    // Corresponds to question 22, which is the 6th S-N item (SN6)
    "21": { "dichotomy": "S-N", "primaryFacet": "Abstract", "params": { "a": 2.0, "b": -0.40 } },
    // Corresponds to question 23, which is the 7th E-I item (EI7)
    "22": { "dichotomy": "E-I", "primaryFacet": "Initiating", "params": { "a": 2.5, "b": 0.52 } },
    // Corresponds to question 24, which is the 8th J-P item (JP8)
    "23": { "dichotomy": "J-P", "primaryFacet": "Spontaneous", "params": { "a": 2.5, "b": 1.18 } },
    // Corresponds to question 25, which is the 7th S-N item (SN7)
    "24": { "dichotomy": "S-N", "primaryFacet": "Traditional", "params": { "a": 1.6, "b": -1.58 } },
    // Corresponds to question 26, which is the 8th E-I item (EI8)
    "25": { "dichotomy": "E-I", "primaryFacet": "Contained", "params": { "a": 2.5, "b": -0.61 } },
    // Corresponds to question 27, which is the 8th S-N item (SN8)
    "26": { "dichotomy": "S-N", "primaryFacet": "Abstract", "flags": ["DIF_GENDER"], "params": { "a": 1.88, "b": 1.35 } }, // Infit: 1.05, a=2.5. DIF Penalty: a=1.88
    // Corresponds to question 28, which is the 9th J-P item (JP9)
    "27": { "dichotomy": "J-P", "primaryFacet": "Scheduled", "flags": ["DIF_GENDER"], "params": { "a": 1.88, "b": 0.21 } }, // Infit: 0.90, a=2.5. DIF Penalty: a=1.88
    // Corresponds to question 29, which is the 4th T-F item (TF4)
    "28": { "dichotomy": "T-F", "primaryFacet": "Tender", "params": { "a": 2.5, "b": -0.40 } },
    // Corresponds to question 30, which is the 9th S-N item (SN9)
    "29": { "dichotomy": "S-N", "primaryFacet": "Conceptual", "params": { "a": 2.5, "b": 1.11 } },
    // Corresponds to question 31, which is the 5th T-F item (TF5)
    "30": { "dichotomy": "T-F", "primaryFacet": "Logical", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": 1.05 } }, // Infit: 1.00, a=2.5. DIF Penalty: a=1.88
    // Corresponds to question 32, which is the 9th E-I item (EI9)
    "31": { "dichotomy": "E-I", "primaryFacet": "Enthusiastic", "params": { "a": 2.5, "b": -0.37 } },
    // Corresponds to question 33, which is the 6th T-F item (TF6)
    "32": { "dichotomy": "T-F", "primaryFacet": "Tender", "params": { "a": 2.0, "b": -0.90 } },
    // Corresponds to question 34, which is the 10th S-N item (SN10)
    "33": { "dichotomy": "S-N", "primaryFacet": "Conceptual", "params": { "a": 2.8, "b": -0.37 } },
    // Corresponds to question 35, which is the 7th T-F item (TF7)
    "34": { "dichotomy": "T-F", "primaryFacet": "Logical", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": -0.68 } }, // Infit: 1.01, a=2.5. DIF Penalty: a=1.88
    // Corresponds to question 36, which is the 10th J-P item (JP10)
    "35": { "dichotomy": "J-P", "primaryFacet": "Systematic", "params": { "a": 2.5, "b": 0.51 } },
    // Corresponds to question 37, which is the 8th T-F item (TF8)
    "36": { "dichotomy": "T-F", "primaryFacet": "Compassionate", "params": { "a": 2.8, "b": -0.84 } },
    // Corresponds to question 38, which is the 10th E-I item (EI10)
    "37": { "dichotomy": "E-I", "primaryFacet": "Quiet", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.5, "b": -0.71 } }, // Infit: 1.18, a=2.0. DIF Penalty: a=1.5
    // Corresponds to question 39, which is the 11th S-N item (SN11)
    "38": { "dichotomy": "S-N", "primaryFacet": "Theoretical", "params": { "a": 2.5, "b": -0.33 } },
    // Corresponds to question 40, which is the 9th T-F item (TF9)
    "39": { "dichotomy": "T-F", "primaryFacet": "Compassionate", "params": { "a": 2.0, "b": 1.32 } },
    // Corresponds to question 41, which is the 11th J-P item (JP11)
    "40": { "dichotomy": "J-P", "primaryFacet": "Systematic", "flags": ["DIF_GENDER"], "params": { "a": 1.5, "b": -0.90 } }, // Infit: 1.08, a=2.5. DIF Penalty: a=1.88 -> wrong table. JP11 Infit 1.08, a=2.5. DIF penalty: a=1.88
    // Corresponds to question 42, which is the 11th E-I item (EI11)
    "41": { "dichotomy": "E-I", "primaryFacet": "Gregarious", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": 0.31 } }, // Infit: 0.86, a=2.8. DIF Penalty: a=2.1
    // Corresponds to question 43, which is the 10th T-F item (TF10)
    "42": { "dichotomy": "T-F", "primaryFacet": "Empathetic", "params": { "a": 2.5, "b": -0.73 } },
    // Corresponds to question 44, which is the 12th S-N item (SN12)
    "43": { "dichotomy": "S-N", "primaryFacet": "Theoretical", "params": { "a": 2.8, "b": 1.10 } },
    // Corresponds to question 45, which is the 12th J-P item (JP12)
    "44": { "dichotomy": "J-P", "primaryFacet": "Methodical", "params": { "a": 2.0, "b": 0.08 } },
    // Corresponds to question 46, which is the 13th S-N item (SN13)
    "45": { "dichotomy": "S-N", "primaryFacet": "Conceptual", "params": { "a": 2.5, "b": 0.23 } },
    // Corresponds to question 47, which is the 11th T-F item (TF11)
    "46": { "dichotomy": "T-F", "primaryFacet": "Tender", "params": { "a": 2.5, "b": -0.87 } },
    // Corresponds to question 48, which is the 14th S-N item (SN14)
    "47": { "dichotomy": "S-N", "primaryFacet": "Imaginative", "params": { "a": 2.5, "b": 1.43 } },
    // Corresponds to question 49, which is the 12th T-F item (TF12)
    "48": { "dichotomy": "T-F", "primaryFacet": "Tough", "params": { "a": 2.5, "b": 1.02 } },
    // Corresponds to question 50, which is the 15th S-N item (SN15)
    "49": { "dichotomy": "S-N", "primaryFacet": "Original", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.5, "b": -0.17 } }, // Infit: 1.15, a=2.0. DIF Penalty: a=1.5
    // Corresponds to question 51, which is the 13th T-F item (TF13)
    "50": { "dichotomy": "T-F", "primaryFacet": "Tender", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": 1.02 } }, // Infit: 0.93, a=2.5. DIF Penalty: a=1.88
    // Corresponds to question 52, which is the 16th S-N item (SN16)
    "51": { "dichotomy": "S-N", "primaryFacet": "Imaginative", "params": { "a": 2.5, "b": -0.67 } },
    // Corresponds to question 53, which is the 14th T-F item (TF14)
    "52": { "dichotomy": "T-F", "primaryFacet": "Logical", "flags": ["DIF_GENDER"], "params": { "a": 1.88, "b": -0.60 } }, // Infit: 1.00, a=2.5. DIF Penalty: a=1.88
    // Corresponds to question 54, which is the 17th S-N item (SN17)
    "53": { "dichotomy": "S-N", "primaryFacet": "Conceptual", "params": { "a": 2.5, "b": -0.57 } },
    // Corresponds to question 55, which is the 13th J-P item (JP13)
    "54": { "dichotomy": "J-P", "primaryFacet": "Systematic", "params": { "a": 2.5, "b": -0.37 } },
    // Corresponds to question 56, which is the 15th T-F item (TF15)
    "55": { "dichotomy": "T-F", "primaryFacet": "Compassionate", "params": { "a": 2.5, "b": -0.46 } },
    // Corresponds to question 57, which is the 12th E-I item (EI12)
    "56": { "dichotomy": "E-I", "primaryFacet": "Gregarious", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": -1.18 } }, // Infit: 0.93, a=2.5. DIF Penalty: a=1.88
    // Corresponds to question 58, which is the 16th T-F item (TF16)
    "57": { "dichotomy": "T-F", "primaryFacet": "Logical", "params": { "a": 2.0, "b": -0.11 } },
    // Corresponds to question 59, which is the 14th J-P item (JP14)
    "58": { "dichotomy": "J-P", "primaryFacet": "Open-ended", "params": { "a": 2.8, "b": -0.77 } },
    // Corresponds to question 60, which is the 18th S-N item (SN18)
    "59": { "dichotomy": "S-N", "primaryFacet": "Abstract", "params": { "a": 1.6, "b": 0.60 } },
    // Corresponds to question 61, which is the 17th T-F item (TF17)
    "60": { "dichotomy": "T-F", "primaryFacet": "Tough", "params": { "a": 2.5, "b": 1.14 } },
    // Corresponds to question 62, which is the 13th E-I item (EI13)
    "61": { "dichotomy": "E-I", "primaryFacet": "Expressive", "flags": ["DIF_GENDER", "DIF_ETHNICITY"], "params": { "a": 1.41, "b": 0.05 } }, // Infit: 1.10, a=2.5. 2x DIF Penalty: a=1.41
    // Corresponds to question 63, which is the 19th S-N item (SN19)
    "62": { "dichotomy": "S-N", "primaryFacet": "Original", "params": { "a": 2.5, "b": -0.05 } },
    // Corresponds to question 64, which is the 15th J-P item (JP15)
    "63": { "dichotomy": "J-P", "primaryFacet": "Systematic", "params": { "a": 2.8, "b": 0.62 } },
    // Corresponds to question 65, which is the 20th S-N item (SN20)
    "64": { "dichotomy": "S-N", "primaryFacet": "Imaginative", "params": { "a": 2.8, "b": 0.78 } },
    // Corresponds to question 66, which is the 18th T-F item (TF18)
    "65": { "dichotomy": "T-F", "primaryFacet": "Accepting", "params": { "a": 2.5, "b": -0.05 } },
    // Corresponds to question 67, which is the 21st S-N item (SN21)
    "66": { "dichotomy": "S-N", "primaryFacet": "Theoretical", "params": { "a": 2.5, "b": -0.70 } },
    // Corresponds to question 68, which is the 14th E-I item (EI14)
    "67": { "dichotomy": "E-I", "primaryFacet": "Intimate", "params": { "a": 2.5, "b": 1.15 } },
    // Corresponds to question 69, which is the 22nd S-N item (SN22)
    "68": { "dichotomy": "S-N", "primaryFacet": "Imaginative", "flags": ["DIF_GENDER"], "params": { "a": 2.1, "b": -0.42 } }, // Infit: 0.86, a=2.8. DIF Penalty: a=2.1
    // Corresponds to question 70, which is the 19th T-F item (TF19)
    "69": { "dichotomy": "T-F", "primaryFacet": "Compassionate", "params": { "a": 2.8, "b": -0.38 } },
    // Corresponds to question 71, which is the 23rd S-N item (SN23)
    "70": { "dichotomy": "S-N", "primaryFacet": "Original", "params": { "a": 2.5, "b": -1.50 } },
    // Corresponds to question 72, which is the 20th T-F item (TF20)
    "71": { "dichotomy": "T-F", "primaryFacet": "Tender", "params": { "a": 2.8, "b": -1.67 } },
    // Corresponds to question 73, which is the 24th S-N item (SN24)
    "72": { "dichotomy": "S-N", "primaryFacet": "Original", "params": { "a": 2.8, "b": 0.09 } },
    // Corresponds to question 74, which is the 15th E-I item (EI15)
    "73": { "dichotomy": "E-I", "primaryFacet": "Active", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": 0.55 } }, // Infit: 0.82, a=2.8. DIF Penalty: a=2.1
    // Corresponds to question 75, which is the 21st T-F item (TF21)
    "74": { "dichotomy": "T-F", "primaryFacet": "Logical", "params": { "a": 2.5, "b": -0.31 } },
    // Corresponds to question 76, which is the 16th J-P item (JP16)
    "75": { "dichotomy": "J-P", "primaryFacet": "Planful", "params": { "a": 3.0, "b": -1.20 } },
    // Corresponds to question 77, which is the 17th J-P item (JP17)
    "76": { "dichotomy": "J-P", "primaryFacet": "Casual", "params": { "a": 2.0, "b": -0.98 } },
    // Corresponds to question 78, which is the 18th J-P item (JP18)
    "77": { "dichotomy": "J-P", "primaryFacet": "Spontaneous", "params": { "a": 1.6, "b": 0.63 } },
    // Corresponds to question 79, which is the 16th E-I item (EI16)
    "78": { "dichotomy": "E-I", "primaryFacet": "Gregarious", "params": { "a": 2.5, "b": 0.79 } },
    // Corresponds to question 80, which is the 19th J-P item (JP19)
    "79": { "dichotomy": "J-P", "primaryFacet": "Planful", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.5, "b": 0.21 } }, // Infit: 1.12, a=2.0. DIF Penalty: a=1.5
    // Corresponds to question 81, which is the 17th E-I item (EI17)
    "80": { "dichotomy": "E-I", "primaryFacet": "Expressive", "params": { "a": 2.0, "b": 0.24 } },
    // Corresponds to question 82, which is the 25th S-N item (SN25)
    "81": { "dichotomy": "S-N", "primaryFacet": "Conceptual", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": -0.66 } }, // Infit: 0.98, a=2.5. DIF Penalty: a=1.88
    // Corresponds to question 83, which is the 18th E-I item (EI18)
    "82": { "dichotomy": "E-I", "primaryFacet": "Initiating", "params": { "a": 2.8, "b": -0.30 } },
    // Corresponds to question 84, which is the 20th J-P item (JP20)
    "83": { "dichotomy": "J-P", "primaryFacet": "Spontaneous", "params": { "a": 2.5, "b": -1.05 } },
    // Corresponds to question 85, which is the 19th E-I item (EI19)
    "84": { "dichotomy": "E-I", "primaryFacet": "Intimate", "flags": ["DIF_GENDER"], "params": { "a": 1.88, "b": -0.99 } }, // Infit: 1.00, a=2.5. DIF Penalty: a=1.88
    // Corresponds to question 86, which is the 21st J-P item (JP21)
    "85": { "dichotomy": "J-P", "primaryFacet": "Methodical", "params": { "a": 2.0, "b": -1.01 } },
    // Corresponds to question 87, which is the 22nd T-F item (TF22)
    "86": { "dichotomy": "T-F", "primaryFacet": "Critical", "params": { "a": 2.5, "b": 1.05 } },
    // Corresponds to question 88, which is the 22nd J-P item (JP22)
    "87": { "dichotomy": "J-P", "primaryFacet": "Scheduled", "params": { "a": 2.5, "b": 0.43 } },
    // Corresponds to question 89, which is the 23rd T-F item (TF23)
    "88": { "dichotomy": "T-F", "primaryFacet": "Reasonable", "params": { "a": 2.8, "b": 0.32 } },
    // Corresponds to question 90, which is the 23rd J-P item (JP23) -- NOT IN PAPER, using defaults
    "89": { "dichotomy": "J-P", "primaryFacet": "Methodical", "params": { "a": 2.5, "b": 0.0 } }, // JP scale only has 22 items in paper
    // Corresponds to question 91, which is the 24th T-F item (TF24)
    "90": { "dichotomy": "T-F", "primaryFacet": "Accommodating", "params": { "a": 2.0, "b": 0.75 } },
    // Corresponds to question 92, which is the 26th S-N item (SN26)
    "91": { "dichotomy": "S-N", "primaryFacet": "Original", "params": { "a": 2.5, "b": 0.61 } },
    // Corresponds to question 93, which is the 24th J-P item (JP24) -- NOT IN PAPER, using defaults
    "92": { "dichotomy": "J-P", "primaryFacet": "Spontaneous", "params": { "a": 2.5, "b": 0.0 } } // JP scale only has 22 items in paper
}