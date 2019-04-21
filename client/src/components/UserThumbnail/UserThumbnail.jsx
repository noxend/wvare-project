import React from 'react'

export default function UserThumbnail({size, color, fontSize, later}) {

  const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    fontSize: fontSize,
    fontWeight: `500`,
    color: 'white',
    lineHeight: 'normal',
    userSelect: 'none',
    height: size,
    width: size,
    backgroundColor: color,
    borderRadius: `50%`,
  }

  return (
    <div style={styles}>
      {later}
    </div>
  )
}
