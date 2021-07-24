import axios from '../helpers/axios'
import { 
  Heading, 
  Stack,
  List,
  Flex,
  Spacer,
} from '@chakra-ui/layout';
import { useQuery } from 'react-query'
import CreateTodo from '../components/CreateTodo';
import TodoItem from '../components/TodoItem';

function Todos() {

    const fetchTodos = async () => {
      const { data  } = await axios('todos')
      return data 
    }

    const { 
      isLoading, 
      isError, 
      data, 
      error 
    } = useQuery('todos', fetchTodos)


  return (
    <div className="App">
    <Flex>
      <Heading marginBottom={6} as="h1">Todos</Heading>
      <Spacer />
      <CreateTodo />
    </Flex>
      <List>
        <Stack spacing={5}>
          {
            !isLoading && 
            data.map((todo, i) => {
              if(!todo.completed) return (<TodoItem key={i} todo={todo} />)
              else return false
            })
          }
          <Heading as="h2">Completed Todos</Heading>
          {
            !isLoading && 
            data.map((todo, i) => {
              if(todo.completed) return (<TodoItem key={i} todo={todo} />)
              else return false
            })
          }
          {isError && (<div>There is an error {error}</div>)}
        </Stack>
      </List>
    </div>
  );
}

export default Todos;
