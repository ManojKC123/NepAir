<?php


$clientid = "724077778480-rclm656n8s87b20t1vp89s078kfo1aqk.apps.googleusercontent.com";
$clientsecret = "xs5vI7u9sBm84UfCw6WvtB9t";
$localhost = 'http://localhost/manojproj/';
$backhost = 'http://localhost/manojproj/backend';

$serverhost = 'localhost';
$username = 'root';
$password = '';
$dbname = 'nepalAqi';

try {
    $con = new PDO(
        "mysql:host={$serverhost};dbname={$dbname}",
        "{$username}",
        "{$password}"
    );
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Error ' . $e->getMessage();
}


function clean($input)
{
    $input = str_replace('<', '&lt', $input);
    $input = str_replace('>', '&gt', $input);
    $input = str_replace('=', '&#61', $input);
    $input = str_replace("'", '&#39', $input);
    $input = str_replace('"', '&quot', $input);
    $input = str_replace(';', '&#59', $input);
    $input = str_replace('/', '&#47', $input);
    return $input;
}
function mailer($to, $subject, $msg)
{
    require_once './mailing/smtp/class.phpmailer.php';
    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->SMTPDebug = 1;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'TLS';
    $mail->Host = 'smtp.sendgrid.net';
    $mail->Port = 587;
    $mail->IsHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Username = 'apikey';
    $mail->Password ='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';
    $mail->SetFrom('neeswebservices@gmail.com');
    // $mail->addAttachment("dummy.pdf");
    $mail->Subject = $subject;
    $mail->Body = $msg;
    $mail->AddAddress($to);
    if (!$mail->Send()) {
        return 0;
    } else {
        return 1;
    }
}

?>