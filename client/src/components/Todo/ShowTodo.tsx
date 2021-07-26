import {
    Box,
    Button,
    Heading,
    Flex,
    Spacer,
    Text,
    Stack,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import EditTodo from "./EditTodo";
import { useHistory, RouteComponentProps } from "react-router-dom";
import axios from "../../helpers/axios";
import DeleteAlert from "./DeleteTodoAlert";
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function Todo({ match }: RouteComponentProps<{ id: string }>) : JSX.Element {
    const {
        params: { id },
    } = match;
    const toast = useToast();
    const queryClient = useQueryClient();
    const histroy = useHistory();
    const [isEdit, setEdit] = useState(false);
    const [editButton, setEditButton] = useState({
        color: "blue",
        text: "Edit",
    });

    const fetchTodo = async () => {
        const { data } = await axios(`todos/${id}`);
        return data;
    };

    const { isLoading, data: todo } = useQuery("todo", fetchTodo);

    const deleteTodo = async () => {
        const { data } = await axios.delete(`todos/${id}`);
        return data;
    };

    const handleEdit = () => {
        if (!isEdit) {
            setEdit(!isEdit);
            setEditButton({
                color: "orange",
                text: "Cancel",
            });
        }
        if (isEdit) {
            setEdit(!isEdit);
            setEditButton({
                color: "blue",
                text: "Edit",
            });
        }
    };
    const { mutate } = useMutation(deleteTodo, {
        onSuccess() {
            toast({
                title: "Todo Deleted",
                description: "We've Deleted a Todo for you",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            queryClient.invalidateQueries();
        },
        onError(error) {
            toast({
                title: "Error Updateding Todo",
                description: "Sorry we had an error trying to update you todo",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            console.warn({ error });
        },
        onSettled: (data, error, variables, context) => {
            queryClient.invalidateQueries("todo");
            console.log({ data, error, variables, context });
        },
    });

    const handleDelete = () => {
        mutate();
        histroy.goBack();
    };

    return (
        <Box>
            <Button marginBottom={5} onClick={() => histroy.goBack()}>
                Back
            </Button>
            {todo && !isEdit && !isLoading ? (
                <Stack>
                    <Heading>{todo.title}</Heading>
                    <Box>Description: {todo.description}</Box>
                    <Box>Completed: {todo.completed ? "True" : "False"}</Box>
                </Stack>
            ) : (
                todo &&
                !isLoading && <EditTodo toggleEdit={handleEdit} todo={todo} />
            )}
            {isLoading && <Text>Is Loading Please Wait...</Text>}
            <Flex marginTop={5}>
                <Button onClick={handleEdit} colorScheme={editButton.color}>
                    {editButton.text}
                </Button>
                <Spacer />
                <DeleteAlert text="Delete Todo" callback={handleDelete} />
            </Flex>
        </Box>
    );
}
