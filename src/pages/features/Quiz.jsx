import React, { useState, useEffect } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import { useNavigate } from "react-router-dom";
const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [className , setClassName] = useState("");
  const [subject , setSubject] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if(className != "" && className != undefined)
    {
      fetch("http://localhost:5000/api/quiz/aiquiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: ` my class is : ${className} and subject is :  ${subject} `,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setQuizData(data);
          console.log("quizData: ", data);
          
        })
        .catch((error) => console.error("Error fetching quiz data:", error));
      }
    
  }, [className]);
  useEffect(() => {
    const fetchClass = async () => {
      const instituteId = sessionStorage.getItem("InstitutionId");
      const classId = sessionStorage.getItem("classId");
      if (instituteId == undefined || classId == undefined) {
        navigate("/");
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/class/${instituteId}/${classId}`
        );
        const data = await response.json();
        setClassName(data.class.name);
        console.log("data of class", data);
         let subjects = [];
         data?.class?.subjects?.map((item) => {
           console.log(item.name);
           subjects.push(item.name + " - " + item.code);
         })

         if (subjects.length > 0) {
          const randomIndex = Math.floor(Math.random() * subjects.length);
          console.log("random index: " , randomIndex);
          
          const randomSubject = subjects[randomIndex]; 
          console.log("Random Subject:", randomSubject);
          setSubject(subject);
        } else {
          console.log("No subjects available.");
          return null; 
        }
        
         


      } catch (error) {
        console.log(error);
      }
    };

    fetchClass();
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData.quiz[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setUserAnswers([
      ...userAnswers,
      {
        question: quizData?.quiz[currentQuestion].question,
        options: quizData?.quiz[currentQuestion].options,
        correctAnswer: quizData.quiz[currentQuestion].correctAnswer,
        studentAnswer: selectedAnswer,
      },
    ]);

    setSelectedAnswer(null);
    setIsAnswered(false);

    if (currentQuestion + 1 < quizData?.quiz.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
      submitQuizResults(); 
    }
  };

  const submitQuizResults = () => {
    const studentId = sessionStorage.getItem('studentId');
    const payload = {
      studentId: studentId , 
      Subject: quizData?.quizSubject,
      Topic: quizData?.quizTopic,
      TotalMarks: quizData?.quiz.length,
      ObtainedMarks: score,
      responses: userAnswers,
    };

    fetch("http://localhost:5000/api/savequiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Quiz submission successful:", data);
      })
      .catch((error) => console.error("Error submitting quiz data:", error));
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="flex">
      <StudentSidebar />
      <div className="h-screen overflow-y-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center p-8 w-full">
        {!quizStarted ? (
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-xl w-full text-center">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
              Quiz Rules
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Welcome to the quiz! Before you start, here are the rules:
            </p>
            <ul className="text-lg text-gray-600 list-disc list-inside mb-6">
              <li>Read each question carefully.</li>
              <li>Choose the best possible answer.</li>
              <li>You can only answer one question at a time.</li>
              <li>
                Once you finish, you'll see your score and correct answers.
              </li>
            </ul>
            <button
              className="p-4 bg-blue-600 text-white font-semibold rounded-lg"
              onClick={startQuiz}
            >
              Start Quiz
            </button>
          </div>
        ) : quizData ? (
          !quizComplete ? (
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-xl w-full">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Question {currentQuestion + 1}/{quizData?.quiz.length}
              </h2>
              <p className="text-xl mb-6 text-gray-700">
                {quizData?.quiz[currentQuestion].question}
              </p>
              <div className="space-y-4">
                {quizData?.quiz[currentQuestion].options.map(
                  (option, index) => (
                    <button
                      key={index}
                      className={`w-full p-4 text-lg font-semibold border rounded-lg transition-all duration-300 ${
                        selectedAnswer === option
                          ? option ===
                            quizData?.quiz[currentQuestion].correctAnswer
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                      onClick={() => handleAnswer(option)}
                      disabled={isAnswered}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
              <div className="mt-6">
                <button
                  className={`w-full p-4 text-lg font-semibold rounded-lg transition-all duration-300 ${
                    !selectedAnswer
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-yellow-600 text-white"
                  }`}
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                >
                  {currentQuestion + 1 === quizData.quiz.length
                    ? "See Results"
                    : "Next Question"}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-2xl mt-40 max-w-xl w-full text-center">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">
                Quiz Complete!
              </h2>
              <p className="text-xl mb-6 text-gray-700">
                You scored {score} out of {quizData?.quiz.length}.
              </p>
              <p className="text-xl mb-6 text-gray-700">
                You earned 💰 {score} points.
              </p>
              
              <h3 className="text-2xl font-semibold mb-4">Your Answers</h3>
              {userAnswers.map((answer, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg mb-2">
                  <p className="text-lg font-semibold">{answer.question}</p>
                  <p
                    className={`text-md ${
                      answer.studentAnswer === answer.correctAnswer
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Your Answer: {answer.studentAnswer}
                  </p>
                  <p className="text-gray-700">
                    Correct Answer: {answer.correctAnswer}
                  </p>
                </div>
              ))}
            </div>
          )
        ) : (
          <p className="text-white">Loading quiz for you ...</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
