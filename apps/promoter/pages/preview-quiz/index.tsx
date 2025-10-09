/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components';
import { Button, Flex, Text } from '@awareness/ui';
import { useRouter } from 'next/router';
import { useIsMobile } from '@awareness/hooks';

const optionLabels = ['A', 'B', 'C', 'D']; // maximum number of labels

const PreviewQuiz: FC = () => {
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [eventList, setEventList] = useState<any>([]);

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
  /**
   * Close Preview handler
   */
  const onCloseQuizClicked = () => {
    router.push('create-guidelines');
  };

  /**
   * Next button click handler
   */
  const handleNext = () => {
    if (currentQuestion < eventList.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  /**
   * Previous button click handler
   */
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQues = eventList && eventList[currentQuestion];

  const isMobile = useIsMobile();

  return (
    <Layout backRoute="create-guidelines" handleCloseQuiz={onCloseQuizClicked}>
      <Flex
        flexDirection={'column'}
        width={'100%'}
        position={isMobile ? 'relative' : 'unset'}
      >
        {/* CUrrent Question based on it's type */}
        <div
          key={currentQues?.id}
          style={{ paddingTop: '15px', fontFamily: 'Urbanist' }}
        >
          {currentQues && currentQues?.type === 'short_text' ? (
            <>
              {/* Short text */}
              <Text fontSize={6} fontWeight={700} lineHeight={'40px'}>
                {currentQues?.title}
              </Text>
              <div>
                <Text fontSize={2}>{currentQues?.body}</Text>
              </div>
            </>
          ) : (
            // MCQuestion
            <>
              <Text fontSize={5} fontWeight={400}>
                {currentQues?.title}
              </Text>
              {currentQues?.mcq_question_list?.map(
                (question: any, index: number) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: '2px solid white',
                        padding: 16,
                        marginTop: 32,
                        borderRadius: '8px',
                        backgroundColor:
                          currentQues?.correct_answer === question.value
                            ? '#FFFFFF'
                            : '#3C3C3C',
                        boxShadow: '8px 8px black, 8px 8px 0px 2px #FFFFFF',
                      }}
                    >
                      <Text
                        color={
                          currentQues?.correct_answer === question.value
                            ? 'black'
                            : '#B5B5B5'
                        }
                        fontSize={1}
                        fontWeight={700}
                      >
                        {optionLabels[index]} {'. '}
                      </Text>
                      <Text
                        color={
                          currentQues?.correct_answer === question.value
                            ? 'black'
                            : 'white'
                        }
                        fontSize={3}
                      >
                        {question.label}
                      </Text>
                    </div>
                  );
                }
              )}
            </>
          )}
        </div>

        {/* Buttons */}
        <div
          className={
            isMobile ? 'button-mobile-screen' : 'button-positions-normal-screen'
          }
        >
          <div>
            {!(currentQues?.seq_id === 1) && (
              <Button variant="quartary" onClick={handlePrev}>
                Back
              </Button>
            )}
          </div>
          <div>
            {currentQues?.seq_id === eventList?.length ? (
              <Button onClick={onCloseQuizClicked}>Close Preview</Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </div>
        </div>
      </Flex>
      <style jsx>{`
        .button-positions-normal-screen {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: space-between;
          width: 80%;
          max-width: 600px;
          padding: 20px 0;
        }

        .button-mobile-screen {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 20px;
        }
      `}</style>
    </Layout>
  );
};

export default PreviewQuiz;
