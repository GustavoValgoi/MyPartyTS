import { PartyModel } from '@models/Party/Party'
import { IUpdateParty } from '@interfaces/party/IParty'
import { checkPartyBudget } from '@helpers/check-party-budget'
import { imageUrlGenerate } from '@helpers/image-url-generate'
import { deleteImageDirectory } from '@helpers/delete-image-directory'

type ResponseType = {
  status: number
  json: IUpdateParty | Errors
}

type Errors = {
  errors: string[]
}

export const updatePartyUseCase = async ({
  title,
  author,
  description,
  budget,
  image,
  services,
  user_id,
  id,
}: IUpdateParty): Promise<ResponseType> => {
  let oldImage: string = null
  const party = await PartyModel.findById(id)

  if (!party) {
    return { status: 404, json: { errors: ['Festa não encontrada.'] } }
  }

  if (!party.user_id.equals(user_id)) {
    return {
      status: 401,
      json: { errors: ['Você não tem permissão para executar essa ação.'] },
    }
  }

  if (services && !checkPartyBudget(budget, services)) {
    return {
      status: 406,
      json: { errors: ['O seu orçamento é insuficiente.'] },
    }
  }

  if (image) {
    if (party.image) {
      oldImage = party.image
    }
    party.image = image
  }

  party.title = title
  party.author = author
  party.description = description
  party.budget = budget
  party.services = services

  await party.save()
  if (oldImage) {
    await deleteImageDirectory(imageUrlGenerate(`/parties/${oldImage}`))
  }

  return { status: 200, json: party }
}
