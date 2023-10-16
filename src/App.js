import React from 'react';
import {
  Button,
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { QuizList } from './pages/quiz/QuizList';
import { AddQuiz } from './pages/quiz/AddQuiz';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>

      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/add" element={<AddQuiz />} />


      </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
