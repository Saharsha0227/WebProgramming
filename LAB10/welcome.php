<?php
session_start();

if (!isset($_SESSION['user_name'], $_SESSION['login_time'])) {
    header('Location: index.php');
    exit;
}

$userName = htmlspecialchars($_SESSION['user_name'], ENT_QUOTES, 'UTF-8');
$loginTime = (int) $_SESSION['login_time'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello, <?php echo $userName; ?> | Session Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="page-container">
        <section class="card welcome-card">
            <p class="session-time">
                Session Started At:
                <strong><?php echo date('h:i:s A', $loginTime); ?></strong>
            </p>
            <div class="welcome-content">
                <div class="success-icon" aria-hidden="true">✓</div>
                <div class="eyebrow">YOU ARE SIGNED IN</div>
                <h1>Hello, <?php echo $userName; ?>!</h1>
                <p class="subtitle">Welcome to our web application. We are glad to have you here!</p>
                <a class="button button-green" href="logout.php">LOGOUT</a>
            </div>
        </section>
    </main>
</body>
</html>
