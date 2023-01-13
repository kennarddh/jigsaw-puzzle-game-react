export interface ITile {
	id: string
	image: string
	x: number
	y: number
}

export type ITiles = ITile[]

export interface ITilesContainer {
	width: number
	height: number
}

export interface IItem {
	id: string
	dragDrop: boolean
}
