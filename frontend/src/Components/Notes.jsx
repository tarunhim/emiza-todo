import { Box, Heading, Button, Input, Text, Checkbox, textDecoration } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { axios } from "axios"
import { FiEdit } from 'react-icons/fi'
import { MdOutlineDelete } from 'react-icons/md'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useDisclosure, FormControl, FormLabel } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

// import { extendTheme } from "@chakra-ui/react"


function Notes() {
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();

    const [todos, settodos] = useState([])
    const [atask, setatask] = useState("")
    const [etask, setetask] = useState("")
    // console.log(todos)
    // console.log(atask)
    const token = localStorage.getItem("psc_app_token")
    const username = localStorage.getItem("username")

    // console.log(token)
    const getData = () => {
        fetch("https://arcane-cliffs-66120.herokuapp.com/notes", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((res) => settodos(res))
            .catch((err) => console.log(err))
    }

    const posttodo = () => {
        console.log(username)
        if(username=="" || username==null)
        {
            toast({
                title: 'Please Login first..!!',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }

        else{fetch('https://arcane-cliffs-66120.herokuapp.com/notes/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Task: atask, Status: false })
        })
            .then((res) => toast({
                title: 'Task Added Successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
              }))
            .catch((err) => console.log(err))}
            
    }

    const deletetodo = (did) => {

        fetch(`https://arcane-cliffs-66120.herokuapp.com/notes/delete/${did}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then((res) => toast({
                title: 'Task deleted Successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
              }))

    }


    const edittodo = (did, Status) => {

        fetch(`https://arcane-cliffs-66120.herokuapp.com/notes/edit/${did}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Status: !Status })

        })

    }


    const edit = (did) => {
        fetch(`https://arcane-cliffs-66120.herokuapp.com/notes/edit/${did}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Task: etask })

        })
        .then((res) => toast({
            title: 'Task Edited..',
            status: 'success',
            duration: 3000,
            isClosable: true,
          }))
    }
    useEffect(() => {
        getData()
    }, [posttodo, deletetodo, edittodo])
    
    return <Box width={"90%"} margin={"auto"}>
        <Input value={atask} onChange={(e) => setatask(e.target.value)} border="1px solid black" width={["100%", "90%", "80%"]} mt={"10vh"} />
        <Button ml={"3%"} onClick={posttodo} backgroundColor={"black"} color={"white"}>Add todos</Button>
        <Heading>Todos here</Heading>
        {
            todos.length > 0 && todos.map((note, index) => {
                return <Box key={index} width={["100%", "90%", "80%"]}  borderRadius={"5px"} 
                 display={"flex"} justifyContent={"space-between"} alignItems={"center"} margin={"auto"} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"} 
                 marginTop={"2vh"} >
                    <Box width={["50%", "60%", "80%"]}  display={"flex"} alignItems={"center"}>
                        <p>({index + 1})</p>
                        <Box width="80%" ml={"3%"} height="5vh" overflow={"hidden"} ><p style={note.Status ? { textDecoration: "line-through" } : { textDecoration: "none" }} >{note.Task}</p></Box>
                        <Checkbox ml={"3%"} onChange={() => edittodo(note._id, note.Status)} isChecked={note.Status} border={"black"}></Checkbox>
                    </Box>
                    <Button onClick={() => { onOpen(); setetask(note.Task); }} mr={"3%"}><FiEdit size={30} /></Button>
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Edit Task</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    <FormLabel>Task</FormLabel>
                                    <Input type="text" value={etask} onChange={(e) => setetask(e.target.value)} />
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={() => { edit(note._id); onClose(); }}>
                                    Update
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>



                    </Modal>
                    <Button onClick={() => deletetodo(note._id)}><MdOutlineDelete size={30} /></Button>
                </Box>
            })
        }
    </Box>
}

export { Notes }



