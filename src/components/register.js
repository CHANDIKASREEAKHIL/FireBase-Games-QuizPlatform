import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./mainPage.css";
import DynamicForm from "./DynamicForm/dynamicForm";
import Header from "./header/Header";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo:""
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  const formProps = {
    inputKeys: ["firstName", "lastName", "email", "password", "dob"],
    labels: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      password: "Password",
      dob: "Date of Birth",
    },
    inputTypes: {
      firstName: "text",
      lastName: "text",
      email: "text",
      password: "password",
      dob: "date",

    },
    values: {
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
    },
    columns: 1,
    inputWidth: 100,
    onChangeHandlers: {
      firstName: (value) => setFname(value),
      lastName: (value) => setLname(value),
      email: (value) => setEmail(value),
      password: (value) => setPassword(value),
    },
    placeholders: {
      firstName: "Enter First Name",
      lastName: "Enter Last Name",
      email: "Enter email",
      password: "Enter password",
    },
    validationRules: {}, 
  };

  return (
    <div className="mainDiv">
      <Header />
      <div className="innerGrid">
      <div className="leftSection" style={{gridTemplateRows:"min-content", marginTop:"0vh"}}>
        <div style={{border: "2px solid #633172", padding:"5vh", width:"80%"}}>
      <form onSubmit={handleRegister}>
        <h3> Register </h3>
      <DynamicForm {...formProps}/>
      <div style={{display:"flex", justifyContent:"space-between", margin:"3vh 2vw 0vh 2vw"}}>
      <p className="forgot-password text-right">
        Already registered? Then <a style={{color:"white", fontWeight:"900", textDecoration: "none"}} href="/login">Login</a>
      </p>
        <button className="submitButton" type="submit">
          Sign Up
        </button>
      </div>
    </form>
    </div>
      </div>
      <div className="rightSection">

      </div>
      </div>
    </div>
  );
}
export default Register;
