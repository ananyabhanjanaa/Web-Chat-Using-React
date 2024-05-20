import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Chat } from '../components/Chat'

export const Home = () =>{
  return(
    <div className="home">
      <div className="cont">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home