import { AxiosError } from 'axios'

const pictureOrDefault = (picture: string) =>
  picture ? picture : process.env.PUBLIC_URL + 'userDefault.png'

// Type guard
const isAxiosError = (error: unknown): error is AxiosError =>
  Boolean(error && (error as AxiosError).isAxiosError)

export { pictureOrDefault, isAxiosError }
