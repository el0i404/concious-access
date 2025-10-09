import React from 'react';
import { Flex, Text, Button } from '@awareness/ui';

type DeleteConfirmationProps = {
  handleDontWantToDelete: () => void;
  handleDeleteEvent: () => void;
  eventName: string;
};

const DeleteConfirmation = ({
  handleDeleteEvent,
  handleDontWantToDelete,
  eventName,
}: DeleteConfirmationProps) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      textAlign="center"
      borderRadius="8px"
      backgroundColor="white"
      position="fixed"
      top="50%"
      p="16px"
      height="100px"
      width="95%"
    >
      <Text color="black" fontSize="14px">
        Are you sure you want to delete party {eventName}?
      </Text>
      <Flex justifyContent="space-around">
        <Button variant="quartary" onClick={handleDeleteEvent}>
          <Text color="red" fontSize="14px">
            Delete party {eventName}
          </Text>
        </Button>
        <Button variant="quartary" onClick={handleDontWantToDelete}>
          <Text color="black">Cancel</Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default DeleteConfirmation;
