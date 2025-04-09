import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the form state interface
export interface RiskFormData {
  flightHours: number;
  hasInstrumentRating: boolean;
  aircraftType: string;
  fliesWithInstructor: boolean;
  fliesInMountains: boolean;
  ownsAircraft: boolean;
  betterThanAverage: boolean;
}

interface RiskFormProps {
  onSubmit: (data: RiskFormData) => void;
}

const RiskForm = ({ onSubmit }: RiskFormProps) => {
  const [formData, setFormData] = useState<RiskFormData>({
    flightHours: 0,
    hasInstrumentRating: false,
    aircraftType: 'single-engine',
    fliesWithInstructor: false,
    fliesInMountains: false,
    ownsAircraft: false,
    betterThanAverage: false,
  });
  
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  // Define all the questions
  const questions = [
    {
      id: 'flightHours',
      question: 'How many flight hours do you have?',
      type: 'number',
      component: (
        <input
          type="number"
          name="flightHours"
          value={formData.flightHours}
          onChange={handleInputChange}
          className="w-full p-3 text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3b5df9] focus:border-[#3b5df9] focus:outline-none"
          min="0"
          required
        />
      )
    },
    {
      id: 'aircraftType',
      question: 'What kind of aircraft do you typically fly?',
      type: 'select',
      component: (
        <select
          name="aircraftType"
          value={formData.aircraftType}
          onChange={handleInputChange}
          className="w-full p-3 text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3b5df9] focus:border-[#3b5df9] focus:outline-none"
        >
          <option value="single-engine">Single-Engine Piston (C172, PA-28, etc.)</option>
          <option value="multi-engine">Multi-Engine Piston (Baron, Seneca, etc.)</option>
          <option value="turboprop">Turboprop (PC-12, King Air, etc.)</option>
          <option value="jet">Jet (Citation, Learjet, etc.)</option>
          <option value="helicopter">Helicopter</option>
          <option value="experimental">Experimental/Homebuilt</option>
        </select>
      )
    },
    {
      id: 'hasInstrumentRating',
      question: 'Do you have an instrument rating?',
      type: 'boolean',
      component: (
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => handleBooleanChange('hasInstrumentRating', true)}
            className={`flex-1 p-4 text-xl rounded-lg font-medium transition-all ${
              formData.hasInstrumentRating 
                ? 'bg-[#3b5df9] text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => handleBooleanChange('hasInstrumentRating', false)}
            className={`flex-1 p-4 text-xl rounded-lg font-medium transition-all ${
              !formData.hasInstrumentRating 
                ? 'bg-[#3b5df9] text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            No
          </button>
        </div>
      )
    },
    {
      id: 'fliesWithInstructor',
      question: 'Do you regularly fly with an instructor?',
      type: 'boolean',
      component: (
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => handleBooleanChange('fliesWithInstructor', true)}
            className={`flex-1 p-4 text-xl rounded-lg font-medium transition-all ${
              formData.fliesWithInstructor 
                ? 'bg-[#3b5df9] text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => handleBooleanChange('fliesWithInstructor', false)}
            className={`flex-1 p-4 text-xl rounded-lg font-medium transition-all ${
              !formData.fliesWithInstructor 
                ? 'bg-[#3b5df9] text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            No
          </button>
        </div>
      )
    },
    {
      id: 'fliesInMountains',
      question: 'Do you fly in the mountains?',
      type: 'boolean',
      component: (
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => handleBooleanChange('fliesInMountains', true)}
            className={`flex-1 p-4 text-xl rounded-lg font-medium transition-all ${
              formData.fliesInMountains 
                ? 'bg-[#3b5df9] text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => handleBooleanChange('fliesInMountains', false)}
            className={`flex-1 p-4 text-xl rounded-lg font-medium transition-all ${
              !formData.fliesInMountains 
                ? 'bg-[#3b5df9] text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            No
          </button>
        </div>
      )
    },
    {
      id: 'ownsAircraft',
      question: 'Do you own your aircraft?',
      type: 'boolean',
      component: (
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => handleBooleanChange('ownsAircraft', true)}
            className={`flex-1 p-4 text-xl rounded-lg font-medium transition-all ${
              formData.ownsAircraft 
                ? 'bg-[#3b5df9] text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => handleBooleanChange('ownsAircraft', false)}
            className={`flex-1 p-4 text-xl rounded-lg font-medium transition-all ${
              !formData.ownsAircraft 
                ? 'bg-[#3b5df9] text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            No
          </button>
        </div>
      )
    },
    {
      id: 'betterThanAverage',
      question: 'Be honest: are you better than the average pilot?',
      type: 'boolean',
      component: (
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => handleBooleanChange('betterThanAverage', true)}
            className={`flex-1 p-4 text-xl rounded-lg font-medium transition-all ${
              formData.betterThanAverage 
                ? 'bg-[#3b5df9] text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => handleBooleanChange('betterThanAverage', false)}
            className={`flex-1 p-4 text-xl rounded-lg font-medium transition-all ${
              !formData.betterThanAverage 
                ? 'bg-[#3b5df9] text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            No
          </button>
        </div>
      )
    }
  ];

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) || 0 : value,
    });
  }

  function handleBooleanChange(name: string, value: boolean) {
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Auto-advance to next question after selection for boolean questions
    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        nextStep();
      }, 300);
    }
  }

  function nextStep() {
    if (currentStep < questions.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  }

  function handleSubmit() {
    onSubmit(formData);
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  // Calculate progress percentage
  const progress = Math.round((currentStep / (questions.length - 1)) * 100);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="bg-[#10194d] p-4 text-white">
        <h2 className="text-xl font-bold text-center">Dead Reckoning</h2>
        <p className="text-sm text-center text-white/80">How Likely Are You To Die Flying?</p>
      </div>
      
      <div className="p-5">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-[#3b5df9] h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="relative overflow-hidden min-h-[280px]">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full"
            >
              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-semibold text-center mb-6 text-gray-800">
                  {questions[currentStep].question}
                </h3>
                <div className="mt-4">
                  {questions[currentStep].component}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className={`px-5 py-2 rounded-full ${
              currentStep === 0 
                ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500' 
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
            disabled={currentStep === 0}
          >
            Back
          </button>
          
          {/* Only show Next button if not on last step, otherwise show Submit */}
          {currentStep < questions.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-5 py-2 bg-[#3b5df9] text-white rounded-full hover:bg-[#2c4cda] shadow-md"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#e9473f] text-white rounded-full hover:bg-[#d13a33] shadow-md font-bold"
            >
              Calculate My Risk
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskForm; 