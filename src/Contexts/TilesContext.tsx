import {
	createContext,
	FC,
	ReactNode,
	useMemo,
	useState,
	SetStateAction,
	Dispatch,
	useEffect,
} from 'react'
import { ITiles } from 'Types'

type IModifiedTiles = Record<string, string | undefined>
interface ITilesContext {
	SetTile: (id: string, positionId: string) => void
	ModifiedTiles: IModifiedTiles
	ReversedModifiedTiles: IModifiedTiles
	Row: number
	SetRow: Dispatch<SetStateAction<number> | number>
	Column: number
	SetColumn: Dispatch<SetStateAction<number> | number>
	IsCompleted: boolean
	Reset: () => void
	Tiles: ITiles
	SetTiles: Dispatch<SetStateAction<ITiles> | ITiles>
}

const TilesContext = createContext<ITilesContext>({
	SetTile: () => undefined,
	ModifiedTiles: {},
	ReversedModifiedTiles: {},
	Row: 0,
	SetRow: () => undefined,
	Column: 0,
	SetColumn: () => undefined,
	IsCompleted: false,
	Reset: () => undefined,
	Tiles: [],
	SetTiles: () => undefined,
})

export const TilesContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [ModifiedTiles, SetModifiedTiles] = useState<IModifiedTiles>({})

	const [Row, SetRow] = useState<number>(2)
	const [Column, SetColumn] = useState<number>(2)
	const [IsCompleted, SetIsCompleted] = useState<boolean>(false)

	const [Tiles, SetTiles] = useState<ITiles>([])

	const SetTile = (positionId: string, id: string) => {
		SetModifiedTiles(prev => ({
			...prev,
			[positionId]: id,
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

	const Reset = () => {
		SetIsCompleted(false)
		SetModifiedTiles({})
	}

	useEffect(() => {
		if (Row * Column !== Object.keys(ModifiedTiles).length) return

		for (const [position, id] of Object.entries(ModifiedTiles)) {
			if (position !== id) return
		}

		alert('Correct')
	}, [ModifiedTiles, Row, Column])

	return (
		<TilesContext.Provider
			value={{
				ModifiedTiles,
				SetTile,
				ReversedModifiedTiles,
				Row,
				SetRow,
				Column,
				SetColumn,
				IsCompleted,
				Reset,
				Tiles,
				SetTiles,
			}}
		>
			{children}
		</TilesContext.Provider>
	)
}

export default TilesContext
