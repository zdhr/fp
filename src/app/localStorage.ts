import { createMission, createNatoUnits, createUserUnits } from './factories'
import { Mission, UserUnits } from './types'


const missionVersion = 7
const missionKey = 'dcsfp2.mission'
const userUnitsKey = 'dcsfp2.userUnits'


export function saveMission(mission: Mission): void {
	if (mission) {
		window.localStorage.setItem(missionKey, JSON.stringify({
			...mission.toJS(),
			version: missionVersion,
		}))
	} else {
		window.localStorage.removeItem(missionKey)
	}
}

export function loadMission(): Mission {
	const missionJson = window.localStorage.getItem(missionKey)

	if (!missionJson) {
		return null
	}

	const mission = JSON.parse(missionJson)

	if (mission.version !== missionVersion) {
		alert('This app was updated and your saved mission can no longer be used. Sorry for the inconvinience.')
		window.localStorage.removeItem(missionKey)

		return null
	}

	return createMission(mission)
}

export function saveUserUnits(userUnits: UserUnits): void {
	window.localStorage.setItem(userUnitsKey, JSON.stringify(userUnits.toJS()))
}

export function loadUserUnits(): UserUnits {
	const unitsJson = window.localStorage.getItem(userUnitsKey)

	return unitsJson ?
		createUserUnits(JSON.parse(unitsJson)) :
		createNatoUnits()
}
