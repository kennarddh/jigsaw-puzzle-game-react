import styled from 'styled-components'
import { ITilesContainer } from 'Types'

export const GameContainer = styled.div`
	width: 75%;
	height: 100%;
`

export const TilesContainer = styled.div<ITilesContainer>`
	position: relative;
	border: 1px solid #000;

	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
`

export const Container = styled.div`
	display: flex;

	height: 100vh;

	flex-direction: row;
`

export const ShuffledTilesContainer = styled.div`
	width: 25%;
	height: 100%;
	overflow-y: scroll;

	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
`

export const Header = styled.div`
	height: 10%;
`
