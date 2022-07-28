import { useDisclosure, Button, Flex, SimpleGrid, Box, useColorModeValue, Wrap, WrapItem, Container, Text } from '@chakra-ui/react'
import React, { useEffect, useState,useContext } from 'react'
import NavigationBar from '../components/NavigationBar'
import SideBar from '../components/SideBar'
import ProfileUpdatePopup from '../components/ProfileUpdatePopup'
import TopBarLogined from '../components/TopBarLogined'
import UserCard from '../components/UserCard'
import { useLocation } from 'react-router-dom'
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { collection, doc, setDoc, getFirestore, getDoc, getDocs ,where} from "firebase/firestore";
import {VideoContext} from '../context/VideoContext'
import { useNavigate } from "react-router-dom";

const auth = getAuth();

const db = getFirestore()
function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue("gray.100");
  const location = useLocation();
  const [uid, setUid] = useState('')
  const [email, setEmail] = useState('')
  const [allUsers, setAllUSers] = useState([])
  const {peerId,answerCall} = useContext(VideoContext);
  const [myDetails,setMyDetails]=useState('')
  const navigate = useNavigate();
  useEffect(() => {

    let userId = sessionStorage.getItem('UID')
    let email = sessionStorage.getItem('email')
    
    setEmail(email)
    setUid(userId)
  
    const userDocRef = doc(db, 'users', userId)
    console.log(myDetails.length)
if(!myDetails){
    getDoc(userDocRef).then((userSnapShot) => {
      if (!userSnapShot.exists()) {
        const createdAt = new Date()
        onOpen()
      }else{
        // let id = userSnapShot.data().uid
        setMyDetails(userSnapShot.data())
      }
    })

  }

  })
  useEffect(() => {
    let UserList = []
    
    getDocs(collection(db, "users"), where("uid", "!=", uid)).then((querySnapshot) => {
      setAllUSers([]);
      querySnapshot.forEach((doc) => {
      console.log('docs',doc)
        setAllUSers(arr=>[...arr,doc.data()]);
      })

    });
  
   
      console.log(allUsers)
    
  }, [])

  useEffect(()=>{
    let userId = sessionStorage.getItem('UID')
    let email = sessionStorage.getItem('email')
    const userDocRef = doc(db, 'users',userId)
    if(peerId && myDetails)
     setDoc(userDocRef,{peerId:peerId},{ merge: true })
     console.log('asdasd',allUsers)
  },[peerId])

  useEffect(()=>{
    if(answerCall)
      navigate('/Video')
    else
    navigate('/Home')
  },[answerCall])

  return (
    
  <Box bg={bg}  pb='100'>
      <TopBarLogined />
      <ProfileUpdatePopup isOpen={isOpen} onOpen={onOpen} onClose={onClose} uid={uid} email={email}></ProfileUpdatePopup>
      {/* <Button onClick={onOpen}>Modal</Button> */}

      <div style={{ 'margin-left': '9%', 'margin-right': '9%', 'margin-top': '10px' }}>
        <Container maxW='container.xxl' >
          <Text fontSize='xl'>SHOWING ALL CURRENTLY AVAILABLE USERS</Text>
          <br></br>
          <Wrap spacing='30px'>
            {
              allUsers.map((user) => {
 
                if(user.uid !=uid)
                  return (<WrapItem  key={`asd`+user.uid}><UserCard  key={user.uid}  user={user}/></WrapItem>)
              })
            }

          </Wrap>
          
        </Container >
      </div>


    </Box>
  )
}

export default Home