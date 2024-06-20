import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={ Login }/>
        <Route path="/signup" Component={ SignUp } />
        <Route path="/main" Component={ MainPage }/>
        <Route path="/employees" Component={ EmployeeList }/>
        <Route path="/create-employee" Component={CreateEmployee} />
        <Route path="/edit-employee/:id" Component={EditEmployee} />
      </Routes>
    </Router>
  );
}