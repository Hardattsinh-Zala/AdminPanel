import "./Admin.css";
import { useAuth } from "../../store/token";
import { toast } from "react-toastify"
import { useEffect, useState } from "react";
import {useOutletContext, useNavigate, Outlet} from "react-router";

export function AdminUsers() {
    const { tokenBearer, URL } = useAuth();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const {toggle, setToggle} = useOutletContext();

    const handleUser = async () => {
        const response = await fetch(`${URL}/api/admin/user`, {
            method: 'GET',
            headers: {
                Authorization: tokenBearer
            }
        })
        const userData = await response.json();
        setData(userData.users);
    }

    const deleteUser = async (id) => {
        const response = await fetch(`${URL}/api/admin/user/delete/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: tokenBearer
            }
        })
        const data = await response.json();
        if(response.ok)
            toast.success(data.msg);
        else toast.error(data.msg);
        setTimeout(() => navigate(0), 3000)
    }

    useEffect(() => {
        handleUser();
    }, []);

    return <>
        <div className={toggle? "display" : "user-container"}>
            <h1>Users</h1>
            <div className="users">
                {
                    data.map((e, index) => {
                        return <div className="user-box" key={index}>
                            <span><b>Username: </b>{e.username}</span>
                            <span><b>Email: </b>{e.email}</span>
                            <span><b>Phone: </b>{e.phone}</span><br />
                            <button onClick={() => deleteUser(e._id)}>Delete</button><br />
                            <button onClick={() => {navigate(`/admin/user/edit/${e._id}`); setToggle(!toggle)}}>Edit</button>
                        </div>
                    })
                }
            </div>
        </div>
        <Outlet context={{toggle, setToggle}}/>
    </>
}