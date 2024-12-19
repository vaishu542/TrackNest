import React, { useState } from 'react';
import './style.css';
import Input from '../Input';
import Button from '../Button';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { useUser } from '../Context/UserContext';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conformPassword, setConformPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserDetails } = useUser();

    async function createDoc(user) {
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if (!userData.exists()) {
            try {
                const userPayload = {
                    name: user.displayName || name,
                    email: user.email,
                    photoURL: user.photoURL || "",
                    createdAt: new Date(),
                };

                setUserDetails(userPayload);
                await setDoc(userRef, userPayload);
                toast.success("Profile created successfully!");
            } catch (e) {
                toast.error(`Firestore Error: ${e.message}`);
                console.error("Firestore Error:", e.message);
            }
        } else {
            console.log("User already exists.");
        }
    }

    const handleSignUpWithEmail = async (event) => {
        event.preventDefault();

        if (!name || !email || !password || !conformPassword) {
            toast.error("All fields are required!");
            return;
        }

        if (password !== conformPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await createDoc(user);
            toast.success("Sign-up successful!");
            navigate('/mainPage');
        } catch (error) {
            toast.error(`Sign-up Failed: ${error.message}`);
            console.error("Sign-up Error:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async (event) => {
        event.preventDefault();

        setLoading(true);

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            console.log("Google Sign-In Successful:");
            const userD = {
                name: user.displayName || name,
                email: user.email,
                photoURL: user.photoURL || "",
            };
            setUserDetails(userD);

            await createDoc(user);
            toast.success("Sign-up successful!");
            navigate('/mainPage');
        } catch (error) {
            toast.error(` Sign-up Failed: ${error.message}`);
            console.error("Google Sign-up Error:", error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='wrapper'>
            <div className='sign-box'>
                <p className='sign-head'>
                    SignUp on <span style={{ color: "var(--theme-hover)" }}>TrackNest</span>
                </p>
                <form>
                    <Input
                        lable="Full Name"
                        placeholder="Sia Miller"
                        state={name}
                        setState={setName}
                    />
                    <Input
                        lable="Email"
                        placeholder="siamiller@gmail.com"
                        state={email}
                        setState={setEmail}
                        type="email"
                    />
                    <Input
                        lable="Password"
                        placeholder="Pass_1233"
                        state={password}
                        setState={setPassword}
                        type="password"
                    />
                    <Input
                        lable="Confirm Password"
                        placeholder="Pass_1233"
                        state={conformPassword}
                        setState={setConformPassword}
                        type="password"
                    />
                    <Button
                        btnName={loading ? "Loading..." : "Sign Up"}
                        onclick={handleSignUpWithEmail}
                        disabled={loading}
                    />
                    <div className="divider">Or</div>
                    <Button
                        btnName={loading ? "Loading..." : "Sign Up with Google"}
                        onclick={handleGoogleSignUp}
                        isBlue={true}
                        disabled={loading}
                    />
                    <div className='log'>
                        Already have an account? <span><Link to='/login'>Click here</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
