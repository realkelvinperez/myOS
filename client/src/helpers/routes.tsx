import Finances from "../pages/Finances";
import Journals from "../pages/Journals";
import Routines from "../pages/Routines";
import Todos from "../pages/Todos";
import Todo from "../components/Todo/ShowTodo";
import Dashboard from "../pages/Dashboard";
import ShowJournal from "../components/Journal/ShowJournal";

// TODO: figure out type of array

const routes = [
    {
        path: "/",
        exact: true,
        component: Dashboard,
    },
    {
        exact: true,
        path: "/finance",
        component: Finances,
    },
    {
        exact: true,
        path: "/todos",
        component: Todos,
    },
    {
        exact: true,
        path: "/todo/:id",
        component: Todo,
    },
    {
        exact: true,
        path: "/routines",
        component: Routines,
    },
    {
        exact: true,
        path: "/journal",
        component: Journals,
    },
    {
        exact: true,
        path: "/journal/:id",
        component: ShowJournal,
    },
];

export default routes;
