export const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("QuizDB", 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("quizResults")) {
          db.createObjectStore("quizResults", { keyPath: "id", autoIncrement: true });
        }
      };
  
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
  
      request.onerror = (event) => {
        reject("Database error: " + event.target.error);
      };
    });
  };
  
  export const saveQuizResult = async (score, totalQuestions) => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction("quizResults", "readwrite");
      const store = transaction.objectStore("quizResults");
  
      const result = {
        score,
        totalQuestions,
        timestamp: new Date().toISOString(),
      };
  
      store.add(result);
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
  };
  
  export const getQuizResults = async () => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction("quizResults", "readonly");
      const store = transaction.objectStore("quizResults");
      const request = store.getAll();
  
      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          resolve(request.result);
        };
  
        request.onerror = () => {
          reject("Error fetching results: " + request.error);
        };
      });
    } catch (error) {
      console.error("Error retrieving quiz results:", error);
    }
  };
  
  export const clearQuizResults = async () => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction("quizResults", "readwrite");
      const store = transaction.objectStore("quizResults");
      store.clear();
      console.log("Quiz history cleared.");
    } catch (error) {
      console.error("Error clearing quiz results:", error);
    }
  };
  