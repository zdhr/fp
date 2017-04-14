<?php

use Nette\Utils\Strings;


function deleteDir($dir) {
	$files = new RecursiveIteratorIterator(
		new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS),
		RecursiveIteratorIterator::CHILD_FIRST
	);

	foreach ($files as $file) {
		$file->isDir() ? rmdir($file->getRealPath()) : unlink($file->getRealPath());
	}

	rmdir($dir);
}

function getMission($missionPath) {
	return file_get_contents($missionPath . '/mission');
}

function getDictionary($missionPath) {
	return file_get_contents($missionPath . '/l10n/DEFAULT/dictionary');
}

function extractMission($filePath, $missionPath) {
	if (is_dir($missionPath)) {
		deleteDir($missionPath);
	}

	mkdir($missionPath);

	$zip = new ZipArchive();
	$res = $zip->open($filePath);
	$zip->extractTo($missionPath);
	$zip->close();
}

function cleanUpMission($missionPath) {
	deleteDir($missionPath);
}


function parseLua($lua, $varName) {
	$lua = Strings::replace($lua, '/^' . $varName . ' =/', null);
	$lua = Strings::replace($lua, '/\-\- .*\n/', "\n"); // remove comments
	$lua = Strings::replace($lua, '/\n */', "\n"); // un indent
	$lua = Strings::replace($lua, '/ *\n/', "\n"); // remove trailing whitespace
	$lua = Strings::replace($lua, '/\[(.*)\]\s\=\s/','$1:'); // change equal to colon & remove outer brackets
	$lua = Strings::replace($lua, '/\n([0-9]+):/', "\n\"$1\":"); // put int array keys into ""
	$lua = Strings::replace($lua, '/,\n\}/', "\n}"); // remove trailing commas

	return json_decode($lua, true);
}


function transformPlane($plane) {
	global $dictionary;

	return [
		'id' => $plane['unitId'],
		'name' => $dictionary[$plane['name']],
		'callsign' => $plane['callsign']['name'],
		'number' => $plane['onboard_num'],
		'parking' => isset($plane['parking']) ? $plane['parking'] : null,
	];
}

function transformWaypoint($waypoint) {
	global $dictionary;

	if ($waypoint['prev']) {
		// it's flipped in DCS coord system
		$wx = $waypoint['y'];
		$wy = $waypoint['x'];
		$px = $waypoint['prev']['y'];
		$py = $waypoint['prev']['x'];

		$dx = abs($px - $wx);
		$dy = abs($py - $wy);

		$distance = sqrt($dx * $dx + $dy * $dy);

		if ($py === $wy) {
			$heading = $px > $wx ? 270 : 90;
		} else if ($px === $wx) {
			$heading = $py > $wy ? 180 : 0;
		} else {
			$direction = $py > $wy ? 'S' : 'N';
			$direction .= $px > $wx ? 'W' : 'E';

			switch ($direction) {
				case 'NE':
					$heading = rad2deg(atan($dx / $dy));
					break;
				case 'SE':
					$heading = rad2deg(atan($dy / $dx)) + 90;
					break;
				case 'SW':
					$heading = rad2deg(atan($dx / $dy)) + 180;
					break;
				case 'NW':
					$heading = rad2deg(atan($dy / $dx)) + 270;
					break;
			}
		}
	} else {
		$distance = 0;
		$heading = 0;
	}

	return [
		'number' => $waypoint['number'] - 1,
		'type' => $waypoint['type'],
		'name' => $dictionary[$waypoint['name']],
		'x' => $waypoint['y'], // it's flipped in DCS coord system
		'y' => $waypoint['x'], // it's flipped in DCS coord system
		'distance' => $distance,
		'heading' => $heading,
		'alt' => $waypoint['alt'],
		'altType' => $waypoint['alt_type'] === 'BARO' ? 'MSL' : 'AGL',
		'duration' => $waypoint['prev'] ? max($waypoint['ETA'] - $waypoint['prev']['ETA'], 0) : 0,
		'eta' => $waypoint['ETA'],
		'etaLocked' => $waypoint['ETA_locked'],
		'speed' => $waypoint['speed'],
		'speedLocked' => $waypoint['speed_locked'],
	];
}

function transformGroup(array $group, $coalition, array $country) {
	global $dictionary;

	$group['route'] = array_values($group['route']['points']);
	$group['units'] = array_values($group['units']);

	$waypointNumber = 1;
	$prevWaypoint = null;
	foreach($group['route'] as &$waypoint) {
		$waypoint['number'] = $waypointNumber;
		$waypoint['prev'] = $prevWaypoint;

		$waypointNumber += 1;
		$prevWaypoint = $waypoint;
	}

	return [
		'id' => $group['groupId'],
		'coalition' => $coalition,
		'country' => $country['name'],
		'name' => $dictionary[$group['name']],
		'type' => $group['units'][0]['type'],
		'task' => $group['task'],
		'planes' => array_map('transformPlane', $group['units']),
		'startTime' => $group['start_time'],
		'route' => array_map('transformWaypoint', $group['route']),
	];
}

function extractGroups(array $mission) {
	$planeGroups = [];

	foreach (['blue', 'red'] as $coalition) {
		foreach ($mission['coalition'][$coalition]['country'] as $country) {
			if (isset($country['plane'])) {
				foreach($country['plane']['group'] as $group) {
					$isFlyable = array_reduce($group['units'], function($carry, $unit) {
						return $carry || in_array($unit['skill'], ['Client', 'Player']);
					}, false);

					if ($isFlyable) {
						$planeGroups[] = transformGroup($group, $coalition, $country);
					}
				}
			}

			if (isset($country['helicopter'])) {
				foreach($country['helicopter']['group'] as $group) {
					$isFlyable = array_reduce($group['units'], function($carry, $unit) {
						return $carry || in_array($unit['skill'], ['Client', 'Player']);
					}, false);

					if ($isFlyable) {
						$planeGroups[] = transformGroup($group, $coalition, $country);
					}
				}
			}
		}
	}

	return $planeGroups;
}
