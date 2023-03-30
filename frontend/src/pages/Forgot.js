import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/authservices";

function Forgot() {
    const [email, setEmail] = useState("");

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    async function handleForgotSubmit(e) {
        e.preventDefault();
        try {
            const isSent = await forgotPassword(email);
            if (isSent.status >= 200 && isSent.status < 300) {
                alert("Email sent for password reset!");
            }
        } catch (err) {
            alert("Email incorrect! Please try again.");
        }

        setEmail("");
    }

    return (
        <form className="loginForm" onSubmit={(e) => handleForgotSubmit(e)}>
            <p>Enter your Email</p>
            <input
                placeholder="Email"
                onChange={(e) => handleEmailChange(e)}
                type="text"
                id="email"
                style={{ fontSize: '1.2rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem', marginBottom: '1rem', }}
                value={email}
            />
            <br />
            <button className="btn" type="submit" style={{
                    fontSize: '1rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'green',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer'}}>
                Submit
            </button>
            <br />
            <Link className="link" to="/">
                Go To Home
            </Link>
        </form>
    );
}

export default Forgot;