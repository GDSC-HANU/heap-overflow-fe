import { getUserApi } from "./api/getUserApi";
import  {loginApi} from "./api/loginApi";
import logoutApi from "./api/logoutApi";
import registerApi  from "./api/registerApi";
import User  from "./user";

export async function login(user: User): Promise<string> {
    const usernameOrEmail = user.getName()? user.getName() : user.getEmail()
    const accessToken = (await (loginApi({
        usernameOrEmail,
        password: user.getPassword()
    }))).data;
   
    return JSON.stringify(accessToken)

}

export async function register(user: User): Promise<string> {
   const response =  (await registerApi({
        email: user.getEmail(),
        username: user.getName(),
        password: user.getPassword()
    })).data
    return JSON.stringify(response)
}
export async function logout(data: string): Promise<string> {
   const response =  await logoutApi({
        token : data
    })
    return JSON.stringify(response)
}
export async function getUserInfor(data: string): Promise<string> {
  const response =  await getUserApi({
        coderId : data
    })
    return JSON.stringify(response)
}
export default {
    login,
    register,
    logout,
    getUserInfor
}