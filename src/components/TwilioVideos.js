import React, { useEffect, useRef } from 'react'
import TwilioVideo from 'twilio-video'

function TwilioVideos({token,room}) {

  
    const localVideoRef = useRef('')
    const remoteVideoRef = useRef('')
    
    function appendNewParticipant(track,identity){
      const chat = document.createElement('div')
      chat.setAttribute("class",identity)
      chat.appendChild(track.attach())
      remoteVideoRef.current.appendChild(chat)
    }
    useEffect(() => {
      TwilioVideo.connect(token,{
        video:true,
        audio:true,

      }).then((room)=>{
        console.log('rom',room)
        TwilioVideo.createLocalVideoTrack().then(
          (track)=>{
            localVideoRef.current.appendChild(track.attach())
          }
        )
       
         function removeParticipant(participant){
          const elem = document.getElementById(participant.identity)
          elem.parentNode.removeChild(elem)

         }
        function addParticipant(participant) {
          participant.tracks.forEach( (publication) => {
            if(publication.isSubscribed){
              console.log(room)
              const track = publication.track;
               
              appendNewParticipant(track,participant.identity)
              console.log('attached')
            }
            
          });
          participant.on('trackSubscribed',track =>{
            appendNewParticipant(track,participant.identity)
          })
        }
        
        room.participants.forEach(addParticipant)
        room.on('participantConnected',addParticipant)
        room.on('participantDisconnected',removeParticipant)

      })
      .catch((e)=>{
        console.log(e)
      })
      
      return () => {
        
      }
    }, [token,room])
    
  return (
    <div>
        <div ref={localVideoRef}>room</div>
        <div ref={remoteVideoRef}>remote</div>
    </div>
  )
}

export default TwilioVideos