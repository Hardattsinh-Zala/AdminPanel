import { motion } from "framer-motion"
import {useInView} from "react-intersection-observer"
import CountUp from "react-countup"
import { useNavigate } from "react-router"
 
export function Home() {
  const navigate = useNavigate();
  const bottomAnimation = {
    initial: { y: '20%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.8 },
  }

  const {ref, inView} = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -25% 0px',
  })

  return <>
    <section>
      <motion.div {...bottomAnimation}>
        <div className="home-hero">
          <h1>Building bold brands <br />with <i>thoughtful design</i></h1>
          <p>At GhostPanel, we help small startups tackle the world’s biggest challenges with tailored solutions, guiding you from strategy to success in a competitive market.</p>
          <button className="btn" onClick={() => navigate('/contact')}>Get Started</button>
        </div>
      </motion.div>
      <div className="web-result">
        <h1 className="web-result-text">Crafting exceptional, well experienced & technology driven strategies to drive impactful results with creativity, innovation and Strategy</h1>
        <div className="web-data">
          <div>
            <h1 ref={ref}>
              <sup>+</sup>
              {inView ? <CountUp start={0} end={40} duration={3} /> : '0'}
            </h1>
            <p>Total projects completed</p>
          </div>
          <div>
            <h1 >
              <sup>+</sup>
              {inView ? <CountUp start={0} end={15} duration={3} /> : '0'}
            </h1>
            <p>Years of experience</p>
          </div>
          <div>
            <h1>
              <sup>+</sup>
              {inView ? <CountUp start={0} end={12} duration={3} /> : '0'}
            </h1>
            <p>Design Awards</p>
          </div>
        </div>
      </div>
      <div className="contact-bar">
        <div className="contact-bar-text">
          <p>See our work in action. <br />Start your creative journey with us.</p>
        </div>
        <button onClick={() => navigate('/contact')}>Let's Collaborate</button>
      </div>
    </section>
  </>
}