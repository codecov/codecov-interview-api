import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Spacer,
  Stack,
  Tag,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import {CopyIcon} from "@chakra-ui/icons";
import {format} from "date-fns";

function Commit({author, date, isVerified, message, sha, url}) {
  const {avatar_url, name: authorName, login: loginName} = author;
  return (
    <Box w='100%' p={4} color='white' borderRadius='lg' bg='grey'>
      <Flex>
        <Box>
          <Flex direction={'column'} gap={3}>
            <WrapItem>
              <Avatar name={authorName} src={avatar_url} size='md'/>
              <Box ml={3}>
                <Text fontSize='md' w={"fit-content"}>{authorName} ({loginName})</Text>
                <Text fontSize='xs'>on {format(new Date(date), 'yyyy-MM-dd HH:mm')}</Text>
              </Box>
            </WrapItem>
            <WrapItem>
              <Stack spacing={0} display='flex' textAlign="left" m={1}>
                <Box>
                  <Text fontSize='sm'>{message}</Text>
                </Box>
              </Stack>
            </WrapItem>
          </Flex>
        </Box>
        <Spacer/>
        <Flex direction={'column'} justifyContent={'space-between'} alignItems={'end'} gap={3}>
          <Tag bg={isVerified ? 'lightgreen' : 'red'}
               borderRadius='50'>{isVerified ? 'Verified' : 'Not Verified'}
          </Tag>
          <Box borderRadius='50'>
            <Flex color='white' gap={2} alignItems={'center'}>
              <Box flex='2' textAlign="left">
                <Text>{sha}</Text>
              </Box>
              <Box flex='1' pr="1">
                <IconButton
                  variant='outline'
                  aria-label='Copy SHA'
                  icon={<CopyIcon/>}
                  size='sm'
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Commit;
