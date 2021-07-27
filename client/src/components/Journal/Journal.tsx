import React from "react";
import { IJournal } from "../../typing/data";
import { Link } from "react-router-dom";
import { LinkBox, Text, LinkOverlay, ListItem } from "@chakra-ui/react";

const JournalItem: React.FC<IJournal> = ({ journal }) => {
    return (
        <ListItem>
            <LinkBox padding={3} border="solid lightgray 2px" borderRadius={15}>
                <Text>
                    <LinkOverlay as={Link} to={`journal/${journal.id}`}>
                        {journal.title}
                    </LinkOverlay>
                </Text>
            </LinkBox>
        </ListItem>
    );
}

export default JournalItem;
