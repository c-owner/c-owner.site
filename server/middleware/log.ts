
export default defineEventHandler((event) => {
	// const colors = require('colors')
	// console.log(colors)
	// console.log(colors.green('API:'));
	console.log(`[Log] :: New request : ${event.node.req.url}`)

})
