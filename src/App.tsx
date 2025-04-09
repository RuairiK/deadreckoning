import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import RiskForm, { RiskFormData } from './components/RiskForm'
import ResultsDisplay from './components/ResultsDisplay'
import { calculateRiskPerFlightHour, calculateRiskFactor, determinePilotType, getRiskComparison, getAviationQuip } from './utils/riskCalculator'

function App() {
  const [result, setResult] = useState<{
    riskPerFlightHour: number;
    pilotType: string;
    comparison: string;
    aviationQuip: string;
  } | null>(null)

  const handleFormSubmit = (formData: RiskFormData) => {
    const riskPerFlightHour = calculateRiskPerFlightHour(formData)
    const riskFactor = calculateRiskFactor(formData)
    const pilotType = determinePilotType(riskFactor)
    const comparison = getRiskComparison(riskFactor)
    const aviationQuip = getAviationQuip(formData)
    
    setResult({
      riskPerFlightHour,
      pilotType,
      comparison,
      aviationQuip,
    })
  }

  const handleReset = () => {
    setResult(null)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-[#10194d] overflow-hidden">
      {/* Top wave shape */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-[#0d143d] rounded-b-[50%] transform scale-x-150"></div>
      
      <div className="relative z-10 px-4 py-8 sm:py-12">
        <motion.header 
          className="max-w-4xl mx-auto text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center justify-center mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="white" 
              className="w-10 h-10 mr-2"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
              AeroBooker
            </h1>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm inline-block">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              Dead Reckoning
            </h2>
            <p className="text-lg text-white/90">
              How Likely Are You To Die Flying?
            </p>
          </div>
        </motion.header>
        
        <main className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="results"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ResultsDisplay
                  riskPerFlightHour={result.riskPerFlightHour}
                  pilotType={result.pilotType}
                  comparison={result.comparison}
                  aviationQuip={result.aviationQuip}
                  onReset={handleReset}
                />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <RiskForm onSubmit={handleFormSubmit} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        <footer className="max-w-4xl mx-auto mt-8 sm:mt-12 text-center text-white text-opacity-80">
          <p>© {new Date().getFullYear()} AeroBooker - Flight Scheduling Software for Flying Clubs & Aero Clubs</p>
          <p className="text-sm mt-2">Not a real risk assessment. Fly safe!</p>
          <div className="flex justify-center space-x-4 mt-4 text-sm">
            <a href="#" className="hover:underline">Features</a>
            <a href="#" className="hover:underline">Pricing</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </footer>
      </div>
      
      {/* Bottom wave shape */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0d143d] rounded-t-[50%] transform scale-x-150"></div>
    </div>
  )
}

export default App
