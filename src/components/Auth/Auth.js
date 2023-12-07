import React, { Component } from 'react';
import { Formik } from 'formik';
import { auth } from '../../redux/AuthActionCreators';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { Alert } from 'reactstrap';

const mapDispatchToProps = dispatch =>{
    return{
        auth : (email, password, mode) => dispatch(auth(email, password, mode))
    }
}

const mapStateToProps = state =>{
    return{
        authLoading: state.authLoading,
        authFailedMess: state.authFailedMess
    }
}

export class Auth extends Component {
    state ={
        mode : "Sign Up"
    }

    switchModeHandler = () =>{
        this.setState({mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up"})
    }
  render() {
    let err = null;
    if(this.props.authFailedMess !== null){
        err = <Alert color='danger'>{this.props.authFailedMess}</Alert>
    }
    let form = null;
    if(this.props.authLoading){
        form = <Spinner />
    }else{
        form = (
            <Formik initialValues={
                {email: "",
                password: "",
                passwordConfirm: ""}
            }

            onSubmit={
                (values) => {
                    this.props.auth(values.email, values.password, this.state.mode)
                }
            }
            validate={(values)=>{
                const errors = {};
                if(!values.email){
                    errors.email = 'Required'
                }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
                    errors.email = 'Invalid email address';
                }
                if(!values.password){
                    errors.password = 'Required'
                }else if(values.password.length < 4){
                    errors.password = 'Must be atleast 4 characters!'
                }

                if(this.state.mode === "Sign Up"){
                    if(!values.passwordConfirm){
                        errors.passwordConfirm = 'Reqiured!!'
                    }else if(values.password !== values.passwordConfirm){
                        errors.passwordConfirm = "Password field doesn't match"
                    }
                }
                

                return errors;
            }}
            >
            {({values, handleChange, handleSubmit, errors}) =>(
            <div style={{border: '1px solid grey', padding: '15px', borderRadius: '7px'}}>
                <button className='btn btn-lg' style={{
                    width : '100%',
                    backgroundColor : '#D70F64',
                    color : 'white'
                }} onClick={this.switchModeHandler}>Switch to {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}</button>
                <br /> <br />
                <form onSubmit={handleSubmit}>
                    <input 
                    name='email'
                    placeholder='Enter your Mail'
                    className='form-control'
                    value={values.email}
                    onChange={handleChange}
                    />
                    <span style={{color: 'red'}}> {errors.email}</span>
                    <br />
                    <input 
                    name='password'
                    placeholder='Enter your password'
                    className='form-control'
                    value={values.password}
                    onChange={handleChange}
                    />
                    <span style={{color: 'red'}}>{errors.password}</span>
                    <br />
                    {this.state.mode === "Sign Up" ? <div><input 
                    name='passwordConfirm'
                    placeholder='Enter your confirm Password'
                    className='form-control'
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    />
                    <span style={{color: 'red'}}>{errors.passwordConfirm}</span>
                    <br />
                    </div> : null}
                    
                    <button type='submit' className='btn btn-success'>{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</button>
                </form>
            </div>)}
        </Formik>)
    }
    return (
      <div>
        {err}
        {form}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Auth);