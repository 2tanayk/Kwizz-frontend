import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "./index.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { Oval } from "react-loader-spinner";

import Dialog from "../../components/dialog/Dialog.js";

const Quiz = ({ questions, quesMap }) => {
  const [isError, setisError] = useState(false);
  const [isUserSubmitting, setisUserSubmitting] = useState(false);
  const [isSpinnerVisible, setisSpinnerVisible] = useState(false);
  const [isScoreOut, setisScoreOut] = useState(false);
  const [hasUserPassed, sethasUserPassed] = useState(true);
  const [percentageScore, setpercentageScore] = useState("00.00%");
  const [areAnswersOut, setareAnswersOut] = useState(false);

  const answers = useRef({});

  const ansMap = useRef({});

  useEffect(() => {
    console.log("run useEffect", questions.length);
    if (questions.length === 0) {
      setisSpinnerVisible(true);
    } else {
      console.log("questions", questions);
      console.log("quesMap", quesMap);
      setisSpinnerVisible(false);
    }
  }, [questions.length]);

  console.log("answers ref", answers.current);

  function fetchResult() {
    console.log("fetching your score...");
    fetch("http://127.0.0.1:8000/api/score/")
      .then((response) => response.json())
      .then((data) => {
        console.log("score data", data);
        setpercentageScore(data.percentage);
        setisScoreOut(true);
        if (data.result === "Fail") {
          sethasUserPassed(false);
        } else {
          sethasUserPassed(true);
        }
        window.scrollTo(0,0)
      });
  }

  function fetchAnswers() {
    console.log("fetching answers...");

    fetch("http://127.0.0.1:8000/api/answers/")
      .then((response) => response.json())
      .then((data) => {
        ansMap.current = {};
        console.log("ques with answers", data);
        data.forEach((element) => {
          ansMap.current[`${element.quesId}`] = element.answer.answer;
        });

        console.log("ans lookup", ansMap.current);
        setareAnswersOut(true);
      });
  }

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const onChoiceChanged = (e) => {
    // console.log("name:", e.target.name, "value:", e.target.value);
    answers.current[e.target.name] = e.target.value;
    // console.log(answers.current);
  };

  function onQuizSubmit(e) {
    e.preventDefault();
    console.log("submitted answers", answers.current);
    if (Object.keys(answers.current).length < questions.length) {
      setisError(true);
      return;
    }
    setisError(false);
    setisUserSubmitting(true);
  }

  function onQuizSubmitConfirm() {
    setisUserSubmitting(false);
    console.log("quiz submitted");
    console.log("Submitted answers", answers.current);

    const csrftoken = getCookie("csrftoken");
    var postDataArr = [];

    for (const key in answers.current) {
      if (Object.hasOwnProperty.call(answers.current, key)) {
        const element = answers.current[key];
        const ques = quesMap[key];
        var postData = {
          question: ques,
          submittedAnswer: element,
        };
        postDataArr.push(postData);
      }
    }

    console.log("post data", postDataArr);

    fetch("http://127.0.0.1:8000/api/submit-answers/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(postDataArr),
    })
      .then((response) => {
        console.log(response);
        fetchResult();
        fetchAnswers();
      })
      .catch((error) => console.log(error));
  }

  function onQuizSubmitCancel() {
    setisUserSubmitting(false);
    console.log("cancelled!");
  }

  function findResultClass(quesId, option) {
    console.log(typeof quesId, typeof option);
    console.log("ans map", ansMap.current);
    console.log(quesId, `is submission:${ansMap.current[quesId]}===${option}`);
    if (ansMap.current[quesId] === option) {
      return "correct";
    } else if (ansMap.current[quesId] !== option && answers.current[quesId]===option) {
      return "incorrect";
    } else {
      return "";
    }
  }

  function findResultIconClass(quesId, option) {
    console.log("findResultIcon");
    if (ansMap.current[quesId] === option) {
      return "fa-solid fa-check";
    } else if (ansMap.current[quesId] !== option && answers.current[quesId]===option) {
      return "fa-solid fa-xmark";
    } else {
      return "hide";
    }
  }

  function findResultIconStyle(quesId, option){
    console.log("findResultIconStyle")

    if (ansMap.current[quesId] === option) {
      return checkStyle;
    } else if (ansMap.current[quesId] !== option && answers.current[quesId]===option) {
      return crossStyle;
    }else{
      return {
        display:"none"
      }
    }
  }

  return (
    <div style={container}>
      {console.log(isSpinnerVisible)}
      {isScoreOut && (
        <div style={resultContainer} className={hasUserPassed ? "bg-result-pass" : "bg-result-fail"}>
        <div
          style={resultMessageContainer}>
          {hasUserPassed ? (
            <h2>Congratulations! You have made it through</h2>
          ) : (
            <h2>Oops! You didn't make it through</h2>
          )}
          <p>You have scored {percentageScore}, you needed 50% to pass</p>
        </div>
        <div className={hasUserPassed? "vr-pass":"vr-fail"}></div>
        <a href="/" style={homeBtn}>Take More Quizzes</a>
        </div>
      )}
      {isSpinnerVisible && (
        <Oval color="#3980ef" secondaryColor="#71a4f4" height={80} width={80} />
      )}
      {!isSpinnerVisible && (
        <form onSubmit={onQuizSubmit}>
          {questions.map((question, index) => (
            <div style={questionContainer} key={index}>
              <div style={questionNoContainer}>
                <span style={{ fontSize: "20px" }}>{`Q${index + 1}.`}</span>
              </div>
              <div>
                <QuestionSpan>{question.ques}</QuestionSpan>

                <div
                  style={choiceContainer}
                  className={
                    areAnswersOut ? findResultClass(question.id, "optionA") : ""
                  }
                >
                  <span>A.</span>
                  <RadioInput
                    id={`${question.id}`}
                    name={`${question.id}`}
                    value={"optionA"}
                    onChange={onChoiceChanged}
                  />
                  <McqLabel htmlFor={`${question.id}`}>
                    {question.options["A."]}
                    {areAnswersOut && (
                      <i
                        className={findResultIconClass(question.id, "optionA")}
                        style={findResultIconStyle(question.id,"optionA")}
                      ></i>
                    )}
                  </McqLabel>
                </div>

                <div
                  style={choiceContainer}
                  className={
                    areAnswersOut ? findResultClass(question.id, "optionB") : ""
                  }
                >
                  <span>B.</span>
                  <RadioInput
                    id={`${question.id}`}
                    name={`${question.id}`}
                    value={"optionB"}
                    onChange={onChoiceChanged}
                  />
                  <McqLabel htmlFor={`${question.id}`}>
                    {question.options["B."]}
                    {areAnswersOut && (
                      <i
                        className={findResultIconClass(question.id, "optionB")}
                        style={findResultIconStyle(question.id,"optionB")}
                      ></i>
                    )}
                  </McqLabel>
                </div>

                <div
                  style={choiceContainer}
                  className={
                    areAnswersOut ? findResultClass(question.id, "optionC") : ""
                  }
                >
                  <span>C.</span>
                  <RadioInput
                    id={`${question.id}`}
                    name={`${question.id}`}
                    value={"optionC"}
                    onChange={onChoiceChanged}
                  />
                  <McqLabel htmlFor={`${question.id}`}>
                    {question.options["C."]}
                    {areAnswersOut && (
                      <i
                        className={findResultIconClass(question.id, "optionC")}
                        style={findResultIconStyle(question.id,"optionC")}
                      ></i>
                    )}
                  </McqLabel>
                </div>

                <div
                  style={choiceContainer}
                  className={
                    areAnswersOut ? findResultClass(question.id, "optionD") : ""
                  }
                >
                  <span>D.</span>
                  <RadioInput
                    id={`${question.id}`}
                    name={`${question.id}`}
                    value={"optionD"}
                    onChange={onChoiceChanged}
                  />
                  <McqLabel htmlFor={`${question.id}`}>
                    {question.options["D."]}
                    {areAnswersOut && (
                      <i
                        className={findResultIconClass(question.id, "optionD")}
                        style={findResultIconStyle(question.id,"optionD")}
                      ></i>
                    )}
                  </McqLabel>
                </div>
              </div>
            </div>
          ))}
          {isError && (
            <div style={errorContainer}>
              Please answer all the MCQs(Multiple Choice Questions)
            </div>
          )}
          <input type="submit" style={submitBtn}></input>
        </form>
      )}
      {isUserSubmitting && (
        <Dialog
          text="Do you want to submit the quiz?"
          leftBtnText="Cancel"
          rightBtnText="Ok"
          onLeftBtnClick={onQuizSubmitCancel}
          onRightBtnClick={onQuizSubmitConfirm}
        />
      )}
    </div>
  );
};

const RadioInput = styled.input.attrs((props) => ({
  type: "radio",
}))``;

const McqLabel = styled.label`
  width: 50vw;
  position: relative;
`;

const QuestionSpan = styled.span`
  width: 50vw;
  display: block;
  margin-bottom: 10px;
  font-size: 20px;
`;

const container = {
  marginTop: "80px",
  height: "100%",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
};

const questionNoContainer = {
  marginRight: "5px",
};

const choiceContainer = {
  width: "45vw",
  marginBottom: "0px",
  margin: "5px 0px 5px 0px",
};

const questionContainer = {
  width: "50vw",
  display: "flex",
  justifyContent: "center",
  padding: "10px",
};

const checkStyle = {
  color: "#007500",
  position: "absolute",
  left: "35vw",
  fontSize: "20px",
};

const crossStyle = {
  color: "#FF0000",
  position: "absolute",
  left: "35vw",
  fontSize: "20px",
};

const submitBtn = {
  margin: "10px",
  padding: "10px",
  background: "#0f52ba",
  color: "#ffffff",
  border: "0 none",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "15px",
};

const errorContainer = {
  margin: "10px",
  marginLeft: "0px",
  padding: "10px",
  color: "#FF0000",
  width: "50vw",
};

const resultContainer = {
  display: "flex",
  width: "60%",
  borderStyle: "double",
  alignItems: "center",
  justifyContent: "space-evenly",
  borderWidth: "2px",
  borderRadius: "15px",
};

const resultMessageContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "70%",
};

const homeBtn = {
  margin: "10px",
  padding: "10px",
  background: "#0f52ba",
  color: "#ffffff",
  border: "0 none",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "15px",
  textDecoration:"none",
  textAlign:"center",
  height:"50%"
};

export default Quiz;

/*
[
    {
        "question": {
            "quesId": "TECH_1_10",
            "question": "What does the abbreviation HTTP stand for?",
            "options": {
                "optionA": "Hypertext Transfer Protocol",
                "optionB": "High Task Termination Procedure",
                "optionC": "Harvard Teletext Proof",
                "optionD": "Hindustan Times Technical Proffesionals"
            }
        },
        "submittedAnswer": "optionA"
    }
]
*/
