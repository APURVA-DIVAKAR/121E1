import React, { useState,useEffect } from "react";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";
import "./styles.css";
import axios from 'axios'

export default function App() {
  const [data, setData] = useState([]);
  const[loding,setLoading] = useState(true);
  const[error,setError]=useState(false);
  const[page,setPage] = useState(1);
  const[order,setOrder] = useState("ASC");
  console.log(order)
  useEffect(()=>{
    getData(page,order)
  },[page,order])
  const getData =async(page,order)=>{
    console.log(order)
    axios({
      method: 'get',
      url:`https://json-server-mocker-masai.herokuapp.com/candidates`,
      params:{
        _page:page,
        _limit:5,
       _sort:"salary",
       _order:`${order}`
      }
    })
    .then(res=>{
      console.log(res.data)
      // console.log(order)
      setData(res.data);
      setLoading(false);
    })
    .catch(err=>{
      setError(true);
      setLoading(false);
    })

  }
  const handlePrev =() =>setPage(page-1) 
  const handleNext =() =>setPage(page+1) 
  const handleToggle=()=>{
    if(order==="ASC"){
      setOrder("DESC")
    }
    else{
      setOrder("ASC")
    }
  }
   
  return (
    <div className="App">
      <div>
       {loding &&  <div id="loading-container">...Loading</div>}
       {error &&  <div id="loading-container">Somthing went wrong Error</div> }
       {order=="ASC" &&  <Button id="SORT_BUTTON" title={`Sort by Descending Salary`} onClick={handleToggle} />}
       {order=="DESC" &&  <Button id="SORT_BUTTON" title={`Sort by Ascending Salary`} onClick={handleToggle} />}
        <Button title="PREV" id="PREV" onClick={handlePrev} disabled={page==1}/>
        <Button id="NEXT" title="NEXT" onClick={handleNext} disabled={page==18} />
      </div>
      {data.map((item) =>       
          <CandidateCard key={item.id} {...item}/>
       )}
    </div>
  );
}
