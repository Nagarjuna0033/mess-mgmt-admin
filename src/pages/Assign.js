import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import React from "react";
import Search from "../components/Search";
import Button from "../components/Button";
import User from "../components/User";
import { getUserInfoByEmail } from "../firebaseUtils/getRequests";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

export default function Assign() {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleButtonClick = async () => {
    setIsLoading(true);
    setSearchValue("");
    try {
      const user = await getUserInfoByEmail(searchValue);
      if (!user) {
        setUser(null);
        toast.error("No user found with this email");
      } else {
        setUser(user);
      }
    } catch (error) {
      setUser(null);
    }
    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <Stack sx={{ width: "100%" }} spacing={3}>
        <Typography variant="h5" mb={3}>
          Search for Email and assign a Role to students
        </Typography>
        <Stack direction="row" spacing={3}>
          <Search
            value={searchValue}
            onChange={handleSearchChange}
            type="email"
          />
          <Button
            isLoading={isLoading}
            onClick={handleButtonClick}
            text="Search User"
          />
        </Stack>
        {user && <User user={user} setUser={setUser} />}
      </Stack>
    </>
  );
}
