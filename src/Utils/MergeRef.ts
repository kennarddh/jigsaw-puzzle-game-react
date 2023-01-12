import { MutableRefObject } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MergeRef = <T = any>(
	...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> => {
	return value => {
		refs.forEach(ref => {
			if (typeof ref === 'function') {
				ref(value)
			} else if (ref !== null) {
				// eslint-disable-next-line @typescript-eslint/no-extra-semi
				;(ref as MutableRefObject<T | null>).current = value
			}
		})
	}
}
