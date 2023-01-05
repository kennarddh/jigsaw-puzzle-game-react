import { FC } from 'react'

import type { Props } from './Types'

import { Image } from './Styles'

const Tile: FC<Props> = ({ image, width, height, x, y }) => {
	return (
		<Image
			src={image}
			width={width}
			height={height}
			top={height * y}
			left={width * x}
			alt='Tile'
		/>
	)
}

export default Tile
