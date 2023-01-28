import React, { useEffect, useState } from 'react'
import { collection,  addDoc, getDocs } from "firebase/firestore"; 
import {db} from "./firebase"
const Option = () => {
     const [question, setQuestion] = useState("")
     const [questions, setQuestions] = useState([])
    const [options, setOptions] = useState([])
    const [isEditMode, setIsEditMode] = useState(false)
    const [editIndex, setEditIndex] = useState()


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
          setOptions([])
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
  const res =await addDoc(collection(db, "workSheets"), {questions});
}


const handelFetch = async() => {
  let list=[];



const querySnapshot = await getDocs(collection(db, "workSheets"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  list.push({id:doc.id,...doc.data()})


  // console.log(doc.id, " => ", doc.data());
});

console.log('list',list)

};

useEffect(()=>{
  handelFetch()
},[])
    return (<>
        <form  onSubmit={handleSubmit}>
                <label>Name</label>
              <input type="text"  value={question} name="question"  onChange={e => setQuestion(e.target.value)} />
          {options.map((element, index) => (
            <div className="form-inline" key={index}>
              <label>option</label>
              <input type="text"  value={element.text} onChange={e => handleChange(index, e)} />
              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                : null
              }
            </div>
          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => addFormFields()}>Add Option</button>
              <button className="button submit" type="submit">Submit</button>
          </div>
      </form>
      {
    questions.map((item,indexOfQuestion)=>{
      return(
      <>
      <div>
{item.question}
      </div>
<div style={{display:'flex'}}>
{
  item.options.map((ele,indexofOption)=>{
    return (
      <div style={{display:'flex'}}>
      <div>{ele.text}</div>
      <input
      type="radio"
      // name="Radio"
      id={indexofOption}
      value={ele.text}
      checked={item.selectedValue===ele.text}
      onChange={(e)=>handleChangeForCheckBox(e.target.value,indexOfQuestion)}
    />
      </div>
    )
  })
}
</div>
<button onClick={()=>editQuestion(item.question,item.options,indexOfQuestion)}>edit</button>
<button onClick={()=>deleteQuestion(indexOfQuestion)}>delete</button>
</>
      )
    })
      }
      <button onClick={submitWorkSheet}>submit Work Sheet</button>

      </>
    )
}
export default Option