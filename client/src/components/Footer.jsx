import { useNavigate } from "react-router"
import { NavLink } from "react-router";
import "./Footer.css"

export function Footer() {
  const navigate = useNavigate();

  return <>
    <footer className="footer">
      <div className="data">
        <div className="text">
          <h4>Website for anyone</h4><hr />
          <p>
            With expertise spanning the MERN stack,<br />
            UI/UX design, cloud integration, and <br />
            modern DevOps practices, we deliver digital products <br />
            that are not only functional but future-ready. <br />
          </p>
          <a onClick={() => navigate('/')}>Explore our expertise</a>
        </div>
        <div className="strategy">
          <h4>Creative Design + Strategy</h4><hr/>
          <p>Creative Direction</p>
          <p>User Experience (UX)</p>
          <p>User Interface (UI)</p>
          <p>SEO & Copywriting</p>
          <p>Machine models</p>
          <p>AI consultancy</p>
        </div>
        <div className="support">
          <h4>Development + Support</h4><hr/>
          <p>Creactive Development</p>
          <p>React</p>
          <p>Node.js / Express</p>
          <p>Web & App support</p>
          <p>Maintenence</p>
        </div>
      </div>
      <div className="footbar">
        <div className="links">
          <span><NavLink className={"foot-link"} to={'/'}>Home</NavLink></span>
          <span><NavLink className={"foot-link"} to={'/'}>Services</NavLink></span>
          <span><NavLink className={"foot-link"} to={'/'}>Agency</NavLink></span>
          <span><NavLink className={"foot-link"} to={'/'}>Careers</NavLink></span>
          <span><NavLink className={"foot-link"} to={'/contact'}>Contact</NavLink></span>
        </div>
        <div className="socials">
          <a className="foot-link" href="https://www.instagram.com/hardattsinhji_adval" target="_blank">Instagram</a>
          <a className="foot-link" href="https://x.com/hardattsinhji" target="_blank">Twitter</a>
        </div>
      </div>
    </footer>
  </>
}