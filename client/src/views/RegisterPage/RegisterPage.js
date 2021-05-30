import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function RegisterPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const emailEventHandler = (e)=>{
    setEmail(e.currentTarget.value);
  }
  const passwordEventHandler = (e)=>{
    setPassword(e.currentTarget.value);
  }
  const confirmPasswordEventHandler = (e)=>{
    setConfirmPassword(e.currentTarget.value);
  }
  const nameEventHandler = (e)=>{
    setName(e.currentTarget.value);
  }
  const onSubmitHandler = (e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
      return alert('비밀번호가 일치하지 않습니다.');
    }

    dispatch(registerUser({
      email:email,
      password:password,
      name:name,
    })).then(res=>{
      console.log(res);
      if(res.payload.success){
        props.history.push('/');
      }else{
        alert('회원가입 실패');
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
        <label>Name</label>
        <input type="text" value={name} onChange={nameEventHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={passwordEventHandler} />
        <label>Confirm Password</label>
        <input type="password" value={confirmPassword} onChange={confirmPasswordEventHandler} />
        <br />
        <button>회원가입</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
