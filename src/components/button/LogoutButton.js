import React from "react";

const LogoutButton = () => {

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "http://localhost:3000/login";
  };


  return (
    <button onClick={handleLogout} className="btn btn-danger" style={{ position: "absolute", top: "170px", right: "160px" }}>
      Logout
    </button>
  );
};

export default LogoutButton;