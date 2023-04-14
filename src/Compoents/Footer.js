import {
    Box,
    Stack,
    HStack,
    VStack,
    Link,
    Divider,
    Image,
    Text,
  } from '@chakra-ui/react';
  // Here we have used react-icons package for the icons
  import { FaGithub } from 'react-icons/fa';
//   import { BsDiscord } from 'react-icons/bs';

import logo from "../Images/logo1.png"
import "./Footer.css"
  
  const Footer = () => {
    return (
      <Box p={{ base: 5, md: 8 }}  marginInline="auto">
        <Stack
          spacing={{ base: 8, md: 0 }}
          justifyContent="space-between"
          direction={{ base: 'column', md: 'row' }}
        >
          <Box maxW="450px">

            <div className="heading1">

            <Image w="70px"  src={logo} alt="TemplatesKart" />

            <Text as='b' fontSize="2xl" p={3} >Kanban Board</Text>

            </div>

            <Text mt={2} color="gray.500" fontSize="md">
            Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique accomplish it all with Kanban Board.
            </Text>
          </Box>
          <HStack
            spacing={10}
            d={{ base: 'none', sm: 'flex' }}
            justifyContent={{ sm: 'space-between', md: 'normal' }}
          >
            <VStack spacing={4} alignItems="flex-start">
              <Text fontSize="md" fontWeight="bold">
                About Me
              </Text>
              <VStack spacing={2} alignItems="flex-start" color="gray.500">
                <Text>Parth Mandhare</Text>
                <Text>IT Student</Text>
                <Text>Tech enthusiast</Text>
                <Text>Nagpur</Text>
              </VStack>
            </VStack>
            <VStack spacing={4} alignItems="flex-start">
              <Text fontSize="md" fontWeight="bold">
                Community
              </Text>

              <VStack spacing={2} alignItems="flex-start" color="gray.500">
              <Link
              href="https://parthmandhare.github.io/parthmandhare/"
              isExternal>
              Portfolio
            </Link>
              <Link
              href="https://github.com/Parthmandhare"
              isExternal>
              Github
            </Link>
              <Link
              href="https://www.linkedin.com/in/parth-mandhare-1977001a1"
              isExternal>
              LinkdIn
            </Link>
            <Link
              href="https://twitter.com/ParthMandhare12?t=3S9FtKwkZv2bEMikmYp_Nw&s=09"
              isExternal>
              Twitter
            </Link>
            
              </VStack>
            </VStack>
            <VStack spacing={4} alignItems="flex-start">
              <Text fontSize="md" fontWeight="bold">
                Projects
              </Text>
              <VStack spacing={2} alignItems="flex-start" color="gray.500">
                <Text>Personal Portfolio</Text>
                <Text>College Recommendation System</Text>
                <Text>Login/Signup Page (backend)</Text>
                <Text>Kanban Board</Text>
              </VStack>
            </VStack>
          </HStack>
        </Stack>
  
        <Divider my={4} />
  
        <Stack className='footer-end' direction={{ base: 'column', md: 'row' }} spacing={3} justifyContent="space-between">
          <Text fontSize="md">
            Built by{' '}
            <Link
              href="https://github.com/Parthmandhare"
              textDecoration="underline"
              _hover={{ textDecoration: 'underline' }}
              isExternal
            >
              Parth Mandhare
            </Link>
          </Text>
          <Stack spacing={8} direction={{ base: 'column', md: 'row' }}>
            <ul>
                <li><Text>parthmandhare12@gmail.com</Text></li>
            </ul>
            <ul>
                <li><li><Text pr={10}>9657380073</Text></li></li>
            </ul>
            
          </Stack>
        </Stack>
      </Box>
    );
  };
  
  export default Footer;