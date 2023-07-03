import React from 'react'

export default function Detail(props) {
  return (
    <div>
        Giá trị tham số: {props.match.params.id}
        <br></br>
        Patch Name hiện tại: {props.match.path}
    </div>
  )
}
