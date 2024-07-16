import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '/src/context/AuthContext.jsx';


function Books() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const isLoggedIn = !!localStorage.getItem('token');
  const { isAuthenticated } = useAuth();
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    axios.get('http://localhost:4000?category_id=4')
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
    <div className="books-container">
      <h1>BananaBooBoo : Books</h1>
      <p>What are some good books about bananas? Share your favorite reads here!</p>
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
      {isLoggedIn && isAuthenticated && <Link to='/post' className="edit" state={{ category_id: '4' }}>Post Question</Link>}
    </div>
  );
}

export default Books;





// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// import { useAuth } from '/src/context/AuthContext.jsx';


// function Books() {
//   const [data, setData] = useState([])
//   const isLoggedIn = !!localStorage.getItem('token'); // Assuming token is stored in localStorage
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     const categoryId = [4];
//     axios.get(`http://localhost:4000?category_id=${categoryId}`)
//     .then(res => setData(res.data))
//     .catch(err => console.log(err));
//   }, [])

//   return (
//     <div className="books-container">

//       <h1>BananaBooBoo : Books</h1>

//       <p>
//         What are some good books about bananas? Share your favorite reads here!
//       </p>

//       <div>
//         <table>
//           <thead>
//             <tr>
//               <th>Question ID</th>
//               <th>Category ID</th>
//               <th>Title</th>
//               <th>Question</th>
//               <th>User ID</th>
//             </tr>
//           </thead>
//           <tbody>
//             {
//               data.map((question)=> (
//                   <tr key={question.question_id}>
//                       <td>{question.question_id}</td>
//                       <td>{question.category_id}</td>
//                       <td>{question.question_title}</td>
//                       <td>{question.question}</td>
//                       <td>{question.user_id}</td>
//                       <td>
//                         {isLoggedIn && isAuthenticated && <Link to={`/edit/${question.question_id}`} className="edit">Edit</Link>} <br />
//                       </td>
//                   </tr>
//               ))
//             }
//           </tbody>
//         </table>
//       </div>
//       <Link to='/post' className="edit" state={{ category_id: '4' }}>Post</Link>
//     </div>
//   )
// }

// export default Books
