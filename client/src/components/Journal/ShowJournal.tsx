import React, { useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import {
    Text,
    Box,
    Button,
    Flex,
    Spacer,
    useToast,
    Heading,
    Stack,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "../../helpers/axios";
import DeleteJournalAlert from "../Journal/DeleteJournalAlert";
import EditJournal from '../Journal/EditJournal'

export default function ShowJournal({
    match,
}: RouteComponentProps<{ id: string }>) {
    const history = useHistory();
    const {
        params: { id },
    } = match;
    const queryClient = useQueryClient();

    const toast = useToast();

    const fetchJournal = async () => {
        const { data } = await axios(`journals/${id}`);
        console.log({ data });
        return data;
    };

    const { isLoading, data: journal } = useQuery("journal", fetchJournal);

    const [isEdit, setEdit] = useState(false);
    const [editButton, setEditButton] = useState({
        color: "blue",
        text: "Edit",
    });

    const deleteJournal = async () => {
        const { data } = await axios.delete(`journals/${id}`);
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

    const { mutate } = useMutation(deleteJournal, {
        onSuccess() {
            toast({
                title: "Journal Deleted",
                description: "We've Deleted a Journal for you",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            queryClient.invalidateQueries();
        },
        onError(error) {
            toast({
                title: "Error Updateding Journal",
                description: "Sorry we had an error trying to update you journal",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            console.warn({ error });
        },
        onSettled: (data, error, variables, context) => {
            queryClient.invalidateQueries("journal");
            console.log({ data, error, variables, context });
        },
    });

    const handleDelete = () => {
        mutate();
        history.goBack();
    };

    return (
        <Box>
            <Button marginBottom={5} onClick={history.goBack}>
                Back
            </Button>
            {journal && !isEdit && !isLoading ? (
                <Stack>
                    <Heading as="h2">
                        {journal.title}
                    </Heading>
                    <Text>
                        {journal.entry}          
                    </Text>
                </Stack>
            ) : (
                journal &&
                !isLoading && <EditJournal toggleEdit={handleEdit} journal={journal} />
            )}
            {isLoading && <Text>Is Loading Please Wait...</Text>}
            <Flex marginTop={5}>
                <Button onClick={handleEdit} colorScheme={editButton.color}>
                    {editButton.text}
                </Button>
                <Spacer />
                <DeleteJournalAlert
                    text="Delete Journal"
                    callback={handleDelete}
                />
            </Flex>
        </Box>
    );
}
