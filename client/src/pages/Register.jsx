import { useState } from "react";
import {useNavigate} from "react-router";
import { useAuth } from "../store/token";
import {toast} from "react-toastify"

export function Register() {
    const navigate = useNavigate();
    const {URL} = useAuth();
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();

            if(response.ok) {
                navigate("/login");
                toast.success(data.msg);
            }else {
                toast.error(data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <section>
            <main>
                <div className="register-container container">
                    <div className="register-image">
                        <img src="/Sign up-bro.svg"></img>
                    </div>
                    <div className="register-form">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="Enter username" id="username" value={user.username} onChange={handleInput} required autoComplete="off" />

                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="Enter email" id="email" value={user.email} onChange={handleInput} required autoComplete="off" />

                            <label htmlFor="phone">Phone</label>
                            <input type="number" name="phone" placeholder="Enter phone" id="phone" value={user.phone} onChange={handleInput} required autoComplete="off" />

                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="Set password" id="password" value={user.password} onChange={handleInput} required autoComplete="off" />

                            <button className="btn">Register Now</button>
                        </form>
                    </div>
                </div>
            </main>
        </section>
    </>
}