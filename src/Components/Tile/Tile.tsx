import { forwardRef, memo } from 'react'

import type { Props } from './Types'

const Tile = forwardRef<HTMLImageElement, Props>(
	({ image, width, height }, ref) => {
		return (
			<img
				src={image}
				alt='Tile'
				ref={ref}
				style={{
					width: `${width}px`,
					height: `${height}px`,
					border: '1px solid #000',
					userSelect: 'none',
				}}
			/>
		)
	}
)

Tile.displayName = 'Tile'

export default memo(Tile, (prev, next) => {
	if (prev.height !== next.height) return false
	if (prev.image !== next.image) return false
	if (prev.key !== next.key) return false
	if (prev.width !== next.width) return false

	return true
})
