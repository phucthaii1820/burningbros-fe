import { CardMedia } from '@mui/material'
import React from 'react'

interface AppIconProps {
  src: string
  sx?: React.CSSProperties
  wh?: string
  onClick?: () => void
}

const AppIcon: React.FC<AppIconProps> = ({ src, sx, wh = '30px', onClick }) => {
  return (
    <CardMedia
      component="img"
      src={src}
      sx={{
        objectFit: 'contain',
        height: wh,
        width: wh,
        ...sx,
      }}
      onClick={onClick}
    />
  )
}

export default AppIcon

AppIcon.defaultProps = {
  wh: '24px',
  sx: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {},
}
