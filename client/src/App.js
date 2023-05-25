import React from 'react';
import Auth from './utils/Auth';
import TaskList from './components/TaskList';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { Navigate, Route, Routes } from 'react-router-dom';
import Protected from './router/Protected';
import TaskForm from './components/TaskForm';
import NotFound from './utils/NotFound';
import NavBar from './components/NavBar';
import Loader from './components/Loader';


function App() {

  const isLoggedIn = Auth.useAuthentication();

  if (isLoggedIn === null) {
    return (
      <Loader/>
    )
  }

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        {
          !isLoggedIn ? <Route path='/' element={<LoginForm />} /> : <Route path='/' element={<Navigate to="/tasks" replace />} />
        }
        {
          !isLoggedIn ? <Route path='/login' element={<LoginForm />} /> : <Route path='/login' element={<Navigate to="/tasks" replace />} />
        }
        <Route path='/signup' element={<SignupForm />} />
        <Route path="/tasks" element={<Protected isLoggedIn={isLoggedIn}> <TaskList /> </Protected>} />
        <Route path="/tasks/form" element={<Protected isLoggedIn={isLoggedIn}> <TaskForm /> </Protected>} />
        <Route path="/*" element={<NotFound />} />

      </Routes>
    </div>
  );
}

export default App;
