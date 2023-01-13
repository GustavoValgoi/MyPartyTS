import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserModel } from '@models/User/User'
import { NextFunction, Request, Response } from 'express'

export const authGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response> => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ errors: ['Acesso negado.'] })

  try {
    const verified = <string | JwtPayload>(
      jwt.verify(token, process.env.JWT_TOKEN)
    )
    req.user = await UserModel.findOne({ _id: verified['id'] })
    next()
  } catch (error) {
    res.status(401).json({ errors: ['Token inválido.'] })
  }
}