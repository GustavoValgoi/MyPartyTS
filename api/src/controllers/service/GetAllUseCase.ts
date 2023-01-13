import {
  IPaginateParams,
  IServicesPaginateProperties,
} from '@interfaces/service/IService'
import { ServiceModel } from '@models/Service/Service'

export const getAllServicesUseCase = async ({
  page,
  skip,
  take,
}: IPaginateParams): Promise<IServicesPaginateProperties> => {
  const services = await ServiceModel.find().skip(skip).limit(take)

  const count = await ServiceModel.countDocuments()

  const result = {
    per_page: take,
    total: count,
    current_page: page,
    data: services,
  }

  return result
}
