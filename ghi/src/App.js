import { useEffect, useState } from 'react';
import DummyList from './Construct.js'
import ErrorNotification from './ErrorNotification';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientSignUpForm from './ClientSignUp.js';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="clientsignup" element={<ClientSignUpForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
