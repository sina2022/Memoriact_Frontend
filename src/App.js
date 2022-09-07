import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import React, { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Decks from "./pages/Decks";
import StudyDeck from "./pages/StudyDeck";
import CreateDeck from "./pages/CreateDeck";
import TestDeck from "./pages/TestDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Form from "./components/Form/Form";
import LoginForm from "./components/Form/Login";
import UserDecks from "./pages/UserDecks";
import AboutusPage from "./pages/AboutusPage";


// export const UserIdContext = createContext({
//   userId: "",
//   setUserId: () => {},
// });

// export const LoggedInContext = createContext({
//   isLoggedIn: false,
//   setIsLoggedIn: () => {},
// });

function App() {
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('userId')));
  // const [userId, setUserId] = useState("62afa898baa67a8b72b2e0e0");
  // const [userName, setUserName] = useState("Paul");

  const [resultMessage, setResultMessage] = useState()

  return (
    
    <Routes>
      <Route path="/" element={<MainLayout userId={userId} setUserId={setUserId} resultMessage={resultMessage}/>}>
        <Route index element={<Home />} />
        <Route path="flashcards/study/:id" element={<StudyDeck />} />
        <Route path="flashcards/test/:id" element={<TestDeck resultMessage={resultMessage} setResultMessage={setResultMessage}/>} />
        { userId && <Route path="flashcards/customize/" element={<CreateDeck resultMessage={resultMessage} setResultMessage={setResultMessage} />} />}
        { userId && <Route path="flashcards/customize/:id" element={<CreateDeck resultMessage={resultMessage} setResultMessage={setResultMessage} />} />}
        <Route path="dashboard" element={<UserDecks userId={userId} resultMessage={resultMessage} setResultMessage={setResultMessage} />}
        />
        <Route path="flashcards" element={<Decks />} />
        {!userId && <Route path="register" element={<Form />} /> }
        {!userId && <Route path="login" element={<LoginForm setUserId={setUserId} />} />}
        {/* <Route path="dashboard" element={<UserDecks />} /> */}
        <Route path="about" element={<AboutusPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    
  );
}

export default App;
