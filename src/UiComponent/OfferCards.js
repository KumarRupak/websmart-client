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
          <div className="shadow-lg rounded  p-2 text-white bg-dark ">
            <p className=" mb-2 bg-warning text-dark d-flex justify-content-center">{prop.cardType}</p>
            <p>
              Offers : <MdCallMissedOutgoing />
              {prop.cardOffers}
            </p>
            <p>
              Limit Upto : <MdBookmarkBorder /> {prop.creditAmount} ₹ Interest
              Rate {prop.interestRate} ₹
            </p>
           
            <button
              type="button"
              value={prop.cardType}
              onClick={giveTest}
              className="btn btn-danger btn-sm"
            >
              Test Credit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
