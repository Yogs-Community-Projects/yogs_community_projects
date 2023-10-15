import { Env, EnvProvider } from './EnvProvider'
import { JJExtensionMain } from './JJExtensionMain'

export const JJExtensionMobile = () => (
  <EnvProvider env={Env.mobile}>
    <JJExtensionMain />
  </EnvProvider>
)
