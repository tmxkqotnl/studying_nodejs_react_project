import React from 'react'
import Axios from 'axios';
import {withRouter} from 'react-router-dom';

function LandingPage(props) {
  const onclickHandler = ()=>{
    Axios.get('/api/user/logout')
    .then(res=>{
      if(res.data.success){
        props.history.push('/login');
      }else{
        alert('로그아웃 실패');
      }
    }).catch(err=>{
      console.error(err);
    })
  }
  return (
    <div style = {{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'100vh',
      width:'100%',
    }}>
      <div style={{
        display:'flex',
        flexDirection:'column',
      }}>
      <h2>Landing Page</h2>
      <button onClick={onclickHandler}>
        로그아웃
      </button>
      </div>

    </div>
  )
}

export default withRouter(LandingPage);
