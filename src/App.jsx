
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './components/HomePage';
import Dash from './Pages/Dash';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import Transactions from './Pages/Transactions';
import MainPage from './Pages/MainPage';
import { TransactionsProvider } from './components/Context/index';
import { UserProvider } from './components/Context/UserContext';


function App() {
  return (
    <>
      <UserProvider> {/* Wrap with UserProvider first */}
        <TransactionsProvider> {/* Then wrap with TransactionsProvider */}
          <ToastContainer autoClose={1500} />
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/mainPage" element={<MainPage />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/dash" element={<Dash />} />
            </Routes>
          </Router>
        </TransactionsProvider>
      </UserProvider>
    </>
  );
}

export default App;
