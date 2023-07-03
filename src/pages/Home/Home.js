import React from 'react'
import { useSelector } from 'react-redux'

export default function Home(props) {
  const userLogin = useSelector(state => state.UserLoginCyberBugsReducer.userLogin)
  console.log(props)
  return (
    
    <div>
        {userLogin?.name}
        <img src={userLogin?.avatar} />
      Khóa 4 React Router & API</div>
  )
}
