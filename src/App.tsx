import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'

import ImagePromise from 'Utils/ImagePromise'

import type { ITile, ITiles } from './Types'

import {
	TilesContainer,
	Container,
	ShuffledTilesContainer,
	Header,
	GameContainer,
} from './AppStyles'
import { Shuffle } from 'Utils/Array'
import DragTile from 'Components/DragTile/DragTile'
import DropDropTile from 'Components/DropDropTile/DropDropTile'
import TilesContext from 'Contexts/TilesContext'

const EmptyImage =
	'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

const App: FC = () => {
	const [ImageUrl] = useState<string>('image.png')
	const [Tiles, SetTiles] = useState<ITiles>([])
	const [Row] = useState<number>(2)
	const [Column] = useState<number>(2)
	const [TileWidth, SetTileWidth] = useState<number>(0)
	const [TileHeight, SetTileHeight] = useState<number>(0)
	const [IsPreviewShowing, SetIsPreviewShowing] = useState<boolean>(false)

	const { ModifiedTiles, ReversedModifiedTiles } = useContext(TilesContext)

	useEffect(() => {
		const tiles: ITiles = []

		ImagePromise(ImageUrl)
			.then(rawImage => {
				const resizeCanvas = document.createElement('canvas')
				const resizeCtx = resizeCanvas.getContext('2d')

				const targetWidth = 800

				const resizeMultiplier = targetWidth / rawImage.width

				resizeCanvas.width = rawImage.width * resizeMultiplier
				resizeCanvas.height = rawImage.height * resizeMultiplier

				resizeCtx?.drawImage(
					rawImage,
					0,
					0,
					rawImage.width * resizeMultiplier,
					rawImage.height * resizeMultiplier
				)

				return resizeCanvas.toDataURL()
			})
			.then(resizedImage => ImagePromise(resizedImage))
			.then(image => {
				const tileWidth = image.width / Column
				const tileHeight = image.height / Row

				for (let y = 0; y < Row; y++) {
					for (let x = 0; x < Column; x++) {
						const canvas = document.createElement('canvas')

						canvas.width = tileWidth
						canvas.height = tileHeight

						const ctx = canvas.getContext('2d')

						ctx?.drawImage(
							image,
							x * tileWidth,
							y * tileHeight,
							tileWidth,
							tileHeight,
							0,
							0,
							tileWidth,
							tileHeight
						)

						const base64 = canvas.toDataURL('image/jpeg')

						tiles.push({ id: uuid(), image: base64, x, y })
					}
				}

				SetTiles(tiles)
				SetTileWidth(tileWidth)
				SetTileHeight(tileHeight)
			})
			.catch(console.log)
	}, [Column, ImageUrl, Row])

	const ShuffledTiles = useMemo(() => {
		return Shuffle(Tiles)
	}, [Tiles])

	const TogglePreview = () => SetIsPreviewShowing(prev => !prev)

	const ShowTile = (pos: ITile) => {
		if (IsPreviewShowing) return pos.image

		if (!ModifiedTiles[pos.id]) return EmptyImage

		return Tiles.find(tile => tile.id === ModifiedTiles[pos.id])
			?.image as string
	}

	return (
		<Container>
			<GameContainer>
				<Header>
					<button onClick={TogglePreview}>Toggle Preview</button>
				</Header>
				<TilesContainer
					width={TileWidth * Column + 2}
					height={TileHeight * Row}
				>
					{Tiles.map(tileData => (
						<DropDropTile
							image={ShowTile(tileData)}
							key={tileData.id}
							width={TileWidth}
							height={TileHeight}
							id={tileData.id}
						/>
					))}
				</TilesContainer>
			</GameContainer>
			<ShuffledTilesContainer>
				{ShuffledTiles.map(tileData => (
					<DragTile
						image={
							ReversedModifiedTiles[tileData.id]
								? EmptyImage
								: tileData.image
						}
						key={tileData.id}
						width={TileWidth}
						height={TileHeight}
						id={tileData.id}
					/>
				))}
			</ShuffledTilesContainer>
		</Container>
	)
}

export default App
