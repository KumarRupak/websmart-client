import React from 'react'

export const Alert = (prop) => {
  return (
      prop.alert==="true" ?(
    <div>
        <div className={` alert alert-${prop.type} alert-dismissible fade show role="alert" `}>
  <strong>{prop.message}</strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  </div>
    </div>
      ):""
  )
}
