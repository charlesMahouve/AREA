import React from "react";
import { useCtx } from '../components/Context'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from "framer-motion";
import GoogleLogin from 'react-google-login';
import Loader from "../components/Loader";

export default function Login() {
    const { exportUser, exportIsLogged, exportServices, services } = useCtx();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [Remail, setREmail] = React.useState("");
    const [Rpassword, setRPassword] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(false)
    const router = useRouter();
    
    const signIn = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email.split("@")[0].split(".")[0], password: password })
        };
        fetch('http://localhost:8080/api/auth/signin', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                exportIsLogged(true);
                setIsOpen(false);
                exportUser(data);
                exportServices(data.services)
                router.push("/home");
            } else console.log(data.message);
        }).catch (error => console.log(error))
    }
    
    const signUp = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: Remail.split("@")[0].split(".")[0], email: Remail, password: Rpassword, roles: ["user"] })
        };
        fetch('http://localhost:8080/api/auth/signup', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.message == "User was registered successfully!") {
                fetch('http://localhost:8080/api/auth/signin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: Remail.split("@")[0].split(".")[0], password: Rpassword })
                    }).then(response => response.json())
                    .then(data => {
                        exportIsLogged(true);
                        setIsOpen(false);
                        exportUser(data);
                        exportServices(data.services)
                        router.push("/home");
                    })
                } else console.log(data.message);
            }).catch (error => console.log(error))
        }

        const signUpGoogle = async (googleData) => {
            console.log(googleData)
            setLoading(true)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: googleData })
            };
            fetch('http://localhost:8080/api/auth/google', requestOptions)
            .then(response => response.json())
            .then(data => {
                exportIsLogged(true);
                setIsOpen(false);
                exportUser(data);
                exportServices(data.services)
                setLoading(false)
                router.push("/home");
            });
        }

        const handleGoogleFailure = (result) => {
            alert(result)
        }

        return (
            <div className="w-screen h-screen bg-[#ededed] flex items-center justify-center select-none">
            <AnimatePresence exitBeforeEnter onExitComplete={() => null}>
                {isOpen && (
                    <motion.div 
                    className="bg-white w-[70%] h-[85%] rounded-2xl shadow-md flex flex-col"
                    initial={{ scale: 0 }}
                    animate={{
                        scale: 1,
                        transition: {duration: 0.5}
                    }}
                    exit={{
                        scale: 0,
                        transition: {duration: 0.5}
                    }}>
                    <img className="mt-5 self-center" src="/arealogo.png" alt="image" />
                    <div className="flex flex-row mt-10">
                        <div className="w-[50%] flex flex-col items-center">
                            <p className="text-[#f14b1c] text-2xl mb-7">Login</p>
                            <input className="shadow-md border border-[#c8c8c8] focus:border-[#c8c8c8] rounded-xl w-[70%] py-2 px-3 my-3" id="email1" type="email" placeholder="Email" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                            <input className="shadow-md border border-[#c8c8c8] focus:border-[#c8c8c8] rounded-xl w-[70%] py-2 px-3 my-3" id="password1" type="password" placeholder="Password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                            <button className=" w-[20%] bg-gradient-to-r from-[#F14B1C] to-[#D11D20] text-white rounded-full py-2 shadow-md hover:scale-105" onClick={() => { signIn() }}>Sign In</button>
                        </div>
                        <div className="self-center h-[100%] w-[1px] bg-[#c8c8c8] mt-12 " />
                        <div className="w-[50%] flex flex-col items-center">
                            <p className="text-[#f14b1c] text-2xl  mb-7">Register</p>
                            <input className="shadow-md border border-[#c8c8c8] focus:border-[#c8c8c8] rounded-xl w-[70%] py-2 px-3 my-3" id="email" type="email" placeholder="Email" value={Remail} onChange={(event) => { setREmail(event.target.value) }} />
                            <input className="shadow-md border border-[#c8c8c8] focus:border-[#c8c8c8] rounded-xl w-[70%] py-2 px-3 my-3" id="password" type="password" placeholder="Password" value={Rpassword} onChange={(event) => { setRPassword(event.target.value) }} />
                            <button className=" w-[20%] bg-gradient-to-r from-[#F14B1C] to-[#D11D20] text-white rounded-full py-2 shadow-md hover:scale-105" onClick={() => { signUp() }}>Sign Up</button>
                        </div>
                    </div>
                    <div className="flex flex-row mt-10 items-center justify-center">
                        <div className="h-[1px] bg-[#c8c8c8]  w-[30%] mx-10" />
                        <p className="text-[#c8c8c8] text-xl font-bold">or</p>
                        <div className="h-[1px] bg-[#c8c8c8]  w-[30%] mx-10" />
                    </div>
                    <div className="flex flex-col items-center justify-center mt-4 ">
                        <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Log in with Google"
                            onSuccess={signUpGoogle}
                            onFailure={handleGoogleFailure}>
                        </GoogleLogin>

                    </div>
                </motion.div>
                )}
            </AnimatePresence>
            {loading && (
                <Loader/>
            )}
        </div>
    );
}