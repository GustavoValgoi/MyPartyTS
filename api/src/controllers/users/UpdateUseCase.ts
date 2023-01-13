import { IUpdateUser } from '@interfaces/users/IUsers'
import { UserModel } from '@models/User/User'
import { compare, hash } from 'bcryptjs'

export const updateUseCase = async ({
  _id,
  name,
  phone,
  currentpassword,
  newpassword,
  image = null,
}: IUpdateUser): Promise<Response | any> => {
  const user = await UserModel.findById(_id)

  if (!user) {
    return { status: 404, json: { errors: ['Usuário não encontrado.'] } }
  }

  user.name = name
  user.phone = phone

  if (image) {
    user.image = image
  }

  if (currentpassword) {
    if (!(await compare(currentpassword, user.password))) {
      return {
        status: 401,
        json: { errors: ['A sua senha atual está incorreta.'] },
      }
    }

    const hashpass = await hash(newpassword, 12)

    user.password = hashpass
  }

  await user.save()

  return { status: 200, json: user }
}