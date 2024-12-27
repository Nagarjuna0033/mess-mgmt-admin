import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import Assign from "./pages/Assign";
import { auth } from "./firebaseUtils/firebaseConfig";
// import DetailsModel from "./components/DetailsModal";
// import { onAuthStateChanged } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import SendNotice from "./pages/SendNotice";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { isInDb } from "./firebaseUtils/getRequests";
const provider = new GoogleAuthProvider();

function App() {
  // const [shouldShowDetailsModel, setShouldShowDetailsModel] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const handleUserLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // eslint-disable-next-line no-unused-vars
      const token = credential.accessToken;
      const user = result.user;

      const check = await isInDb(user.uid);
      setUser(user);
      toast.success("Successfully logged in");
      if (check) {
        localStorage.setItem("details", "true");
      } else {
        localStorage.setItem("details", "false");
      }
      localStorage.setItem("id", user.uid);
      navigate("/");
    } catch (error) {
      console.log("error", error.code, "error msg: ", error.message);
    }
  };
  return (
    <div>
      <ToastContainer />
      {/* {shouldShowDetailsModel && (
        <DetailsModel
          open={shouldShowDetailsModel}
          onClose={() => setShouldShowDetailsModel(false)}
        />
      )} */}
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
          <Route path="/Assign" element={<Assign />} />
          <Route path="/SendNotice" element={<SendNotice user={user} />} />
        </Route>
        <Route
          path="/Auth/Login"
          element={<SignIn handleLogin={handleUserLogin} />}
        />
      </Routes>
    </div>
  );
}

export default App;
