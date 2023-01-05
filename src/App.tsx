import { FC, useEffect, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'

import ImagePromise from 'Utils/ImagePromise'

import type { ITiles } from './Types'

import Tile from 'Components/Tile/Tile'
import { Container } from './AppStyles'
import { Shuffle } from 'Utils/Array'

const App: FC = () => {
	const [ImageUrl] = useState<string>('image.png')
	const [Tiles, SetTiles] = useState<ITiles>([])
	const [Row] = useState<number>(5)
	const [Column] = useState<number>(10)
	const [TileWidth, SetTileWidth] = useState<number>(0)
	const [TileHeight, SetTileHeight] = useState<number>(0)

	useEffect(() => {
		const tiles: ITiles = []

		ImagePromise(ImageUrl)
			.then(image => {
				const tileWidth = image.width / Column
				const tileHeight = image.height / Row

				console.log({ tileWidth, tileHeight })

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

	return (
		<Container>
			{ShuffledTiles.map((tileData, i) => (
				<Tile
					image={tileData.image}
					key={tileData.id}
					width={TileWidth}
					height={TileHeight}
					x={i % Column}
					y={Math.floor(i / Column)}
				/>
			))}
		</Container>
	)
}

export default App
