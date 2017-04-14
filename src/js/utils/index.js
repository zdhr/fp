import {sprintf} from 'sprintf-js';


export const serialize = (object) => {
	var string = [];

	for (let property in object) {
		if (object.hasOwnProperty(property)) {
			string.push(
				encodeURIComponent(property) + '=' + encodeURIComponent(object[property])
			);
		}
	}

	return string.join('&');
}


export const cleanObject = (object) => {
	var propNames = Object.getOwnPropertyNames(object);

	for (let i = 0; i < propNames.length; i++) {
		let propName = propNames[i];
		if (object[propName] === null || object[propName] === undefined) {
			delete object[propName];
		}
	}

	return object;
};


export const objectToArray = (object) => Object.keys(object).map(key => object[key]);


export const round = (number, precision) => {
	const factor = Math.pow(10, precision);
	const tempNumber = number * factor;
	const roundedTempNumber = Math.round(tempNumber);

	return roundedTempNumber / factor;
};


export const timeFormat = (seconds, keepHours = true) => {
	const hours = Math.floor(seconds / 3600);
	seconds = seconds - hours * 3600;

	const minutes = Math.floor(seconds / 60);
	seconds = seconds - minutes * 60;

	return hours || keepHours ?
		sprintf('%02d:%02d:%02d', hours, minutes, seconds) :
 		sprintf('%02d:%02d', minutes, seconds);
}


export const convertTime = (time) => {
	const parts = time.split(':').map(
		(decimal) => parseInt(decimal, 10)
	);

	return parts.length === 3 ?
		parts[0] * 3600 + parts[1] * 60 + parts[2] :
		parts[0] * 60 + parts[1];
}
