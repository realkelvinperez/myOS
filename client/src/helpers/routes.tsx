import Finances from "../pages/Finances";
import Journal from "../pages/Journal";
import Routines from "../pages/Routines";
import Todos from "../pages/Todos";
import Todo from "../pages/Todo";
import Dashboard from "../pages/Dashboard";

const routes = [
    {
      path: '/',
      exact: true,
      component: Dashboard 
    },
    {
      exact: true,  
      path: '/finance',
      component: Finances
    },
    {
      exact: true,  
      path: '/todos',
      component: Todos 
    },
    {
      exact: true,  
      path: '/todo/:id',
      component: Todo 
    },
    {
      exact: true,  
      path: '/routines',
      component: Routines 
    },
    {
      exact: true,  
      path: '/journal',
      component: Journal 
    }
  ]

export default routes;