import { useState } from "react";
import Cookies from 'js-cookie';

const SignUpPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'password') {
            setPassword(value);
        } else if (name === 'fullname') {
            setFullname(value);
        } else if (name === 'email') {
            setEmail(value);
        }
    };

    const handleSignup = () => {
        const data = {
            fullname: fullname,
            email: email,
            password: password
        };
        fetch('http://localhost:3001/api/auth/createUser', {
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
                <div className="login">
                    <h1>Đăng Ký</h1>
                    <input className="input" name="fullname" placeholder="Họ và Tên" value={fullname} onChange={handleInputChange}></input>
                    <input className="input" name="email" placeholder="Số điện thoại" value={email} onChange={handleInputChange}></input>
                    <input className="input" name="password" placeholder="Mật khẩu" value={password} onChange={handleInputChange}></input>
                    <button className="login-button" onClick={handleSignup}>Đăng ký</button>
                </div>
            </div>
            <div className="container-login-r">

            </div>


        </div>
    );
}

export default SignUpPage;