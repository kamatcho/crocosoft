import { createSlice } from '@reduxjs/toolkit'




export const quizSlice = createSlice({
  name: 'quiz',
  initialState : {
    quizzes :[]
  },
  reducers: {
    addQuiz : function(state, action) {
      state.quizzes.push(action.payload)
    }
  },
})

export const { addQuiz } = quizSlice.actions
export const selectQuizzes = state => state.quiz.quizzes;

export default quizSlice.reducer