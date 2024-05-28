import { useState } from "react";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'password') {
            setPassword(value);
        } else if (name === 'email') {
            setEmail(value);
        }
    };

    const handleLogin = () => {
        const data = {
            email: email,
            password: password
        };
        fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(token => {
                console.log(token);
                Cookies.set('token', token)
                window.location.href = '/';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (

        <div className="container-login">
            <div className="container-login-l">
                <h1>Hello, Firend!</h1>
                <h4>Enter your personal details and start
                    journey with us</h4>
                <Link to={'/signup'}> <button className="login-button" >SIGN IN</button> </Link>

            </div>
            <div className="container-login-r">
                <div className="login">
                    <h1>Login</h1>
                    <input className="input" name="email" placeholder="Email" value={email} onChange={handleInputChange}></input>
                    <input className="input" name="password" placeholder="Password" value={password} onChange={handleInputChange}></input>
                    <p>Remember me</p>
                    <p>Forgot password?</p>
                    <button className="login-button" onClick={handleLogin}>Sign In</button>

                </div>
            </div>


        </div>
    );
}

export default LoginPage;