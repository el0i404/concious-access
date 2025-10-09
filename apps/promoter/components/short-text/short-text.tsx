// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Flex, Box, Input, TextArea, Text, Button } from '@awareness/ui';
import { useGuidelinesContext } from '../../pages/create-guidelines/create-guidelines-context';
import Image from 'next/image';
import OptionMenu from '../option-menu/option-menu';
import { useState } from 'react';

const ShortText = ({
  amountPages,
  indexIterable,
  title,
  body,
  onDelete,
  onDuplicate,
}: {
  amountPages: number;
  indexIterable: number;
  title: string;
  body: string;
  onDelete: (value: number) => void;
  onDuplicate: (value: number) => void;
}) => {
  const { guideLines, setGuideLines } = useGuidelinesContext();
  const [openActionMenu, setOpenActionMenu] = useState<boolean>(false);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = [...guideLines];
    element[indexIterable].title = e.target.value;
    element[indexIterable].seq_id = indexIterable + 1;
    setGuideLines(element);
    window.localStorage.setItem('guide-lines', JSON.stringify(guideLines));
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const element = [...guideLines];
    element[indexIterable].body = e.target.value;
    element[indexIterable].seq_id = indexIterable + 1;
    setGuideLines(element);
    window.localStorage.setItem('guide-lines', JSON.stringify(guideLines));
  };

  // open action menu
  const openActionMenuHandler = () => {
    setOpenActionMenu((prevData) => !prevData);
  };

  return (
    <Flex position="relative" flexDirection="column" width="fill-available">
      <Flex
        width="100%"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
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
      <Box>
        <Input
          label="Title"
          value={title}
          style={{ backgroundColor: 'transparent' }}
          onChange={handleTitle}
        />
      </Box>
      <Box>
        <TextArea
          label="Content"
          defaultValue=""
          value={body}
          onChange={handleContent}
        />
      </Box>
      <hr
        style={{ border: '1px solid white', width: '100%', marginTop: '20px' }}
      />
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
    </Flex>
  );
};

export default ShortText;
