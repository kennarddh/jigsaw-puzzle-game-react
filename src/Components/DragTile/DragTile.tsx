import { FC } from 'react'

import type { Props } from './Types'

import { useDrag } from 'react-dnd'
import Tile from 'Components/Tile/Tile'

const DragTile: FC<Props> = ({ image, width, height, id }) => {
	const [, dragRef] = useDrag(
		() => ({
			type: 'Tile',
			item: { id },
		}),
		[]
	)

	return <Tile image={image} width={width} height={height} ref={dragRef} />
}

export default DragTile
