import React, { createContext, useState, useRef,useEffect} from 'react'
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { collection, doc, setDoc, getFirestore, getDoc, getDocs ,where} from "firebase/firestore";
import ringer from "../sounds/ring.wav";
import ReactDOM from "react-dom";
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
    const [myDetails,setMyDetails]=useState('')
    const audio = new Audio(ringer);
    
    // audio.muted=true
 
    useEffect(() => {
        console.log('context')
        const peer = new Peer();
    
        peer.on('open', function (id) {
            setPeerId(id)
            console.log('pid',id,'usd',userId)
          
          
        });

     
        peer.on('call', (call) => {
          try{
             
            audio.loop=true
            audio.play()
          }catch(er){
            console.log(er)
          }
            setAnswerCall(true)     
            setTimeout(function(){
               
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
    },0)
        })

        peer.on('error', function(err) { console.log(err)
             
         });


        peerInstance.current = peer



    }, [])
    useEffect(()=>{
        let userId = sessionStorage.getItem('UID')
        let email = sessionStorage.getItem('email')
        if(peerId && myDetails ){
         const userDocRef = doc(db, 'users',userId)
         setDoc(userDocRef,{peerId:peerId},{ merge: true })
        }
        //  console.log('asdasd',allUsers)
      })
    
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

    const playCall=()=>{
         
        audio.play()
        

    }

 return <VideoContext.Provider
 value={{playCall,setMyDetails,myDetails,answerCall,peerId,setPeerId,remotePeerId,setRemotePeerId,call,myVideoRef,remoteVideoRef,peerInstance}}>
    {children}
 </VideoContext.Provider>
}


