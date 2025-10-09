import { Flex, Typography, Box, Button } from '@guest/ui';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <Flex height="100vh" backgroundColor="black">
      <Flex flexDirection="column" justifyContent="space-between" flex="1">
        <Box backgroundColor="red" height="30%">
          PHOTO
        </Box>
        <Box p="16px">
          <Typography as="h3" color="white">
            Gain & Maintain
          </Typography>
          <Typography mt="1" mb="3" as="h3" color="white">
            Consent
          </Typography>
          <Typography as="span" color="white">
            means No. Maybe means No. Consent is at the core of respect,
            wellbeing and safety. It is not a given and can be withdrawn at any
            point during an interaction. If you do not understand why it is a
            must to ask for explicit permission prior to any form of human
            contact - this space is not for you. Please flag anyone you find in
            breach of this rule immediately with the Safeguarding Team.
          </Typography>
        </Box>
        <Flex pb="15px" pr="15px" justifyContent="end">
          <button>Next</button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Index;
