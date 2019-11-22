const extractFileName = source => {
	let a = source.split('/');
	return a[a.length-1];
}

export default extractFileName