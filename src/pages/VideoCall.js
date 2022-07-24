import React, { useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'
import NavigationBar from '../components/NavigationBar'
import { Center, Flex, Spacer, Square, Container,Box,Link,chakra } from '@chakra-ui/react'


function VideoCall() {
    const [peerId, setPeerId] = useState('')
    const [remotePeerId, setRemotePeerId] = useState('')
    const myVideoRef = useRef('')
    const remoteVideoRef = useRef('')
    const peerInstance = useRef(null)
    useEffect(() => {
        const peer = new Peer();
        peer.on('open', function (id) {
            setPeerId(id)
        });

        peer.on('call', (call) => {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({ video: true, audio: true }, (stream) => {
                call.answer(stream)
                myVideoRef.current.srcObject = stream
                myVideoRef.current.play()

                call.on('stream', function (remoteStream) {
                    remoteVideoRef.current.srcObject = remoteStream
                    remoteVideoRef.current.play()
                });
            })
        })

        peerInstance.current = peer



    }, [])
    console.log('peer id', peerId)
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



    console.log(peerId)
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