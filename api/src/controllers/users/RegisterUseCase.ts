import { generateToken } from '@helpers/generate-token'
import { ICreateUser } from '@interfaces/users/IUsers'
import { UserModel } from '@models/User/User'
import { hash } from 'bcryptjs'

type ResponseType = {
  status: number
  json: ICreateUser | Errors
}

type Errors = {
  errors: string[]
}

export const registerUseCase = async ({
  name,
  email,
  phone,
  password,
  image,
}: ICreateUser): Promise<ResponseType> => {
  const userExists = await UserModel.findOne({ email })

  if (userExists) {
    return { status: 401, json: { errors: ['Utilize outro e-mail.'] } }
  }

  try {
    const passHash = await hash(password, 12)
    const user = await UserModel.create({
      name,
      email,
      phone,
      password: passHash,
      image,
    })
    return {
      status: 201,
      json: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id),
      },
    }
  } catch (error) {
    return {
      status: 401,
      json: { errors: ['Houve algum problema, por favor tente mais tarde.'] },
    }
  }
}
