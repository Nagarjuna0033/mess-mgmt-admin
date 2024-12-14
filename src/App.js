import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import ComplaintAnalytics from "./pages/ComplaintAnalytics";
import OverAllAnalytics from "./pages/OverAllAnalytics";
import MessWiseAnalytics from "./pages/MessWiseAnalytics";
import FeedBackAnalytics from "./pages/FeedbackAnalytics";
import AllComplaints from "./pages/AllComplaints";
import Profile from "./pages/Profile";
import CurrentIssues from "./pages/CurrentIssues";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/MainGrid";
import Menu from "./pages/ChangeMenu";
import EditMenu from "./pages/EditMenu";
import MessInchargePage from "./pages/EditMessIncharges";
import SignIn from "./pages/SignIn";
import EditProfile from "./pages/EditProfile";
import ChangeMesses from "./pages/ChangeMesses";
import { auth } from "./firebaseUtils/firebaseConfig";
import DetailsModel from "./components/DetailsModal";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [shouldShowDetailsModel, setShouldShowDetailsModel] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const detailsIncomplete = localStorage.getItem("details") === "false";
        setShouldShowDetailsModel(detailsIncomplete);
      } else {
        setShouldShowDetailsModel(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {shouldShowDetailsModel && (
        <DetailsModel
          open={shouldShowDetailsModel}
          onClose={() => setShouldShowDetailsModel(false)}
        />
      )}

      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="/current-issues" element={<CurrentIssues />} />
          <Route path="/all-complaints" element={<AllComplaints />} />

          <Route path="/analytics/overall" element={<OverAllAnalytics />} />
          <Route
            path="/analytics/complaints"
            element={<ComplaintAnalytics />}
          />
          <Route path="/analytics/mess-wise" element={<MessWiseAnalytics />} />
          <Route path="/analytics/feedback" element={<FeedBackAnalytics />} />

          <Route path="/menu" element={<Menu />} />
          <Route path="/menu-change" element={<EditMenu />} />
          <Route path="/editIncharge" element={<MessInchargePage />} />
          <Route path="/change-messes" element={<ChangeMesses />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        <Route path="/Auth/Login" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
