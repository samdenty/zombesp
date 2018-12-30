import { Link } from 'gatsby'
import React from 'react'
import { StyledHeader } from './elements'
import { Toolbar, IconButton, Typography, Button } from '@material-ui/core'

export const Header = ({ siteTitle }) => (
  <StyledHeader position="static">
    <Toolbar>
      <Link to="/">
        <Typography variant="h6" color="inherit">
          {siteTitle}
        </Typography>
      </Link>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </StyledHeader>
)
