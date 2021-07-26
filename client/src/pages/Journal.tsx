import React from "react";
import { Flex, Heading, Spacer, List, Stack } from "@chakra-ui/react";
import CreateJournal from "../components/CreateJournal";
import { useQuery } from "react-query";
import axios from "../helpers/axios";
import JournalItem from "../components/JournalItem";
import { IJournal } from "../typing/data";

export default function Journal() {
    const fetchJournals = async () => {
        const { data } = await axios("journals");
        return data;
    };

    const { isLoading, isError, data, error } = useQuery(
        "journals",
        fetchJournals
    );

    return (
        <div>
            <Flex>
                <Heading marginBottom={6} as="h1">
                    Journal
                </Heading>
                <Spacer />
                <CreateJournal />
            </Flex>
            <List>
                <Stack spacing={5}>
                    {!isLoading &&
                        data.map((journal: IJournal) => (
                            <JournalItem key={journal.id} journal={journal} />
                        ))}
                    {isError && <div>There is an error {error}</div>}
                </Stack>
            </List>
        </div>
    );
}
