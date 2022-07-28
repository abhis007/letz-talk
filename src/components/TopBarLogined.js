import React, { useState } from "react";

import {
    chakra,
    Box,
    Flex,
    useColorModeValue,
    VisuallyHidden,
    HStack,
    Button,
    useDisclosure,
    VStack,
    IconButton,
    CloseButton,
    Avatar,
    FormControl,
    FormLabel,
    Switch
} from "@chakra-ui/react";
// import { Logo } from "@choc-ui/logo";
import {
    AiOutlineMenu,
    AiFillHome,
    AiOutlineInbox,
    AiFillBell,
} from "react-icons/ai";
import { BsFillCameraVideoFill, BsPlus } from "react-icons/bs";

export default function TopBarLogined() {
    const bg = useColorModeValue("gray.800");
    const mobileNav = useDisclosure();
    const [status, setStatus] = useState('Offline')

    return (
        <React.Fragment>
            <chakra.header
                bg={bg}
                w="full"
                px={{ base: 2, sm: 4 }}
                py={4}
                shadow="md"
            >
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <HStack display="flex" spacing={3} alignItems="center">
                        <Box display={{ base: "inline-flex", md: "none" }}>
                            <IconButton
                                display={{ base: "flex", md: "none" }}
                                aria-label="Open menu"
                                fontSize="20px"
                                color="gray.100"
                                _dark={{ color: "white" }}
                                variant="ghost"
                                icon={<AiOutlineMenu />}
                                onClick={mobileNav.onOpen}
                            />
                            <VStack
                                pos="absolute"
                                top={0}
                                left={0}
                                right={0}
                                display={mobileNav.isOpen ? "flex" : "none"}
                                flexDirection="column"
                                p={2}
                                pb={4}
                                m={2}
                                bg='gray.100'
                                spacing={3}
                                rounded="sm"
                                shadow="sm"
                            >
                                <CloseButton
                                    aria-label="Close menu"
                                    justifySelf="self-start"
                                    onClick={mobileNav.onClose}
                                />
                                <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
                                    Home
                                </Button>
                                <Button
                                    w="full"
                                    variant="ghost"

                                    leftIcon={<AiFillHome />}
                                >
                                    Explore
                                </Button>
                                <Button
                                    w="full"
                                    variant="ghost"
                                    leftIcon={<BsFillCameraVideoFill />}
                                >
                                    Streams
                                </Button>
                                <Button
                                    w="full"
                                    variant="ghost"
                                    leftIcon={<BsFillCameraVideoFill />}
                                >
                                   Wallet
                                </Button>
                            </VStack>
                        </Box>
                        <chakra.a
                            href="/"
                            title="Choc Home Page"
                            display="flex"
                            alignItems="center"
                            color='white'
                        >
                            <chakra.h1 fontSize="3xl" fontWeight="medium" fontFamily={'Squada One'} color={'white'} ml="5">
                                Letztalk
                            </chakra.h1>
                        </chakra.a>

                        <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
                            <Button variant="solid" ml={10} leftIcon={<AiFillHome />} size="sm">
                                Home
                            </Button>
                            <Button
                                variant="solid"
                                colorScheme="brand"
                                leftIcon={<AiOutlineInbox />}
                                size="sm"
                            >
                                Explore
                            </Button>
                            <Button
                                colorScheme="brand"
                                leftIcon={<BsFillCameraVideoFill />}
                                size="sm"

                            >
                                Streams
                            </Button>
                            <Button
                                colorScheme="brand"
                                leftIcon={<BsPlus />}
                                size="sm"

                            >
                                Wallet
                            </Button>
                        </HStack>
                    </HStack>
                    <HStack
                        spacing={3}
                        display={mobileNav.isOpen ? "none" : "flex"}
                        alignItems="center"
                    >
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='status' color='white' mb='0'>
                                {status}
                            </FormLabel>
                            <Switch id='status' onChange={() => { (status == 'Offline' ? setStatus('Online') : setStatus('Offline')) }} />

                        </FormControl>
                        {/* <Button colorScheme="brand" leftIcon={<BsPlus />}>
             My Wallet
            </Button> */}

                        <chakra.a
                            p={3}
                            color="gray.800"
                            _dark={{ color: "inherit" }}
                            rounded="sm"
                            _hover={{ color: "gray.800", _dark: { color: "gray.600" } }}
                        >
                            <AiFillBell />
                            <VisuallyHidden>Notifications</VisuallyHidden>
                        </chakra.a>

                        <Avatar
                            size="sm"
                            name="Dan Abrahmov"
                            src="https://bit.ly/dan-abramov"
                        />
                    </HStack>
                </Flex>
            </chakra.header>
        </React.Fragment>
    );
};
