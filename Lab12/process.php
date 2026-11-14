<?php
// Initialize variables
$message = "";
$statusClass = "";
$isAuthorized = false;

// Check if form data is received via POST method
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Retrieve and trim submitted input values
    $name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $age = isset($_POST["age"]) ? trim($_POST["age"]) : "";

    // Validate that both name and age fields are not empty
    if ($name === "" || $age === "") {
        $message = "Please provide both Name and Age.";
        $statusClass = "error";
    } elseif (!is_numeric($age) || (int)$age <= 0) {
        $message = "Please enter a valid age.";
        $statusClass = "error";
    } else {
        // Convert age to integer
        $ageNumber = (int)$age;

        // Sanitize name with htmlspecialchars() to prevent XSS attacks
        $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');


        if ($ageNumber < 18) {
            // Under 18: Not authorized
            $message = "Hello " . $safeName . ", you are not authorized to visit the site.";
            $statusClass = "unauthorized";
            $isAuthorized = false;
        } else {
            // 18 or above: Authorized
            $message = "Welcome to this site, " . $safeName . "!";
            $statusClass = "authorized";
            $isAuthorized = true;
        }
    }
} else {
    // If accessed directly without submitting the form
    header("Location: index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Authorization Result</title>
    <style>
        /* Modern, clean reset and background */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background: linear-gradient(135deg, #eef2f7 0%, #dbe4ee 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        /* Centered card container */
        .card {
            background-color: #ffffff;
            width: 100%;
            max-width: 440px;
            padding: 35px 30px;
            border-radius: 14px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
            text-align: center;
        }

        .card h2 {
            font-size: 22px;
            color: #2c3e50;
            margin-bottom: 20px;
        }

        /* Result notification boxes */
        .result-box {
            padding: 16px 18px;
            border-radius: 8px;
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 25px;
            font-weight: 500;
        }

        /* Authorized state (Age >= 18) */
        .authorized {
            background-color: #eafaf1;
            color: #27ae60;
            border: 1.5px solid #a9dfbf;
        }

        /* Unauthorized state (Age < 18) */
        .unauthorized {
            background-color: #fdedec;
            color: #c0392b;
            border: 1.5px solid #f5b7b1;
        }

        /* Error state (Empty / Invalid fields) */
        .error {
            background-color: #fef9e7;
            color: #d35400;
            border: 1.5px solid #f9e79f;
        }

        /* Back button */
        .btn-back {
            display: inline-block;
            text-decoration: none;
            width: 100%;
            padding: 12px;
            background-color: #34495e;
            color: #ffffff;
            font-size: 15px;
            font-weight: 600;
            border-radius: 8px;
            transition: background-color 0.2s ease;
        }

        .btn-back:hover {
            background-color: #2c3e50;
        }

        /* Responsive adjustment */
        @media (max-width: 480px) {
            .card {
                padding: 25px 20px;
            }
        }
    </style>
</head>

<body>

    <div class="card">
        <h2>Verification Result</h2>

        <!-- Display message formatted safely -->
        <div class="result-box <?php echo $statusClass; ?>">
            <?php echo $message; ?>
        </div>

        <!-- Button to go back to the input form -->
        <a href="index.php" class="btn-back">Go Back</a>
    </div>

</body>

</html>