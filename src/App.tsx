import React, { useEffect, useState } from "react";
import { FormData } from "./interface.ts";
import { Routes, Route, useNavigate } from "react-router-dom";
import TaskList from "./pages/TaskList.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import UserIcon from "./icons/User.tsx";

const RegistrationForm = React.lazy(
  () => import("./pages/RegistrationForm.tsx")
);
function App() {
  // Initialize isRegistered from localStorage
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsRegistered = localStorage.getItem("isRegistered");
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      const formData = JSON.parse(storedFormData);
      setUserName(formData.fname);
    }
    if (storedIsRegistered) {
      setIsRegistered(true);
      navigate("/");
    }
  }, []);

  const onRegistrationSuccess = (data: FormData) => {
    localStorage.setItem("formData", JSON.stringify(data));
    localStorage.setItem("isRegistered", "true");
    setUserName(data.fname);
    setIsRegistered(true);

    navigate("/");
  };
  const logout = () => {
    localStorage.removeItem("formData");
    localStorage.removeItem("isRegistered");
    setIsRegistered(false);
    navigate("/");
  };
  return (
    <>
      <div className="flex justify-between bg-slate-600  px-6 py-4">
        <div className="text-2xl font-bold text-white">Wise App</div>
        {isRegistered && (
          <div
            className="text-2xl font-bold text-white flex items-center gap-2 cursor-pointer"
            title="logout"
            onClick={logout}
          >
            {" "}
            <UserIcon />
            {userName}
          </div>
        )}
      </div>
      <div className="App flex flex-col  w-full items-center h-full">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isRegistered={isRegistered}>
                <TaskList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RegistrationForm onRegistrationSuccess={onRegistrationSuccess} />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
