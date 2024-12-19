import React, { useState } from 'react'
import './style.css'
import Input from '../Input'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Button from '../Button';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db } from '../../firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";


const index = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState();
    const navigate = useNavigate();

    const logInWithMail = (event) => {
        event.preventDefault();
        if (password !== "" && email !== "") {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(email);
                    console.log(password);
                    toast.success("User logedin successfully");
                    console.log("User logedin successfully");

                    setPassword("");
                    setEmail("");
                    setLoading(false);
                    navigate('/mainPage');
                    // createDocument(user);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    console.log(errorCode);
                    toast.error(errorCode);
                    console.log("User not logedin successfully");
                    setLoading(false);
                });

        } else {
            console.log("Please fill all the fields");
            toast.error("Please fill all the fields");
            setLoading(false);
        }
    }
    async function createDoc(user) {
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if (!userData.exists()) {
            try {
                await setDoc(doc(db, "users", user.uid),
                    {
                        name: user.displayName ? user.displayName : name,
                        email: user.email,
                        photoURL: user.photoURL ? user.photoURL : "",
                        createdAt: new Date(),
                    });
                // toast.success("Doc created!");
                console.log("Doc created!");


            } catch (e) {
                toast.error(e.message);
                console.log(e.message);
            }
        } else {
            // toast.error("Doc already exists");
            console.log("Doc already exists");
        }
    }


    const googleSignUp = async () => {
        event.preventDefault();
        console.log("createDoc loaded:", typeof createDoc);
        const provider = new GoogleAuthProvider();
        console.log("this is goolge");
        try {
            const result = await signInWithPopup(auth, provider);
            // Extract user details
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log("Google Sign-In successful:", user);
            console.log(user.displayName);
            console.log(user.email);

            // Save user details in Firestore
            await createDoc(user);
            setLoading(true)
            toast.success("Logged in successfully !");
            navigate('/mainPage');
        } catch (error) {
            // Extract error details
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData?.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error("Google Sign-In Error:", error.message);
            toast.error(`Google Sign-Up Failed: ${errorMessage}`);
        }
        setLoading(false);
    };
    return (
        <div className='wrapper'>
            <div className='sign-box'>
                <p className='sign-head'>LogIn on
                    <span style={{ color: "var(--theme-hover)" }}> TrackNest</span>
                </p>
                <form>
                    <Input
                        lable={"Email"}
                        placeholder={"siamiller@gmail.com"}
                        state={email}
                        setState={setEmail}
                        type={"email"}
                    />
                    <Input
                        lable={"Password"}
                        placeholder={"Pass_1233"}
                        state={password}
                        setState={setPassword}
                        type={"password"}
                    />
                    <Button btnName={loading ? "Loading.." : "Log In"} onclick={logInWithMail} disabled={loading} />
                    <div className="divider">Or</div>
                    <Button btnName={loading ? "Loading.." : "Log In with Google"} onclick={googleSignUp} isBlue={true} />
                    <div className='log'>
                        Or Don't have an account ? <span><Link to='/signup'>Click here</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default index