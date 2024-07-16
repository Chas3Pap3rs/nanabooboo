import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditAnswer() {
  const { id } = useParams();
  const [answer, setAnswer] = useState('');
  const [questionId, setQuestionId] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/edit-answer/${id}`)
      .then(res => {
        setAnswer(res.data.answer);
        setQuestionId(res.data.question_id);
        setUserId(res.data.user_id);  // Set the user ID from the fetched data
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/edit-answer', {
      answer_id: id,
      answer: answer,
      question_id: questionId,
      user_id: userId,
    })
      .then(res => {
        console.log(res.data);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="edit-answer-container">
      <h1>Edit Answer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Answer:</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditAnswer;

