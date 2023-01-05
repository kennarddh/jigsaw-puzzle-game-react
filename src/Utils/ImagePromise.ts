const ImagePromise = (src: string) =>
	new Promise<HTMLImageElement>((resolve, reject) => {
		const image = new Image()

		image.onload = () => resolve(image)
		image.onerror = () => reject
		image.src = src
	})

export default ImagePromise
