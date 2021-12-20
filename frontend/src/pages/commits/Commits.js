import Commit from "../../components/commit";
import {Box, Stack, Heading, Spinner, Flex, FormControl, FormLabel, Input, Button} from "@chakra-ui/react";
import {useCommits} from "./useCommits";

function Commits() {
  const {filters, commitsQuery, ...methods} = useCommits()

  return (
    <div className="App">
      <Box w='100%' borderWidth='1px' borderRadius='lg' overflow='hidden' display="flex" alignContent="center"
           justifyContent="center">

        <Stack spacing={4} direction='column' align='center' maxW='6xl' borderWidth='1px' borderRadius='lg' p={5}
               overflow='hidden'>
          <Heading as={"h1"}>
            Github Commits List
          </Heading>


          <Flex gap={2} flexDirection={"column"} p={3} align={'center'}>
            <Flex gap={2} align="flex-end">
              <FormControl maxW="300px">
                <FormLabel htmlFor="owner">Owner</FormLabel>
                <Input
                  value={filters.query.owner}
                  onChange={(e) => methods.updateOwner(e.target.value)}
                  id="owner"
                  placeholder="Owner"
                />
              </FormControl>
              <FormControl maxW="300px">
                <FormLabel htmlFor="repo">Repo</FormLabel>
                <Input
                  value={filters.query.repo}
                  onChange={(e) => methods.updateRepo(e.target.value)}
                  id="repo"
                  placeholder="Repo"
                />
              </FormControl>
              <Button variant="outline" colorScheme="blue" onClick={methods.onSubmit}>
                Search
              </Button>
            </Flex>
            <Flex gap={2} align="flex-end">
              <FormControl maxW="300px">
                <FormLabel htmlFor="author">Author</FormLabel>
                <Input
                  value={filters.filters.author}
                  onChange={(e) => methods.updateAuthor(e.target.value)}
                  id="author"
                  placeholder="Author"
                />
              </FormControl>
              <Button variant="outline" colorScheme="blue" onClick={methods.onSubmit}>
                Filter
              </Button>
            </Flex>
          </Flex>

          {(commitsQuery.status === 'idle' || commitsQuery.status === 'loading') ?
            <Spinner
              m={'auto'}/> : commitsQuery.status === 'error' ? 'Something went wrong' : commitsQuery.data.map(commit =>
              <Commit key={commit.sha}{...commit} />)}
        </Stack>
      </Box>
    </div>
  );
}

export default Commits;
