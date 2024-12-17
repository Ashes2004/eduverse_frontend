import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import TeacherDashboard from "./TeacherDashboard";
import TeacherSidebar from "../../components/TeacherSidebar";

const NotesMaker = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); // New state to control loading messages
  const [notes, setNotes] = useState(null);

  // Array of loading messages
  const loadingMessages = [
    "Generating the best content for you...",
    "Fetching resources for your notes...",
    "Please wait while we prepare everything...",
    "Almost there, generating your notes..."
  ];

  // Set up the loading message change every 1 second, but only after the user clicks the button
  useEffect(() => {
    let messageIndex = 0;
    const interval = isGenerating ? setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setMessage(loadingMessages[messageIndex]);
    }, 1000) : null;

    return () => clearInterval(interval); // Cleanup on unmount or when `isGenerating` changes
  }, [isGenerating]);

  function formatText(rawText) {
    let formattedText = rawText.replace(/\n/g, "                               ");
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, " ");
    return formattedText;
  }

  const handleGenerate = async () => {
    if (!message) return;

    setIsLoading(true);
    setIsGenerating(true); // Start showing the loading messages
    setNotes(null); // Clear previous notes

    try {
      const response = await fetch("http://localhost:5000/api/notes/notesmaker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        alert("Failed to generate notes");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while generating notes");
    } finally {
      setIsLoading(false);
      setIsGenerating(false); // Stop the loading messages once the notes are generated
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    let yPosition = 10; // Initial Y position
    
    // Add Heading
    if (notes.heading) {
      doc.setFontSize(16);
      doc.text(notes.heading, 10, yPosition);
      yPosition += 10;
    }
  
    // Add Content with Word Wrapping
    if (notes.content) {
      doc.setFontSize(12);
      const contentLines = doc.splitTextToSize(notes.content, 180); // Wrap text at 180mm
      doc.text(contentLines, 10, yPosition);
      yPosition += contentLines.length * 7; // Adjust Y position dynamically
    }
  
    // Add Questions and Answers
    if (notes.questions) {
      const questions = JSON.parse(notes.questions);
      doc.setFontSize(14);
      doc.text("Questions & Answers", 10, yPosition);
      yPosition += 10;
  
      doc.setFontSize(12);
      questions.forEach((item, index) => {
        if (yPosition > 280) { 
          doc.addPage(); // Add new page if content exceeds current page
          yPosition = 10; // Reset Y position
        }
        
        // Question
        const questionLines = doc.splitTextToSize(`Q${index + 1}: ${item.question}`, 180);
        doc.text(questionLines, 10, yPosition);
        yPosition += questionLines.length * 7;
  
        // Answer
        const answerLines = doc.splitTextToSize(`Ans: ${item.answer}`, 180);
        doc.text(answerLines, 10, yPosition);
        yPosition += answerLines.length * 7 + 5; // Add extra spacing
      });
    }
  
    // Save PDF
    doc.save("generated-notes.pdf");
  };
  

  return (
    <div className="flex">
         <TeacherSidebar/>
    <div className="flex justify-center items-center h-screen w-full overflow-y-auto bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Generate Notes</h1>

        <div className="mb-4">
          <label htmlFor="message" className="block text-lg font-medium text-gray-700">
            Enter Topic
          </label>
          <input
            id="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="e.g., Thermodynamics"
          />
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-blue-500 text-white py-3 rounded-md mt-4 hover:bg-blue-600"
        >
          {isLoading ? "Generating..." : "Generate Notes"}
        </button>

        {isGenerating && (
          <div className="mt-4 text-center text-gray-600">
            <span className="block animate-pulse text-lg font-medium">{message}</span>
          </div>
        )}

        {notes && (
          <div className="mt-[550px]">
            <h2 className="text-2xl font-semibold">{notes.heading}</h2>
            <p className="mt-4 text-gray-800">{formatText(notes.content)}</p>

            <div className="mt-6">
              <h3 className="text-xl font-medium">Questions & Answers</h3>
              <ul className="mt-2 space-y-4">
                {notes.questions &&
                  JSON.parse(notes.questions).map((item, index) => (
                    <li key={index} className="border-b border-gray-200 pb-4">
                      <p className="font-medium text-gray-900">{item.question}</p>
                      <p className="mt-2 text-gray-700">{item.answer}</p>
                    </li>
                  ))}
              </ul>
            </div>

            <button
              onClick={downloadPDF}
              className="w-full bg-green-500 text-white py-3 rounded-md mt-6 hover:bg-green-600"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default NotesMaker;
