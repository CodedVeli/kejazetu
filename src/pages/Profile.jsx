import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Profile = () => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("useRef", "==", auth.currentUser.uid),
          orderBy("timeStamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const listings = [];
        querySnapshot.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
        console.log(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);



  const onLogOut = () => {
    auth.signOut();
    navigate("/signin");
    toast.success("Logged Out Successfully");
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name: name,
        });
      }
      toast.success("Details Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await deleteDoc(doc(db, "listings", listingId));
        const updatedListings = listings.filter(
          (listing) => listing.id !== listingId
        );
        setListings(updatedListings);
        toast.success("Listing deleted successfully");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }   
  };

  const onEdit = (listingId) => {
    navigate(`/editlisting/${listingId}`);
  }    

  return (
    <div className="profile">
      <header className=" profileHeader">
        <p className="profileHeader">My Profile</p>
        <button className="logOut" onClick={onLogOut}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText"> Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "Save" : "Change"}
          </p>
          <div className="profileCard">
            <form>
              <input
                type="text"
                className={!changeDetails ? "profileName" : "profileNameActive"}
                placeholder="Name"
                id="name"
                value={name}
                onChange={onChange}
                disabled={!changeDetails}
              />
              <input
                type="email"
                className={
                  !changeDetails ? "profileEmail" : "profileEmailActive"
                }
                placeholder="Email"
                id="email"
                value={formData.email}
                onChange={onChange}
                disabled={!changeDetails}
              />
            </form>
          </div>
        </div>
        <Link className="createListing" to="/createlisting">
          <img
            src={homeIcon}
            alt="create listing"
            className="createListingIcon"
          />
          <p className="createListingText">Sell or rent your home</p>
          <img
            src={arrowRight}
            alt="arrow right"
            className="createListingArrow"
          />
        </Link>
        {!loading && listings.length > 0 && (
          <>
            <p className="listingText"> My Listings</p>
            <ul className="listingList">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() =>  onEdit(listing.id) }
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;
