import React, { createContext, useState, useRef,useEffect} from 'react'
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { collection, doc, setDoc, getFirestore, getDoc, getDocs ,where} from "firebase/firestore";

import Peer from 'peerjs'
import { useNavigate } from 'react-router-dom'
const auth = getAuth();

const db = getFirestore()
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
        console.log('context')
        const peer = new Peer();
        if(peerId){
            peer.reconnect(peerId)
        }
        peer.on('open', function (id) {
            setPeerId(id)
            console.log('pid',id,'usd',userId)
        });

        peer.on('call', (call) => {
            setAnswerCall(true)     
            alert('incoming call')
            
          
            if (window.confirm("Answer?")) {
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
           
                setTimeout( getUserMedia({ video: true, audio: true }, (stream) => {
               
                call.answer(stream)
                myVideoRef.current.srcObject = stream
                myVideoRef.current.play()

                call.on('stream', function (remoteStream) {
                    remoteVideoRef.current.srcObject = remoteStream
                    remoteVideoRef.current.play()
                });
            }), 5000);
                
        }
        })

        peer.on('error', function(err) { console.log(err)
             
         });


        peerInstance.current = peer



    }, [])
    useEffect(()=>{
        let userId = sessionStorage.getItem('UID')
        let email = sessionStorage.getItem('email')
       
        if(peerId && userId ){
         const userDocRef = doc(db, 'users',userId)
         setDoc(userDocRef,{peerId:peerId},{ merge: true })
        }
        //  console.log('asdasd',allUsers)
      },[peerId])
    
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


