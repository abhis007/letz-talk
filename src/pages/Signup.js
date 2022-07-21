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

function Signup() {
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
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
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
              }}>
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