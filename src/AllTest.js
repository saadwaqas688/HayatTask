import React, { useEffect, useState } from 'react'
import { collection,getDocs } from "firebase/firestore"; 
import {db} from "./firebase"
const AllTest = () => {
const [workSheets, setWorkSheets] = useState([])
const [selectedWorkSheet, setSelectedWorkSheet] = useState()
const [isLoading, setIsLoading] = useState()

const handelFetch = async() => {
setIsLoading(true)
const querySnapshot = await getDocs(collection(db, "workSheets"));
let list=[];
querySnapshot.forEach((doc) => {
  list.push({id:doc.id,...doc.data()})
});

setWorkSheets(list)
setIsLoading(false)

};

useEffect(()=>{
  handelFetch()
},[])

    return (
      <>
    {isLoading ?  <h1>Loading...</h1>

    :
    <div>

      {
!selectedWorkSheet? workSheets.map((item,index)=>{
  return(
  <div>
{`Work Sheet No ${index+1}`}
<button onClick={()=>setSelectedWorkSheet(item)}>View</button>
  </div>
  

)

  }

): <>{selectedWorkSheet.questions.map((item)=>{
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
      />
        </div>
      )
    })
  }
  </div>

  </>
        )
      })
    }
<button onClick={()=>setSelectedWorkSheet("")}>Back</button>
</>
    }

      </div>
  }
  </>
      )
}
export default AllTest