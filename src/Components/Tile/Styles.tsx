import styled from 'styled-components'

import type { IImage } from './Types'

export const Image = styled.img<IImage>`
	width: ${({ width }) => width}px;
	height: ${({ height }) => height}px;

	border: 1px solid #000;
	user-select: none;
`
