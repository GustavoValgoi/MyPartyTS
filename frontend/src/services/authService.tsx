import { IUserLogin, IUserRegister } from '../interfaces/IUser'
import { LoginType, RegisterType } from '../@types/UserTypes'
import { api } from '../utils/config'

const register = async (data: RegisterType): Promise<IUserRegister> => {
  const res: IUserRegister = await api.post('/users/register', data)
  return res
}

const login = async (data: LoginType): Promise<IUserLogin> => {
  const res: IUserLogin = await api.post('/users/login', data)
  return res
}

const logout = async (): Promise<void> => {
  localStorage.removeItem('myparty')
  location.reload()
  return
}

const authService = {
  register,
  login,
  logout,
}

export default authService
