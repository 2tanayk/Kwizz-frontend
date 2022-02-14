import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home";
import YourScores from "./pages/scores";
import YourQuizes from "./pages/your";
import Quiz from "./pages/quiz/quiz";
import "./App.css";

function App() {
  var questions = [
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
  ];

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/scores" element={<YourScores />} />
        <Route path="/your-quizes" element={<YourQuizes />} />
        <Route path="/quiz" element={<Quiz questions={questions} />} />
      </Routes>
    </Router>
  );
}

export default App;
