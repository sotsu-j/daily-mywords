import { FC, useState, useEffect } from 'react';

import { Avatar } from '@material-ui/core';

import firebase from '../girebase';
import { hash } from '../utils/color';

export interface AvatarIconProps {
    size?: number;
    uid?: string;
    displayName?: string | undefined;
    photoURL?: string | undefined;
    color?: string | undefined;
}

const AvatarIcon: FC<AvatarIconProps> = ({ size = 4, uid, displayName, photoURL }) => {
    const [state, setState] = useState<AvatarIconProps>({
        displayName,
        photoURL,
        color: uid && hash(uid),
    })
    const database = firebase.database()

    useEffect(() => {
        let dispatchSafe = ({ displayName, photoURL, color }:AvatarIconProps) => setState({ displayName, photoURL, color })
        if (uid) {
            database.ref(`users/${uid}`).on('value', (snapshot) => {
                const data: User = snapshot.val()
                data && dispatchSafe({ displayName: data.name, photoURL: data.photoURL, color: hash(uid) })
            })
        }
        return () => {
            dispatchSafe = () => { }
        }
    }, [uid, displayName, photoURL])

    return (
        <Avatar alt={state.displayName} src={state.photoURL} size={size} color={state.color}>
            {state.displayName && state.displayName.slice(0, 1)}
        </Avatar>
    )
}

export default AvatarIcon