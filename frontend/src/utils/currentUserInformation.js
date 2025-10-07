
import { jwtDecode } from "jwt-decode";
function getToken(){
  return localStorage.getItem('token')
}
function tokenDecoded(token = getToken()){
  const {email,username,id} = jwtDecode(token)
  return {
    email,username,id
  }
}
export {getToken,tokenDecoded}