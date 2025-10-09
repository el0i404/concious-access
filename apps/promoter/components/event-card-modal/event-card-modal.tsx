// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { Button, Flex, Text } from '@awareness/ui';

/* eslint-disable-next-line */
export interface EventCardModalProps {
  id: string;
  shared_url?: string;
  display?: boolean;
  handleWantToDelete?: () => void;
  setIsModalOpen?: (value: boolean) => void;
  copyEventLink?: (value: string) => void;
  editEvent?: (value: string) => void;
  duplicateEventHandler: (value: string) => void;
  isModalOpen?: boolean;
  sharable_link?: string;
  name: string;
  modalRef: React.RefObject<any>;
}

// eslint-disable-next-line react/display-name
export const EventCardModal = ({
  id,
  copyEventLink,
  sharable_link,
  editEvent,
  name,
  duplicateEventHandler,
  handleWantToDelete,
  modalRef,
}: EventCardModalProps) => {
  return (
    <Flex
      backgroundColor="white"
      p={5}
      flexDirection="column"
      borderRadius="5px"
      width={['340px', '565px']}
      position="fixed"
      ref={modalRef}
    >
      <Text as="p" color="black" mb="5px">
        Shared url
      </Text>
      <Flex
        border="1px solid black"
        width="100%"
        height="auto"
        borderRadius="5px"
        overflow="hidden"
        style={{ inlineSize: '100%' }}
      >
        <Text as="p" color="black" p={2}>
          {sharable_link}
        </Text>
      </Flex>
      <Flex flexDirection="column" alignItems="center">
        <Button variant="quartary" onClick={copyEventLink}>
          <Text as="p" color="black">
            Copy Event Link
          </Text>
        </Button>
        <Button variant="quartary" onClick={() => duplicateEventHandler(id)}>
          <Text as="p" color="black">
            Duplicate {name}
          </Text>
        </Button>
        <Button variant="quartary" onClick={editEvent}>
          <Text as="p" color="black">
            Edit event {name}
          </Text>
        </Button>
        <Button variant="quartary" onClick={handleWantToDelete}>
          <Text as="p" color="red">
            Delete
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default EventCardModal;
