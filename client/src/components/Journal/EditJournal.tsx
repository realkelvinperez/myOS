import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "../../helpers/axios";
import {
    Editable,
    EditableInput,
    EditablePreview,
    Stack,
    Button,
    useToast,
    Flex,
    Textarea
} from "@chakra-ui/react";
import { IJournal, JData } from "../../typing/data"

interface JProps {
    journal: IJournal
    toggleEdit: () => void;
}

export default function EditJournal({ journal, toggleEdit }: JProps) {
    const toast = useToast();
    const queryclient = useQueryClient();

    const [updatedJournal, setUpdatedJournal] = useState({
        title: journal.title,
        entry: journal.entry,
    });

    const updateJournal = async (newJournalData: JData) => {
        const { data } = await axios.put(`journals/${journal.id}`, newJournalData);
        return data;
    };

    const { mutate, isLoading } = useMutation(updateJournal, {
        onSuccess(data) {
            toast({
                title: "Updated Journal",
                description: "We've updated a Journal for you",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            queryclient.setQueryData(["journal"], data);
        },
        onError(error) {
            toast({
                title: "Error Updateding Journal",
                description: "Sorry we had an error trying to update you journal",
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

    const saveJournal = () => {
        console.log("save journal");
        mutate(updatedJournal);
        toggleEdit();
    };

    return (
        <Stack>
            <Editable defaultValue={journal.title}>
                <EditablePreview />
                <EditableInput
                    onChange={(e) =>
                        setUpdatedJournal({
                            ...updatedJournal,
                            title: e.target.value,
                        })
                    }
                />
            </Editable>
            <Textarea
                onChange={(e) =>
                    setUpdatedJournal({
                        ...updatedJournal,
                        entry: e.target.value,
                    })
                }
                value={updatedJournal.entry}
                size="lg"
                height="50vh"
            />
            <Flex>
                <Button
                    isLoading={isLoading}
                    loadingText="Updating..."
                    colorScheme="green"
                    onClick={saveJournal}
                >
                    Save
                </Button>
            </Flex>
        </Stack>
    );
}
