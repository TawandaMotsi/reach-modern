<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$to = 'your-email@yourdomain.com'; // Replace with your email
$subject = 'New Application: ' . $data['firstName'] . ' ' . $data['lastName'];

$message = "
<html>
<head><title>New Application Submitted</title></head>
<body>
<h2>New Application Submitted</h2>
<p><strong>Name:</strong> {$data['firstName']} {$data['lastName']}</p>
<p><strong>Email:</strong> {$data['email']}</p>
<p><strong>Phone:</strong> {$data['mobileNo']}</p>
<p><strong>Role:</strong> {$data['role']}</p>
<p><strong>Address:</strong> {$data['streetAddress']}, {$data['city']}, {$data['county']}, {$data['postcode']}</p>
<hr/>
<h3>Full Application Details</h3>
<pre>" . json_encode($data, JSON_PRETTY_PRINT) . "</pre>
</body>
</html>
";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: noreply@yourdomain.com\r\n"; // Replace with your domain

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Application submitted successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
?>
