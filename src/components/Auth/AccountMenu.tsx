import { FC } from 'react'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

import firebase from '../../firebase'
import { useAuth } from './useAuth'
import AvatarIcon from '../AvatarIcon'

const AccountMenu: FC = ({ }) => {
    const [currentUser] = useAuth()

    const logout = () => {
        firebase.auth().signOut()
    }

    return currentUser ? (
        <div>
            <AvatarIcon displayName={currentUser.displayName ?? undefined} photoURL={currentUser.photoURL ?? undefined} size={10} />
            <Typography variant="body1" >
                {currentUser?.displayName}
            </Typography>
            <Typography variant="caption" >
                {currentUser?.email}
            </Typography>
            <Divider />
            <Button variant="outlined" onClick={logout}>ログアウト</Button>
        </div>
    ) : null
}

export default AccountMenu