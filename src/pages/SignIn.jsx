import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaChevronRight } from "react-icons/fa";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";  
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

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
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Invalid Credentials");
        }
    }
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit}>
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

                <div className="signInBar">
                    <p className="signInText">
                        Sign In
                    </p>
                    <button className="signInButton">
                        <FaChevronRight className=" w-[34px] h-[34px] text-white" onClick={() => navigate('/')} />
                    </button>
                </div>
                
            
        </form>
        {/* Google OAuth */}
        <OAuth />
        
        <Link to='/sign-up' className='registerLink'>
          Sign Up Instead
        </Link>
      </div>
    </>
  );
};

export default SignIn;
