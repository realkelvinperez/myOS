import React from "react";
import routes from "./helpers/routes";
import { Grid, GridItem, List, ListItem, Box } from "@chakra-ui/layout";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Grid h="100vh" templateRows="1fr" templateColumns="repeat(6, 1fr)">
                <GridItem padding="30">
                    <Box as="nav">
                        <List>
                            <ListItem>
                                <Link to="/">Dashboard</Link>
                            </ListItem>
                            <ListItem>
                                <Link to="/todos">Todos</Link>
                            </ListItem>
                            <ListItem>
                                <Link to="/routines">Routines</Link>
                            </ListItem>
                            <ListItem>
                                <Link to="/journal">Journal</Link>
                            </ListItem>
                            <ListItem>
                                <Link to="/finance">Finance</Link>
                            </ListItem>
                        </List>
                    </Box>
                </GridItem>

                <GridItem colSpan={5} border="3px solid lightgray" padding="30">
                    <Switch>
                        {routes.map((route, i) => (
                            <Route
                                key={i}
                                path={route.path}
                                exact={route.exact}
                                component={route.component}
                            />
                        ))}
                    </Switch>
                </GridItem>
            </Grid>
        </Router>
    );
}
