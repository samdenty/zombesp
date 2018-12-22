import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Hook, Console, Decode } from 'console-feed'
import { onMount } from '../lib'

import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

const t = gql`
  query {
    getZombie(id: 1) @client {
      id
      directConnections {
        id
        address
      }
    }
  }
`

class IndexPage extends React.Component {
  state = {
    test: false,
    logs: [],
  }

  componentDidMount() {
    setTimeout(() => this.setState({ test: true }), 1000)
    // Hook(window.console, log => {
    //   this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    // })

    onMount()
  }

  render() {
    return (
      <Layout>
        {this.state.test && (
          <Query query={t}>
            {data => {
              console.log(data)
              return null
            }}
          </Query>
        )}
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
