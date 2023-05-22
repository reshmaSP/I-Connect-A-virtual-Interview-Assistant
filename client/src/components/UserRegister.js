import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import RegisterForm from './RegisterForm';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTextArea,
    MDBFile
  }
  from 'mdb-react-ui-kit';

export default function UserRegister(props) {
  return (
    <>
      {props.user == "1" ? (
       // register user
       <>
       <RegisterForm/>
       <MDBContainer fluid>
       <MDBCardBody style={{borderRadius: '25px'}}>
       <hr className="mx-n3 bg-white align-items-center" />

              <MDBRow className='align-items-center pt-4 pb-3 bg-white'style={{borderRadius: '25px'}}>

                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-7 text-black bg-white">Upload CV</h6>
                </MDBCol>

                <MDBCol md='9' className='pe-5'>
                  <MDBFile size='lg' id='customFile' />
                  <div className="small text-muted mt-2">Upload your CV/Resume or any other relevant file. Max file size 50 MB</div>
                </MDBCol>

              </MDBRow>

              <hr className="mx-n3" />

              <MDBBtn className='my-4' size='lg'>send application</MDBBtn>
              </MDBCardBody>
              </MDBContainer>
              
              </>
      ) : (
        <RegisterForm/>
        
        )}
    </>
  )
}
