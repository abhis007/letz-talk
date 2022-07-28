import React from 'react'
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
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { createRoutesFromChildren } from 'react-router-dom';
import { useState } from 'react';

const auth = getAuth();
const registerUser =(email,password)=>{
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    console.log(userCredential)
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
function Signup() {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  return (
    <div style={{background:"#2a2a2a"}}>
    <NavigationBar></NavigationBar>

  <Flex
    minH={'90vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
        
    <Stack spacing={8} mx={'auto'}  minW={'md'} maxW={'lg'} py={10} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Sign Up Now</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
        And Start  <Link color={'blue.400'}>Talking</Link> ✌️
        </Text>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={e=>setEmail(e.target.value)}/>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={e=>setpassword(e.target.value)} />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox> <Link color={'green.400'}>Yes I am 18 years or older</Link></Checkbox>
             
            </Stack>
            <Button
              bg={'green.400'}
              color={'white'}
              _hover={{
                bg: 'green.400',
              }}
              
              onClick={()=>registerUser(email,password)}
              >
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  </div>
  )
}

export default Signup