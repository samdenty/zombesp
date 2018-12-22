import * as React from 'react'
import { Hook, Console, Decode } from 'console-feed'

import { Link } from 'gatsby'

import Layout from '../components/layout'
import { Zombie } from '../components/Zombie'

class IndexPage extends React.Component {
  state = {
    logs: [],
  }

  componentDidMount() {
    // Hook(window.console, log => {
    //   this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    // })
  }

  render() {
    return (
      <Layout>
        <Zombie id="test" />

        <div style={{ backgroundColor: '#292929' }}>
          <Console logs={this.state.logs} variant="dark" />
        </div>
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
          {/* <Image /> */}
        </div>
        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    )
  }
}

export default IndexPage
