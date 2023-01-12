import { FC } from 'react'

import type { Props } from './Types'

import { useDrag, useDrop } from 'react-dnd'
import Tile from 'Components/Tile/Tile'
import { MergeRef } from 'Utils/MergeRef'

const DropDropTile: FC<Props> = ({ image, width, height, id }) => {
	const [, dragRef] = useDrag(
		() => ({
			type: 'Tile',
			item: { id },
		}),
		[]
	)

	const [, dropRef] = useDrop(
		() => ({
			accept: 'Tile',
			drop(item) {
				console.log(item)
			},
		}),
		[]
	)

	return (
		<Tile
			image={image}
			width={width}
			height={height}
			ref={MergeRef(dragRef, dropRef)}
		/>
	)
}

export default DropDropTile
