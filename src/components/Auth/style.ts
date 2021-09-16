import styled from 'styled-components'

import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'

export const StyledAvatar = styled(Avatar)<{ size?: number }>`
    ${({ theme, size = 4 }) => `
    width: ${theme.spacing(size)}px;
    height: ${theme.spacing(size)}px;
    `}
`

export const StyledPaper = styled(Paper)<{ size?: 'small' | 'large' }>`
    ${({ theme, size = 'large' }) => `
    display: flex;
    justify-content: center;
    min-width: ${theme.spacing({ small: 16, large: 36 }[size])}px;
    margin-top: ${theme.spacing(2)}px;
    padding: ${theme.spacing(2)}px;
    border-radius: 1em;
    `}
`
