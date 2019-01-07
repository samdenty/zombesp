import { Router } from '@reach/router'
import { Layout } from '../components/Layout'

const Test = props => {
  console.log(props)
  return <div>test</div>
}

export default props => {
  console.log(props)
  return (
    <Layout>
      <Router>
        <Test path="/zombie/:id" />
      </Router>
    </Layout>
  )
}
