import { useEffect, useState } from "react"
import Logo from "../assets/logo.png"
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
  const[theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme"))||"light");
  const [user, setUser] = useState(auth.currentUser); 

  const navigate = useNavigate(); 
  const handleSignOut =()=>{
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      navigate("/error");
    });
  }
  useEffect(()=> {
    localStorage.setItem("theme",JSON.stringify(theme));
    document.documentElement.removeAttribute("class");
    document.documentElement.classList.add(theme);
  }, [theme])
  return (
    <header className="py-0">
        <div className="logo">
            <img src={Logo} alt="Taskmate Logo" />
            <span>Taskmate</span>
        </div>
        <div className="themeSelector">
            <span onClick={()=>setTheme("light")} className={theme==="light" ? "light activeTheme":"light"}></span>
            <span onClick={()=>setTheme("medium")} className={theme==="medium" ? "medium activeTheme":"medium"}></span>
            <span onClick={()=>setTheme("dark")} className={theme==="dark" ? "dark activeTheme":"dark"}></span>
            <span onClick={()=>setTheme("gOne")} className={theme==="gOne" ? "gOne activeTheme":"gOne"}></span>
            <span onClick={()=>setTheme("gTwo")} className={theme==="gTwo" ? "gTwo activeTheme":"gTwo"}></span>
            <span onClick={()=>setTheme("gThree")} className={theme==="gThree" ? "gThree activeTheme":"gThree"}></span>
        </div>
        <div>
        {user && (
          <div className="user-icon" onClick={handleSignOut}>
            <FontAwesomeIcon icon={faUser} />
            <span className="tooltip">Sign Out</span>
          </div>
        )}
      </div>

    </header>
  )
}

export default Header