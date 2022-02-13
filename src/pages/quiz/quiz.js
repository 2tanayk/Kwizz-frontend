import React from "react";
import styled from "styled-components";
import "./index.css";
import "@fortawesome/fontawesome-free/js/all.js";

const Quiz = ({ questions }) => {
  const answers={}
  const onChoiceChanged = (e) => {
    console.log("name:",e.target.name,"value:", e.target.value);
    answers[e.target.name]=e.target.value;
    console.log(answers);
  };

  return (
    <div style={container}>
      <form>
        {questions.map((question, index) => (
          <div style={questionContainer} key={index}>
            <div style={questionNoContainer}>
              <span style={{ fontSize: "20px" }}>{`Q${question.id}.`}</span>
            </div>
            <div>
              <QuestionSpan>{question.ques}</QuestionSpan>

              <div style={choiceContainer} className="correct">
                <span>A.</span>
                <RadioInput
                  id={`question${question.id}`}
                  name={`question${question.id}`}
                  value={`A:${question.options["A."]}`}
                  onChange={onChoiceChanged}
                />
                <McqLabel for={`question${question.id}`}>
                  {question.options["A."]}
                  <i class="fa-solid fa-check" style={checkStyle}></i>
                </McqLabel>
              </div>

              <div style={choiceContainer}>
                <span>B.</span>
                <RadioInput
                  id={`question${question.id}`}
                  name={`question${question.id}`}
                  value={`B:${question.options["B."]}`}
                  onChange={onChoiceChanged}
                />
                <McqLabel for={`question${question.id}`}>
                  {question.options["B."]}
                </McqLabel>
              </div>

              <div style={choiceContainer} className="incorrect">
                <span>C.</span>
                <RadioInput
                  id={`question${question.id}`}
                  name={`question${question.id}`}
                  value={`C:${question.options["C."]}`}
                  onChange={onChoiceChanged}
                />
                <McqLabel for={`question${question.id}`}>
                  {question.options["C."]}
                  <i class="fa-solid fa-xmark" style={crossStyle}></i>
                </McqLabel>
              </div>

              <div style={choiceContainer}>
                <span>D.</span>
                <RadioInput
                  id={`question${question.id}`}
                  name={`question${question.id}`}
                  value={`D:${question.options["D."]}`}
                  onChange={onChoiceChanged}
                />
                <McqLabel for={`question${question.id}`}>
                  {question.options["D."]}
                </McqLabel>
              </div>
            </div>
          </div>
        ))}
        <input type="submit" style={submitBtn}></input>
      </form>
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
  justifyContent: "center",
  display: "flex",
};

const questionNoContainer = {
  marginRight: "5px",
};

const choiceContainer = {
  width: "50vw",
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

const submitBtn={
  margin:"10px",
  padding:"10px", 
  background:"#0f52ba", 
  color:"#ffffff",
  border:"0 none",
  cursor:"pointer",
  borderRadius: "5px",
  fontSize:'15px',
}

export default Quiz;
