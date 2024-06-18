while (1) {


    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "cinema";

    $error_message = "";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $line = readline("mysql>");
        $explose = explode(' ', $line);
        $arg1 = $explose[0];

        if ($arg1 === 'show') {
            $stmt = $conn->prepare("SHOW tables;");
            $stmt->execute();

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $len = strlen('Table');
            foreach ($result as $row) {
                $leng = strlen($row['Tables_in_' . $dbname]);
                if ($leng > $len) {
                    $len = $leng;
                }
            }

            echo '+' . str_repeat('-', $len + 6) . '+' . PHP_EOL;
            echo '|' . '  Tables_in_cinema  ' . '|' . PHP_EOL;
            echo '+' . str_repeat('-', $len + 6) . '+' . PHP_EOL;

            foreach ($result as $row) {
                $lengt = strlen($row['Tables_in_' . $dbname]);
                echo '| ' . $row['Tables_in_' . $dbname] . str_repeat(' ', $len + 5 - $lengt) . '|' . "\n";
            }

            echo '+' . str_repeat('-', $len + 6) . '+' . PHP_EOL;

        } else if ($arg1 === 'describe') {
            $arg_2 = $explose[1];
            $a = strlen($arg_2);
            $arg2 = substr($arg_2, 0, $a - 1);

            $sql = "DESCRIBE $arg2";

            $result = $conn->query($sql);

            $rows = $result->fetchAll(PDO::FETCH_ASSOC);

            $len = strlen("| Field       | Type      | Null      | Key       | Default       | Extra              |");
            echo '+' . str_repeat('-', $len) . '+' . PHP_EOL;
            echo "| Field       | Type      | Null      | Key         | Default       | Extra              |" . PHP_EOL;
            echo '+' . str_repeat('-', $len) . '+' . PHP_EOL;

            foreach ($rows as $row) {
                echo '| ' . $row['Field'] . "\t";
                echo '| ' . $row['Type'] . "\t";
                echo '| ' . $row['Null'] . "\t";
                echo '| ' . $row['Key'] . "\t";
                echo '| ' . $row['Default'] . "\t";
                echo '| ' . $row['Extra'] . '|' . "\n";
            }

            echo '+' . str_repeat('-', $len) . '+' . PHP_EOL;

        } else if ($arg1 === 'select') {
            $arg2 = $explose[1];
            $arg4 = $explose[3];
            $b = strlen($arg4);
            $arg4 = substr($arg4, 0, $b - 1);

            $query = "SELECT $arg2 FROM $arg4";

            $stmt = $conn->prepare($query);
            $stmt->execute();

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $len = strlen('|' . $arg2 . '|');
            foreach ($result as $row) {
                $leng = strlen($row[$arg2]);
                if ($leng > $len) {
                    $len = $leng;
                }
            }

            echo '+' . str_repeat('-', $len + 6) . '+' . PHP_EOL;
            echo '| ' . $arg2 . str_repeat(' ', $len + 1) . '|' . PHP_EOL;
            echo '+' . str_repeat('-', $len + 6) . '+' . PHP_EOL;

            foreach ($result as $row) {
                $lengt = $lengt = strlen($row[$arg2]);
                echo '| ' . $row[$arg2] . str_repeat(' ', $len + 5 - $lengt) . '|' . "\n";
            }

            echo '+' . str_repeat('-', $len + 6) . '+' . PHP_EOL;

        } else {
            echo 'commande non reconnue' . PHP_EOL;
        }

    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    echo $error_message;
}