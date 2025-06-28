/**
 * itemParameterMatrix.js
 *
 * CALIBRATION NOTE: This matrix has been professionally recalibrated based on the
 * empirical data from "Evaluating the MBTI® Form M in a South African context"
 * (Van Zyl & Taylor, 2011), following a full reconciliation of the question bank.
 *
 * METHODOLOGY:
 * - 'b' parameter (location/difficulty): RETUNED based on the primary factor loading from the
 *   study's pattern matrix (Table 3). The formula b = -(loading * 3.0) was applied to
 *   ensure internal consistency and symmetrical scoring potential.
 * - 'a' parameter (discrimination/slope): Estimated from the "Infit mean square"
 *   statistic from the Rasch analysis.
 */
export const itemParameters = {
    // Q1 -> JP1: +.406 -> b = -1.22
    "0": { "dichotomy": "J-P", "primaryFacet": "Planful", "params": { "a": 2.5, "b": -1.22 } },
    // Q2 -> SN1: -.234 -> b = 0.70
    "1": { "dichotomy": "S-N", "primaryFacet": "Practical", "params": { "a": 2.5, "b": 0.70 } },
    // Q3 -> EI1: +.422 -> b = -1.27
    "2": { "dichotomy": "E-I", "primaryFacet": "Enthusiastic", "flags": ["DIF_ETHNICITY"], "params": { "a": 2.1, "b": -1.27 } },
    // Q4 -> JP2: +.482 -> b = -1.45
    "3": { "dichotomy": "J-P", "primaryFacet": "Planful", "flags": ["DIF_ETHNICITY"], "params": { "a": 2.1, "b": -1.45 } },
    // Q5 -> SN2: -.269 -> b = 0.81
    "4": { "dichotomy": "S-N", "primaryFacet": "Imaginative", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": 0.81 } },
    // Q6 -> TF1: -.333 -> b = 1.00
    "5": { "dichotomy": "T-F", "primaryFacet": "Logical", "params": { "a": 2.5, "b": 1.00 } },
    // Q7 -> EI2: -.497 -> b = 1.49
    "6": { "dichotomy": "E-I", "primaryFacet": "Gregarious", "params": { "a": 2.5, "b": 1.49 } },
    // Q8 -> JP3: +.382 -> b = -1.15
    "7": { "dichotomy": "J-P", "primaryFacet": "Spontaneous", "params": { "a": 2.5, "b": -1.15 } },
    // Q9 -> SN3: +.349 -> b = -1.05
    "8": { "dichotomy": "S-N", "primaryFacet": "Conceptual", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.5, "b": -1.05 } },
    // Q10 -> EI3: +.510 -> b = -1.53
    "9": { "dichotomy": "E-I", "primaryFacet": "Initiating", "params": { "a": 2.0, "b": -1.53 } },
    // Q11 -> SN4: -.350 -> b = 1.05
    "10": { "dichotomy": "S-N", "primaryFacet": "Imaginative", "params": { "a": 2.5, "b": 1.05 } },
    // Q12 -> JP4: -.509 -> b = 1.53
    "11": { "dichotomy": "J-P", "primaryFacet": "Scheduled", "flags": ["DIF_GENDER"], "params": { "a": 2.1, "b": 1.53 } },
    // Q13 -> EI4: -.507 -> b = 1.52
    "12": { "dichotomy": "E-I", "primaryFacet": "Contained", "params": { "a": 3.0, "b": 1.52 } },
    // Q14 -> JP5: -.426 -> b = 1.28
    "13": { "dichotomy": "J-P", "primaryFacet": "Systematic", "params": { "a": 2.5, "b": 1.28 } },
    // Q15 -> TF2: +.360 -> b = -1.08
    "14": { "dichotomy": "T-F", "primaryFacet": "Compassionate", "params": { "a": 2.8, "b": -1.08 } },
    // Q16 -> EI5: -.540 -> b = 1.62
    "15": { "dichotomy": "E-I", "primaryFacet": "Intimate", "params": { "a": 2.5, "b": 1.62 } },
    // Q17 -> JP6: -.509 -> b = 1.53
    "16": { "dichotomy": "J-P", "primaryFacet": "Pressure Prompted", "params": { "a": 2.5, "b": 1.53 } },
    // Q18 -> SN5: +.362 -> b = -1.09
    "17": { "dichotomy": "S-N", "primaryFacet": "Conceptual", "params": { "a": 2.5, "b": -1.09 } },
    // Q19 -> EI6: +.535 -> b = -1.61
    "18": { "dichotomy": "E-I", "primaryFacet": "Expressive", "params": { "a": 3.0, "b": -1.61 } },
    // Q20 -> JP7: -.453 -> b = 1.36
    "19": { "dichotomy": "J-P", "primaryFacet": "Methodical", "params": { "a": 2.5, "b": 1.36 } },
    // Q21 -> TF3: -.428 -> b = 1.28
    "20": { "dichotomy": "T-F", "primaryFacet": "Logical", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": 1.28 } },
    // Q22 -> SN6: +.395 -> b = -1.19
    "21": { "dichotomy": "S-N", "primaryFacet": "Abstract", "params": { "a": 2.0, "b": -1.19 } },
    // Q23 -> EI7: -.548 -> b = 1.64
    "22": { "dichotomy": "E-I", "primaryFacet": "Initiating", "params": { "a": 2.5, "b": 1.64 } },
    // Q24 -> JP8: -.505 -> b = 1.52
    "23": { "dichotomy": "J-P", "primaryFacet": "Spontaneous", "params": { "a": 2.5, "b": 1.52 } },
    // Q25 -> SN7: -.409 -> b = 1.23
    "24": { "dichotomy": "S-N", "primaryFacet": "Traditional", "params": { "a": 1.5, "b": 1.23 } },
    // Q26 -> EI8: -.560 -> b = 1.68
    "25": { "dichotomy": "E-I", "primaryFacet": "Contained", "params": { "a": 2.5, "b": 1.68 } },
    // Q27 -> SN8: +.418 -> b = -1.25
    "26": { "dichotomy": "S-N", "primaryFacet": "Abstract", "flags": ["DIF_GENDER"], "params": { "a": 1.88, "b": -1.25 } },
    // Q28 -> JP9: -.459 -> b = 1.38
    "27": { "dichotomy": "J-P", "primaryFacet": "Scheduled", "flags": ["DIF_GENDER"], "params": { "a": 1.88, "b": 1.38 } },
    // Q29 -> TF4: +.399 -> b = -1.20
    "28": { "dichotomy": "T-F", "primaryFacet": "Tender", "params": { "a": 2.5, "b": -1.20 } },
    // Q30 -> SN9: -.403 -> b = 1.21
    "29": { "dichotomy": "S-N", "primaryFacet": "Conceptual", "params": { "a": 2.5, "b": 1.21 } },
    // Q31 -> TF5: -.415 -> b = 1.25
    "30": { "dichotomy": "T-F", "primaryFacet": "Logical", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": 1.25 } },
    // Q32 -> EI9: +.564 -> b = -1.69
    "31": { "dichotomy": "E-I", "primaryFacet": "Enthusiastic", "params": { "a": 2.5, "b": -1.69 } },
    // Q33 -> TF6: -.425 -> b = 1.28
    "32": { "dichotomy": "T-F", "primaryFacet": "Tender", "params": { "a": 2.0, "b": 1.28 } },
    // Q34 -> SN10: +.459 -> b = -1.38
    "33": { "dichotomy": "S-N", "primaryFacet": "Abstract", "params": { "a": 2.8, "b": -1.38 } },
    // Q35 -> TF7: +.423 -> b = -1.27
    "34": { "dichotomy": "T-F", "primaryFacet": "Logical", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": -1.27 } },
    // Q36 -> JP10: +.564 -> b = -1.69
    "35": { "dichotomy": "J-P", "primaryFacet": "Systematic", "params": { "a": 2.5, "b": -1.69 } },
    // Q37 -> TF8: +.475 -> b = -1.43
    "36": { "dichotomy": "T-F", "primaryFacet": "Compassionate", "params": { "a": 2.8, "b": -1.43 } },
    // Q38 -> EI10: +.558 -> b = -1.67
    "37": { "dichotomy": "E-I", "primaryFacet": "Quiet", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.5, "b": -1.67 } },
    // Q39 -> SN11: +.440 -> b = -1.32
    "38": { "dichotomy": "S-N", "primaryFacet": "Theoretical", "params": { "a": 2.5, "b": -1.32 } },
    // Q40 -> TF9: -.482 -> b = 1.45
    "39": { "dichotomy": "T-F", "primaryFacet": "Compassionate", "params": { "a": 2.0, "b": 1.45 } },
    // Q41 -> JP11: -.610 -> b = 1.83
    "40": { "dichotomy": "J-P", "primaryFacet": "Systematic", "flags": ["DIF_GENDER"], "params": { "a": 1.88, "b": 1.83 } },
    // Q42 -> EI11: +.581 -> b = -1.74
    "41": { "dichotomy": "E-I", "primaryFacet": "Gregarious", "flags": ["DIF_ETHNICITY"], "params": { "a": 2.1, "b": -1.74 } },
    // Q43 -> TF10: -.474 -> b = 1.42
    "42": { "dichotomy": "T-F", "primaryFacet": "Empathetic", "params": { "a": 2.5, "b": 1.42 } },
    // Q44 -> SN12: +.440 -> b = -1.32
    "43": { "dichotomy": "S-N", "primaryFacet": "Theoretical", "params": { "a": 2.8, "b": -1.32 } },
    // Q45 -> TF11: +.492 -> b = -1.48
    "44": { "dichotomy": "T-F", "primaryFacet": "Tender", "params": { "a": 2.5, "b": -1.48 } },
    // Q46 -> SN13: -.496 -> b = 1.49
    "45": { "dichotomy": "S-N", "primaryFacet": "Abstract", "params": { "a": 2.5, "b": 1.49 } },
    // Q47 -> TF12: -.526 -> b = 1.58
    "46": { "dichotomy": "T-F", "primaryFacet": "Tough", "params": { "a": 2.5, "b": 1.58 } },
    // Q48 -> SN14: -.503 -> b = 1.51
    "47": { "dichotomy": "S-N", "primaryFacet": "Imaginative", "params": { "a": 2.5, "b": 1.51 } },
    // Q49 -> TF13: -.464 -> b = 1.39
    "48": { "dichotomy": "T-F", "primaryFacet": "Tough", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": 1.39 } },
    // Q50 -> SN15: -.504 -> b = 1.51
    "49": { "dichotomy": "S-N", "primaryFacet": "Original", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.5, "b": 1.51 } },
    // Q51 -> TF14: +.461 -> b = -1.38
    "50": { "dichotomy": "T-F", "primaryFacet": "Tender", "flags": ["DIF_GENDER"], "params": { "a": 1.88, "b": -1.38 } },
    // Q52 -> SN16: -.546 -> b = 1.64
    "51": { "dichotomy": "S-N", "primaryFacet": "Imaginative", "params": { "a": 2.5, "b": 1.64 } },
    // Q53 -> TF15: +.527 -> b = -1.58
    "52": { "dichotomy": "T-F", "primaryFacet": "Logical", "params": { "a": 2.5, "b": -1.58 } },
    // Q54 -> SN17: +.541 -> b = -1.62
    "53": { "dichotomy": "S-N", "primaryFacet": "Conceptual", "params": { "a": 2.5, "b": -1.62 } },
    // Q55 -> JP12: -.563 -> b = 1.69
    "54": { "dichotomy": "J-P", "primaryFacet": "Spontaneous", "params": { "a": 2.0, "b": 1.69 } },
    // Q56 -> TF16: -.509 -> b = 1.53
    "55": { "dichotomy": "T-F", "primaryFacet": "Compassionate", "params": { "a": 2.0, "b": 1.53 } },
    // Q57 -> EI12: -.557 -> b = 1.67
    "56": { "dichotomy": "E-I", "primaryFacet": "Gregarious", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": 1.67 } },
    // Q58 -> TF17: -.534 -> b = 1.60
    "57": { "dichotomy": "T-F", "primaryFacet": "Logical", "params": { "a": 2.5, "b": 1.60 } },
    // Q59 -> JP13: +.531 -> b = -1.60
    "58": { "dichotomy": "J-P", "primaryFacet": "Open-ended", "params": { "a": 2.5, "b": -1.60 } },
    // Q60 -> SN18: +.508 -> b = -1.52
    "59": { "dichotomy": "S-N", "primaryFacet": "Abstract", "params": { "a": 1.5, "b": -1.52 } },
    // Q61 -> TF18: +.549 -> b = -1.65
    "60": { "dichotomy": "T-F", "primaryFacet": "Tough", "params": { "a": 2.5, "b": -1.65 } },
    // Q62 -> EI13: +.594 -> b = -1.78
    "61": { "dichotomy": "E-I", "primaryFacet": "Expressive", "flags": ["DIF_GENDER", "DIF_ETHNICITY"], "params": { "a": 1.41, "b": -1.78 } },
    // Q63 -> SN19: +.519 -> b = -1.56
    "62": { "dichotomy": "S-N", "primaryFacet": "Original", "params": { "a": 2.5, "b": -1.56 } },
    // Q64 -> JP14: +.606 -> b = -1.82
    "63": { "dichotomy": "J-P", "primaryFacet": "Systematic", "params": { "a": 2.8, "b": -1.82 } },
    // Q65 -> SN20: -.491 -> b = 1.47
    "64": { "dichotomy": "S-N", "primaryFacet": "Imaginative", "params": { "a": 2.8, "b": 1.47 } },
    // Q66 -> TF19: +.536 -> b = -1.61
    "65": { "dichotomy": "T-F", "primaryFacet": "Accepting", "params": { "a": 2.8, "b": -1.61 } },
    // Q67 -> SN21: +.523 -> b = -1.57
    "66": { "dichotomy": "S-N", "primaryFacet": "Theoretical", "params": { "a": 2.5, "b": -1.57 } },
    // Q68 -> EI14: +.621 -> b = -1.86
    "67": { "dichotomy": "E-I", "primaryFacet": "Intimate", "params": { "a": 2.5, "b": -1.86 } },
    // Q69 -> SN22: -.541 -> b = 1.62
    "68": { "dichotomy": "S-N", "primaryFacet": "Imaginative", "flags": ["DIF_GENDER"], "params": { "a": 2.1, "b": 1.62 } },
    // Q70 -> TF20: +.484 -> b = -1.45
    "69": { "dichotomy": "T-F", "primaryFacet": "Compassionate", "params": { "a": 2.8, "b": -1.45 } },
    // Q71 -> SN23: +.583 -> b = -1.75
    "70": { "dichotomy": "S-N", "primaryFacet": "Original", "params": { "a": 2.5, "b": -1.75 } },
    // Q72 -> TF21: -.577 -> b = 1.73
    "71": { "dichotomy": "T-F", "primaryFacet": "Tender", "params": { "a": 2.5, "b": 1.73 } },
    // Q73 -> SN24: -.596 -> b = 1.79
    "72": { "dichotomy": "S-N", "primaryFacet": "Original", "params": { "a": 2.8, "b": 1.79 } },
    // Q74 -> EI15: +.599 -> b = -1.80
    "73": { "dichotomy": "E-I", "primaryFacet": "Active", "flags": ["DIF_ETHNICITY"], "params": { "a": 2.1, "b": -1.80 } },
    // Q75 -> TF22: +.563 -> b = -1.69
    "74": { "dichotomy": "T-F", "primaryFacet": "Logical", "params": { "a": 2.5, "b": -1.69 } },
    // Q76 -> JP15: -.636 -> b = 1.91
    "75": { "dichotomy": "J-P", "primaryFacet": "Planful", "params": { "a": 2.8, "b": 1.91 } },
    // Q77 -> EI16: -.664 -> b = 1.99
    "76": { "dichotomy": "E-I", "primaryFacet": "Enthusiastic", "params": { "a": 2.5, "b": 1.99 } },
    // Q78 -> JP16: +.607 -> b = -1.82
    "77": { "dichotomy": "J-P", "primaryFacet": "Spontaneous", "params": { "a": 3.0, "b": -1.82 } },
    // Q79 -> EI17: -.671 -> b = 2.01
    "78": { "dichotomy": "E-I", "primaryFacet": "Gregarious", "params": { "a": 2.0, "b": 2.01 } },
    // Q80 -> JP17: +.604 -> b = -1.81
    "79": { "dichotomy": "J-P", "primaryFacet": "Open-ended", "params": { "a": 2.0, "b": -1.81 } },
    // Q81 -> EI18: -.666 -> b = 2.00
    "80": { "dichotomy": "E-I", "primaryFacet": "Expressive", "params": { "a": 2.8, "b": 2.00 } },
    // Q82 -> SN25: +.575 -> b = -1.73
    "81": { "dichotomy": "S-N", "primaryFacet": "Conceptual", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.88, "b": -1.73 } },
    // Q83 -> EI19: -.687 -> b = 2.06
    "82": { "dichotomy": "E-I", "primaryFacet": "Initiating", "flags": ["DIF_GENDER"], "params": { "a": 1.88, "b": 2.06 } },
    // Q84 -> JP18: -.633 -> b = 1.90
    "83": { "dichotomy": "J-P", "primaryFacet": "Spontaneous", "params": { "a": 1.5, "b": 1.90 } },
    // Q85 -> EI20: +.715 -> b = -2.15
    "84": { "dichotomy": "E-I", "primaryFacet": "Gregarious", "params": { "a": 1.5, "b": -2.15 } },
    // Q86 -> JP19: +.642 -> b = -1.93
    "85": { "dichotomy": "J-P", "primaryFacet": "Methodical", "flags": ["DIF_ETHNICITY"], "params": { "a": 1.5, "b": -1.93 } },
    // Q87 -> TF23: +.584 -> b = -1.75
    "86": { "dichotomy": "T-F", "primaryFacet": "Critical", "params": { "a": 2.8, "b": -1.75 } },
    // Q88 -> JP20: +.646 -> b = -1.94
    "87": { "dichotomy": "J-P", "primaryFacet": "Scheduled", "params": { "a": 2.5, "b": -1.94 } },
    // Q89 -> TF24: +.576 -> b = -1.73
    "88": { "dichotomy": "T-F", "primaryFacet": "Accommodating", "params": { "a": 2.0, "b": -1.73 } },
    // Q90 -> JP21: +.664 -> b = -1.99
    "89": { "dichotomy": "J-P", "primaryFacet": "Methodical", "params": { "a": 2.0, "b": -1.99 } },
    // Q91 -> EI21: +.705 -> b = -2.12
    "90": { "dichotomy": "E-I", "primaryFacet": "Gregarious", "params": { "a": 2.5, "b": -2.12 } },
    // Q92 -> SN26: -.587 -> b = 1.76
    "91": { "dichotomy": "S-N", "primaryFacet": "Original", "params": { "a": 2.5, "b": 1.76 } },
    // Q93 -> JP22: -.646 -> b = 1.94
    "92": { "dichotomy": "J-P", "primaryFacet": "Spontaneous", "params": { "a": 2.5, "b": 1.94 } }
};