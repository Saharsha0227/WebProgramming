<?php
session_start();

if (!isset($_SESSION['user_name'], $_SESSION['login_time'])) {
    header('Location: index.php');
    exit;
}

$userName = htmlspecialchars($_SESSION['user_name'], ENT_QUOTES, 'UTF-8');
$loginTime = (int) $_SESSION['login_time'];
$logoutTime = time();
$duration = max(0, $logoutTime - $loginTime);

$hours = intdiv($duration, 3600);
$minutes = intdiv($duration % 3600, 60);
$seconds = $duration % 60;

session_destroy();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You | Session Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="page-container">
        <section class="card logout-card">
            <div class="success-icon" aria-hidden="true">✓</div>
            <div class="eyebrow">SESSION COMPLETE</div>
            <h1>THANK YOU FOR VISITING!</h1>
            <p class="subtitle">
                Thank you, <strong><?php echo $userName; ?></strong>, for using our web application.
            </p>

            <div class="time-details">
                <div class="detail-row">
                    <span>Login Time</span>
                    <strong><?php echo date('h:i:s A', $loginTime); ?></strong>
                </div>
                <div class="detail-row">
                    <span>Logout Time</span>
                    <strong><?php echo date('h:i:s A', $logoutTime); ?></strong>
                </div>
            </div>

            <div class="duration-box">
                <span>Total Usage Duration</span>
                <strong><?php echo $hours; ?> hours <?php echo $minutes; ?> minutes <?php echo $seconds; ?> seconds</strong>
            </div>

            <a class="button button-blue" href="index.php">BACK TO HOME</a>
        </section>
    </main>
</body>
</html>
