import React from "react";
import { MdBookmarkBorder, MdCallMissedOutgoing, MdLoop } from "react-icons/md";
import { useHistory } from "react-router";

export const OfferCards = (prop) => {
  const history = useHistory();

  const giveTest = (e) => {
    localStorage.setItem("cardType", e.target.value);
    history.push("/credittest");
  };

 

  return (
    <>
      <div className={`carousel-item ${prop.status===1?"active":""}`}>
        <div className="d-flex justify-content-center">
          <div className="shadow-lg rounded bg-dark text-light py-1  px-5  ">
            <p className=" mb-2 bg-warning text-dark d-flex justify-content-center">{prop.cardType}</p>
            <p>
              Book Name : {prop.bookName}
            </p>
            <p>
              Top Downloads : <MdBookmarkBorder /> {prop.rank} 
            </p>
           
          </div>
        </div>
      </div>
    </>
  );
};
