import Login from "./components/Login";
import Todo from "./components/todo";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <h1>TodoList</h1>
      <div>{user ? <Todo /> : <Login />}</div>
    </>
  );
}

export default App;
