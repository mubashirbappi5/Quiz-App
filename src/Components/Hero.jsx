import img1 from '../assets/2152-removebg-preview.png'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Hero = () => {
    const navigate = useNavigate();
    return (
        <div>
             <div className="relative flex flex-col items-center justify-center min-h-screen   text-center px-6">
    
      <motion.img
        src={img1}
        alt="Quiz Illustration"
        className="w-72 mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />


      <motion.h1
        className="text-5xl font-extrabold leading-tight"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        Are You Ready to Challenge Your <span className="text-yellow-300">Brain?</span>
      </motion.h1>

     
      <p className="text-lg text-gray-500 mt-3">
        Take fun quizzes, test your knowledge, and challenge yourself!
      </p>

 
      <motion.button
        className="mt-6 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full text-lg font-bold shadow-lg transition-all transform hover:scale-105"
        onClick={() => navigate("/quiz")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        🚀 Start Quiz
      </motion.button>

  
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
    </div>
            
        </div>
    );
};

export default Hero;