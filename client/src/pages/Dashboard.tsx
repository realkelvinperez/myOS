import React from "react";
import { Heading, Box, Text, Center, Stack } from "@chakra-ui/react";
import axios from "../helpers/axios";
import { useQuery } from "react-query";
import Loader from "react-loader-spinner";

const getQuote = () => {
    return useQuery("quote", async () => {
        const { data } = await axios("quotes");
        return data;
    });
};

interface Quote {
    author: string | null;
    created_at: string;
    id: number;
    text: string;
    likes: number | null;
    updated_at: string;
}

const Dashboard: React.FC = () => {
    const { data, isLoading } = getQuote();

    const showQuote = (quote: Quote) => {
        return (
            <Center mt="5">
                <Stack textAlign="center">
                    <Heading as="h3">Quote</Heading>
                    <Text fontSize="3xl">{quote.text}</Text>
                    <Text fontWeight="bold">Author: </Text>
                    <Text>{quote.author ? quote.author : "Unknown"}</Text>
                </Stack>
            </Center>
        );
    };

    return (
        <Box>
            <Heading as="h1">Dashboard</Heading>
            {isLoading ? (
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            ) : (
                showQuote(data)
            )}
        </Box>
    );
};

export default Dashboard;
