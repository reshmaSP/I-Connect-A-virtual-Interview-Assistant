import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
  import  { useState } from 'react';
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import  {app} from "../screens/firebase"
import { NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';

  const auth =getAuth(app);

function RegisterForm() {
    const[name,setName] = useState("");
    const[mail,setMail]=useState("");
    const[password,setPassword]=useState("");
    const signupUser=(e)=>{
        e.preventDefault();
        console.log("signUp");
        createUserWithEmailAndPassword(
            auth,
            mail,
            password
        ).then((value)=>alert("Successfully Registered"));
    };
    const register=(e)=>{
        e.preventDefault();
        signupUser();
    }
  return (
    <MDBContainer fluid>
    <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
      <MDBCardBody>
        <MDBRow>
          <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

            <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
            <MDBIcon fab icon="mdb" />
{/* <p>hello</p> */}
            <div className="d-flex flex-row align-items-center mb-4 ">
              <MDBIcon fas icon="user me-3" size='lg'/>
              <MDBInput placeholder='Your Name' id='name'
              onChange={(e)=>{setName(e.target.value)}}
               type='text' className='w-100'/>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="envelope me-3" size='lg'/>
              <MDBInput placeholder='Your Email' id='mail'
                            onChange={(e)=>{setMail(e.target.value)}}
                            type='email'/>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="lock me-3" size='lg'/>
              <MDBInput placeholder='Password' 
              onChange={(e)=>{setPassword(e.target.value)}}
               id='pass' type='password'/>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="key me-3" size='lg'/>
              <MDBInput placeholder='Repeat your password' id='form4' type='password'/>
            </div>

            <div className='mb-4'>
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' placeholder='Subscribe to our newsletter' />
              <p >Subscribe to our newsletter</p>
            </div>

            <MDBBtn className='mb-4' size='lg' onClick={signupUser}>Register</MDBBtn>
            <p>Have already an account? 
            <LinkContainer to="/login">
              <Nav.Link>Login here</Nav.Link>
            </LinkContainer></p>
          </MDBCol>

          <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
          </MDBCol>

        </MDBRow>
      </MDBCardBody>
    </MDBCard>

  </MDBContainer>
  );
}

export default  RegisterForm;