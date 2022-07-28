import React from "react";
import { Box, Flex, Icon, Image, chakra,Button ,SimpleGrid} from "@chakra-ui/react";

import { MdEmail, MdHeadset, MdLocationOn } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";

import { MdBuild , MdCall } from "react-icons/md"
import { useNavigate } from "react-router-dom";
function gotoVideo(navigate,uid){
    navigate('/Video',{state:{user:uid}})
}

function UserCard({user}) {
    const navigate = useNavigate();
    return (
        <Flex

        >
          <Box
            w="sm"
            mx="auto"
            bg="white"
            _dark={{ bg: "gray.800" }}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
          >
            <Image
              w="full"
              h={56}
              fit="cover"
              objectPosition="center"
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
              alt="avatar"
            />
    
            <Flex alignItems="center" px={6} py={3} bg="gray.900">
              <Icon as={MdHeadset} h={6} w={6} color="white" />
        
              <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
                {user.category}
              </chakra.h1>
            </Flex>
    
            <Box py={4} px={6}>             
              <chakra.h1
                fontSize="xl"
                fontWeight="bold"
                color="gray.800"
                _dark={{ color: "white" }}
              >
                {user.name}
              </chakra.h1>
    
              <chakra.p py={2} color="gray.700" _dark={{ color: "gray.400" }} >
              {user.about}
              </chakra.p>
    
              <SimpleGrid columns={2} spacing={10} mt={2}>
                 <Button  variant='outline' colorScheme='blue' >View Profile</Button>
                 <Button rightIcon={<MdCall />} colorScheme='teal'  onClick={()=>{gotoVideo(navigate,user.uid)}}>
    Call Now
  </Button>
              </SimpleGrid>
    
             
            </Box>
          </Box>
        </Flex>
      );
}

export default UserCard