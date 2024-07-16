import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext';


import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Post from './components/Post'
import Edit from './components/Edit'
import DeletePost from './components/DeletePost'
import Answer from './components/Answer'
import EditAnswer from './components/EditAnswer';
import DeleteAnswer from './components/DeleteAnswer';
import Conversions from './components/Conversions'
import Recipes from './components/Recipes'
import FunFacts from './components/FunFacts'
import Books from './components/Books'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'


import './App.css'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {


  return (
    <>
      <AuthProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <div className="app-container">
            <Header />
          <div className="main-content-wrapper">
            <Sidebar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/conversions" element={<ProtectedRoute><Conversions /></ProtectedRoute>}></Route>
            <Route path="/recipes" element={<ProtectedRoute><Recipes /></ProtectedRoute>}></Route>
            <Route path="/funfacts" element={<ProtectedRoute><FunFacts /></ProtectedRoute>}></Route>
            <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>}></Route>
            <Route path="/post" element={<ProtectedRoute><Post /></ProtectedRoute>}></Route>
            <Route path="/edit/:id" element={<ProtectedRoute><Edit /></ProtectedRoute>}></Route>
            <Route path="/delete-question/:id" element={<ProtectedRoute><DeletePost /></ProtectedRoute>} />
            <Route path="/answer/:question_id" element={<ProtectedRoute><Answer /></ProtectedRoute>}></Route>
            <Route path="/edit-answer/:id" element={<ProtectedRoute><EditAnswer /></ProtectedRoute>} />
            <Route path="/delete-answer/:id" element={<ProtectedRoute><DeleteAnswer /></ProtectedRoute>} />
            </Routes>
          </div>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
