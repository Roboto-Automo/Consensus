import React from "react";
import "./GroupFinalResult.css";
import "../../App.css";
import PreFilterSVG from "../../Components/BackgroundSVG/PreFilterSVGPeach";
import { FaLocationArrow } from "react-icons/fa";

export default function GroupFinalResults({ venueData, handleRestart }) {
  return (
    <div className="finalResultsPage">
      <h2 className="enjoy">Enjoy!</h2>
      <div className="resultsCard">
        <h2 className="restaurantName">
          {venueData && venueData[0].venue_name}
        </h2>

        <img
          src={venueData && venueData[0].image_url}
          className="restaurant_image"
          alt="restaurant"
        ></img>
        <div className="textMargin">
          <p>{venueData && venueData[0].address}</p>
          <FaLocationArrow className="venueIcon" />
          <p>{venueData && venueData[0].phone_no}</p>
          <p> User rating: {venueData && venueData[0].user_rating}</p>
          <p>{venueData && venueData[0].website_url}</p>
        </div>
      </div>

      <button className="finalResultsBtn" onClick={handleRestart}>
        Home/Restart
      </button>
      <PreFilterSVG />
    </div>
  );
}
