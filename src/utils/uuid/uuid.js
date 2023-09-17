import { v4 as uuidv4 } from 'uuid';
//创建uuid
export const  getUUid = ()=>{
    let uuid_token = localStorage.getItem('UUID_TOKEN')
    if (!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem('UUID_TOKEN',uuid_token)
    }
    else
        return uuid_token
}