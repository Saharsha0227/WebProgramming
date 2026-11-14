<?php
// Practical 11: Display Current Date, Time, and Day Using PHP

// Set default timezone to Indian Standard Time (IST)
date_default_timezone_set("Asia/Kolkata");

// Fetch current date in DD-MM-YYYY format
$currentDate = date("d-m-Y");

// Fetch current time in 12-hour format with AM/PM (hh:mm:ss AM/PM)
$currentTime = date("h:i:s A");

// Fetch current day name (e.g., Saturday)
$currentDay = date("l");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practical 11 - Current Date & Time</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #eef2f3, #8e9eab);
            padding: 20px;
        }

        .card {
            background-color: #ffffff;
            width: 100%;
            max-width: 420px;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .card h1 {
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 25px;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 15px;
        }

        .info-group {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 25px;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f8fafc;
            padding: 14px 18px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
        }

        .info-label {
            font-weight: 600;
            color: #64748b;
            font-size: 15px;
        }

        .info-value {
            font-weight: bold;
            color: #1e293b;
            font-size: 16px;
        }

        .time-value {
            color: #2563eb;
        }

        .card-footer {
            font-size: 13px;
            color: #94a3b8;
            border-top: 1px solid #f1f5f9;
            padding-top: 15px;
        }
    </style>
</head>
<body>

    <div class="card">
        <h1>Current Date & Time</h1>

        <div class="info-group">
            <div class="info-row">
                <span class="info-label">Date:</span>
                <span class="info-value"><?php echo $currentDate; ?></span>
            </div>

            <div class="info-row">
                <span class="info-label">Time:</span>
                <span class="info-value time-value"><?php echo $currentTime; ?></span>
            </div>

            <div class="info-row">
                <span class="info-label">Day:</span>
                <span class="info-value"><?php echo $currentDay; ?></span>
            </div>
        </div>

        <div class="card-footer">
            Powered by PHP
        </div>
    </div>

</body>
</html>

