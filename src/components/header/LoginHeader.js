import React, { useState } from "react";
import styles from "./header.module.css";
import { auth } from "../firebase";

function LoginHeader() {
  const redirectMain = () => {
    window.location.href = "/";
  };

  const redirectProfile = () => {
    window.location.href = "/profile";
  };
  const handleLogout = async () => {
    try {
      await auth.signOut();
      redirectMain();
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
      <div className={styles.header}>
        <div className={styles.leftDiv} onClick={redirectMain}>
          GameON </div>
        <div className={styles.rightDiv}>
          <p onClick={redirectMain}> Home </p>
          <p> Progress </p>
          <p onClick={redirectProfile}> Profile </p>
          <p onClick={handleLogout}> Logout </p>
        </div>
      </div>
  );
}

export default LoginHeader;
