import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";
import DynamicForm from "./DynamicForm/dynamicForm";
import Header from "./header/Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/home";
      toast.success("User logged in Successfully", {
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
    inputKeys: ["email", "password"],
    labels: {
      email: "Email Address",
      password: "Password",
    },
    inputTypes: {
      email: "text",
      password: "password",

    },
    values: {
      email: email,
      password: password,
    },
    columns: 1,
    inputWidth: 100,
    onChangeHandlers: {
      email: (value) => setEmail(value),
      password: (value) => setPassword(value),
    },
    placeholders: {
      email: "Enter email",
      password: "Enter password",
    },
    validationRules: {}, 
  };

  return (
    <div className="mainDiv">
   <Header />
    <div className="innerGrid" 
    // style={{gridTemplateColumns:"3fr 2fr"}}
    >
    <div className="leftSection" style={{gridTemplateRows:"min-content", marginTop:"0vh"}}>
      <div style={{border: "2px solid #633172", padding:"5vh", width:"80%"}}>
      <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <DynamicForm {...formProps}/>

      <div style={{display:"flex", justifyContent:"space-between", margin:"3vh 2vw 0vh 2vw"}}>
      <p className="forgot-password text-right">
        New user? Then <a style={{color:"white", fontWeight:"900", textDecoration: "none"}} href="/register">Register</a>
      </p>
        <button className="submitButton" type="submit">
          LogIn
        </button>
      </div>
      <SignInwithGoogle/>
    </form>
  </div>
    </div>
    <div className="rightSection">

    </div>
    </div>
  </div>
    
  );
}

export default Login;
