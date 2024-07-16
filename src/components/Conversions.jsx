import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '/src/context/AuthContext.jsx';

const bananaRates = {
  weight: {
    ounces: 4,
    pounds: 0.25,
    "us-ton": 0.00022,
    milligram: 113398,
    gram: 113.398,
    kilogram: 0.113398,
    "metric-ton": 0.000113398,
  },
  distance: {
    inches: 7,
    cm: 17.78,
    feet: 1.778,
    meters: 0.58,
    yards: 0.594,
    kilometers: 0.00058,
    miles: 0.00035,
  },
};

function Conversions() {
  const [bananaValue, setBananaValue] = useState({}); // Set default banana quantity to 0
  const [weightValues, setWeightValues] = useState({});
  const [distanceValues, setDistanceValues] = useState({});

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [data, setData] = useState([])

  const isLoggedIn = !!localStorage.getItem('token');
  const { isAuthenticated } = useAuth();
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const newWeightValues = {};
    const newDistanceValues = {};
    Object.keys(bananaRates.weight).forEach(unit => {
      newWeightValues[unit] = bananaValue * bananaRates.weight[unit];
    });
    Object.keys(bananaRates.distance).forEach(unit => {
      newDistanceValues[unit] = bananaValue * bananaRates.distance[unit];
    });
    setWeightValues(newWeightValues);
    setDistanceValues(newDistanceValues);
  }, [bananaValue]);

  const handleUnitChange = (unit, value, type) => {
    const baseValue = value / bananaRates[type][unit];
    setBananaValue(baseValue);
  };

  const handleBananaChange = (e) => {
    const value = e.target.value;
    setBananaValue(value === '' ? 0 : Number(value));
  };

  useEffect(() => {
    axios.get('http://localhost:4000?category_id=1')
      .then(res => {
        setQuestions(res.data);
        res.data.forEach(question => {
          fetchAnswers(question.question_id);
        });
      })
      .catch(err => console.log(err));
  }, []);

  const fetchAnswers = (questionId) => {
    axios.get(`http://localhost:4000/answers/${questionId}`)
      .then(res => {
        console.log(`Fetched answers for question ${questionId}: `, res.data); // Debug log
        setAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: res.data }));
      })
      .catch(err => console.log(err));
  };





  return (
    <div className="converter-container">
      <h1>BananaBooBoo : Conversions</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label>Banana(s):</label>
        <input
          type="number"
          value={bananaValue || ''} // To avoid leading 0
          placeholder="Banana(s)"
          onChange={handleBananaChange}
        />
      </div>

      <div className="conversions-container">
        <div className="unit-container">
          <h2>Weight</h2>
          {Object.keys(weightValues).map((unit) => (
            <div key={unit} className="unit-row">
              <label className="unit-label">{unit}:</label>
              <input
                type="number"
                value={weightValues[unit] || ''} // To avoid leading 0
                placeholder={unit}
                onChange={(e) => handleUnitChange(unit, Number(e.target.value), 'weight')}
              />
            </div>
          ))}
        </div>

        <div className="unit-container">
          <h2>Distance</h2>
          {Object.keys(distanceValues).map((unit) => (
            <div key={unit} className="unit-row">
              <label className="unit-label">{unit}:</label>
              <input
                type="number"
                value={distanceValues[unit] || ''} // To avoid leading 0
                placeholder={unit}
                onChange={(e) => handleUnitChange(unit, Number(e.target.value), 'distance')}
              />
            </div>
          ))}
        </div>
      </div>

      <div>

        <table>

          <thead>
            <tr>
              <th>Question</th>
              <th>Question Actions</th>
              <th>Answers</th>
              <th>Answer Actions</th>
            </tr>
          </thead>

          <tbody>
            {questions.map((question) => (
              <tr key={question.question_id}>
                <td>
                  <h4>{question.question_title},</h4>
                  {question.question}
                </td>

                <td>
                  {isLoggedIn && userId === String(question.user_id) && (
                    <>
                      <Link to={`/edit/${question.question_id}`} className="edit">Edit</Link>
                      <Link to={`/delete-question/${question.question_id}`} className="edit">Delete</Link>
                    </>
                  )}
                  {isLoggedIn && <Link to={`/answer/${question.question_id}`} className="edit">Answer</Link>}
                </td>

                <td>
                    <ul>
                      {answers[question.question_id] &&
                        answers[question.question_id].map(answer => (
                          <li key={answer.answer_id}>{answer.answer}</li>
                        ))}
                    </ul>
                </td>

                <td>
                    {answers[question.question_id] && answers[question.question_id].map(answer => (
                        <div key={answer.answer_id}>
                          {isLoggedIn && userId === String(answer.user_id) && (
                            <>
                              <Link to={`/edit-answer/${answer.answer_id}`} className="edit">Edit</Link>
                              <Link to={`/delete-answer/${answer.answer_id}`} className="edit">Delete</Link>
                            </>
                          )}
                        </div>
                    ))}
                  </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
      {isLoggedIn && isAuthenticated && <Link to='/post' className="edit" state={{ category_id: '1' }}>Post Question</Link>}
    </div>
  )
}

export default Conversions
