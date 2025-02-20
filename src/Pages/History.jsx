import { useEffect, useState } from "react";
import { getQuizResults, clearQuizResults } from "../utils/indexedDB";
import { Link } from "react-router-dom"; 

export default function History() {
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    getQuizResults().then(setQuizHistory);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-500 mb-6">Quiz History</h1>

      {quizHistory.length > 0 ? (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Date</th>
                <th className="border p-2">Score</th>
                <th className="border p-2">Total Questions</th>
              </tr>
            </thead>
            <tbody>
              {quizHistory.map((result, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{new Date(result.timestamp).toLocaleDateString()}</td>
                  <td className="border p-2 text-green-600 font-bold">{result.score}</td>
                  <td className="border p-2">{result.totalQuestions}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={() => {
              clearQuizResults();
              setQuizHistory([]); // Clear history state
            }}
            className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg"
          >
            Clear History
          </button>
        </div>
      ) : (
        <p className="text-xl text-gray-700 mt-6">No quiz history found.</p>
      )}

      <Link to="/" className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg">
        Back to Quiz
      </Link>
    </div>
  );
}
