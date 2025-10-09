/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components';
import { Flex, Text, TextArea } from '@awareness/ui';
import { useGuidelinesContext } from '../create-guidelines/create-guidelines-context';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  resetServerContext,
} from 'react-beautiful-dnd';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ReorderGuidelines: FC = () => {
  const router = useRouter();
  const [eventList, setEventList] = useState<any>([]);

  const { setGuideLines } = useGuidelinesContext();

  // getting guidelines from LocalStorage
  useEffect(() => {
    if (window != undefined) {
      const eventList = JSON.parse(
        window.localStorage.getItem('guide-lines') as string
      );
      eventList?.forEach((line: any) => {
        !line.id && (line.id = line.seq_id + 'awareness-pass');
      });
      setEventList(eventList);
    }
  }, []);

  const cancelButtonHandler = () => {
    router.push('/create-guidelines');
  };

  const doneButtonHandler = () => {
    window.localStorage.setItem('guide-lines', JSON.stringify([...eventList]));
    setGuideLines(eventList);
    router.push('/create-guidelines');
  };

  // a little function to help us with reordering the result
  const reorder = (
    list: any[],
    startIndex: number,
    endIndex: number
  ): any[] => {
    const result: any[] = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    if (removed) {
      result.splice(endIndex, 0, removed);
    }
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    let items: any[] = [];
    items = reorder(eventList, result.source.index, result.destination.index);
    items.forEach((item, index) => (item.seq_id = index + 1));
    setEventList(items);
  };

  resetServerContext();

  return (
    <Layout
      backRoute="create-guidelines"
      handleCancelOnReorder={cancelButtonHandler}
      handleDoneOnReorder={doneButtonHandler}
    >
      <Flex
        flexDirection="column"
        marginTop={24}
        alignItems="start"
        flex={1}
        paddingLeft={5}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ marginTop: 24, width: '100%', fontFamily: 'Urbanist' }}
              >
                {eventList?.map((item: any, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          style={{
                            marginTop: 20,
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Image
                              src="/drag.svg"
                              width={24}
                              height={24}
                              alt="drag-icon"
                            />
                            <Text marginLeft={1} fontSize={3}>
                              {item.title || '-'}
                            </Text>
                          </div>

                          <TextArea
                            style={{
                              background: 'transparent',
                              marginTop: 8,
                              alignItems: 'center',
                              width: '100%',
                            }}
                            disabled
                            value={item.body || '-'}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Flex>
    </Layout>
  );
};
export default ReorderGuidelines;
