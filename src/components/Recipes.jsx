import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '/src/context/AuthContext.jsx';

function Recipes() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const isLoggedIn = !!localStorage.getItem('token'); // Assuming token is stored in localStorage
  const { isAuthenticated } = useAuth();
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000?category_id=2')
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
    <div className="recipes-container">
      <h1>BananaBooBoo : Recipes</h1>
      <p>What are some delicious banana recipes for you to try at home? Ask here! If you know a good one, please share it! We hope you enjoy these as much as we do!</p>
      <br />

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
      {isLoggedIn && isAuthenticated && <Link to='/post' className="edit" state={{ category_id: '2' }}>Post Question</Link>}
    </div>
  );
}

export default Recipes;

