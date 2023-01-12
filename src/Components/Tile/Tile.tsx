import { forwardRef } from 'react'

import type { Props } from './Types'

import { Image } from './Styles'

const Tile = forwardRef<HTMLImageElement, Props>(
	({ image, width, height }, ref) => {
		return (
			<Image
				src={image}
				width={width}
				height={height}
				alt='Tile'
				ref={ref}
			/>
		)
	}
)

Tile.displayName = 'Tile'

export default Tile
