import { login, signup } from "../services/authservices";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Login({ getUserDetails, handleValidation }) {
    let navigate = useNavigate();
    const cookies = new Cookies();

    const [signupData, setSignupData] = useState({
        NGOName: "",
        description:"",
        email: "",
        password: "",
        Phno: ""
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [isLogin, setIsLogin] = useState(true);

    function handleLoginChange(e) {
        setLoginData({ ...loginData, [e.target.id]: e.target.value });
    }

    function handleSignupChange(e) {
        setSignupData({ ...signupData, [e.target.id]: e.target.value });
    }

    async function handleLoginSubmit(e) {
        e.preventDefault();
        try {
            const isLoggedIn = await login(loginData.email, loginData.password);
            if (isLoggedIn.status >= 200 && isLoggedIn.status < 300) {
                getUserDetails(isLoggedIn.data);
                navigate("/home");
            }
        } catch (err) {
            alert("Email or Password incorrect! Please try again.");
        }
        setLoginData({ email: "", password: "" });
    }

    async function handleSignupSubmit(e) {
        e.preventDefault();
        try {
            const isSignedUp = await signup(
                signupData.NGOName,
                signupData.description,
                signupData.Phno,
                signupData.email,
                signupData.password
            );
            if (isSignedUp.status >= 200 && isSignedUp.status < 300) {
                getUserDetails(isSignedUp.data);
                navigate("/home");
            }
        } catch (err) {
            alert("Signup failed, Please try again!");
        }
        setSignupData({
            NGOName: "",
            description: "",
            email: "",
            password: "",
            Phno:""
        });
    }

    return typeof cookies.get("authToken") != "undefined" ? (
        handleValidation() ? (
            <Navigate to="/home" />
        ) : (
            <Navigate to="/" />
        )
    ) : (
        <div className="home-wrapper">
            <h1 className="title">Login or Register</h1>
            <div className="container">
                {isLogin ? (
                    <div className="loginDiv">
                        <form
                            className="loginForm"
                            onSubmit={(e) => handleLoginSubmit(e)}
                        >
                            <p>Login</p>
                            <input
                                placeholder="Email"
                                onChange={(e) => handleLoginChange(e)}
                                type="email"
                                id="email"
                                value={loginData.email}
                                style={{ fontSize: '1.2rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem', marginBottom: '1rem', }}
                            />
                            <br />
                            <br />
                            <input
                                placeholder="Password"
                                onChange={(e) => handleLoginChange(e)}
                                type="password"
                                id="password"
                                value={loginData.password}
                                style={{ fontSize: '1.2rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem', marginBottom: '1rem', }}
                            />
                            <br />
                            <button className="button" type="submit" 
                            style={{
                                fontSize: '1rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                backgroundColor: 'green',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer'}}>
                                Log In
                            </button>
                            <br />
                            <Link
                                className="link"
                                onClick={() => setIsLogin(false)}>
                                Click here to Register
                            </Link>
                            <br />
                            <Link to="/forgot" className="link">
                                Forgot Password
                            </Link>
                        </form>
                    </div>
                ) : (
                    <div className="signupDiv">
                        <form
                            className="signupForm"
                            onSubmit={(e) => handleSignupSubmit(e)}
                        >
                            <p>Signup</p>
                            <input
                                placeholder="NGO Name"
                                onChange={(e) => handleSignupChange(e)}
                                type="text"
                                id="NGOName"
                                value={signupData.NGOName}
                                style={{ fontSize: '1.2rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem', marginBottom: '1rem', }}
                            />
                            <br />
                            <input
                                placeholder="Email"
                                onChange={(e) => handleSignupChange(e)}
                                type="email"
                                id="email"
                                value={signupData.email}
                                style={{ fontSize: '1.2rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem', marginBottom: '1rem', }}
                            />
                            <br />
                            <input
                                placeholder="Phone Number"
                                onChange={(e) => handleSignupChange(e)}
                                type="text"
                                id="Phno"
                                value={signupData.Phno}
                                style={{ fontSize: '1.2rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem', marginBottom: '1rem', }}
                            />
                            <br />
                            <input
                                placeholder="Description"
                                onChange={(e) => handleSignupChange(e)}
                                type="text"
                                id="description"
                                value={signupData.description}
                                style={{ fontSize: '1.2rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem', marginBottom: '1rem', }}
                            />
                            <br />
                            <input
                                placeholder="Password"
                                onChange={(e) => handleSignupChange(e)}
                                type="password"
                                id="password"
                                value={signupData.password}
                                style={{ fontSize: '1.2rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem', marginBottom: '1rem', }}
                            />
                            <br />
                            <button className="button" type="submit"
                            style={{
                                fontSize: '1rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                backgroundColor: 'green',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer'}}>
                                Sign Up
                            </button>
                            <br />
                            <Link
                                className="link"
                                onClick={() => setIsLogin(true)}
                            >
                                Click here to Login
                            </Link>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;