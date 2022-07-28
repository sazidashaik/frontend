import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import FeedbackList from './components/FeedbackList'
import { useState,useEffect } from 'react';
import apiClient from './http-common'
import {BrowserRouter, Routes ,Route ,  Link ,useNavigate } from 'react-router-dom'
import AddFeedbackForm from './components/AddFeedbackForm';
import EditFeedbackForm from './components/EditFeedbackForm';
function App() {
  
const [feedbacks,setFeedbacks]=useState([]);

    //when App component gets loaded , a call to api will render the products list as a response
    //which we are setting to the products
    useEffect(()=>{apiClient.get("/viewAll").then((response)=>{
      setFeedbacks(response.data);
    })},[])

    
const [editing,setEditing]=useState(false);

const initialFormState = {
  feedBackId:0,
  driverRating:0,
  serviceRating:0,
  overallRating:0,
  comments:'',


}
const [currentFeedback,setCurrentFeedback] 
     =useState(initialFormState);

   //child component --AddProductForm child -App is parent ,product object in the form of input fields form 
   //brand price name on submission  
async function addFeedback(feedback){
  try{
  const response=await apiClient.post('/',feedback);
    setFeedbacks([...feedbacks,response.data]);
    console.log(feedbacks);
    
  }catch(err){
    console.log(err)
  }
  
}



/*async function deleteFeedback(feedBackId){
  await apiClient.delete(`/feedbacks/${feedBackId}`);
    setFeedbacks(feedbacks.filter((feedback)=>feedback.ifeedBackId !== feedBackId));
  }*/
  
  const editFeedback=(feedback)=>{

    setEditing(true);
      setCurrentFeedback
      ({feedBackId:feedback.feedBackId,driverRating:feedback.driverRating,
        serviceRating:feedback.serviceRating,overallRating:feedback.overallRating,comments:feedback.comments,feedBackDate:feedback.feedBackDatae})
     
  }
  
  const updateFeedback = (feedBackId,updatedFeedback)=>{
  
    setEditing(false);
    apiClient.put(`${feedBackId}`,updatedFeedback).then((response)=>
    {
  
      console.log('feedback updated');
      setFeedbacks(feedbacks.map((feedback)=>
    (feedback.feedBackId === feedBackId ? updatedFeedback : feedback)));
    })
    
  }
  
  
  
  
  return (<div>
    <div className='container'>
    <h1>Feedback Crud app with hooks</h1>
    <div className='flex-row'>
      <div className='flex-large'>
        {editing ? (
        <div>
          <h2>Edit Feedback Form </h2>
          <EditFeedbackForm
           setEditing={setEditing}
           currentFeedback={currentFeedback}
           updateFeedback={updateFeedback}
           />
           </div>):(

    <BrowserRouter>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/feedbacks" className="navbar-brand">
          React App
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/feedbacks"} className="nav-link">
              Feedbacks
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addFeedback"} className="nav-link">
              Add Feedback
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
        <Route path='/' element={<FeedbackList 
    feedbackData={feedbacks} 
         editFeedback={editFeedback}
         /*deleteFeedback={deleteFeedback} */
         />} ></Route>
          <Route exact path="addFeedback" element={<AddFeedbackForm addFeedback={addFeedback}/>} />
         
         <Route path='/feedbacks' element={<FeedbackList 
    feedbackData={feedbacks} 
         editFeedback={editFeedback}
         /*deleteFeedback={deleteFeedback}*/ />}>

         </Route>
         <Route path="/feedbacks/:feedBackId" element={<EditFeedbackForm /> }></Route>
        </Routes>
      </div>
    
    </BrowserRouter>
    )}</div></div></div></div>
)}

export default App;