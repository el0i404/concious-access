// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState, FC } from 'react';
import Image from 'next/image';
import { useGuidelinesContext } from '../../pages/create-guidelines/create-guidelines-context';
import OptionMenu from '../option-menu/option-menu';

import { Flex, TextArea, Radio, Text, Button } from '@awareness/ui';

interface IAnswers {
  label: string;
  value: string;
  checked: boolean;
}
interface MultipleChoiceProps {
  amountPages?: number;
  mcqTitle?: string;
  mcq?: Array<string>;
  onDelete: (value: number) => void;
  onDuplicate: (value: number) => void;
  changeSelectedOptionCallback: (value: number, mcqSeqId: number) => void;
  correct_answer: string;
}

const MultipleChoice: FC<MultipleChoiceProps> = ({
  mcq,
  mcqTitle,
  indexIterable,
  onDelete,
  onDuplicate,
  changeSelectedOptionCallback,
  correct_answer,
}: TMultipleChoice) => {
  const [title, setTitle] = useState(mcqTitle || '');
  const { guideLines, setGuideLines } = useGuidelinesContext();
  const [openActionMenu, setOpenActionMenu] = useState<boolean>(false);

  const handleTitle = (e) => {
    setTitle(e.target.value);

    const element = [...guideLines];
    element[indexIterable].title = e.target.value;
    setGuideLines(element);

    window.localStorage.setItem('guide-lines', JSON.stringify(guideLines));
  };

  const handleOnBlur = (
    e: React.FocusEvent<HTMLQuoteElement>,
    index: number
  ) => {
    const result = mcq.map((item, i) => {
      if (i === index) {
        if (typeof item.value !== 'number') {
          return {
            ...item,
            value: e.target.innerText,
            label: e.target.innerText,
          };
        } else {
          return {
            ...item,
            label: e.target.innerText,
          };
        }
      } else {
        return item;
      }
    });

    const element = [...guideLines];

    // Update correct_answer if it matches the old value
    if (element[indexIterable].correct_answer === mcq[index].value) {
      element[indexIterable].correct_answer = result[index].value;
    }

    element[indexIterable].mcq_question_list = result;
    element[indexIterable].title = title;

    setGuideLines(element);

    window.localStorage.setItem('guide-lines', JSON.stringify(guideLines));
  };

  const handleDeleteAnswer = (indexDeletedAnswer: number) => {
    const answers = mcq.filter((answer, index) => index !== indexDeletedAnswer);
    if (answers.length >= 2) {
      const element = [...guideLines];
      element[indexIterable].mcq_question_list = answers;

      const currentCorrectAnswer = element[indexIterable].correct_answer;

      // Check if the current correct answer is deleted
      if (!answers.some((answer) => answer.value === currentCorrectAnswer)) {
        // If not, set the correct answer to the first available option
        element[indexIterable].correct_answer = answers[0].value;
      }

      setGuideLines(element);
    }

    window.localStorage.setItem('guide-lines', JSON.stringify(guideLines));
  };

  const handleAddAnswer = () => {
    const min = 1;
    const max = 99;
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    if (mcq.length <= 3) {
      const element = [...guideLines];
      element[indexIterable].mcq_question_list = [
        ...element[indexIterable].mcq_question_list,
        { label: 'Type here...', value: randomId.toString() },
      ];
      setGuideLines(element);
    }

    window.localStorage.setItem('guide-lines', JSON.stringify(guideLines));
  };

  // open action menu
  const openActionMenuHandler = () => {
    setOpenActionMenu((prevData) => !prevData);
  };

  return (
    <Flex flexDirection="column" alignItems="start" position={'relative'}>
      <Flex
        width={'100%'}
        flexDirection="row"
        justifyContent={'space-between'}
        alignItems={'center'}
        pt={6}
      >
        <Text fontSize={3} color="white">
          Page {indexIterable + 1}
        </Text>
        <Button
          onClick={openActionMenuHandler}
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            paddingRight: 0,
          }}
        >
          <Image src="/ellipse.svg" width={35} height={25} alt="options" />
        </Button>
      </Flex>
      {openActionMenu && (
        <OptionMenu
          setOpenActionMenu={openActionMenuHandler}
          isOpen={openActionMenu}
          onDelete={() => {
            onDelete(indexIterable + 1);
            setOpenActionMenu(false);
          }}
          onDuplicate={() => {
            onDuplicate(indexIterable + 1);
            setOpenActionMenu(false);
          }}
        />
      )}
      <Flex width="100%">
        <TextArea
          label="Question"
          defaultValue=""
          value={mcqTitle}
          onChange={handleTitle}
        />
      </Flex>
      <Flex>
        <Text my={3}>Answers</Text>
      </Flex>
      <Flex width="100%" flexDirection="column" style={{ gap: '10px' }}>
        {mcq?.map(({ label, value }: IAnswers, index) => (
          <Flex
            alignItems="baseline"
            key={index}
            justifyContent="space-between"
          >
            <Flex flexDirection="column" width="92%">
              <Radio
                index={index}
                indexIterable={indexIterable}
                color="white"
                width="92%"
                borderColor="white"
                label={label}
                value={value}
                onChange={changeSelectedOptionCallback}
                checked={value === correct_answer}
                onBlur={(e) => handleOnBlur(e, index)}
              />
              {value === correct_answer && (
                <Text fontSize="12px" color="#7CF551">
                  Correct answer
                </Text>
              )}
            </Flex>
            {mcq.length >= 3 && (
              <Image
                key={index}
                src="/Close.svg"
                width={16}
                height={16}
                alt="close cross"
                style={{ cursor: 'pointer' }}
                onClick={() => handleDeleteAnswer(index)}
              />
            )}
          </Flex>
        ))}
        {mcq.length <= 3 && (
          <Flex>
            <Button
              variant="quartary"
              onClick={handleAddAnswer}
              style={{ paddingLeft: 0, fontSize: 14, paddingLeft: 0 }}
            >
              Add answer
            </Button>
          </Flex>
        )}
      </Flex>
      <hr
        style={{ border: '1px solid white', width: '100%', marginTop: '20px' }}
      />
    </Flex>
  );
};

export default MultipleChoice;
