import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import { ESPCom, DirectConnection, CloudConnection } from '../lib/ESPCom'

const d = new DirectConnection('ws://192.168.1.102:81')
const c = new CloudConnection('mqtt://127.0.0.1:8080', 'testing')

const espCom = new ESPCom([d, c])

window.espCom = espCom
window.c = c
window.d = d

c.emit('hello', 'world')

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
