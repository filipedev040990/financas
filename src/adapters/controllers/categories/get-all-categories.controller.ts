import { GetAllCategoriesUseCaseInterface } from '@/application/interfaces/get-all-categories-usecase.interface'

export class GetAllCategoriesController {
  constructor (private readonly getAllCategoriesUseCase: GetAllCategoriesUseCaseInterface) {}
  async execute (): Promise<any> {
    await this.getAllCategoriesUseCase.execute()
  }
}
