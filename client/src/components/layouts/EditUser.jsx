import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../store/token";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useOutletContext } from "react-router";

export function EditUser() {
    const { id } = useParams();
    const { tokenBearer, URL } = useAuth();
    const {toggle, setToggle} = useOutletContext();
    const navigate = useNavigate();
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
            [name]: String(value)
        })
    }

    const getUserData = async () => {
        try {
            const response = await fetch(`${URL}/api/admin/user/edit/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: tokenBearer
                }
            })
            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/admin/user/edit/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: tokenBearer
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            if (response.ok) {
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: ""
                });
                navigate('/admin/user');
                setToggle(!toggle);
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
            <div className="editUser">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Enter username" id="username" value={user.username} onChange={handleInput} required autoComplete="off" />

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Enter email" id="email" value={user.email} onChange={handleInput} required autoComplete="off" />

                    <label htmlFor="phone">Phone</label>
                    <input type="number" name="phone" placeholder="Enter phone" id="phone" value={user.phone} onChange={handleInput} required autoComplete="off" />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Set password" id="password" value={user.password} onChange={handleInput} required autoComplete="off" />

                    <button className="btn">Update</button>
                </form>
            </div>
        </section>
    </>
}