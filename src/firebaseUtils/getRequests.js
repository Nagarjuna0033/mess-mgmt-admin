import {
  getDocs,
  collection,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
const getIssues = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "issues"));
    const issues = [];

    querySnapshot.forEach((doc) => {
      issues.push({ id: doc.id, ...doc.data() });
    });
    return issues;
  } catch (error) {
    console.error("Error fetching complaints data:", error);
  }
};

const getComplaints = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "complaints"));
    const complaints = [];

    querySnapshot.forEach((doc) => {
      complaints.push({ id: doc.id, ...doc.data() });
    });
    return complaints;
  } catch (error) {
    console.error("Error fetching complaints data:", error);
  }
};

const getComplaintCat = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "complaintCategory"));
    const complaintsCat = [];

    querySnapshot.forEach((doc) => {
      complaintsCat.push({ id: doc.id, ...doc.data() });
    });
    console.log("obj", complaintsCat);
    return complaintsCat;
  } catch (error) {
    console.error("Error fetching complaints category data:", error);
  }
};

const isInDb = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  }

  return false;
};

const getUserInfo = async (uid) => {
  if (!uid) {
    console.log("UID is required.");
    return;
  }

  try {
    const userDoc = doc(db, "users", uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("User not found with the given UID");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

const getUserInfoByEmail = async (email) => {
  if (!email) {
    console.log("Email is required.");
    return;
  }

  try {
    const usersCollection = collection(db, "users");

    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return userData;
    } else {
      console.log("No user found with the given email");
    }
  } catch (error) {
    console.error("Error fetching user details by email:", error);
  }
};

export {
  getIssues,
  getComplaintCat,
  getComplaints,
  isInDb,
  getUserInfo,
  getUserInfoByEmail,
};
