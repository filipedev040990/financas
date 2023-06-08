export interface HashGeneratorInterface {
  hash (value: string): Promise<string>
}

export interface HashCompareInterface {
  compare (value: string, hash: string): Promise<boolean>
}
