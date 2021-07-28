import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "../../helpers/axios";
import {
    Editable,
    EditableInput,
    EditablePreview,
    Switch,
    Stack,
    Button,
    FormControl,
    FormLabel,
    useToast,
    Flex,
} from "@chakra-ui/react";
import { ITodo, TData } from "../../typing/data";
interface TProps {
    todo: ITodo;
    toggleEdit: () => void;
}

const EditTodo: React.FC<TProps> = ({ todo, toggleEdit }) => {
    const toast = useToast();
    const queryclient = useQueryClient();

    const [updatedTodo, setUpdatedTodo] = useState({
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
    });

    const updateTodo = async (newTodoData: TData) => {
        const { data } = await axios.put(`todos/${todo.id}`, newTodoData);
        return data;
    };

    const { mutate, isLoading } = useMutation(updateTodo, {
        onSuccess(data) {
            toast({
                title: "Updated Todo",
                description: "We've updated a Todo for you",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            queryclient.setQueryData(["todo"], data);
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
            console.log({ data, error, variables, context });
        },
    });

    const saveTodo = () => {
        console.log("save todo");
        mutate(updatedTodo);
        toggleEdit();
    };

    return (
        <Stack>
            <Editable defaultValue={todo.title}>
                <EditablePreview />
                <EditableInput
                    onChange={(e) =>
                        setUpdatedTodo({
                            ...updatedTodo,
                            title: e.target.value,
                        })
                    }
                />
            </Editable>
            <Editable defaultValue={todo.description || "N/A"}>
                <EditablePreview />
                <EditableInput
                    onChange={(e) =>
                        setUpdatedTodo({
                            ...updatedTodo,
                            description: e.target.value,
                        })
                    }
                />
            </Editable>
            <FormControl>
                <FormLabel>Completed:</FormLabel>
                <Switch
                    onChange={() =>
                        setUpdatedTodo({
                            ...updatedTodo,
                            completed: !updatedTodo.completed,
                        })
                    }
                    isChecked={updatedTodo.completed}
                />
            </FormControl>
            <Flex>
                <Button
                    isLoading={isLoading}
                    loadingText="Updating..."
                    colorScheme="green"
                    onClick={saveTodo}
                >
                    Save
                </Button>
            </Flex>
        </Stack>
    );
};

export default EditTodo;
