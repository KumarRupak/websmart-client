import React from "react";

export const Alert = (props) => {
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{props.alert.type}</strong>: {props.alert.message}
        
      </div>
    )
  );
};
