/**
 * Quick and dirty lua object -> JS object converter.
 * This should be really done via some proper parser.
 */
export function luaToJson<Result>(lua: string, variableName: string): Result {
	const jsonString = lua
		.replace(new RegExp(`^${variableName} =`), '')
		.replaceAll(/-- .*\n/g, '\n') // remove comments
		.replaceAll(/\n */g, '\n') // un indent
		.replaceAll(/ *\n/g, '\n') // remove trailing whitespace
		.replaceAll(/\[(.*)\]\s\=\s/g, '$1:') // change equal to colon & remove outer brackets
		.replaceAll(/\n([0-9]+):/g, '\n"$1":') // put int array keys into ""
		.replaceAll(/,\n\}/g, '\n}') // remove trailing commas
		//.replaceAll(/\\(?!["\n\\])/g, '\\\\') // Escpae \. Except where already escaping another \ or ""
		.replaceAll(/\\\n/g, '') // Just remove wierd \ after failed attempt at solving line above. It seems like a rare case now.

	return JSON.parse(jsonString)
}
