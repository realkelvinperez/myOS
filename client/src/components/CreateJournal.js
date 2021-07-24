import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import {
    Button,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalContent,
    FormControl,
    Input,
    useDisclosure,
    Flex,
    Spacer,
    useToast,
    Textarea
} from '@chakra-ui/react'
import axios from '../helpers/axios'

function CreateJournal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef()
    const toast = useToast()
    const { register, handleSubmit, formState : { errors }, reset } = useForm();
    const queryClient = useQueryClient();
    
    const createAsyncJournal = async (newJournalData) => {
        const { data } = await axios.post('journals' , newJournalData);
        return data;
    }
    
    const { mutate, isLoading } = useMutation(createAsyncJournal, {
        onSuccess() {
            toast({
                title: 'Updated Journal',
                description: "We've Created a Journal for you",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            queryClient.invalidateQueries('journals')
        },
        onError(error) {
            toast({
                title: 'Error Creating Journal',
                description: "Sorry we had an error trying to create a new Journal",
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: 'top'
            })
            console.warn({error})
        },
    })

    const handleCreate = (data) => {
        mutate(data)
        onClose()
        reset()
    }
  
    return (
      <>
        <Button colorScheme="green" onClick={onOpen}>Create Journal</Button>
  
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
            isCentered={true}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create new Journal</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <form onSubmit={handleSubmit(handleCreate)}>
                  <FormControl>
                    <Input {...register("title", {required: true})} ref={initialRef} placeholder="Title" />
                  </FormControl>
      
                  <FormControl mt={4}>
                    <Textarea {...register("entry", {required: true})} placeholder="Journal Entry" />
                  </FormControl>
                    <Flex mt={4}>
                      <Button type="submit" colorScheme="blue" mr={3}>
                        Save
                      </Button>
                      <Spacer />
                      <Button isLoading={isLoading} onClick={onClose}>Cancel</Button>
                    </Flex>
                </form>
                {errors.exampleRequired && <span>This field is required</span>}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default CreateJournal;