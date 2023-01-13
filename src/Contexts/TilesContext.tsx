import { createContext, FC, ReactNode, useMemo, useState } from 'react'

type IModifiedTiles = Record<string, string | undefined>

interface ITilesContext {
	SetTile: (id: string, positionId: string) => void
	RemoveTile: (positionId: string) => void
	ModifiedTiles: IModifiedTiles
	ReversedModifiedTiles: IModifiedTiles
}

const TilesContext = createContext<ITilesContext>({
	SetTile: () => undefined,
	ModifiedTiles: {},
	ReversedModifiedTiles: {},
	RemoveTile: () => undefined,
})

export const TilesContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [ModifiedTiles, SetModifiedTiles] = useState<IModifiedTiles>({})

	const SetTile = (positionId: string, id: string) => {
		SetModifiedTiles(prev => ({
			...prev,
			[positionId]: id,
		}))
	}

	const RemoveTile = (positionId: string) => {
		SetModifiedTiles(prev => ({
			...prev,
			[positionId]: undefined,
		}))
	}

	const ReversedModifiedTiles = useMemo(
		() =>
			Object.fromEntries(
				Object.entries(ModifiedTiles).map(([key, value]) => [
					value,
					key,
				])
			),
		[ModifiedTiles]
	)

	return (
		<TilesContext.Provider
			value={{
				ModifiedTiles,
				SetTile,
				RemoveTile,
				ReversedModifiedTiles,
			}}
		>
			{children}
		</TilesContext.Provider>
	)
}

export default TilesContext
