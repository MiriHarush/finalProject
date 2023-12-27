import React from 'react';
import RoutesNavBar from './components/RoutesNavBar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import UserPersonalArea from './pages/UserPersonalArea'
import CourseManagerDashboard from './pages/CourseManagerDashboard'
import UserInvitations from './components/UserInvitations'
import AddCourse from './pages/AddCourse'
import CourseUserDashboard from './pages/CourseUserDashboard';

function App() {
  return (
    <div>
      <CourseUserDashboard/>
    </div>
  );
}

export default App;

