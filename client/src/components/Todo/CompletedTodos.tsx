import React from "react";
import { ITodo } from "../../typing/data";
import CompletedTodo from './CompletedTodo'

interface IProps {
    todos: ITodo[]
}

const CompletedTodos: React.FC<IProps> = ({ todos }) => {

    const showTodos = (todos: ITodo[]) => {
        return todos.map((todo: ITodo, index) => {
            if (todo.completed) {
                return <CompletedTodo key={todo.id} todo={todo} index={index} />;
            }
        });
    };

    return <div>{showTodos(todos)}</div>;
};

export default CompletedTodos;
