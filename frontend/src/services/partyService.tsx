import { IPartyAllData, IPartyCreateData, IPartyDeleteData } from '@src/interfaces/IParty'
import { IPageParams } from '@src/interfaces/IService'
import { api, setTokenHeaders } from '@src/utils/config'

const getParty = async (id: string, token: string): Promise<IPartyCreateData> => {
  setTokenHeaders(token)
  const res: IPartyCreateData = await api.get(`/party/${id}`)
  return res
}

const getAllParties = async (token: string, { limit, page }: IPageParams): Promise<IPartyAllData> => {
  setTokenHeaders(token)
  const res: IPartyAllData = await api.get(`/party?limit=${limit || 10}&page=${page || 1}`)
  return res
}

const createParty = async (partyData: FormData, token: string): Promise<IPartyCreateData> => {
  setTokenHeaders(token)
  const res: IPartyCreateData = await api.post('/party/create', partyData)
  return res
}

const deleteParty = async (id: string, token: string): Promise<IPartyDeleteData> => {
  setTokenHeaders(token)
  const res: IPartyDeleteData = await api.delete(`/party/${id}`)
  return res
}

const partyService = {
  getParty,
  getAllParties,
  createParty,
  deleteParty,
}

export default partyService
