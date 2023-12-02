import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

function ListingItem({ listing, id, onDelete, onEdit  }) {
 

  
  
  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listing?.imageUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingPrice">
            ${listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3}))/g, ",")
              : listing.regularPrice.toString().replace(/\B(?=(\d{3}))/g, ",")}
            {listing.type === "rent" && "/month"}
          </p>
          <div>
            <div className="categoryListingInfoDiv">
              <img
                src={bedIcon}
                alt="bed icon"
                className="categoryListingFeatureIcon"
              />
              <p className="categoryListingInfoText">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms`
                  : "1 Bedroom"}{" "}
              </p>
              <img
                src={bathtubIcon}
                alt="bathtub icon"
                className="categoryListingFeatureIcon"
              />
              <p className="categoryListingInfoText">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : "1 Bathroom"}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <MdOutlineDelete
          className="deleteIcon "
          onClick={() => onDelete(id)}
       />
      )}
      {onEdit && (
        <CiEdit
          className="editIcon"
          onClick={() => onEdit(id)}
        />
      )}
    </li>
  );
}

export default ListingItem;
