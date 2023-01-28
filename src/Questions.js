import React from 'react'

const Questions = ({handleChangeForCheckBox,editQuestion,deleteQuestion,questions,submitWorkSheet,isLoading}) => {


    return (<>
    <h1>Work Sheet</h1>
      {
        
    questions.length>0 && questions.map((item,indexOfQuestion)=>{
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
             {questions.length>0 && <button className="button add" onClick={submitWorkSheet}>{isLoading?'please wait...':'submit Work Sheet'}</button>}


      </>
    )
}
export default Questions