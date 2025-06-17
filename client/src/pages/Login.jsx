import { useState } from "react";
import { useAuth } from "../store/token";
import {useNavigate} from "react-router";
import {toast} from "react-toastify"

export function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const {storeToken, checkAdmin, URL} = useAuth();

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
            const response = await fetch(`${URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const res_data = await response.json();

            if (response.ok) {
                setUser({
                    email: "",
                    password: ""
                });
                navigate("/");
                toast.success(res_data.msg, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                storeToken(res_data.token);
                checkAdmin(res_data.isAdmin);

            }else {
                toast.error(res_data.msg, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
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
                        <img src="/Login-bro.svg"></img>
                    </div>
                    <div className="register-form">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="Enter email" id="email" value={user.email} onChange={handleInput} required autoComplete="off" />

                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="Enter password" id="password" value={user.password} onChange={handleInput} required autoComplete="off" />

                            <button className="btn">Login</button>
                        </form>
                    </div>
                </div>
            </main>
        </section>
    </>
}