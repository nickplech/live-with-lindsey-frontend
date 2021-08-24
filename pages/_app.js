import 'regenerator-runtime/runtime'
import { ApolloProvider } from '@apollo/client'
import Page from '../components/Page'
import withData from '../lib/withData'
import { ToastStateProvider } from '../components/contexts/LocalState'
import { UserSocketProvider } from '../components/contexts/SignedInSocket'


function MyApp({ Component, apollo, pageProps }) {

  return (
    <ApolloProvider client={apollo}>
      <ToastStateProvider >
        <UserSocketProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
        </UserSocketProvider>
      </ToastStateProvider>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  pageProps.query = ctx.query
  return { pageProps }
}

export default withData(MyApp)
