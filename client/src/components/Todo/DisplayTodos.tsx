import React from "react";
import TodoItem from "./Todo";
import { ITodo } from "../../typing/data";
import { Droppable } from "react-beautiful-dnd";
import { Box } from "@chakra-ui/react";

interface IProps {
    todos: ITodo[];
}

const DisplayTodos: React.FC<IProps> = ({ todos }) => {

    const showTodos = (todos: ITodo[]) => {
        return todos.map((todo: ITodo, index: number) => {
            if (!todo.completed) {
                return <TodoItem key={todo.id} todo={todo} index={index} />;
            }
        });
    };

    return (
        <Droppable droppableId="1">
            {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                    {showTodos(todos)}
                    {provided.placeholder}
                </Box>
            )}
        </Droppable>
    );

};

export default DisplayTodos;
