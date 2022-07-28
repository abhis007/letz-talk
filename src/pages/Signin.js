import React, { useEffect, useState } from 'react'
import NavigationBar from '../components/NavigationBar'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';


import { useNavigate } from "react-router-dom";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { collection, doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
const auth = getAuth();

const db = getFirestore()
const login = (email, password, navigate) => {

  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      console.log(browserSessionPersistence)
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithEmailAndPassword(auth, email, password).then((response) => {
       
        console.log('rrr', response)
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        sessionStorage.setItem('UID', response.user.uid)
        sessionStorage.setItem('email', email)
       
        navigate('/home')
      });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
const createDocumentFromAuth = async (userAuth,navigate) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapShot = await getDoc(userDocRef)
  
  if (!userSnapShot.exists()) {
    const {email}   = userAuth
    const createdAt = new Date()
    const displayName = 'Random Guy'

    // try {
    //   await setDoc(userDocRef,{
    //     displayName,
    //     email,
    //     createdAt
    //   })
      
    // } catch (error) {
    //   console.log('Error Creating the user')
    
      
    // }
    navigate('/home',{state:{"user":userSnapShot.data()}})

  } else {
   
        navigate('/home',{state:{"user":userSnapShot.data()}})

  }
}


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/home')
    }

    if (!authToken) {
      navigate('/Signin')
    }
  }, [])
  return (
    <div style={{ background: "#2a2a2a" }}>
      <NavigationBar></NavigationBar>

      <Flex
        minH={'85vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>

        <Stack spacing={8} mx={'auto'} minW={'md'} maxW={'lg'} py={10} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>LetZtalk</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Lets Start <Link color={'blue.400'}>Talking</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={6}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'green.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'green.400'}
                  color={'white'}
                  _hover={{
                    bg: 'green.400',
                  }}
                  onClick={() => login(email, password, navigate)}
                >

                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}