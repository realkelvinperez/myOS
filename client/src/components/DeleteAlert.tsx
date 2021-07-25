import React, { useState, useRef } from 'react'
import { 
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
} from '@chakra-ui/react'


function Alert({text, callback, isLoading}) {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()
    
    const handleCallback = () => {
        callback();
        onClose();
    }
  
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
                Delete Todo 
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? You can't undo deleting afterwards.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  isLoading={isLoading} 
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
    )
  }

  export default Alert;