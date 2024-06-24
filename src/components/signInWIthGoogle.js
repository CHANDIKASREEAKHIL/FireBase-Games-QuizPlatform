import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

function SignInwithGoogle() {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    provider.then(async (result) => {
      const user = result.user;
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
    });
  }
  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer"}}
        onClick={googleLogin}
      >
        <div style={{ border:"2px solid #633172", padding:"1vh 0vw"}}>
        <img src={require("../images/google.png")} width={"6%"} />
        <span style={{paddingLeft:"2vw"}}> Sign in with Google</span>
        </div>
      </div>
    </div>
  );
}
export default SignInwithGoogle;
