import { RiskFormData } from '../components/RiskForm';

// Base risk: ~1.05 fatal accidents per 100,000 flight hours
const BASE_RISK = 1.05 / 100000;

// Risk modifiers based on different factors
const RISK_MODIFIERS = {
  // Aircraft type modifiers (relative to single-engine)
  aircraftType: {
    'single-engine': 1.0,    // Reference point
    'multi-engine': 0.8,     // Better redundancy but more complex
    'turboprop': 0.7,        // More reliable engines, usually better equipped
    'jet': 0.5,              // Most reliable, usually professional operations
    'helicopter': 1.5,       // Higher risk due to complexity and flight profile
    'experimental': 2.0,     // Highest risk due to non-certification and variability
  },
  
  // Experience modifiers
  experience: {
    // Flight hours brackets
    veryLow: 3.0,    // 0-100 hours
    low: 1.5,        // 100-500 hours
    medium: 1.0,     // 500-1000 hours (reference point)
    high: 0.7,       // 1000-5000 hours
    veryHigh: 0.5,   // 5000+ hours
  },
  
  // Ratings and habits
  hasInstrumentRating: 0.7,
  fliesWithInstructor: 0.6,
  fliesInMountains: 1.5,
  ownsAircraft: 0.8,
  betterThanAverage: 0.9, // Slight benefit - most pilots think they're better
};

// Determine pilot type based on risk level
export const determinePilotType = (riskFactor: number): string => {
  if (riskFactor < 0.5) return "Safety-Obsessed";
  if (riskFactor < 0.8) return "By-The-Book";
  if (riskFactor < 1.2) return "Average Joe";
  if (riskFactor < 2.0) return "Risky Business";
  if (riskFactor < 3.0) return "Death-Defying";
  return "Dead Man Walking";
};

// Get a fun comparison based on risk level
export const getRiskComparison = (riskFactor: number): string => {
  if (riskFactor < 0.5) {
    return "You're statistically safer than a commercial airline passenger. Boring!";
  } else if (riskFactor < 0.8) {
    return "About as dangerous as falling asleep in your bathtub. Live a little!";
  } else if (riskFactor < 1.2) {
    return "You're statistically safer than a motorcyclist, but not by much.";
  } else if (riskFactor < 2.0) {
    return "Slightly more dangerous than rock climbing, but hey, the view is better!";
  } else if (riskFactor < 3.0) {
    return "Maybe consider taking up something safer, like bull riding?";
  } else {
    return "Your life insurance agent just got a cold shiver down their spine.";
  }
};

// Get a witty aviation-specific comment
export const getAviationQuip = (formData: RiskFormData): string => {
  // Aircraft-specific quips
  const aircraftQuips = {
    'single-engine': "Remember: takeoffs are optional, landings are mandatory.",
    'multi-engine': "Two engines just doubles your chances of an engine failure.",
    'turboprop': "Fast enough to get you to trouble, but not fast enough to get you out of it.",
    'jet': "Flying a jet? Your wallet probably has a higher fatality rate than you do.",
    'helicopter': "Just remember: helicopters don't fly, they beat the air into submission.",
    'experimental': "Experimental aircraft: when you absolutely, positively need to test Newton's laws personally.",
  };
  
  // Experience-based quips
  let experienceQuip = "";
  if (formData.flightHours < 100) {
    experienceQuip = "You've got that new pilot smell. Drive carefully on your way to the airport—it's statistically more dangerous!";
  } else if (formData.flightHours > 5000) {
    experienceQuip = "With all those hours, you're either really good or really lucky. Probably both.";
  }
  
  // Other factor quips
  const otherQuips = [];
  if (formData.hasInstrumentRating) {
    otherQuips.push("Your instrument rating might save you, unless you fly IFR into IMC for the fun of it.");
  }
  
  if (formData.fliesInMountains) {
    otherQuips.push("Flying in mountains? Remember that clouds with rocks in them should be avoided.");
  }
  
  if (formData.betterThanAverage) {
    otherQuips.push("Think you're better than average? So do 90% of pilots. The math doesn't quite add up there.");
  }
  
  // Choose which quips to return based on random selection
  const randomChoice = Math.floor(Math.random() * 3);
  
  if (randomChoice === 0 && otherQuips.length > 0) {
    return otherQuips[Math.floor(Math.random() * otherQuips.length)];
  } else if (randomChoice === 1 && experienceQuip) {
    return experienceQuip;
  } else {
    return aircraftQuips[formData.aircraftType as keyof typeof aircraftQuips];
  }
};

// Calculate risk factor based on form data
export const calculateRiskFactor = (formData: RiskFormData): number => {
  // Base risk factor is 1.0 (corresponds to BASE_RISK)
  let riskFactor = 1.0;
  
  // Apply aircraft type modifier
  riskFactor *= RISK_MODIFIERS.aircraftType[formData.aircraftType as keyof typeof RISK_MODIFIERS.aircraftType];
  
  // Apply experience modifier based on flight hours
  if (formData.flightHours < 100) {
    riskFactor *= RISK_MODIFIERS.experience.veryLow;
  } else if (formData.flightHours < 500) {
    riskFactor *= RISK_MODIFIERS.experience.low;
  } else if (formData.flightHours < 1000) {
    riskFactor *= RISK_MODIFIERS.experience.medium;
  } else if (formData.flightHours < 5000) {
    riskFactor *= RISK_MODIFIERS.experience.high;
  } else {
    riskFactor *= RISK_MODIFIERS.experience.veryHigh;
  }
  
  // Apply other modifiers
  if (formData.hasInstrumentRating) {
    riskFactor *= RISK_MODIFIERS.hasInstrumentRating;
  }
  
  if (formData.fliesWithInstructor) {
    riskFactor *= RISK_MODIFIERS.fliesWithInstructor;
  }
  
  if (formData.fliesInMountains) {
    riskFactor *= RISK_MODIFIERS.fliesInMountains;
  }
  
  if (formData.ownsAircraft) {
    riskFactor *= RISK_MODIFIERS.ownsAircraft;
  }
  
  if (formData.betterThanAverage) {
    riskFactor *= RISK_MODIFIERS.betterThanAverage;
  }
  
  return riskFactor;
};

// Calculate absolute risk per flight hour based on form data
export const calculateRiskPerFlightHour = (formData: RiskFormData): number => {
  const riskFactor = calculateRiskFactor(formData);
  return BASE_RISK * riskFactor;
}; 