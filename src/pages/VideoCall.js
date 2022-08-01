import React, { useContext, useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'
import NavigationBar from '../components/NavigationBar'
import { Center, Flex, Spacer, Square, Container, Box, Link, chakra, SimpleGrid, HStack,Button } from '@chakra-ui/react'
import { VideoContext, VideoProvider } from '../context/VideoContext'
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { collection, doc, setDoc, getFirestore, getDoc, getDocs, where } from "firebase/firestore";
import { useLocation } from "react-router-dom"
import TopBarLogined from '../components/TopBarLogined'
import { FaBeer ,FaVolumeMute,FaPhoneSlash,FaVideoSlash,FaMicrophoneSlash,FaVideo} from 'react-icons/fa';

import { FcEndCall } from "react-icons/fc";

const auth = getAuth();

const db = getFirestore()
function VideoCall() {
    const { myDetails, peerId, setPeerId, remotePeerId, setRemotePeerId, call, myVideoRef, remoteVideoRef, peerInstance } = useContext(VideoContext);

    const location = useLocation();
    console.log(location)
    const [remoteUser, setRemoteUser] = useState()
    useEffect(() => {
        if (location.state) {
            const userDocRef = doc(db, 'users', location.state.user)
            getDoc(userDocRef).then((userSnapShot) => {
                if (userSnapShot.exists()) {
                    let remotePeer = userSnapShot.data().peerId
                    setRemoteUser(userSnapShot.data())
                    call(remotePeer)
                    console.log('asd', remoteUser)

                }
            })
        }

    }, [])


    return (

        <div style={{ background: '#2a2a2a', height: '100%' }}>
            <TopBarLogined></TopBarLogined>
            <SimpleGrid minChildWidth={['50vw','40vw']} maxChildWidth={['90vw','50vw']}   spacing={['8vh','5vh']} p={[10,10]} columns={2} >

                <Box bg='#3c3c3c' h={['30vh','75vh']} p={5} br={10} rounded='lg'>
                    <video style={{ width: '100%', height: '100%', objectFit: 'cover' }} ref={remoteVideoRef}></video>
                    <Flex minWidth='max-content' alignItems='center' gap='1' flexDirection='column'>
                        <Box mt="5%">
                            <chakra.h2
                                fontSize={{
                                    base: "md",
                                    md: "xs",
                                    lg:"xl"
                                }}
                                color="white"
                                _dark={{
                                    color: "white",
                                }}
                                fontWeight="bold"
                            >{remoteUser ? remoteUser.name : 'Name'} </chakra.h2>
                        </Box>
                        <Box>
                            <chakra.h4
                                fontSize={{
                                    base: "sm",
                                    md: "xs",
                                }}
                                color="white"
                                _dark={{
                                    color: "white",
                                }}
                                fontWeight="bold"
                            >  {remoteUser ? remoteUser.category : 'cateory'}  </chakra.h4>
                        </Box>

                    </Flex>

                </Box>
                <Box bg='#3c3c3c' h={['30vh','75vh']} p={5} br={10} rounded='lg'>
                    <video style={{ width: '100%', height: '100%', objectFit: 'cover' }} ref={myVideoRef} muted="muted"></video>
                    <Flex minWidth='max-content' alignItems='center' gap='1' flexDirection='column'>
                        <Box mt={["5%"]}>
                            <chakra.h2
                                 fontSize={{
                                    base: "md",
                                    md: "xs",
                                    lg:"xl"
                                }}
                                color="white"
                                _dark={{
                                    color: "white",
                                }}
                                fontWeight="bold"
                            >{myDetails ? myDetails.name : 'user name'} </chakra.h2>
                        </Box>
                        <Box>
                            <chakra.h4
                                fontSize={{
                                    base: "sm",
                                    md: "xs",
                                }}
                                color="white"
                                _dark={{
                                    color: "white",
                                }}
                                fontWeight="bold"
                            > {myDetails ? myDetails.category : 'user category'} </chakra.h4>
                        </Box>

                    </Flex>

                </Box>
            </SimpleGrid>
            <Box alignItems='center'  justifyContent='center' style={{     background: '#97898b4f', borderRadius: '100px' }}h={['8vh','10vh']} w={['80vw','30vw']}  ml={ ['10vw','37vw']}    pos="sticky" bottom={["0","0"]}  >


                {/* <Flex minWidth='max-content' alignItems='center' p='3%' gap='1' flexDirection='row'>
                      <Center><Box > 
                            
                           </Box>
                           </Center> 
                           </Flex> */}

<SimpleGrid columns={3} spacing={[30,10]} justifyContent='center' pl={[0,'5%']} pt='5%' >
                    <Box   h='50px'   alignItems='center'   textAlign='center' >
                   
                     <Button leftIcon={<FaMicrophoneSlash /> } colorScheme='blue' variant='solid'>
                       
                      </Button>  
                    </Box>
                    <Box  h='50px'  >
                     <Button leftIcon={<FaPhoneSlash />} colorScheme='red' variant='solid'>
                       
                      </Button>  
                    </Box>
                    <Box  h='50px' >
                    <Button leftIcon={<FaVideoSlash />} colorScheme='pink' variant='solid'>
                       
                       </Button>  
                    </Box>
                </SimpleGrid>

            </Box>
        </div>



    )
}

export default VideoCall