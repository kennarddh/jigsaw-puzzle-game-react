import { FC } from 'react'

import type { Props } from './Types'

import { Image } from './Styles'
import { useDrag } from 'react-dnd'

const Tile: FC<Props> = ({ image, width, height }) => {
	const [{ isDragging }, dragRef] = useDrag(
		() => ({
			type: 'Tile',
			// item: { text },
			collect: monitor => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[]
	)

	return (
		<Image
			src={image}
			width={width}
			height={height}
			alt='Tile'
			ref={dragRef}
		/>
	)
}

export default Tile
