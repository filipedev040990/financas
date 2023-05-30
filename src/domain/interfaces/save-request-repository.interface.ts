export interface SaveRequestRepositoryInterface {
  save (input: SaveRequestRepositoryInterface.Input): Promise<string>
}

export namespace SaveRequestRepositoryInterface {
  export type Input = {
    id: string
    originalUrl: string
    method: string
    ip: string
    input: string
    created_at: Date
  }
}
