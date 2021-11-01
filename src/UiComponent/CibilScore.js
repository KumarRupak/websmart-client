import React from "react";

export const CibilScore = (prop) => {
  return (
    <div>
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">Your Scored</div>
        </div>
        <span class="badge bg-primary rounded-pill">{prop.score}</span>
      </li>

      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">Payment History</div>
        </div>
        <span class="badge bg-primary rounded-pill">
          {String(prop.parameter1).includes("Yes") ? 100 : 0}
        </span>
      </li>

      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">Credit Exposure</div>
        </div>
        <span class="badge bg-primary rounded-pill">
          {String(prop.parameter2).includes("Yes") ? 100 : 0}
        </span>
      </li>

      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">Other Factors</div>
        </div>
        <span class="badge bg-primary rounded-pill">
          {String(prop.parameter3).includes("Yes") ? 100 : 0}
        </span>
      </li>

      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">Credit Type and Duration history</div>
        </div>
        <span class="badge bg-primary rounded-pill">
          {String(prop.parameter4).includes("Yes") ? 100 : 0}
        </span>
      </li>

      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">Eligible Loans</div>
          <br />
          {prop.eligibleLoans}
        </div>
      </li>
    </div>
  );
};
