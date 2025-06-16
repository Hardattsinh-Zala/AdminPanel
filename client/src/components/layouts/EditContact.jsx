import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { useAuth } from "../../store/token";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export function EditContact() {
    const {toggle, setToggle} = useOutletContext();
    const navigate = useNavigate();
    const {tokenBearer, URL} = useAuth();
    const {id} = useParams();
    const [user, setUser] = useState({
        email: "",
        message: ""
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        })
    }

    const getContactData = async () => {
        try {
            const response = await fetch(`${URL}/api/admin/contact/edit/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: tokenBearer
                }
            });
            const contactData = await response.json();
            setUser(contactData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getContactData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/admin/contact/edit/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: tokenBearer
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            if(response.ok) {
                setUser({email: "", message: ""});
                setToggle(!toggle);
                navigate('/admin/contact');
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
            <div className="editContact">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Enter email" id="email" value={user.email} onChange={handleInput} required autoComplete="off" />

                    <label htmlFor="message">Message</label>
                    <textarea name="message" rows={10} id="message" placeholder="Enter message" value={user.message} onChange={handleInput}></textarea>

                    <button className="btn">Update</button>
                </form>
            </div>
        </section>
    </>
}