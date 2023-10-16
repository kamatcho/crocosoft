// @flow
import * as React from 'react';
import { Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectQuizzes } from '../redux/quizSlice';

export function Quiz() {
  const allQuizzes = useSelector(selectQuizzes);

  return (
    <div>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>Quiz List</TableCaption>
          <Thead>
            <Tr>
              <Th> Id</Th>
              <Th> Title</Th>
              <Th>Description</Th>
              <Th isNumeric>Score</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>

            </Tr>
          </Thead>
          <Tbody>
            {allQuizzes.map((item)=> {
              return(
                <Tr>
                  <Td>{item.id}</Td>
                  <Td>{item.title}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.url}</Td>
                  <Td isNumeric>{item.score}</Td>
                  <Td>  <Button colorScheme='green' size='md'>
                    Edit
                  </Button>
                  </Td>
                  <Td>  <Button colorScheme='red' size='md'>
                    Delete
                  </Button></Td>

                </Tr>
              )
            })}
          </Tbody>

        </Table>
      </TableContainer>
    </div>
  );
};