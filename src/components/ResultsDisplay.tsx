import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TwitterShareButton, FacebookShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share';
import { TwitterIcon, FacebookIcon, LinkedinIcon, WhatsappIcon } from 'react-share';

interface ResultsDisplayProps {
  riskPerFlightHour: number; // e.g. 1/10000 would be 0.0001
  pilotType: string; // A categorization of the pilot based on risk
  comparison: string; // What activity this is comparable to
  aviationQuip: string; // A witty aviation-specific comment
  onReset: () => void;
}

const ResultsDisplay = ({ riskPerFlightHour, pilotType, comparison, aviationQuip, onReset }: ResultsDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [chartData, setChartData] = useState<{ hours: number; probability: string }[]>([]);
  
  // Format risk as a readable fraction (e.g., "1 in 10,000")
  const formattedRisk = `1 in ${Math.round(1 / riskPerFlightHour).toLocaleString()}`;
  
  useEffect(() => {
    // Generate chart data
    const fullData = generateSurvivalData();
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < fullData.length) {
        setChartData(prevData => [...prevData, fullData[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    
    // Auto-advance through sections
    const sectionTimer = setTimeout(() => {
      if (activeSection < 3) {
        setActiveSection(1);
      }
    }, 2000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(sectionTimer);
    };
  }, []);
  
  // Calculate survival probability for different flight hour milestones
  const generateSurvivalData = () => {
    const data = [];
    for (let hours = 0; hours <= 2000; hours += 200) {
      const survivalProbability = Math.pow(1 - riskPerFlightHour, hours) * 100;
      data.push({
        hours,
        probability: survivalProbability.toFixed(2),
      });
    }
    return data;
  };
  
  // Generate a shareable message
  const shareMessage = `According to AeroBooker's Dead Reckoning calculator, my odds of a flight incident are ${formattedRisk} per flight hour. I'm a "${pilotType}" pilot! Check your odds: [URL]`;
  
  const shareUrl = window.location.href;
  const title = 'AeroBooker Dead Reckoning: Flight Risk Assessment';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleNextSection = () => {
    if (activeSection < 3) {
      setActiveSection(activeSection + 1);
    }
  };
  
  const handlePrevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  // Container and item variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  // Different sections to display based on activeSection
  const renderSection = () => {
    switch(activeSection) {
      case 0:
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block bg-white border-2 border-[#3b5df9] rounded-xl px-8 py-6 mb-4 overflow-hidden relative shadow-md">
              <motion.div
                initial={{ scale: 3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="absolute w-full h-full bg-[#e6eaff] rounded-full opacity-30 animate-ping" style={{ animationDuration: '2s' }}></span>
              </motion.div>
              <p className="text-xl md:text-2xl font-bold text-[#10194d] mb-2 relative z-10">Risk Assessment</p>
              <p className="text-3xl md:text-5xl font-extrabold text-[#e9473f] relative z-10">{formattedRisk}</p>
              <p className="text-gray-600 relative z-10">per flight hour</p>
            </div>
            <motion.button
              onClick={handleNextSection}
              className="mt-8 px-6 py-3 bg-[#3b5df9] text-white rounded-full shadow-lg hover:bg-[#2c4cda] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tell me more
            </motion.button>
          </motion.div>
        );
        
      case 1:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-[#10194d] mb-4">You're flying as a</h3>
              <p className="text-3xl md:text-4xl font-extrabold text-[#3b5df9] mb-6">{pilotType}</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-8">
              <div className="bg-[#fafafa] border-l-4 border-[#3b5df9] p-6 rounded-r-lg text-left shadow-sm">
                <p className="text-lg md:text-xl text-gray-700">{comparison}</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-8">
              <div className="bg-[#f0f4ff] border-l-4 border-[#7b93ff] p-6 rounded-r-lg text-left shadow-sm">
                <p className="italic text-lg md:text-xl text-gray-700">"{aviationQuip}"</p>
              </div>
            </motion.div>
            
            <div className="flex justify-between mt-8">
              <motion.button
                onClick={handlePrevSection}
                className="px-5 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back
              </motion.button>
              
              <motion.button
                onClick={handleNextSection}
                className="px-6 py-2 bg-[#3b5df9] text-white rounded-full hover:bg-[#2c4cda] shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See chart
              </motion.button>
            </div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-center text-[#10194d] mb-4">Survival Probability Over Time</h3>
            <div className="h-72 md:h-80 bg-white p-2 rounded-lg shadow-sm">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef0f7" />
                  <XAxis 
                    dataKey="hours" 
                    label={{ value: 'Flight Hours', position: 'insideBottomRight', offset: -5 }}
                    domain={[0, 2000]}
                    fontSize={12}
                    tick={{ fill: '#505780' }}
                  />
                  <YAxis 
                    label={{ value: 'Survival %', angle: -90, position: 'insideLeft', offset: 10 }}
                    domain={[0, 100]}
                    fontSize={12}
                    tick={{ fill: '#505780' }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Survival Probability']} 
                    labelFormatter={(label) => `${label} hours`}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderColor: '#3b5df9',
                      borderRadius: '8px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="probability" 
                    stroke="#3b5df9" 
                    fill="url(#colorProbability)" 
                    isAnimationActive={true} 
                    animationDuration={1000}
                  />
                  <defs>
                    <linearGradient id="colorProbability" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b5df9" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b5df9" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-between mt-6">
              <motion.button
                onClick={handlePrevSection}
                className="px-5 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back
              </motion.button>
              
              <motion.button
                onClick={handleNextSection}
                className="px-6 py-2 bg-[#3b5df9] text-white rounded-full hover:bg-[#2c4cda] shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Share results
              </motion.button>
            </div>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h3 variants={itemVariants} className="text-xl font-bold mb-4 text-center text-[#10194d]">Share your results</motion.h3>
            
            <motion.div variants={itemVariants} className="flex justify-center space-x-3 mb-6">
              <TwitterShareButton url={shareUrl} title={shareMessage}>
                <TwitterIcon size={50} round />
              </TwitterShareButton>
              <FacebookShareButton url={shareUrl} hashtag="#AeroBooker">
                <FacebookIcon size={50} round />
              </FacebookShareButton>
              <LinkedinShareButton url={shareUrl} title={title} summary={shareMessage}>
                <LinkedinIcon size={50} round />
              </LinkedinShareButton>
              <WhatsappShareButton url={shareUrl} title={shareMessage}>
                <WhatsappIcon size={50} round />
              </WhatsappShareButton>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center mb-8">
              <button 
                onClick={copyToClipboard}
                className={`bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-full inline-flex items-center transition-all shadow-sm ${copied ? 'bg-green-500 text-white' : ''}`}
              >
                {copied ? 'Copied!' : 'Copy to clipboard'}
              </button>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-[#eef4ff] border border-[#cfd9ff] p-6 mb-8 rounded-xl shadow-sm"
            >
              <p className="font-bold text-lg mb-2 text-[#10194d]">Still like those odds?</p>
              <p className="text-gray-700">Book your next brush with fate with <a href="https://www.aerobooker.com" className="text-[#3b5df9] font-bold hover:underline">AeroBooker</a> - Aircraft booking software for flying clubs</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <motion.button 
                onClick={onReset} 
                className="bg-[#10194d] hover:bg-[#0d143d] text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try again
              </motion.button>
            </motion.div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="bg-[#10194d] p-4 text-white">
        <h2 className="text-xl font-bold text-center">Flight Risk Assessment</h2>
        <p className="text-sm text-center text-white/80">Your personal flight safety profile</p>
      </div>
      
      {/* Progress indicator for active section */}
      <div className="flex justify-center mt-4 mb-2">
        {[0, 1, 2, 3].map((step) => (
          <div 
            key={step}
            className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
              step === activeSection ? 'bg-[#3b5df9] scale-125' : 'bg-gray-300'
            }`}
            onClick={() => setActiveSection(step)}
            style={{ cursor: 'pointer' }}
          ></div>
        ))}
      </div>
      
      <div className="p-5 min-h-[450px] flex items-center justify-center">
        {renderSection()}
      </div>
    </div>
  );
};

export default ResultsDisplay; 