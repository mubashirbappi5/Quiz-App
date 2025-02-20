import { useState, useEffect } from "react";
import img1 from "../assets/thoughtful-woman-with-laptop-looking-big-question-mark.png";
import { useNavigate } from "react-router-dom";
import { saveQuizResult } from "../utils/indexedDB";


const quizData = [
    {
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      correct: "Mercury",
      type: "multiple-choice"
    },
    {
      question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correct: "Queue",
      type: "multiple-choice"
    },
    {
      question: "Which of the following is primarily used for structuring web pages?",
      options: ["Python", "Java", "HTML", "C++"],
      correct: "HTML",
      type: "multiple-choice"
    },
    {
      question: "Which chemical symbol stands for Gold?",
      options: ["Au", "Gd", "Ag", "Pt"],
      correct: "Au",
      type: "multiple-choice"
    },
    {
      question: "Which of these processes is not typically involved in refining petroleum?",
      options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
      correct: "Filtration",
      type: "multiple-choice"
    },
    {
      question: "What is the value of 12 + 28?",
      correct: 40,
      type: "integer"
    },
    {
      question: "How many states are there in the United States?",
      correct: 50,
      type: "integer"
    },
    {
      question: "In which year was the Declaration of Independence signed?",
      correct: 1776,
      type: "integer"
    },
    {
      question: "What is the value of pi rounded to the nearest integer?",
      correct: 3,
      type: "integer"
    },
    {
      question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
      correct: 120,
      type: "integer"
    }
  ];
  

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
 const navigate = useNavigate()
  useEffect(() => {
    if (timeLeft > 0 && !isAnswered && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered && !quizCompleted) {
      handleNextQuestion();
    }
  }, [timeLeft, isAnswered, quizCompleted]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === quizData[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleIntegerSubmit = () => {
    if (parseInt(userAnswer) === quizData[currentQuestion].correct) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setUserAnswer("");
      setTimeLeft(30);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
      saveQuizResult(score, quizData.length);
    
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-5">
        Test Your <span className="text-yellow-300">IQ</span>
      </h1>
      <div className="grid grid-cols-2 items-center text-white px-4 min-h-screen">
        {!quizStarted && (
          <div className="text-center mt-5 space-y-4">
            <h1 className="text-black font-bold text-lg">
              Are You a Quiz Master?
            </h1>
            <p className="text-black text-sm">
              Welcome to the quiz! Test your knowledge.
            </p>
            <button
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-600 text-lg font-bold rounded-lg"
              onClick={handleStartQuiz}
            >
              Start Quiz
            </button>
          </div>
        )}

        {quizStarted && !quizCompleted && (
          <div>
            <div className="border-2 border-orange-200 p-6 mt-5 rounded-lg shadow-lg text-center">
              <h1 className="border-2 text-yellow-400 rounded-full w-10 text-center h-10">
                {timeLeft}s
              </h1>
              <h2 className="text-2xl font-bold text-black mt-4">
                {quizData[currentQuestion].question}
              </h2>

              {quizData[currentQuestion].type === "multiple-choice" ? (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {quizData[currentQuestion].options.map((option, index) => {
                    let buttonClass =
                      "px-4 py-2 rounded-lg text-lg font-semibold transition-all bg-orange-100 text-black hover:bg-orange-300";
                    if (isAnswered) {
                      if (option === selectedAnswer) {
                        buttonClass =
                          option === quizData[currentQuestion].correct
                            ? "bg-green-500"
                            : "bg-red-500";
                      } else if (option === quizData[currentQuestion].correct) {
                        buttonClass = "bg-green-500";
                      }
                    }
                    return (
                      <button
                        key={index}
                        className={buttonClass}
                        onClick={() => handleAnswerClick(option)}
                        disabled={isAnswered}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4">
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg text-orange-300 mb-4"
                    placeholder="Your Answer"
                  />
                  <button
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-lg font-bold rounded-lg"
                    onClick={handleIntegerSubmit}
                  >
                    Submit Answer
                  </button>
                </div>
              )}

              {isAnswered && (
                <div className="mt-4 text-lg font-semibold">
                  {selectedAnswer === quizData[currentQuestion].correct ? (
                    <p className="text-green-500">✔</p>
                  ) : (
                    <p className="text-red-500">❌</p>
                  )}
                </div>
              )}

              {isAnswered && (
                <button
                  className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-lg font-bold rounded-lg"
                  onClick={handleNextQuestion}
                >
                  Next Question
                </button>
              )}
            </div>
          </div>
        )}

        {quizCompleted && (
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
            open
          >
            <div className="modal-box border-y-4 border-amber-500">
              <div className="mt-4 border-b-2 p-6 text-center ">
                <h2 className="text-3xl font-bold text-green-500">
                  Quiz Completed!
                </h2>
                <p className="text-xl mt-2 text-neutral-800">
                  Your score: {score} out of {quizData.length}
                </p>
                <div className="mt-4">
                  <button
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-lg font-bold rounded-lg"
                    onClick={() => navigate('/history')}
                  >
                    Restart Quiz
                  </button>
                </div>
              </div>
             
            </div>
          </dialog>
        )}

        <div>
          <img className={`w-[500px] ${quizCompleted && 'hidden'} `} src={img1} alt="Quiz Illustration" />
        </div>
      </div>
    </>
  );
}
