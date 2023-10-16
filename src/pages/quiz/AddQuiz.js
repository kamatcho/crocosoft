import * as React from 'react';
import {
  Text, Button, Input, Textarea, Box, RadioGroup, Stack, Radio,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'

import {  useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import {  useState } from 'react';
import { addQuiz } from '../../redux/quizSlice';




export const AddQuiz = ()=> {
  const [formValues, setFormValues] = useState([]);
  const dispatch = useDispatch();

  const  addFormFields =()=> {
   let newFormValues = [...formValues, {
     "answer_id":null,
     "answers":[
     ],
     "feedback_false":"",
     "feedback_true":"",
     "text":"",
     "id" : formValues.length +1
   }];
   setFormValues(newFormValues)

  }

  const removeFormFields =(i) =>{
    const newFormValues =  [...formValues];

    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }
  const addAnswer = (i)=> {
    const newFormValues = [...formValues];
    newFormValues[i].answers.push({ "id":formValues[i].answers.length +1,
      "is_true":false,
      "text":""})
    setFormValues(newFormValues)
    console.log("new Form Value" , formValues)
  }
  const removeAnswer = (questionIndex , answerIndex)=> {
    const newFormValues =  [...formValues];
    if (newFormValues[questionIndex].answer_id == answerIndex){
      newFormValues[questionIndex].answer_id = null
    }
    newFormValues[questionIndex].answers.splice(answerIndex, 1);
    setFormValues(newFormValues)
  }
  const schema = yup.object().shape({
    title: yup.string().required(),
    score: yup.number()
      .typeError('The value must be a number')
      .integer('The value must be a number')
      .required('This field is required'),
    url : yup.string().required(),
    description : yup.string().optional(),
    // question_title : yup.string().required()
  });
  const {
    handleSubmit,
    setValue,
    formState: {errors},
    register
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit Data To Login User Function
  const onSubmit = data => {
   const quizData = {
     "created":Date.now(),
     "description":data.description,
     "id":1,
     "modified":Date.now(),
     "questions_answers":formValues,

     "score":data.score,
     "title":data.title,
     "url":data.url
   }
    dispatch(addQuiz(quizData));
  };
  return (
    <div className={"formContainer"}>

      <form className={"form"} onSubmit={handleSubmit(onSubmit)}>
        {/*Quiz Title*/}
        <Input variant='outline' className={"inputStyle"} placeholder='Quiz Title' name={"title"} {...register('title')} />
        <Text className={"errorText"}>{errors.title?.message}</Text>
        {/*Quiz Score*/}
        <Input variant='outline' className={"inputStyle"} placeholder='Final Score' name={"score"} type="number" {...register('score')}/>
        <Text className={"errorText"}>{errors.score?.message}</Text>
        {/*Quiz Url*/}
        <Input variant='outline' className={"inputStyle"} placeholder='Quiz Url' name={"url"} {...register('url')} />
        <Text className={"errorText"}>{errors.url?.message}</Text>

        {/*Quiz Url*/}

        <Textarea variant={'outline'} className={"inputStyle"} placeholder={"Description"} name={'description'} {...register('description')}/>
        <Text className={"errorText"}>{errors.description?.message}</Text>
        {formValues?.map((element, index) => (
          <Box className="questionInputs" key={index} border='1px' borderColor='gray.200'>
            <Input variant='outline' className={"inputStyle"} placeholder='Question' name={"question_title[]"}  onChange={(val)=> {
              const newValue = [...formValues]
              newValue[index].text = val.target.value
              setFormValues(newValue)
            }}/>
            <Input variant='outline' className={"inputStyle"} placeholder='Feedback False' name={"feedback_false[]"} onChange={(val)=> {
              const newValue = [...formValues]
              newValue[index].feedback_false = val.target.value
              setFormValues(newValue)
            }} />
            <Input variant='outline' className={"inputStyle"} placeholder='Feedback True' name={"feedback_true[]"} onChange={(val)=> {
              const newValue = [...formValues]
              newValue[index].feedback_true = val.target.value
              setFormValues(newValue)
            }} />
            {formValues[index]["answers"].length > 0 ? <Box  className="questionInputs" border='1px' borderColor='green.200'>
              <RadioGroup onChange={(value)=>{
                const newValue = [...formValues]
                newValue[index].answer_id = value

                newValue[index].answers.map((item)=> {
                  item.is_true = `${item.id}` === value;
                })
                setFormValues( newValue)
                console.log("New Value :-" , newValue)
              }} value={formValues[index].answer_id}>
                <Stack direction='column'>

            {formValues[index]["answers"].map((item, i) => {
              return (
                <Box border='0' key={i}>
                  <Stack direction={"row"}>
                    <Radio value={`${item.id}`} >

                    </Radio>
                    <Input key={i}  variant='outline'  placeholder='Answer Value' name={"answers[]"} onChange={(val)=>{
                      const newValue = [...formValues]
                      newValue[index]["answers"][i].text = val.target.value
                      setFormValues(newValue)


                    }} />
                    <Button colorScheme={"red"} value={"outline"} onClick={() => removeAnswer(index ,i)}>Remove</Button>

                  </Stack>




                </Box>
               )
            })}
                </Stack>
              </RadioGroup>

            </Box> : null }

            <Button colorScheme={"green"} variant={"outline"} className={"addButton"} onClick={()=>addAnswer(index)}>
              <Text>Add Answer</Text>
              <AddIcon/>
            </Button>
            <Button colorScheme={"red"} value={"outline"} onClick={() => removeFormFields(index)}>Remove</Button>

          </Box>
        ))}

        <Button colorScheme={"green"} variant={"outline"} className={"addButton"} onClick={()=>addFormFields()}>
        <Text>Add Question</Text>
          <AddIcon/>
        </Button>
<br/>
        <Button type={"submit"} colorScheme='teal'  className={"submitButton"} variant={"solid"} >
        Submit
        </Button>

      </form>
    </div>

  );
};