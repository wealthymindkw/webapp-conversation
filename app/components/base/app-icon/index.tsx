import type { FC } from 'react'
import classNames from 'classnames'
import style from './style.module.css'

export interface AppIconProps {
  size?: 'xs' | 'tiny' | 'small' | 'medium' | 'large'
  rounded?: boolean
  icon?: string
  background?: string
  className?: string
}

const AppIcon: FC<AppIconProps> = ({
  size = 'medium',
  rounded = false,
  background,
  className,
}) => {
  return (
    <span
      className={classNames(
        style.appIcon,
        size !== 'medium' && style[size],
        rounded && style.rounded,
        className ?? '',
      )}
      style={{
        background: 'transparent', /* خليناها شفافة عشان ما تخرب على صورتك */
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', /* عشان يقص الصورة بشكل دائري مرتب */
        border: '1px solid #C5A059' /* إطار ذهبي فخم */
      }}
    >
      <img 
        src="حط_رابط_الصورة_هني" 
        alt="Wealthy Mind Logo" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    </span>
  )
}

export default AppIcon
