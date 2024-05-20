import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <center>
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">  ˚ ⋆ Ping Chat  ⋆ ˚ </span> 
        <span className="title">Login</span> <br />
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" /> <br />
          <input type="password" placeholder="password" /> <br />
          <button>Sign in</button> <br />
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
    </center>
  );
};

export default Login;