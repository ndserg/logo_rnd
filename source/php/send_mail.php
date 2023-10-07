<?php

if ($_SERVER['HTTP_SEC_FETCH_SITE'] === 'none') {
    die('No direct access');
}

require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Данные, которые отправляет пользователь
$theme = $_POST['message-subject'];
$name = $_POST['user-name'];
$phone = $_POST['user-phone'];
$email = $_POST['user-email'];
$text = $_POST['message-text'];

// Формирование самого письма
$title = "$theme";
$body = "
<h2>Тема: $title</h2>
<b>Имя:</b> $name<br>
<b>Телефон:</b> $phone<br><br>
<b>Почта:</b> $email<br><br>
<b>Сообщение:</b><br>$text
";

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
        //Server settings
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->CharSet = "UTF-8";
    $mail->Host       = '';                     //Set the SMTP server to send through. Example 'mail.YourDomain.ru'
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = '';                     //SMTP username. Example 'self@YourDomain.ru'
    $mail->Password   = '';                               //SMTP password Example 'yourPassword'
    $mail->SMTPAutoTLS = false;
    $mail->SMTPSecure = false;
    $mail->Port       = 25;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('ndserg@gmail.com', 'тестовое задание для Rocket Business');
    $mail->addAddress('rbru-metrika@yandex.ru');

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $title;
    $mail->Body = $body;

    if(!$mail->send()) {
        http_response_code(400);
        echo "Данные не отправлены. Ошибка: {$mail->ErrorInfo}";
    } else {
        http_response_code(200);
        echo "Сообщение отправлено!";
    }
} catch (Exception $e) {
    http_response_code(400);
    echo "Данные не отправлены. Ошибка: {$mail->ErrorInfo}";
}
