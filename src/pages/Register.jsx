import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, storage} from "../firebase";
import {ref, uploadBytesResumable, getDownloadURL ,} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { useNavigate, Link} from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };




return (
  <center>
  <div className="formContainer">
    <div className="formWrapper">
      <span className="logo"> ˚ ⋆ Ping Chat  ⋆ ˚ </span> <br />
      <span className="title"> ~ Register Page ~ </span>
      <form onSubmit={handleSubmit}>
        <input required type="text" placeholder="display name" /> <br />
        <input required type="email" placeholder="email" /> <br />
        <input required type="password" placeholder="password" /> <br /> <br />
        <input required style={{ display: "none" }} type="file" id="file" />
        <label htmlFor="file">
        <img width="55" height="55" src="https://img.icons8.com/dusk/64/add-image.png" alt="add-image"/>
          <span> Add profile picture </span>
        </label> <br />
        <button disabled={loading}>Sign up</button>
        {loading && "Uploading and compressing the image please wait..."}
        {err && <span>Something went wrong</span>}
      </form>
      <p>
        You do have an account? <Link to="/register">Login</Link>
      </p>
    </div>
  </div> </center>
);
}

export default Register;
