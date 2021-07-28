import React, { useState, useMemo } from "react";
import axios from "../helpers/axios";
import { useQuery } from "react-query";
import CreateTodo from "../components/Todo/CreateTodo";
import { Heading, Stack, List, Flex, Spacer, Box } from "@chakra-ui/layout";
import { DragDropContext } from "react-beautiful-dnd";
import DisplayTodos from "../components/Todo/DisplayTodos";
import CompletedTodos from "../components/Todo/CompletedTodos";

const Todos: React.FC = () => {

    const [newTodos, setNewTodos] = useState([]);

    const fetchTodos = async () => {
        const { data } = await axios("todos");
        console.log(newTodos)
        if(!newTodos.length) setNewTodos(data);
        return data;
    };

    let { isLoading, isError, data, error } = useQuery("todos", fetchTodos);

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        let sourceIdx = parseInt(result.source.index); // get orignal position of todo
        let destIdx = parseInt(result.destination.index); // get the destination of the todo
        let draggedLink = newTodos[sourceIdx]; // get the data of the dragged item
        let newList = [...newTodos] // duplicate current list
        newList.splice(sourceIdx, 1); // pluck out dragged item
        newList.splice(destIdx, 0, draggedLink); // pop in the todo item in the corrent index
        setNewTodos(newList); // update state
    };

    return (
        <Box>
            <Flex>
                <Heading marginBottom={6} as="h1">
                    Todos
                </Heading>
                <Spacer />
                <CreateTodo />
            </Flex>
            <List mb="6">
                <DragDropContext
                    onDragEnd={(results) => handleDragEnd(results)}
                >
                    {!isLoading && <DisplayTodos todos={newTodos} />}
                </DragDropContext>
                {isError && <div>There is an error {error}</div>}
            </List>
            <List>
                <Heading mb={5} as="h2">Completed Todos</Heading>
                <Stack spacing={5}>
                    {!isLoading && <CompletedTodos todos={data} />}
                    {isError && <div>There is an error {error}</div>}
                </Stack>
            </List>
        </Box>
    );
};

export default Todos;
