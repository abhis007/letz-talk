import axios from 'axios'
import React from 'react'

function Signin({setToken,setRoom,setName,name,room}) {

   

    async function  handleSubmit(event){
        event.preventDefault()
        const result = await axios.post('https://letstalk-9129-dev.twil.io/video-token',{
            identity:name,
            room
        })
        setToken(result.data)
        console.log('token',result.data)
    }
  return (
   <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' value={name} onChange={e=>setName(e.target.value)}/>
      <label htmlFor='room'>room</label>
      <input type='text' id='room' value={room} onChange={e=>setRoom(e.target.value)}/>
      <br/>
      <button type='submit'>Join the chat</button>
   </form>
  )
}

export default Signin