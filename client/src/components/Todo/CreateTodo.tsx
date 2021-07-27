import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
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
    Textarea,
} from "@chakra-ui/react";
import axios from "../../helpers/axios";
import { CRef } from "../../typing/MyRef";
import { TData } from '../../typing/data'

const CreateTodo : React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef: CRef = useRef();
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const queryClient = useQueryClient();

    const createAsyncTodo = async (newTodoData : TData) => {
        const { data } = await axios.post("todos", newTodoData);
        return data;
    };

    const { mutate, isLoading } = useMutation(createAsyncTodo, {
        onSuccess() {
            toast({
                title: "Updated Todo",
                description: "We've updated a Todo for you",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        },
        onError(error) {
            toast({
                title: "Error Updateding Todo",
                description: "Sorry we had an error trying to update you todo",
                status: "warning",
                duration: 9000,
                isClosable: true,
                position: "top",
            });
            console.warn({ error });
        },
        onSettled: (data, error, variables, context) => {
            queryClient.invalidateQueries();
            console.log({ data, error, variables, context });
        },
    });

    const handleCreate = (data: TData) => {
        mutate(data);
        onClose();
        reset();
    };

    return (
        <>
            <Button colorScheme="green" onClick={onOpen}>
                Create Todo
            </Button>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered={true}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new Todo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={handleSubmit(handleCreate)}>
                            <FormControl>
                                <Input
                                    {...register("title", { required: true })}
                                    ref={initialRef}
                                    placeholder="Title"
                                />
                            </FormControl>

                            <FormControl mt={4}>
                                <Textarea
                                    {...register("description", {
                                        required: true,
                                    })}
                                    placeholder="Description"
                                />
                            </FormControl>
                            <Flex mt={4}>
                                <Button type="submit" colorScheme="blue" mr={3}>
                                    Save
                                </Button>
                                <Spacer />
                                <Button isLoading={isLoading} onClick={onClose}>
                                    Cancel
                                </Button>
                            </Flex>
                        </form>
                        {errors.exampleRequired && (
                            <span>This field is required</span>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateTodo;
