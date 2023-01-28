import React, { useEffect, useState } from 'react'
import { collection,  addDoc, getDocs } from "firebase/firestore"; 
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
  // doc.data() is never undefined for query doc snapshots
  list.push({id:doc.id,...doc.data()})


  // console.log(doc.id, " => ", doc.data());
});

setWorkSheets(list)
setIsLoading(false)

};

useEffect(()=>{
  handelFetch()
},[])

console.log('workSheets',workSheets)
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

): <>{selectedWorkSheet.questions.map((item,indexOfQuestion)=>{
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