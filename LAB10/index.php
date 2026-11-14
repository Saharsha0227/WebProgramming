<?php
session_start();

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');

    if ($name === '') {
        $error = 'Please enter your name to continue.';
    } else {
        $_SESSION['user_name'] = $name;
        $_SESSION['login_time'] = time();

        header('Location: welcome.php');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome | Session Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="page-container">
        <section class="card login-card">
            <div class="eyebrow">PHP SESSION DEMO</div>
            <h1>WELCOME TO OUR WEB APPLICATION</h1>
            <p class="subtitle">Please enter your name to continue.</p>

            <?php if ($error !== ''): ?>
                <p class="error-message" role="alert">
                    <?php echo htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?>
                </p>
            <?php endif; ?>

            <form action="index.php" method="post">
                <label for="name">Enter Your Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value="<?php echo htmlspecialchars($_POST['name'] ?? '', ENT_QUOTES, 'UTF-8'); ?>"
                    required
                >
                <button class="button button-blue" type="submit">SUBMIT</button>
            </form>
        </section>
    </main>
</body>
</html>
