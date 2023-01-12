import { FC } from 'react'

import type { Props } from './Types'

import { Image } from './Styles'

const Tile: FC<Props> = ({ image, width, height }) => {
	return <Image src={image} width={width} height={height} alt='Tile' />
}

export default Tile
