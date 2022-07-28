import React, { createContext, useState, useRef,useEffect} from 'react'


import Peer from 'peerjs'
import { useNavigate } from 'react-router-dom'
export const VideoContext = createContext()
export const VideoProvider =({children})=>{
    
    const [peerId, setPeerId] = useState()
    const [userId,setUserId]        = useState('')
    const [remotePeerId, setRemotePeerId] = useState('')
    const [answerCall,setAnswerCall] =useState(false)
    const myVideoRef = useRef('')
    const remoteVideoRef = useRef('')
    const peerInstance = useRef(null)
    useEffect(() => {
        const peer = new Peer();
        if(peerId){
            peer.reconnect(peerId)
        }
        peer.on('open', function (id) {
            setPeerId(id)
            console.log('pid',id,'usd',userId)
        });

        peer.on('call', (call) => {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            setAnswerCall(true)     
            alert('incoming call')
            if (window.confirm("Answer?")) {
            getUserMedia({ video: true, audio: true }, (stream) => {
               
                call.answer(stream)
                myVideoRef.current.srcObject = stream
                myVideoRef.current.play()

                call.on('stream', function (remoteStream) {
                    remoteVideoRef.current.srcObject = remoteStream
                    remoteVideoRef.current.play()
                });
            })
        }
        })

        peer.on('error', function(err) { console.log(err)
             
         });


        peerInstance.current = peer



    }, [])
 
    const call = (remoteUID) => {
        alert(remoteUID)

        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia({ video: true, audio: true }, (stream) => {
            var call = peerInstance.current.call(remoteUID, stream);
            myVideoRef.current.srcObject = stream
            myVideoRef.current.play()

            call.on('stream', function (remoteStream) {
                remoteVideoRef.current.srcObject = remoteStream
                remoteVideoRef.current.play()
            });
        }, function (err) {
            console.log('Failed to get local stream', err);
        });

    }

    const disconnect =()=>{

    }

 return <VideoContext.Provider
 value={{answerCall,peerId,setPeerId,remotePeerId,setRemotePeerId,call,myVideoRef,remoteVideoRef,peerInstance}}>
    {children}
 </VideoContext.Provider>
}


