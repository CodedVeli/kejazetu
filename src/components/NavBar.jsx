import { useNavigate, useLocation } from "react-router-dom";
import ExploreIcon from "../assets/svg/exploreIcon.svg";
import OfferIcon from "../assets/svg/localOfferIcon.svg";
import PersonOutlineIcon from "../assets/svg/personOutlineIcon.svg";

const NavBar = () => {

    const navigate = useNavigate(); 
    const location = useLocation();

    const pathMatchRoute = (route) => {
        return location.pathname === route ? "active" : "";
    }
    return (
        <footer className="navbar">
            <nav className="navbarNav">
                <ul className="navbarListItems">
                    <li className="navbarListItem" onClick={ () => navigate('/')}>
                        <img src={ExploreIcon} alt="Explore Icon" width="36px" height="36px" />
                        <p className={pathMatchRoute("/") ? "navbarListItemNameActive" : ""}>Explore</p>
                    </li>
                    <li  onClick={ () => navigate('/offers')}>
                        <img src={OfferIcon} alt="Offer Icon" width="36px" height="36px" />
                        <p className={pathMatchRoute("offers") ? "navbarListItemNameActive" : ""}>Offers</p>
                    </li>
                    <li  onClick={ () => navigate('/profile')}>
                        <img src={PersonOutlineIcon} alt="Person Outline Icon" width="36px" height="36px" />
                        <p className={pathMatchRoute("profile") ? "navbarListItemNameActive" : ""}>Profile</p>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default NavBar;
