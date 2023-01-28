import React, {useState } from 'react'
import { collection,  addDoc} from "firebase/firestore"; 
import {db} from "./firebase"
import Questions from './Questions';
const Home = () => {
     const [question, setQuestion] = useState("")
     const [questions, setQuestions] = useState([])
    const [options, setOptions] = useState([''])
    const [isEditMode, setIsEditMode] = useState(false)
    const [editIndex, setEditIndex] = useState()
    const [isLoading, setIsLoding] = useState()



    let handleChange = (i, e) => {
        let newFormValues = [...options];
        newFormValues[i] = {text:e.target.value,isChecked:false};
        setOptions(newFormValues);
      }
    let addFormFields = () => {
        setOptions([...options, {text:'',isChecked:false}])
      }
    let removeFormFields = (i) => {
        let newFormValues = [...options];
        newFormValues.splice(i, 1);
        setOptions(newFormValues)
    }
    let handleSubmit = (event) => {
        event.preventDefault();
        let questionObject={question,options,selectedValue:''}
        if(isEditMode){
          let temp=[...questions]
          temp[editIndex]=questionObject
          setQuestions(temp)
        }else{

          setQuestions([...questions,questionObject])
          setQuestion("")
          setOptions([""])
        }
    }
    let handleChangeForCheckBox = (value,indexOfQuestion) => {
      let temp=[...questions]
      temp[indexOfQuestion].selectedValue=value
   setQuestions(temp)
  }
  let deleteQuestion = (indexOfQuestion) => {
    let temp=[...questions]
    temp.splice(indexOfQuestion,1)
    setQuestions(temp)
}

let editQuestion = (question,options,indexOfQuestion) => {
  setQuestion(question); 
  setOptions(options)
  setIsEditMode(true)
  setEditIndex(indexOfQuestion)
}



async function  submitWorkSheet() {
  setIsLoding(true)
  await addDoc(collection(db, "workSheets"), {questions});
  setIsLoding(false)
}
console.log('options',options)

    return (<>
        <form  onSubmit={handleSubmit}>
                <label>Question</label>
              <input type="text" className="text-field"  value={question} name="question"  onChange={e => setQuestion(e.target.value)} />
              
          {options.map((element, index) => (
            <div  key={index}>
              <label>option</label>
              <input type="text" className="text-field" value={element.text} onChange={e => handleChange(index, e)} />
              {index===options.length-1 && <button className="button add" type="button" onClick={() => addFormFields()}>Add Option</button>}

              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                : null
              }
            </div>
          ))}
          <div className="button-section">
              <button className="button submit" type="submit">Submit Question</button>
          </div>
      </form>
      {
        <div style={{ position: 'absolute',
          right: '150px',
          top:'0px',
          border: '3px solid green'}}>

<Questions
handleChangeForCheckBox={handleChangeForCheckBox}
editQuestion={editQuestion}
deleteQuestion={deleteQuestion}
questions={questions}
submitWorkSheet={submitWorkSheet}
isLoading={isLoading}
/>
</div>
      }



      </>
    )
}
export default Home