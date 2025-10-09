import React, { useState, useRef, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useOnClickOutside } from 'usehooks-ts';
import {
  useGetEventsQuery,
  useDeleteEventMutation,
  useCreateEventMutation, // for duplicate event
  useGetEventLazyQuery,
} from '@awareness/graphql';
import { Flex, Text } from '@awareness/ui';
import {
  Layout,
  EventCard,
  EventCardModal,
  DeleteConfirmation,
} from '../../components';
import { useEventModal } from './event-context';

const getEventsQuery = gql`
  query GetEvents {
    getEvents {
      id
      name
      location
      date
      start_time
    }
  }
`;

const Events = () => {
  const ref = useRef(null);
  const router = useRouter();
  const [wantToDelete, setWantToDelete] = useState(false);
  const { loading: loadingGetEvents, data: events } = useGetEventsQuery();
  const [getEvent, { data: queriedEvent }] = useGetEventLazyQuery();
  const [createEventMutation] = useCreateEventMutation({
    refetchQueries: [{ query: getEventsQuery }],
  });
  const [deleteEventMutation] = useDeleteEventMutation({
    refetchQueries: [{ query: getEventsQuery }],
  });
  const { setIsModalOpen, eventData, isModalOpen, setEventData } =
    useEventModal();

  useEffect(() => {
    window.localStorage.setItem(
      'event-info',
      JSON.stringify({ ...queriedEvent?.getEvent })
    );

    const guideLines = queriedEvent?.getEvent?.guide_lines;

    window.localStorage.setItem('guide-lines', JSON.stringify(guideLines));
  }, [queriedEvent]);

  useEffect(() => window.localStorage.removeItem('is-editable-event'), []);

  const handleModal = (
    id: string,
    date: string,
    location: string,
    name: string,
    sharable_link: string
  ) => {
    setIsModalOpen(true);

    setEventData({
      id,
      date,
      location,
      name,
      sharable_link,
    });
  };

  const handleOnLogout = (): void => {
    router.push('/login');
  };

  const handleClickOutside = () => {
    setIsModalOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside, 'mousedown');

  const handleEditEvent = async (id: string) => {
    window.localStorage.setItem('is-editable-event', 'yes');
    try {
      await getEvent({
        variables: {
          getEventId: id,
        },
      });

      router.push('/new-event');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    await deleteEventMutation({ variables: { deleteEventId: id } });
    setIsModalOpen(false);
    setWantToDelete(false);
  };

  const handleCopyEventLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      console.log('Content copied to clipboard');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleWantToDelete = () => {
    setIsModalOpen(false);
    setWantToDelete(true);
  };

  const handleDontWantToDelete = () => {
    setWantToDelete(false);
    setIsModalOpen(true);
  };

  // Find event that will be duplicated and call api to store it in DB
  const duplicateEventHandlerCallback = async (id: string) => {
    const duplicateEvent = events?.getEvents?.find((event) => event?.id === id);

    //Call mutation to create new event using duplicateEvent Data
    if (duplicateEvent) {
      const arr = duplicateEvent.guide_lines?.map((line) => ({
        seq_id: line?.seq_id as number,
        body: line?.body as string,
        title: line?.title as string,
        type: line?.type as string,
        mcq_question_list: line?.mcq_question_list?.map((question) => ({
          label: question?.label as string,
          value: question?.value as string,
        })),
        correct_answer: line?.correct_answer as string,
      }));

      await createEventMutation({
        variables: {
          event: [
            {
              name: duplicateEvent.name,
              location: duplicateEvent?.location,
              date: duplicateEvent?.date,
              start_time: duplicateEvent?.start_time,
              guide_lines: arr ?? [],
            },
          ],
        },
      });
    }
    setIsModalOpen(false);
  };

  if (loadingGetEvents) {
    <Text color="white">LOADING...</Text>;
  }
  return (
    <React.Fragment>
      <Layout handleOnLogout={handleOnLogout}>
        <Flex flexDirection="column" width="100%" alignItems="center">
          {isModalOpen && (
            <EventCardModal
              id={eventData?.id}
              modalRef={ref}
              isModalOpen={isModalOpen}
              name={eventData?.name}
              setIsModalOpen={setIsModalOpen}
              copyEventLink={() =>
                handleCopyEventLink(eventData?.sharable_link)
              }
              sharable_link={eventData?.sharable_link}
              duplicateEventHandler={duplicateEventHandlerCallback}
              editEvent={() => handleEditEvent(eventData?.id)}
              handleWantToDelete={handleWantToDelete}
            />
          )}
          {!isModalOpen && wantToDelete && (
            <DeleteConfirmation
              eventName={eventData?.name}
              handleDontWantToDelete={handleDontWantToDelete}
              handleDeleteEvent={() => handleDeleteEvent(eventData?.id)}
            />
          )}
          {events?.getEvents?.map(
            (
              { date, location, name, id, sharable_link }: any,
              index: number
            ) => {
              return (
                <EventCard
                  key={index}
                  date={date}
                  location={location}
                  name={name}
                  sharable_link={sharable_link}
                  handleModal={() =>
                    handleModal(id, date, location, name, sharable_link)
                  }
                />
              );
            }
          )}
        </Flex>
      </Layout>
    </React.Fragment>
  );
};

export default Events;
