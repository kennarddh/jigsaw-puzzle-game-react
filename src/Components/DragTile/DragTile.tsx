import { FC, useContext, memo } from 'react'

import type { Props } from './Types'

import { useDrag } from 'react-dnd'
import Tile from 'Components/Tile/Tile'
import TilesContext from 'Contexts/TilesContext'
import { IItem } from 'Types'

const DragTile: FC<Props> = ({ image, width, height, id }) => {
	const { ReversedModifiedTiles } = useContext(TilesContext)

	const [, dragRef] = useDrag<IItem>(
		() => ({
			type: 'Tile',
			item: { id },
			canDrag() {
				// eslint-disable-next-line security/detect-object-injection
				return !ReversedModifiedTiles()[id]
			},
		}),
		[ReversedModifiedTiles]
	)

	return <Tile image={image} width={width} height={height} ref={dragRef} />
}

export default memo(DragTile, (prev, next) => {
	if (prev.height !== next.height) return false
	if (prev.image !== next.image) return false
	if (prev.width !== next.width) return false

	return true
})
