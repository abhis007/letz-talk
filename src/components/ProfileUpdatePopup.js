import React, { useState } from 'react'
import {
  Center, Flex, Spacer, Square, Container, Box, Link, chakra,
  SimpleGrid, Text, RadioGroup, Stack, Radio, GridItem, Divider, Checkbox, Heading,
  FormControl, FormLabel, Input, Button, Textarea, FormHelperText, InputGroup, InputLeftAddon, Avatar, Icon, VisuallyHidden, Select,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
} from '@chakra-ui/react'
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { collection, doc, setDoc, getFirestore, getDoc } from "firebase/firestore";

const db = getFirestore()
const createDocumentFromAuth = async (userDetails,close) => {
  const userDocRef = doc(db, 'users', userDetails.uid)
  const userSnapShot = await getDoc(userDocRef)


 
  const createdAt = new Date()
  const displayName = 'Random Guy'

  try {
    await setDoc(userDocRef,userDetails)
    alert('done')
    close()

  } catch (error) {
    console.log('Error Creating the user')


  }
  // navigate('/home',{state:{"user":userSnapShot.data()}})


}

function ProfileUpdatePopup({ isOpen, onOpen, onClose,uid,email }) {
  
  const [name, setName] = useState('')
  const [about,setAbout] = useState('')
  const [category,setCategory] = useState('')


  return (
    <>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update You Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder='First name'  onChange={(e)=>setName(e.target.value)}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>About You</FormLabel>
              <Textarea placeholder='Tell Us Something About You' onChange={(e)=>setAbout(e.target.value)}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Select the category suit you the best</FormLabel>
              <Select placeholder='Select option' onChange={(e)=>setCategory(e.target.value)}>
                <option value='Youtuber'>Youtuber</option>
                <option value='Influencer'>Influencer</option>
                <option value='Celebrity'>Celebrity</option>
                <option value='Photographer'>Photographer</option>
                <option value='Dancer'>Dancer</option>
                <option value='Musician'>Musician</option>
                <option value='Chef'>Chef</option>
                <option value='Martial Artist'>Martial Artist</option>
                <option value='Software Engineer'>Software Engineer</option>
                <option value='Doctor'>Doctor</option>
                <option value='Other Professional'>Other Professional</option>
              </Select>
            </FormControl>


          </ModalBody>


          <ModalFooter>
            {onClose ? <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button> : ''}
            <Button variant='outline' colorScheme='green' onClick={()=>createDocumentFromAuth({uid,name,email,about,category},onClose)} >Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )

}

export default ProfileUpdatePopup