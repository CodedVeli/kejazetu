import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import Spinner from "./Spinner";

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timeStamp", "desc"), limit(5));
      const querySnap = await getDocs(q);

      console.log("Query Snapshot:", querySnap);
      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      console.log(listings);
      setListings(listings);
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <> </>;
  }

  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended</p>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {listings.map((data, id) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.data.type}/${data.id}`)}
            >
              {console.log(data.data.regularPrice)}
              <img
                style={{
                  background: ` center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="swiperSlideDiv"
                src={data.data.imageUrls[0]}
              />

              <p className="swiperSlideText">{data.data.name}</p>
              <p className="swiperSlidePrice">
                ${data.data.discountedPrice ?? data.data.regularPrice}
                {data.data.type === "rent" && "/month"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider;
