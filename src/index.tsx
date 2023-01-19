/* eslint-disable jest/require-hook */
import './wdyr.js'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import GlobalStyle from './Styles'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TilesContextProvider } from 'Contexts/TilesContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<GlobalStyle />
		<DndProvider backend={HTML5Backend}>
			<TilesContextProvider>
				<App />
			</TilesContextProvider>
		</DndProvider>
	</React.StrictMode>
)
