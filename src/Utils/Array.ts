export const Pick = <T>(array: T[]) => {
	const index: number = Math.floor(Math.random() * array.length)

	// eslint-disable-next-line security/detect-object-injection
	return array[index]
}

export const PickUnique = <T>(array: T[], last: T) => {
	let result: T

	do {
		result = Pick(array)
	} while (result === last)

	return result
}

export const Shuffle = <T>(array: T[]) => {
	const newArray = [...array]

	for (let i = newArray.length - 1; i > 0; i -= 1) {
		const newIndex = Math.floor(Math.random() * (i + 1))

		// eslint-disable-next-line security/detect-object-injection
		;[newArray[i], newArray[newIndex]] = [newArray[newIndex], newArray[i]]
	}

	return newArray
}
