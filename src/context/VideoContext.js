import React, { createContext, useState, useRef, useEffect } from 'react'
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { collection, doc, setDoc, getFirestore, getDoc, getDocs, where } from "firebase/firestore";
import ringer from "../sounds/ring.wav";
import ReactDOM from "react-dom";
import Peer from 'peerjs'
import { useNavigate } from 'react-router-dom'
const auth = getAuth();

const db = getFirestore()
export const VideoContext = createContext()
export const VideoProvider = ({ children }) => {

    const [peerId, setPeerId] = useState()
    const [userId, setUserId] = useState('')
    const [remotePeerId, setRemotePeerId] = useState('')
    const [answerCall, setAnswerCall] = useState(false)
    const myVideoRef = useRef('')
    const remoteVideoRef = useRef('')
    const peerInstance = useRef(null)
    const callInstance = useRef(null)
    const [myDetails, setMyDetails] = useState('')
    const audio = new Audio(ringer);
    const [streaming,setStreaming] =useState(false)
    // audio.muted=true

    useEffect(() => {
        console.log('context')
        const peer = new Peer();

        peer.on('open', function (id) {
            setPeerId(id)
            console.log('pid', id, 'usd', userId)


        });
        peer.on('close', function () {
           
            console.log('Connection destroyed');
        });


        peer.on('disconnected', function() { 
            console.log('peer disconnected')
         });
         peer.on('connection', conn => {
        
        
            // this one works
            conn.on('close', () => {
                console.log("conn close event");
                handlePeerDisconnect();
            });
        });

        peer.on('call', (call) => {
            try {

                // audio.loop = true
                audio.play()
            } catch (er) {
                console.log(er)
            }
            setAnswerCall(true)
           

              
                    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                getUserMedia({ video: true, audio: true }, (stream) => {

                        call.answer(stream)

                        myVideoRef.current.srcObject = stream
                        myVideoRef.current.play()
                        setStreaming(true)

                        call.on('stream', function (remoteStream) {
                            remoteVideoRef.current.srcObject = remoteStream
                            remoteVideoRef.current.play()
                        });
                    })

                
      


            call.on('close', function () {
               console.log('closing2')
            });
        })

        peer.on('error', function (err) {
            console.log('error',err)

        });




        peerInstance.current = peer



    }, [])
    useEffect(() => {
        let userId = sessionStorage.getItem('UID')
        let email = sessionStorage.getItem('email')
        if (peerId && myDetails) {
            const userDocRef = doc(db, 'users', userId)
            setDoc(userDocRef, { peerId: peerId }, { merge: true })
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
            setStreaming(true)
            call.on('stream', function (remoteStream) {
                remoteVideoRef.current.srcObject = remoteStream
                remoteVideoRef.current.play()
            });

            
            call.on('close', function () {
                console.log('closing1')
                handlePeerDisconnect()
             });
            callInstance.current = call
        }, function (err) {
            console.log('Failed to get local stream', err);
        });

    }

    function handlePeerDisconnect() {
        // manually close the peer connections
        for (let conns in peerInstance.current.connections) {
            peerInstance.current.connections[conns].forEach((conn, index, array) => {
            console.log(`closing ${conn.connectionId} peerConnection (${index + 1}/${array.length})`, conn.peerConnection);
            conn.peerConnection.close();
            
            // close it using peerjs methods
            if (conn.close)
              conn.close();
          });
        }
    }

    const disconnect = () => {
         callInstance.current.close();
         peerInstance.current.destroy()
        //  dataConnection.close();
         alert('canceling call')
        // call.close();
    }

    const toggleVideo = () => {

            myVideoRef.current.srcObject.getTracks().forEach(function (track) {
            track.enabled = !track.enabled
            });
        

    }
        const toggleMic = () => {

            myVideoRef.current.srcObject.getAudioTracks().forEach(function (track) {
            track.enabled = !track.enabled
            });
        

    }


    const playCall = () => {

        audio.play()


    }

    return <VideoContext.Provider
        value={{disconnect,toggleMic, toggleVideo, playCall, setMyDetails, myDetails, answerCall, peerId, setPeerId, remotePeerId, setRemotePeerId, call, myVideoRef, remoteVideoRef, peerInstance }}>
        {children}
    </VideoContext.Provider>
}


