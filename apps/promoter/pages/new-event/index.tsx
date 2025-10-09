// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Flex, Input, Button } from '@awareness/ui';
import { Layout } from '../../components';

const NewEvent = () => {
  const [eventInfo, setEventInfo] = useState<{
    name: string;
    location: string;
    date: string;
    start_time: string;
  }>({
    name: '',
    location: '',
    date: '',
    start_time: '',
  });

  const router = useRouter();

  const disableSubmitButton =
    !eventInfo?.name ||
    !eventInfo?.location ||
    !eventInfo?.date ||
    !eventInfo?.start_time;

  const handleEventInfoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventInfo((prev) => ({ ...prev, name: e.target.value }));
  };
  const handleEventInfoLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventInfo((prev) => ({ ...prev, location: e.target.value }));
  };
  const handleEventInfoDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventInfo((prev) => ({ ...prev, date: e.target.value }));
  };
  const handleEventInfoTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventInfo((prev) => ({ ...prev, start_time: e.target.value }));
  };

  const handleCreateEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    window.localStorage.setItem('event-info', JSON.stringify(eventInfo));
    router.push('/create-guidelines');
  };

  useEffect(() => {
    if (window.localStorage.getItem('event-info')) {
      const event = JSON.parse(window.localStorage.getItem('event-info'));
      const date = new Date(Number(event.date));
      const formatedDate = moment(date).format('YYYY-MM-DD');
      setEventInfo({ ...event, date: formatedDate });
    }
  }, []);

  return (
    <Layout backRoute="events">
      <Flex flexDirection="column" width="fill-available" mt="45px">
        <Flex flexDirection="column" style={{ gap: '24px' }}>
          <Input
            onChange={handleEventInfoName}
            label="Name"
            type="text"
            name="name"
            value={eventInfo?.name}
          />
          <Input
            onChange={handleEventInfoLocation}
            label="Location"
            type="text"
            name="location"
            value={eventInfo?.location}
          />
          <Input
            onChange={handleEventInfoDate}
            label="Date"
            type="date"
            name="date"
            style={{ width: '30%', height: '40px' }}
            value={eventInfo?.date}
          />
          <Input
            onChange={handleEventInfoTime}
            label="Start time"
            type="time"
            name="start_time"
            style={{ width: '30%', height: '40px' }}
            value={eventInfo?.start_time}
          />
          <Button
            style={{ marginTop: '30px' }}
            disabled={disableSubmitButton}
            onClick={handleCreateEvent}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default NewEvent;
