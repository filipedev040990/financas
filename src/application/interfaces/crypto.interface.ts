export interface HashGeneratorInterface {
  hash (value: string): Promise<string>
}
