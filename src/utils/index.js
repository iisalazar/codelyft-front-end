export const convertDate = date => {
		let newDate = new Date(date);
		return newDate.toLocaleString()
	}
export const language = lang => lang.toLowerCase()