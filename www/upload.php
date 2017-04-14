<?php

date_default_timezone_set('UTC');

$basePath = __DIR__ . '/server';
$tempPath = $basePath . '/temp';

require $basePath . '/vendor/autoload.php';
require $basePath . '/src/functions.php';

Tracy\Debugger::enable(false);
Tracy\Debugger::$maxLen = 25000;
Tracy\Debugger::$maxDepth = 5;
Tracy\Debugger::$strictMode = true;

$debug = false;

$missionDirPath = sprintf('%s/%d', $tempPath, time());
$missionFilePath = sprintf('%s/%d.miz', $tempPath, time());
if (!$debug) {
	$base64 = file_get_contents('php://input');
	$base64 = str_replace('data:;base64,', null, $base64);
	$base64 = str_replace('data:application/octet-stream;base64,', null, $base64);
	file_put_contents($missionFilePath, base64_decode($base64));
}

extractMission($missionFilePath, $missionDirPath);
$mission = getMission($missionDirPath);
$mission = parseLua($mission, 'mission');
$dictionary = getDictionary($missionDirPath);
$dictionary = parseLua($dictionary, 'dictionary');
cleanUpMission($missionDirPath);

$flights = extractGroups($mission);


$json = json_encode([
	'name' => $dictionary[$mission['sortie']],
	'flights' => $flights,
	'weather' => [
		'clouds' => $mission['weather']['clouds'],
		'wind' => $mission['weather']['wind'],
		'qnh' => $mission['weather']['qnh'],
	],
	'date' => [
		'time' => isset($mission['date']) ? $mission['start_time'] : 0,
		'day' => isset($mission['date']) ? $mission['date']['Day'] : date('j'),
		'month' => isset($mission['date']) ? $mission['date']['Month'] : date('n'),
		'year' => isset($mission['date']) ? $mission['date']['Year'] : date('Y'),
	],
]);

if (!$debug) {
	file_put_contents(sprintf('%s/log.%s.json', $tempPath, time()), $json);
	unlink($missionFilePath);

	header('Content-Type: application/json; charset=utf-8');
	echo $json;
}
