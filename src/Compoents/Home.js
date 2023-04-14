import React, { } from 'react'
import "./Home.css"
import { BiMenuAltLeft } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom'
import Footer from './Footer.js';


import img4 from "../Images/image4.jpg"
import img5 from "../Images/image5.png"
import img6 from "../Images/image6.svg"
import img7 from "../Images/image7.webp"

import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    VStack,
    Text,
  } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import {ArrowUpRight } from 'react-feather';


const Home = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const navigate = useNavigate();

    const navigatetoBoard = () => {
      // 👇️ navigate to /
      navigate('/kanbanboard');
    };
    const navigatetoHome = () => {
      // 👇️ navigate to /
      navigate('/');
    };

    

  return (
   <>

   {/* navbar */}
    <div className="navbar">
        <div>
        <Button
        zIndex={'overlay'}
        pos={'fixed'}
        top={'4'}
        left={'4'}
        colorScheme="purple"
        p={'0'}
        w={'10'}
        h={'10'}
        borderRadius={'full'}
        onClick={onOpen}
      >
        <BiMenuAltLeft size={'20'} />
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Kanban Board</DrawerHeader>
          <DrawerBody>
            <VStack alignItems={'flex-start'}>
              <Button
                onClick={onClose}
                variant={'ghost'}
                colorScheme={'purple'}
              >
                <Link to={'/'}>Home</Link>
              </Button>

              <Button
                onClick={onClose}
                variant={'ghost'}
                colorScheme={'purple'}
              >
                <Link to={'/Kanbanboard'}>Kanban Board</Link>
              </Button>


              <Button
                onClick={onClose}
                variant={'ghost'}
                colorScheme={'purple'}
              >
                <Link to={"https://parthmandhare.github.io/parthmandhare/"}>Contact</Link>
              </Button>
            </VStack>

          </DrawerBody>
        </DrawerContent>
      </Drawer>
        </div>

<Text fontSize='4xl' as='b' className='navbar_title' onClick={navigatetoHome}>Kanban Board</Text>

    
    </div>


    {/* page1 */}

    <div className="page1">
      <div className="page1_title">
        <Text fontSize={{ base: "4xl", md: "5xl" }} as='b' className='text_title' >A Powerful Project Management Solution Made For Growing Teams</Text>
        <Text fontSize={{ base: "2xl", md: "2xl" }} className='text_title2'>Break down complex projects with comprehensive software that enables your teams to collaborate, plan, analyze and manage everyday tasks.</Text>

        <Button colorScheme='purple' size='lg'  p={6} onClick={navigatetoBoard}> 
        Try Now <ArrowUpRight/>
      </Button>

        
      </div>
      <div className="page1_image">
        <img src={img4} alt="not found" />
      </div>  
    </div>

    {/* page2 */}

    <div className="page2">
      <div className="page2_title">
      <Text fontSize='4xl' as='b' className='page2_title_text'>Features to help your team succeed</Text>
      <Text fontSize='2xl' className='page2_title_text2'>Create Kanban boards for projects to enhance workflow and declutter your work <br/> tasks in just a few clicks.</Text>
      </div>
      

      <div className="feature1">
        <div className="feature1_img">
          <img src={img7} alt="image not found" />
        </div>
        <div className="feature1_content">
        <Text fontSize='3xl'  as='b' className='feature1_content1'>Just Drag and Drop with Kanban <br/> Boards</Text>
        <Text fontSize='2xl' className='feature1_content2'>Run any process or project to manage your work on Kanban Boards for continuous delivery, more flexibility, and 4x efficiency to help your team to maintain focus.</Text>
        </div>
      </div>
      <hr/>

      <div className="feature2">
        <div className="feature2_content">
        <Text fontSize='3xl'  as='b' className='feature2_content1'>Customize Statuses</Text>
        <Text fontSize='2xl' className='feature2_content2'>Define custom statuses for projects in Kanban Board that reflects your task completion stage. It helps to plan, organize, and track all of team’s work according to status labels.</Text>
        </div>
        <div className="feature2_img">
          <img src={img6} alt="image not found" />
        </div>
      </div>
      <hr/>

      <div className="feature3">
        <div className="feature3_img">
          <img src={img5} alt="image not found" />
        </div>
        <div className="feature3_content">
        <Text fontSize='3xl'  as='b' className='feature3_content1'>Fully Scalable and Customizable Workflows</Text>
        <Text fontSize='2xl' className='feature3_content2'>Kanban board feature is built to adapt and scale to any business use case. Change background, customize card settings, edit columns and match your branding guidelines.</Text>
        </div>
      </div>
      <hr/>

    </div>

    
    <Footer/>
      
   </>
  )
}

export default Home