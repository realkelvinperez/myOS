import React, { useState, useRef } from "react";
import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
} from "@chakra-ui/react";
import { CRef } from "../../typing/MyRef";

interface IProps {
    text: string;
    callback: () => void;
}

const Alert: React.FC<IProps> = ({ text, callback }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef: CRef = useRef(null);

    const handleCallback = () => {
        callback();
        onClose();
    };

    return (
        <>
            <Button colorScheme="red" onClick={() => setIsOpen(true)}>
                {text}
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Journal
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo deleting afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={handleCallback}
                                ml={3}
                            >
                                {text}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default Alert;
