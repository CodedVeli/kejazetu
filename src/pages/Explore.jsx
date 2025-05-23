import { Link } from "react-router-dom";
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import saleCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from "../components/Slider";

const Explore = () => {
    return (
        <div className="explore overflow-scroll">
           <header>
            <p className="pageHeader">Explore</p>
           </header>
           <main>
            <Slider />
            <p className="exploreCategoryHeading">Categories</p>
            <div className="exploreCategories">
                <Link to="/category/rent" className="exploreCategory">
                    <img src={rentCategoryImage} alt="rent" className="exploreCategoryImg" />
                    <p className="exploreCategoryName">Places For Rent</p>
                </Link>
                <Link to="/category/sale" className="exploreCategory">
                    <img src={saleCategoryImage} alt="sale" className="exploreCategoryImg" />
                    <p className="exploreCategoryName">Places For Sale</p>
                </Link>
            </div>
           </main>
        </div>
    );
};

export default Explore;