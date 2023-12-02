import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { toast } from "react-toastify"
import { db } from "../firebase.config"
// import { googleIcon } from '../assets/svg/googleIcon.svg'
import {  FaGoogle } from "react-icons/fa";

const OAuth = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
                const provider = new GoogleAuthProvider()
                const result = await signInWithPopup(auth, provider)
                const user = result.user

                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)

                if(!docSnap.exists()) {
                    await setDoc(doc(db, 'users', user.uid), {
                        name: user.displayName,
                        email: user.email,
                        timeStamp: serverTimestamp(),
                    })

                }  
                toast.success('Logged in successfully')
                navigate('/')      
            } catch (error) {
                toast.error('Something went wrong')
            }       
        }
        
            


        
    
  return (    
    <div className="socialLogin">
        <p>Sign {location.pathname === '/signup' ? 'up' : 'in'} 
        with </p>
        <button className="socialIconDiv" onClick={onGoogleClick}>
            <FaGoogle className="socialIconImg" />
        </button>
    </div>
  )
}

export default OAuth