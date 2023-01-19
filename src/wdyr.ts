import * as React from 'react'

import wdyr from '@welldone-software/why-did-you-render'

if (env.NODE_ENV === 'development') {
	wdyr(React, {
		include: [/.*/],
		trackAllPureComponents: true,
	})
}
