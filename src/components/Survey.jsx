import { useState } from "react";
import AnswersList from "./AnswersList";

function Survey() {
  const [open] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    colour: "",
    timeSpent: [],
    review: "",
    username: "",
    email: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    if (editingIndex !== null) {
      const updatedAnswers = [...answers];
      updatedAnswers[editingIndex] = { ...formData };
      setAnswers(updatedAnswers);
      setEditingIndex(null);
    } else {
      setAnswers([...answers, { ...formData }]);
    }
    
    setFormData({
      colour: "",
      timeSpent: [],
      review: "",
      username: "",
      email: ""
    });
  };

  const handleEdit = (answerItem, index) => {
    setFormData(answerItem);
    setEditingIndex(index);
  };

  const handleTimeSpentChange = (value) => {
    const updatedTimeSpent = formData.timeSpent.includes(value)
      ? formData.timeSpent.filter(item => item !== value)
      : [...formData.timeSpent, value];
    setFormData({ ...formData, timeSpent: updatedTimeSpent });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        <AnswersList 
          answersList={answers} 
          onEdit={handleEdit}
        />
      </section>
      <section className="survey__form">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Tell us what you think about your rubber duck!</h2>
          
          <div className="form__group radio">
            <h3>How do you rate your rubber duck colour?</h3>
            <ul>
              {[1, 2, 3, 4].map((num) => (
                <li key={num}>
                  <input 
                    id={`color-${num}`}
                    type="radio"
                    name="colour"
                    value={num}
                    checked={formData.colour === num.toString()}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={`color-${num}`}>{num}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="form__group">
            <h3>How do you like to spend time with your rubber duck</h3>
            <ul>
              {[
                { value: "swimming", label: "Swimming" },
                { value: "bathing", label: "Bathing" },
                { value: "chatting", label: "Chatting" },
                { value: "noTime", label: "I don't like to spend time with it" }
              ].map(({ value, label }) => (
                <li key={value}>
                  <label>
                    <input
                      type="checkbox"
                      name="timeSpent"
                      value={value}
                      checked={formData.timeSpent.includes(value)}
                      onChange={() => handleTimeSpentChange(value)}
                    />
                    {label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <label>
            What else have you got to say about your rubber duck?
            <textarea
              name="review"
              cols="30"
              rows="10"
              value={formData.review}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Put your name here (if you feel like it):
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Leave us your email pretty please??
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>

          <input className="form__submit" type="submit" value="Submit Survey!" />
        </form>
      </section>
    </main>
  );
}

export default Survey;
