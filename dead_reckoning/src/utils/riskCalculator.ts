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
  
  // Choose which quips to return based on random choice
  const randomChoice = Math.floor(Math.random() * 3);
  
  if (randomChoice === 0 && otherQuips.length > 0) {
    return otherQuips[Math.floor(Math.random() * otherQuips.length)];
  } else if (randomChoice === 1 && experienceQuip) {
    return experienceQuip;
  } else {
    return aircraftQuips[formData.aircraftType as keyof typeof aircraftQuips];
  }
}; 