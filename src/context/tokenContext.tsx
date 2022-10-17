import { FunctionComponent, createContext, useState } from 'react'

interface TokenContextType {
  token: string | null | undefined
  setToken: (token: string | null) => void
}
interface Props {
  children: React.ReactNode
}

const defaultToken = undefined
const tokenContextDefault = {
  token: defaultToken,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setToken: () => {},
}

const TokenContext = createContext<TokenContextType>(tokenContextDefault)

const TokenContextProvider: FunctionComponent<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null | undefined>(defaultToken)
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}

export { TokenContext, TokenContextProvider }
