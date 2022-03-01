import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home";
import YourScores from "./pages/scores";
import YourQuizes from "./pages/your";
import Quiz from "./pages/quiz/quiz";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [quesMap, setquesMap] = useState({});

  useEffect(() => {
    console.log("App start");
    console.log("Loading data...");

    fetch("https://kwizz-backend.herokuapp.com/api/quiz-questions/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const tempQues=[]

        data.forEach((element) => {
          const ques = {
            id: "",
            ques: "",
            options: {
              "A.": "",
              "B.": "",
              "C.": "",
              "D.": "",
            },
          }

          ques.id = element.quesId;
          ques.ques = element.question;
          ques.options["A."] = element.options.optionA;
          ques.options["B."] = element.options.optionB;
          ques.options["C."] = element.options.optionC;
          ques.options["D."] = element.options.optionD;

          quesMap[ques.id]={
            quesId:element.quesId,
            question:element.question,
            options:element.options
          }

          tempQues.push(ques)
        });

        setQuestions([
          ...tempQues
        ])
        setquesMap({
          ...quesMap
        })
      });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/scores" element={<YourScores />} />
        <Route path="/your-quizzes" element={<YourQuizes />} />
        <Route path="/quiz" element={<Quiz questions={questions} quesMap={quesMap} />} />
      </Routes>
    </Router>
  );
}

export default App;

/* 
 {
      id: "1",
      ques: "In which decade was the American Institute of Electrical Engineers (AIEE) founded?",
      options: {
        "A.": "1850s",
        "B.": "1880s",
        "C.": "1930s",
        "D.": "1950s",
      },
    },
    {
      id: "2",
      ques: "What is part of a database that holds only one type of information?",
      options: {
        "A.": "Report",
        "B.": "Field",
        "C.": "Record",
        "D.": "File",
      },
    },
    {
      id: "3",
      ques: "'OS' computer abbreviation usually means ?",
      options: {
        "A.": "Order of Significance",
        "B.": "Open Software",
        "C.": "Operating System",
        "D.": "Optical Sensor",
      },
    },
    {
      id: "4",
      ques: "In which decade was the American Institute of Electrical Engineers (AIEE) founded?",
      options: {
        "A.": "1850s",
        "B.": "1880s",
        "C.": "1930s",
        "D.": "1950s",
      },
    },
    {
      id: "5",
      ques: "What is part of a database that holds only one type of information?",
      options: {
        "A.": "Report",
        "B.": "Field",
        "C.": "Record",
        "D.": "File",
      },
    },
    {
      id: "6",
      ques: "'OS' computer abbreviation usually means ?",
      options: {
        "A.": "Order of Significance",
        "B.": "Open Software",
        "C.": "Operating System",
        "D.": "Optical Sensor",
      },
    },
*/
