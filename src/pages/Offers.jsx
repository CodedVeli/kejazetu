import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

const Offers = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null); 


  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timeStamp", "desc"),
          limit(10)
        );

        const querySnapshot = await getDocs(q);

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
        setLastFetchedListing(lastVisible);

        const listings = [];
        querySnapshot.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        });

        setListings(listings);
        setLoading(false);
        toast.success("Listings fetched successfully");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    fetchListings();
  }, []);

  const fetchMoreListings = async () => {
    try {
      // create a ref to the listings collection
      const listingsRef = collection(db, "listings");

      // create a query 
      const q = query(
        listingsRef,
        where("offer", "==", true),
        orderBy("timeStamp", "desc"),
        startAfter(lastFetchedListing),
        limit(10)
      );

      // get the query snapshot
      const querySnapshot = await getDocs(q);

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
      setLastFetchedListing(lastVisible);
      
      const listings = [];
      querySnapshot.forEach((doc) => {
          return listings.push({
              id: doc.id,
              data: doc.data(),
             
            })
      });

      setListings((prevState) => [...prevState, ...listings]);
      console.log(listings);
      setLoading(false);
      toast.success("Listings fetched successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          Offers
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
              <ul className=" categoryListings">
                {listings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                ))}
            </ul>
          </main>
          <br />
          <br />
          {lastFetchedListing && (
            <p className="loadMore" onClick={fetchMoreListings}>Load More</p>) }

        </>
      ) : (
        <p> There are no current offers</p>
      )}
    </div>
  );
};

export default Offers;
