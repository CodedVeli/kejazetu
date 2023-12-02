import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { FaChevronRight } from "react-icons/fa";

const ForgotPassword = () => {
   
    const [email, setEmail] = useState('');

    const onChange = (e) => setEmail(e.target.value)

        const onSubmit = async (e) => { 
            e.preventDefault();
            const auth = getAuth();
            try {
                await sendPasswordResetEmail(auth, email);
                toast.success("Reset Link Sent");
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    return (
        <div className='pageContainer'>
           <header>
            <p className="pageHeader">Forgot Password</p>
           </header>
           <main>
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    className="emailInput"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={onChange}
                />
               <Link className="forgotPasswordLink" to='/signin'>
                Sign In
               </Link>

               <div className="signInBar">
                <div className="signInText">Send Reset Link</div>
                <button className="signInButton">
                    <FaChevronRight className=' text-white w-[34px] h-[34px]' />
                </button>
               </div>
            </form>
          
           </main>
        </div>
    );
};

export default ForgotPassword;