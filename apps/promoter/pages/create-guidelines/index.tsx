/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Flex, Button, Text } from '@awareness/ui';
import { useCreateEventMutation } from '@awareness/graphql';
import { Layout, ShortText, MultipleChoice } from '../../components';
import { useGuidelinesContext } from './create-guidelines-context';
import { useUpdateEventMutation } from '@awareness/graphql';

const CreateGuidelines = () => {
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

  const [editableEvent, setEditableEvent] = useState();
  const [updateEvent, { data }] = useUpdateEventMutation();

  const { guideLines, setGuideLines } = useGuidelinesContext();

  const router = useRouter();
  const [createEventMutation] = useCreateEventMutation();

  const totalAmountQuestionsIsZero = guideLines?.length === 0;

  useEffect(() => {
    const guidelines =
      window.localStorage.getItem('guide-lines') !== 'undefined' &&
      JSON.parse(window.localStorage.getItem('guide-lines'));
    if (guidelines !== undefined) {
      setGuideLines(guidelines || []);
    }
  }, []);

  useEffect(() => {
    setEventInfo(
      JSON.parse(window.localStorage.getItem('event-info') as string)
    );
  }, []);

  useEffect(() => {
    const isEditable =
      typeof window !== 'undefined' &&
      window.localStorage.getItem('is-editable-event') === 'yes';
    setEditableEvent(isEditable);
  }, []);

  const addQuestionTemplate = (type: string) => {
    if (type === 'short_text') {
      setGuideLines((prev) => {
        return [
          ...prev,
          {
            type: 'short_text',
            seq_id: prev[prev.length - 1]?.seq_id + 1 || 1,
          },
        ];
      });
    } else if (type === 'mcq') {
      setGuideLines((prev) => [
        ...prev,
        {
          type: 'mcq',
          seq_id: prev[prev.length - 1]?.seq_id + 1 || 1,
          correct_answer: 'option1',
          mcq_question_list: [
            {
              label: 'option1',
              value: 'option1',
            },
            {
              label: 'option2',
              value: 'option2',
            },
            {
              label: 'option3',
              value: 'option3',
            },
          ],
        },
      ]);
    }
  };

  const handleCreateGuidelinesLater = async () => {
    totalAmountQuestionsIsZero &&
      (await createEventMutation({
        variables: {
          event: [
            {
              name: eventInfo?.name,
              location: eventInfo?.location,
              date: eventInfo?.date,
              start_time: eventInfo?.start_time,
            },
          ],
        },
      }));

    router.push('/events');
  };

  const handleCreateGuidelines = async () => {
    const removeIdFromMCQs = [...guideLines];

    removeIdFromMCQs.forEach((guideline) => {
      delete guideline.id;
    });

    const event = [{ ...eventInfo, guide_lines: [...removeIdFromMCQs] }];

    try {
      await createEventMutation({
        variables: {
          event,
        },
      });
    } catch (error) {
      console.log('error', error);
    }
    window.localStorage.removeItem('guide-lines');
    window.localStorage.removeItem('event-info');
    router.push('/events');
  };

  /**
   * Reorder button clicked from the top of the page and
   * user can redirect to the reorder-guidelines page
   */
  const onReorderClicked = () => {
    if (guideLines?.length <= 1) return null;
    router.push('/reorder-guidelines');
  };

  const onPreviewQuizClicked = () => {
    router.push('/preview-quiz');
  };

  // handle delete of selectedGuidelines
  const handleDelete = (pageNumber: number, type: string) => {
    const updatedData = [
      ...guideLines.filter((gl) => !(gl.seq_id === pageNumber)),
    ];
    updatedData.forEach((gl, index) => {
      gl.seq_id = index + 1;
    });
    setGuideLines(updatedData);
    localStorage.setItem('guide-lines', JSON.stringify(updatedData));
  };

  // handle duplication of selectedGuidelines
  const handleDuplicate = (pageNumber: number, type: string) => {
    const selectedDataForDuplicate = { ...guideLines[pageNumber - 1] };
    selectedDataForDuplicate.seq_id = guideLines.length + 1;
    selectedDataForDuplicate.id = guideLines.length + 1 + 'awareness-pass';
    setGuideLines((prevData) => [...prevData, selectedDataForDuplicate]);
    const updatedData = [...prevData, selectedDataForDuplicate];
    localStorage.setItem('guide-lines', JSON.stringify(updatedData));
  };

  const handleEditEvent = async () => {
    const event = JSON.parse(window.localStorage.getItem('event-info')) || [];
    const guidelines =
      JSON.parse(window.localStorage.getItem('guide-lines')) || [];

    const formatedDate = event.date;
    const formatedTime = event.start_time;

    try {
      await updateEvent({
        variables: {
          updateEventId: event.id,
          event: {
            user_id: event.user.id,
            start_time: formatedTime,
            name: event.name,
            location: event.location,
            date: formatedDate,
            guide_lines: guidelines.map((guideline) => {
              return {
                seq_id: guideline.seq_id,
                type: guideline.type,
                title: guideline.title,
                body: guideline.body,
                correct_answer: guideline.correct_answer,
                mcq_question_list: guideline.mcq_question_list?.map(
                  (mcqQuestion) => {
                    // Map MCQQuestionInput
                    return {
                      value: mcqQuestion.value,
                      label: mcqQuestion.label,
                    };
                  }
                ),
              };
            }),
          },
        },
      });
      window.localStorage.removeItem('editable-event');
      router.push('/events');
    } catch (error) {
      console.log('error', error);
    }
  };

  // handle change MCQ radio button selection
  const changeSelectedOption = (
    optionSelectedIndex: number,
    mcqSeqId: number
  ) => {
    const copyOfGuidelines = [...guideLines];
    copyOfGuidelines.forEach((value) => {
      if (value.seq_id === mcqSeqId) {
        const checkedValue = value.mcq_question_list.find((option, index) => {
          if (optionSelectedIndex === index) {
            return option.value;
          }
        });
        value.correct_answer = checkedValue.value;
      }
    });

    setGuideLines(copyOfGuidelines);
    localStorage.setItem('guide-lines', JSON.stringify(copyOfGuidelines));
  };

  return (
    <Layout
      backRoute="new-event"
      handleReorder={onReorderClicked}
      handlePreviewQuiz={onPreviewQuizClicked}
      eventListLength={guideLines?.length}
    >
      <Flex flexDirection="column" width="100%">
        <Text color="white" fontSize={5}>
          {editableEvent ? 'Edit Guidelines' : 'Create Guidelines'}
        </Text>
        {guideLines?.map((item, index) => {
          if (item?.type === 'short_text') {
            return (
              <ShortText
                key={index}
                amountPages={item.seq_id}
                indexIterable={index}
                body={item.body}
                title={item.title}
                onDelete={(page) => handleDelete(page, 'short_text')}
                onDuplicate={(page) => handleDuplicate(page, 'short_text')}
              />
            );
          } else {
            return (
              <MultipleChoice
                key={index}
                mcqTitle={item.title}
                mcq={item.mcq_question_list}
                indexIterable={index}
                amountPages={item.seq_id}
                onDelete={(page) => handleDelete(page, 'short_text')}
                onDuplicate={(page) => handleDuplicate(page, 'short_text')}
                changeSelectedOptionCallback={changeSelectedOption}
                correct_answer={item.correct_answer}
              />
            );
          }
        })}
        <Flex flexDirection="column" alignItems="start">
          <Button
            style={{ paddingLeft: '0' }}
            variant="quartary"
            onClick={() => addQuestionTemplate('short_text')}
          >
            <Image
              src="/short_text.svg"
              width={32}
              height={32}
              alt="Short text question"
            />
            <Text pl={4}>Short Text</Text>
          </Button>
          <Button
            variant="quartary"
            style={{ paddingLeft: '0' }}
            onClick={() => addQuestionTemplate('mcq')}
          >
            <Image
              src="/multiple_choice.svg"
              width={32}
              height={32}
              alt="Multiple choice question"
            />
            <Text pl={4}>Multiple Choice Question</Text>
          </Button>
          {editableEvent ? (
            <Button width="100%" variant="tertiary" onClick={handleEditEvent}>
              Save
            </Button>
          ) : totalAmountQuestionsIsZero ? (
            <Button
              width="100%"
              variant="tertiary"
              onClick={handleCreateGuidelinesLater}
            >
              Ill add Guidelines Later
            </Button>
          ) : (
            <Button
              width="100%"
              variant="tertiary"
              onClick={handleCreateGuidelines}
            >
              Create
            </Button>
          )}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default CreateGuidelines;
