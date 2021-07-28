import React from "react";
import {
    LinkBox,
    Flex,
    Checkbox,
    Text,
    LinkOverlay,
    ListItem,
    useBoolean,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import axios from "../../helpers/axios";
import { ITodo, TData } from "../../typing/data";

interface IProps {
    todo: ITodo;
    index: number;
}

const CompletedTodo: React.FC<IProps> = ({ todo, index }) => {
    const queryClient = useQueryClient();
    const [completed, setCompleted] = useBoolean(todo.completed);
    const toast = useToast();

    const updateTodo = async (newTodoData: TData) => {
        const { data } = await axios.put(`todos/${todo.id}`, newTodoData);
        return data;
    };

    const { mutate } = useMutation(updateTodo, {
        onSuccess(data) {
            if (data.completed) {
                toast({
                    title: "🎉 Congrats you completed this Todo",
                    description: "👏Your doing a great job keep on going",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            } else {
                toast({
                    title: "Its ok i get excited to finished things",
                    description: "keep going until you finish it",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            }
            queryClient.setQueryData(["todo"], data);
            queryClient.invalidateQueries("todos");
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

    const handleCheckbox = () => {
        mutate({
            ...todo,
            completed: !completed,
        });
        setCompleted.toggle();
        console.log("update todo, mutate");
    };

    return (
        <ListItem mb={5}>
            <LinkBox padding={3} border="solid lightgray 2px" borderRadius={15}>
                <Flex>
                    <Checkbox
                        size="lg"
                        mr={3}
                        zIndex={9}
                        isChecked={completed}
                        onChange={handleCheckbox}
                        onFocus={(e) => e.preventDefault()}
                    />
                    <Text>
                        <LinkOverlay as={Link} to={`/todo/${todo.id}/`}>
                            {todo.title}
                        </LinkOverlay>
                    </Text>
                </Flex>
            </LinkBox>
        </ListItem>
    );
};

export default CompletedTodo;
