import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";    
import  { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import OAuth from "../components/OAuth";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
        }

    const onSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(auth.currentUser, {
                displayName: name,
            });

            const formDataCopy = {...formData}
            delete formDataCopy.password;
            formDataCopy.timestamp = serverTimestamp();
            await setDoc(doc(db, "users", user.uid), {
                formDataCopy
            });
           
            navigate("/");
        } catch (error) {
           toast.error("Something went wrong");
        }
    }


        // if(auth.currentUser.email !== email) {
        //     await updateProfile(auth.currentUser, {
        //         email: email,
        //     });
        //     const userRef = doc(db, "users", auth.currentUser.uid);
        //     await updateDoc(userRef, {
        //         email: email,
        //     });
        // }
        // setChangeDetails(false);
       

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit}>
             <input
            type="text"
            className="nameInput"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
              className="passwordInput"
            />
            <img
            className="showPassword"
              src={visibilityIcon}
              alt="visibility icon"             
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
                <Link className="forgotPasswordLink" to="/forgotpassword">Forgot Password?</Link>

                <div className="signUpBar">
                    <p className="signUpText">
                        Sign Up
                    </p>
                    <button className="signUpButton">
                        <FaChevronRight className=" w-[34px] h-[34px] text-white" onClick={() => navigate('/')} />
                    </button>
                </div>
                
            
        </form>
        {/* Google OAuth */}
        <OAuth />
        <Link className="registerLink" to='/signin'>
        Sign In Instead
        </Link>
      </div>
    </>
  );
};

export default SignUp;
