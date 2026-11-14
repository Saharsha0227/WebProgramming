<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practical 12 - Age Authorization</title>
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
            max-width: 420px;
            padding: 35px 30px;
            border-radius: 14px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .card h2 {
            font-size: 24px;
            color: #2c3e50;
            text-align: center;
            margin-bottom: 8px;
        }

        .card p.subtitle {
            font-size: 14px;
            color: #7f8c8d;
            text-align: center;
            margin-bottom: 25px;
        }

        /* Form elements */
        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: #34495e;
            margin-bottom: 8px;
        }

        .form-group input {
            width: 100%;
            padding: 12px 14px;
            font-size: 15px;
            border: 1.5px solid #dcdde1;
            border-radius: 8px;
            outline: none;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-group input:focus {
            border-color: #3498db;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
        }

        /* Submit button */
        .btn-submit {
            width: 100%;
            padding: 13px;
            background-color: #3498db;
            color: #ffffff;
            font-size: 16px;
            font-weight: 600;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }

        .btn-submit:hover {
            background-color: #2980b9;
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
        <h2>Website Authorization</h2>
        <p class="subtitle">Please enter your details to verify your age</p>

        <!-- HTML Form submitting to process.php using POST method -->
        <form action="process.php" method="POST">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your full name" required>
            </div>

            <div class="form-group">
                <label for="age">Age</label>
                <input type="number" id="age" name="age" min="1" max="120" placeholder="Enter your age" required>
            </div>

            <button type="submit" class="btn-submit">Submit</button>
        </form>
    </div>

</body>
</html>

