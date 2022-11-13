import { Profile } from '../types'

const pictureOrDefault = (picture: string) =>
  picture ? picture : process.env.PUBLIC_URL + 'userDefault.png'

export { pictureOrDefault }
