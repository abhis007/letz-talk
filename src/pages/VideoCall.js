import React, { useContext, useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'
import NavigationBar from '../components/NavigationBar'
import { Center, Flex, Spacer, Square, Container,Box,Link,chakra } from '@chakra-ui/react'
import {VideoContext, VideoProvider} from '../context/VideoContext'
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { collection, doc, setDoc, getFirestore, getDoc, getDocs ,where} from "firebase/firestore";
import { useLocation } from "react-router-dom"

const auth = getAuth();

const db = getFirestore()
function VideoCall() {
  const {peerId,setPeerId,remotePeerId,setRemotePeerId,call,myVideoRef,remoteVideoRef,peerInstance} = useContext(VideoContext);

  const location = useLocation();
  console.log(location)

  useEffect(() => {
    if(location.state){
    const userDocRef = doc(db, 'users', location.state.user)
    getDoc(userDocRef).then((userSnapShot) => {
        if (userSnapShot.exists()) {
           let remotePeer = userSnapShot.data().peerId
           call(remotePeer)
          
        }
      })
    }

  }, [])
  

    return (
       
        <div><NavigationBar></NavigationBar>


            <Center>
                <h1>Your Room Id :{peerId}</h1>
                <input type='text' value={remotePeerId} onChange={(e) => { setRemotePeerId(e.target.value) }} />
                <button onClick={() => call(remotePeerId)}>call </button>
            </Center>
            <Container maxW='100%'>
                <Flex color='white' >

                    <Flex
                        bg="#edf3f8"
                        _dark={{
                            bg: "#3e3e3e",
                        }}
                        p={50}
                        w="full"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box
                            w="100%"
                            h="100%"
                            bg="white"
                            _dark={{
                                bg: "gray.800",
                            }}
                            shadow="lg"
                            rounded="lg"
                            overflow="hidden"
                            mx="auto"
                        >
                            <video style={{'width':'100%'}} ref={remoteVideoRef} ></video>

                            <Box py={5}   w="90%" h="90%" textAlign="center">
                                <Link
                                    display="block"
                                    fontSize="2xl"
                                    color="gray.800"
                                    _dark={{
                                        color: "white",
                                    }}
                                    fontWeight="bold"
                                >
                                    John Doe
                                </Link>
                                <chakra.span
                                    fontSize="sm"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.200",
                                    }}
                                >
                                   remote
                                </chakra.span>
                            </Box>
                        </Box>
                    </Flex>;
                    <Flex
                        bg="#edf3f8"
                        _dark={{
                            bg: "#3e3e3e",
                        }}
                        p={50}
                        w="full"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box
                            w="100%"
                            h="100%"
                            bg="white"
                            _dark={{
                                bg: "gray.800",
                            }}
                            shadow="lg"
                            rounded="lg"
                            overflow="hidden"
                            mx="auto"
                        >
                            <video style={{'width':'100%'}} ref={myVideoRef}  muted="muted"></video>

                            <Box py={5}   w="90%" h="90%" textAlign="center">
                                <Link
                                    display="block"
                                    fontSize="2xl"
                                    color="gray.800"
                                    _dark={{
                                        color: "white",
                                    }}
                                    fontWeight="bold"
                                >
                                    John Doe
                                </Link>
                                <chakra.span
                                    fontSize="sm"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.200",
                                    }}
                                >
                                    local
                                </chakra.span>
                            </Box>
                        </Box>
                    </Flex>;

                </Flex>
            </Container>

        </div>
        
    )
}

export default VideoCall