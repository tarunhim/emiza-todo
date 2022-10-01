import './App.css';
import {
  BrowserRouter,
  Routes,
  Route, Link
} from "react-router-dom";
import { Flex, Spacer,Button,Box,ButtonGroup,Heading } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import { useDisclosure,FormControl,FormLabel,Input } from '@chakra-ui/react'
import { Login } from "./Components/Login"
import { Register } from "./Components/Register"
import { Notes } from './Components/Notes';
import { Logout } from './Components/Logout';
import { useState } from 'react';


function App() {
  const { isOpen:isropen, onOpen:onropen, onClose:onrclose } = useDisclosure()
  const { isOpen:islopen, onOpen:onlopen, onClose:onlclose } = useDisclosure()
  const { isOpen:isloopen, onOpen:onloopen, onClose:onloclose } = useDisclosure()
  const usernam = localStorage.getItem("username")
  const [username,setusername] = useState(usernam)
  return (
    <div className="App">
      <Flex maxWidth="100%" alignItems='center' justifyContent={"space-around"} gap='2' backgroundColor={"blackAlpha.100"}>
        <Box p='2'>
          <Link to="/"><Heading size='xl' color={"orange.400"}>Todo App</Heading></Link>
        </Box>
        <ButtonGroup gap='5'>
          {username?<><Button colorScheme='teal' >{username}</Button>
          <Logout/></>:
          <><Register/>
          <Login/></>}
        </ButtonGroup>
      </Flex>
      <Notes/>
    </div>
  );
}

export default App;
