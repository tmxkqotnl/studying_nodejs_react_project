import React,{useEffect} from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';


// null =>  every, true => user logged in , false => user not logged in 
// adminRoute null => no use, true => only Admin, false => not Admin
// Component name must be starting uppercase

export default function(SpecificComponent,option,adminRoute=null){
  function AuthenticationCheck(props){
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(res=>{
        console.log(res);
        // 로그인 하지 않은 상태
        if(!res.payload.isAuth){
          if(option){
            props.history.push('/login');
          }
        }else{ // 로그인 한 상태이지만 어드민이 아닌 경우
          if(adminRoute&&!res.payload.isAdmin){
            props.history.push('/');
          }else{ 
            if(option === false){ 
              // 로그인 한 유저가 로그인이 하지 않아야 들어갈 수 있는 페이지를 요청하는 경우
              props.history.push('/');
            }
          }
        }
      });
    }, []);

    return (
      <SpecificComponent />
    );
  }
  return AuthenticationCheck;
}