import { FC, useState } from 'react';

import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ClickAwayListener } from '@material-ui/core';

import { StyledPaper } from './style';

import firebase from '../../firevase';

const SIGN_IN_METHODS: { provider: string, label: string }[] = [
  { provider: 'google', label: "Googleアカウントでログイン" },
  { provider: 'anonymous', label: "匿名でログイン" },
]

const SignIn: FC = ({ children = "ログイン" }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    switch (event.currentTarget.dataset.method) {
      default: return null
      case 'google':
        const googleProvider = new firebase.auth.GoogleAuthProvider()
        return firebase.auth().signInWithRedirect(googleProvider)
      case 'anonymous':
        return firebase.auth().signInAnonymously()
    }
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <Button color="inherit" onClick={handleOpen} onMouseOver={handleOpen}>{children}</Button>
        <Popper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="bottom-end"
        >
          <StyledPaper size='small'>
            <List component="nav">
              {SIGN_IN_METHODS.map(({ provider, label }) => (
                <ListItem key={provider} button dense onClick={handleClick} data-method={provider}>
                  <ListItemText primary={label} />
                </ListItem>
              ))}
            </List>
          </StyledPaper>
        </Popper>
      </div>
    </ClickAwayListener>
  )
}

export default SignIn
