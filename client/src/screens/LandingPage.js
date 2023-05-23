import React from 'react'
import {getDatabase, ref, set} from "firebase/database";
import {app} from "./firebase";
import InterviewerLogin from '../components/InterviewLogin';
const db =getDatabase(app);
export default function LandingPage() {

    const putData=()=>{
        set(ref(db,'users/reshma'),{
            id:1,
            username:"Reshma",
            email: "reshma@gmail.com",
            // profile_picture : imageUrl
        }
            )
    }
  return (
    <>
    <h1> firebase app</h1>
    <button onClick={putData}>Put data</button>
    <InterviewerLogin/>
    </>
  )
}
