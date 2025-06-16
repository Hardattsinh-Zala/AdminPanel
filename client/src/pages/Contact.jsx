import { useState } from "react";
import { useAuth } from "../store/token";
import { toast } from "react-toastify"

export function Contact() {
    const { data, URL } = useAuth();
    const [user, setUser] = useState({
        email: "",
        message: ""
    });

    const [userData, setUserData] = useState(true);

    if (userData && data) {
        setUser({
            email: data.email,
            message: ""
        })
        setUserData(false);
    }

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/form/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const data = await response.json();
            if (response.ok) {
                toast.success(data.msg, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setUser({ email: "", message: "" });
            }else {
                toast.error(data.msg, {
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
                        <img src="/Contact us-amico.svg"></img>
                    </div>
                    <div className="register-form">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="Enter email" id="email" value={user.email} onChange={handleInput} required autoComplete="off" />

                            <label htmlFor="message">Message</label>
                            <textarea name="message" rows={10} id="message" placeholder="Enter message" value={user.message} onChange={handleInput}></textarea>

                            <button className="btn">Submit</button>
                        </form>
                    </div>
                </div>
            </main>
        </section>
    </>
}