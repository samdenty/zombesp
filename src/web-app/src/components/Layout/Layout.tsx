import './reset.css'
import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import { Header } from './Header'
import { StyledLayout, globalStyles } from './elements'
import { Global } from '@emotion/core'

export const Layout = ({ children }) => (
  <>
    <Global styles={globalStyles()} />
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <StyledLayout>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          >
            <html lang="en" />
          </Helmet>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div>{children}</div>
        </StyledLayout>
      )}
    />
  </>
)
