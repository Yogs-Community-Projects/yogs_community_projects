import { Env, EnvProvider } from './EnvProvider'
import { JJExtensionMain } from './JJExtensionMain'

export const JJExtensionDesktop = () => (
  <EnvProvider env={Env.desktop}>
    <JJExtensionMain />
  </EnvProvider>
)
