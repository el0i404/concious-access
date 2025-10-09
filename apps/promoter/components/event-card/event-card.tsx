import Image from 'next/image';
import { Flex, Text } from '@awareness/ui';

interface IEvent {
  date: string;
  handleModal?: () => void;
  location: string;
  name: string;
  sharable_link: string;
}

const EventCard = ({ date, location, name, handleModal }: IEvent) => {
  const dateToNumber = Number(date);
  const formatedDate = new Date(dateToNumber);

  const formatedDay = formatedDate.toLocaleString('default', {
    day: 'numeric',
  });

  const formatedMonth = formatedDate.toLocaleString('default', {
    month: 'short',
  });

  return (
    <Flex
      justifyContent="space-between"
      height="auto"
      width="100%"
      borderRadius="10px"
      border="1px solid white"
      p="16px"
      mb={5}
    >
      <Flex flexDirection="column" width="100%">
        <Text color="white" as="p" fontSize="12px">
          {name}
        </Text>
        <Flex
          justifyContent="space-between"
          width="2.5rem"
          fontSize="20px"
          style={{ gap: '5px' }}
        >
          <Text color="white" as="p">
            {formatedDay}
          </Text>
          <Text color="white" as="p">
            {formatedMonth}
          </Text>
        </Flex>
        <Text color="white" fontSize="12px">
          {location}
        </Text>
      </Flex>
      <Flex>
        <Image
          src="/ellipse.svg"
          width={32}
          height={32}
          alt="options button"
          style={{ cursor: 'pointer' }}
          onClick={handleModal}
        />
      </Flex>
    </Flex>
  );
};

export default EventCard;
