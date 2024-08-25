import React, { useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
const Card = ({ video }) => {
  const [ishover, setIsHover] = useState(false);
  return (
    <div className="card_top">
      <Link to={`/video/${video._id}`}>
        <div className="card_top_img_wrapper">
          <img
            src="https://i.ytimg.com/vi/3-sV2z_rouY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD6R7n3PQ5LSeZLPonI_i5OuFpQ_A"
            alt=""
          />
        </div>
      </Link>
      <div className="card_bottom">
        <div className="card_bottom_upper">
          <div>
            <img
              src="https://yt3.ggpht.com/oVPW1V84_9gNDwKDnGuyeBgkRd9aY0JJ7l_hkTu_9W0wyxFT1-90dQQbMzHgFxwu_Lkif7jvDA=s68-c-k-c0x00ffffff-no-rj"
              alt="mehul"
            />
          </div>
          <span>
            5 Backend Projects | Ideas for Building Great Backend Projects{" "}
          </span>
          {/* {ishover && <i onClick=""></i>} */}
        </div>
        <div className="card_bottom_lower">
          <span>Mehul-codedam</span> <br />
          <span>`` views 1 year ago</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
