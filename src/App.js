import Dashboard from "./pages/Dashboard";
import ComplaintAnalytics from "./pages/ComplaintAnalytics";
import OverAllAnalytics from "./pages/OverAllAnalytics"
import MessWiseAnalytics from "./pages/MessWiseAnalytics"
import FeedBackAnalytics from "./pages/FeedbackAnalytics"
import AllComplaints from "./pages/AllComplaints"
import Profile from "./pages/Profile";
import CurrentIssues from "./pages/CurrentIssues";
import {Routes, Route } from "react-router-dom";
import Home  from "./pages/MainGrid"
import Menu from "./pages/ChangeMenu";
import EditMenu from "./pages/EditMenu";
import MessInchargePage from "./pages/EditMessIncharges"
import EditProfile from "./pages/EditProfile";
import ChangeMesses from "./pages/ChangeMesses";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />}>

          <Route path="/" element={<Home />} />
          <Route path="/current-issues" element={<CurrentIssues />} />
          <Route path="/all-complaints" element={<AllComplaints />} />

          <Route path="/analytics/overall" element={<OverAllAnalytics />} />
          <Route path="/analytics/complaints" element={<ComplaintAnalytics />} />
          <Route path="/analytics/mess-wise" element={<MessWiseAnalytics />} />
          <Route path="/analytics/feedback" element={<FeedBackAnalytics />} />
          
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu-change" element={<EditMenu />} />
          <Route path="/editIncharge" element={<MessInchargePage />} />
          <Route path="/change-messes" element={<ChangeMesses/>} />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile/>} />
          
        </Route>

      </Routes>
    </div>
  );
}

export default App;
