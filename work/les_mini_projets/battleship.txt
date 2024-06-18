function isValidCoord(int $x, int $y, array $coord)
{
    return $coord[0] >= 0 && $coord[0] < $x && $coord[1] >= 0 && $coord[1] < $y;
}

function colle(int $x, int $y, array $coords = [])
{
    if ($x <= 0 && $y <= 0) {
    }

    for ($b = 0; $b < $y; $b++) {
        echo "+";
        for ($a = 0; $a < $x; $a++) {
            echo "---+";
        }
        echo "\n|";
        for ($a = 0; $a < $x; $a++) {
            $hasCross = false;
            foreach ($coords as $coord) {
                if (isValidCoord($x, $y, $coord) && $coord[0] == $a && $coord[1] == $b) {
                    echo " X |";
                    $hasCross = true;
                    break;
                }
            }
            if (!$hasCross) {
                echo "   |";
            }
        }
        echo "\n";
    }
    echo "+";
    for ($a = 0; $a < $x; $a++) {
        echo "---+";
    }
    echo "\n";

    //Prompt
    while (true) {
        $prompt = readline('&> ');

        switch (substr($prompt, 0, 5)) {
            case 'query':
                $coordinates = explode(',', substr($prompt, 6));
                $queryCoord = [intval($coordinates[0]), intval($coordinates[1])];
                $found = false;
                foreach ($coords as $coord) {
                    if ($coord == $queryCoord) {
                        $found = true;
                        break;
                    }
                }
                if ($found) {
                    echo 'full' . PHP_EOL;
                } else {
                    echo 'empty' . PHP_EOL;
                }
                break;

            case 'add [':
                $coordinates = explode(',', substr($prompt, 5));
                $cooB = substr($coordinates[1], 1, 1);
                $queryCoord = [intval($coordinates[0]), $cooB];
                $found = false;
                foreach ($coords as $coord) {
                    if ($coord == $queryCoord) {
                        $found = true;
                        break;
                    }
                }
                if ($found) {
                    echo 'A cross already exists at this location' . PHP_EOL;
                } else {
                    $arrayToPush = [[$coordinates[0], $cooB]];
                    array_push($coord, $arrayToPush);
                    colle($x, $y, [$coord]);
                }
                break;

            case 'remov':
                $coordinates = explode(',', substr($prompt, 7));
                $cooB = substr($coordinates[1], 1, 1);
                $queryCoord = [intval($coordinates[0]), $cooB];
                $found = false;

                $indexToRemove = array_search($queryCoord, $coords);
                echo $indexToRemove;
                if ($indexToRemove !== false) {
                    unset($coords[$indexToRemove]);
                    var_dump($coords);
                    colle($x, $y, [$coord]);
                } else {
                    echo 'No cross exists at this location.' . PHP_EOL;
                }

            case 'displ':
                colle($x, $y, [$coord]);
                break;

            default:
                echo 'Commande non reconnue' . PHP_EOL;
                break;
        }
    }
}

colle(3, 3, [[0, 2], [2, 2], [1, 0]]);
