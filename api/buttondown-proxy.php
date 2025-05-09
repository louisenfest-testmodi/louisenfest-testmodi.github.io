<?php
// header setzen
header("Content-Type: application/json");

// POST-Daten holen
$input = json_decode(file_get_contents("php://input"), true);
$email = $input["email"] ?? "";

if (!$email) {
  http_response_code(400);
  echo json_encode(["error" => "E-Mail fehlt"]);
  exit;
}

// Anfrage an Buttondown
$ch = curl_init("https://api.buttondown.email/v1/subscribers");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(["email" => $email]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "Authorization: Token 8832184b-cc68-4416-aca2-090271a9360c",
  "X-Buttondown-Version: 2025-01-02"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;
