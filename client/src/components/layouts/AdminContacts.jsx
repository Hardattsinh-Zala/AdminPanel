import { useEffect, useState } from "react";
import "./Admin.css";
import { useAuth } from "../../store/token";
import { toast } from "react-toastify"
import {useNavigate} from "react-router";
import { useOutletContext, Outlet } from "react-router";

export function AdminContacts() {
    const [contact, setContact] = useState([]);
    const {toggle, setToggle} = useOutletContext();
    
    const { tokenBearer, URL } = useAuth();
    const navigate = useNavigate();

    const handleContact = async () => {
        const response = await fetch(`${URL}/api/admin/contact`, {
            method: 'GET',
            headers: {
                Authorization: tokenBearer
            },
        });
        const data = await response.json();
        setContact(data.contacts);
    }

    const deleteContact = async (id) => {
        const response = await fetch(`${URL}/api/admin/contact/delete/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: tokenBearer
            }
        })
        const data = await response.json();
        if (response.ok)
            toast.success(data.msg);
        else toast.error(data.msg);
        setTimeout(() => navigate(0), 3000)
    }

    useEffect(() => {
        handleContact();
    }, []);

    return <>
        <div className={toggle ? "display" : "contact-container"}>
            <h1>Contacts</h1>
            <div className="contacts">
                {
                    contact.map((e, index) => {
                        return <div className="contact-box" key={index}>
                            <span><b>Email: </b>{e.email}</span>
                            <span><b>Message: </b>{e.message}</span><br />
                            <button onClick={() => deleteContact(e._id)}>Delete</button><br />
                            <button onClick={() => {navigate(`/admin/contact/edit/${e._id}`); setToggle(!toggle)}}>Edit</button>
                        </div>
                    })
                }
            </div>
        </div>
        <Outlet context={{toggle, setToggle}}/>
    </>;
}