import React from "react";
import './App.css';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotePage from "./pages/NotePage";
import HomePage from "./pages/HomePage";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/notes" element={<NotesListPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/note/:noteId" element={<NotePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
