import * as React from 'react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Quiz } from '../../components/Quiz';

export function QuizList() {

  return (
    <div>
      <Button colorScheme='teal' variant='solid'>
        <Link to={"/add"}>
          Add New Quiz

        </Link>
      </Button>
      <Quiz/>
    </div>
  );
};