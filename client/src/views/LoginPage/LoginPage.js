import React, {useState} from "react";
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const emailEventHandler = (e)=>{
    setEmail(e.currentTarget.value);
  }
  const passwordEventHandler = (e)=>{
    setPassword(e.currentTarget.value);
  }
  const onSubmitHandler = (e)=>{
    e.preventDefault();
    
    dispatch(loginUser({
      email:email,
      password:password,
    })).then(res=>{
      if(res.payload.loginSuccess){
        props.history.push('/');
      }else{
        alert('아이디나 비밀번호를 확인해주세요.');
      }
    });
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <form onSubmit = {onSubmitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={emailEventHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={passwordEventHandler} />
        <br />
        <button>login</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
