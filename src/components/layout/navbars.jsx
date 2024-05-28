import Cookies from 'js-cookie';
import { deleteDB } from 'idb';
import { FaMoon, FaToggleOn, FaUser } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
const Navbars = ({profileclick, mouseLeave}) => {
    const handleClick = () => {
        Cookies.remove('token');
        deleteDB('data');
        window.location.href = '/login';
    }
    return (
        <>
            <div className="navbars fade-in" onMouseLeave={mouseLeave}>
                <div className="navbars-item" onClick={profileclick}> <span><FaUser  className='mx-2'/> Profile</span></div>
                <div className="navbars-item"> <span><FaGear className='mx-2'/> Setting </span></div>
                <div className="navbars-item"> <span> <FaMoon  className='mx-2'/> Dark mode </span> <FaToggleOn/></div>
                <div className="navbars-item"> <span> Phone Mode </span> </div>
                <div className="navbars-item" onClick={handleClick}> Logout</div>
            </div>
        </>


    )
}

export default Navbars;