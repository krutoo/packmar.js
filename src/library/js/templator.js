export function compo (strings, ...values) {
	const valuesBuffer = {};
	const htmlString = getBaseTemplate(strings, values, valuesBuffer);
	return { htmlString, valuesBuffer };
}

function getBaseTemplate (strings, values, valuesBuffer) {
	const parts = [];
	for (let i = 0; i < strings.length; i++) {
		parts.push(strings[i]);
		if (values.hasOwnProperty(i)) {
			parts.push(processValue(values[i], valuesBuffer));
		}
	}
	return parts.join('').trim();
}

function processValue (value, valuesBuffer) {
	const length = Object.keys(valuesBuffer).length;
	const substituteValue = `<!--{{${length}}}-->`;
	valuesBuffer[substituteValue] = value;
	return substituteValue;
}
