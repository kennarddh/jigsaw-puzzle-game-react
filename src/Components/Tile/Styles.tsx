import styled from 'styled-components'

import type { IImage } from './Types'

export const Image = styled.img<IImage>`
	position: absolute;

	width: ${({ width }) => width}px;
	height: ${({ height }) => height}px;
	top: ${({ top }) => top}px;
	left: ${({ left }) => left}px;
`
