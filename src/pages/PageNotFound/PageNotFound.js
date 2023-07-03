import React from 'react'

export default function PageNotFound(props) {
  return (
    <div className='p-3 m-3'>Content not found with current path: {props.match.url}</div>
  )
}
