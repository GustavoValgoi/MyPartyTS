import { checkPartyBudget } from '@helpers/check-party-budget'
import { IUpdateParty } from '@interfaces/party/IParty'
import { PartyModel } from '@models/Party/Party'

export const updatePartyUseCase = async ({
  title,
  author,
  description,
  budget,
  image,
  services,
  user_id,
  id,
}: IUpdateParty): Promise<Response | any> => {
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
    party.image = image
  }

  party.title = title
  party.author = author
  party.description = description
  party.budget = budget
  party.services = services

  await party.save()

  return { status: 200, json: party }
}
