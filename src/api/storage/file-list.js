import { ref } from 'vue'

export default function () {
	const files = ref([])
	let file

	function addFiles(newFiles) {
		let newUploadableFiles = [...newFiles].map((file) => new UploadableFile(file)).filter((file) => !fileExists(file.id))
		files.value = files.value.concat(newUploadableFiles)
	}

	function addFile(newFile) {
		let newUploadableFile = new UploadableFile(newFile)
		file = newUploadableFile
		return file
	}

	function fileExists(otherId) {
		return files.value.some(({ id }) => id === otherId)
	}

	function removeFiles(files) {
		const index = files.value.indexOf(file)

		if (index > -1) files.value.splice(index, 1)
	}
	function removeFile(file) {
		file = null
	}

	return { file, addFile, removeFile }
}

export class UploadableFile {
	constructor(file) {
		this.file = file
		this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
		this.url = URL.createObjectURL(file)
		this.status = null
	}
}
