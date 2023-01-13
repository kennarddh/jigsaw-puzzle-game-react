/* eslint-disable security/detect-object-injection */
import { FC, useContext } from 'react'

import type { Props } from './Types'

import { useDrag, useDrop } from 'react-dnd'
import Tile from 'Components/Tile/Tile'
import { MergeRef } from 'Utils/MergeRef'
import { IItem } from 'Types'
import TilesContext from 'Contexts/TilesContext'

const DropDropTile: FC<Props> = ({ image, width, height, id }) => {
	const { SetTile, ModifiedTiles, ReversedModifiedTiles } =
		useContext(TilesContext)

	const [, dragRef] = useDrag<IItem>(
		() => ({
			type: 'Tile',
			item: { id: ModifiedTiles[id] as string, dragDrop: true },
			canDrag() {
				return !!ModifiedTiles[id]
			},
		}),
		[ModifiedTiles]
	)

	const [, dropRef] = useDrop<IItem>(
		() => ({
			accept: 'Tile',
			drop(item) {
				if (!item.dragDrop) return SetTile(id, item.id)

				const previousPosition = ReversedModifiedTiles[item.id]

				if (previousPosition === id) return

				if (previousPosition) {
					SetTile(previousPosition, ModifiedTiles[id] as string)
				}

				SetTile(id, item.id)
			},
		}),
		[ModifiedTiles, ReversedModifiedTiles]
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
