

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

function Login(){

  const handleLogin = async () => {

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt:"select_account"
    });
    await signInWithPopup(auth, provider);
    
  };

  return(
    <button onClick={handleLogin}>
      Googleログイン
    </button>
  )
}

export default Login;