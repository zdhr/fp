import { luaToJson } from 'utils/luaToJson'


const lua = `dictionary =
{
    ["DictKey_descriptionNeutralsTask_4"] = "task 4",
    ["DictKey_sortie_5"] = "mission name",
    ["DictKey_descriptionText_1"] = "",
    ["DictKey_descriptionBlueTask_3"] = "",
    ["DictKey_descriptionRedTask_2"] = "",
} -- end of dictionary
`

describe('luaToJson', () => {
	test('Simple dictionary is parsed correctly', () => {
		expect(luaToJson(lua, 'dictionary')).toEqual({
			'DictKey_descriptionNeutralsTask_4': 'task 4',
			'DictKey_sortie_5': 'mission name',
			'DictKey_descriptionText_1': '',
			'DictKey_descriptionBlueTask_3': '',
			'DictKey_descriptionRedTask_2': '',
		})
	})
})
