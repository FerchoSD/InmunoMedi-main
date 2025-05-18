<?php
header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitizar y validar datos
    $form_type = isset($_POST['form_type']) ? htmlspecialchars($_POST['form_type']) : '';
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
    $message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';
    $address = isset($_POST['address']) ? htmlspecialchars($_POST['address']) : '';
    $terms = isset($_POST['terms']) ? true : false;

    // Validar correo
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Correo electrónico inválido.';
        echo json_encode($response);
        exit;
    }

    // Validar términos
    if (!$terms) {
        $response['message'] = 'Debes aceptar los términos y condiciones.';
        echo json_encode($response);
        exit;
    }

    // Configurar el correo
    $to = 'contacto@inmunomedi.com'; // Reemplaza con tu correo
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if ($form_type === 'contact') {
        // Formulario de contacto
        if (empty($name) || empty($email) || empty($message)) {
            $response['message'] = 'Por favor, completa todos los campos.';
            echo json_encode($response);
            exit;
        }

        $subject = "Nuevo mensaje de contacto de $name";
        $body = "Nombre: $name\n";
        $body .= "Correo: $email\n";
        $body .= "Mensaje:\n$message\n";

        if (mail($to, $subject, $body, $headers)) {
            $response['success'] = true;
            $response['message'] = 'Mensaje enviado con éxito.';
        } else {
            $response['message'] = 'Error al enviar el mensaje.';
        }
    } elseif ($form_type === 'checkout') {
        // Formulario de checkout
        if (empty($name) || empty($email) || empty($address)) {
            $response['message'] = 'Por favor, completa todos los campos.';
            echo json_encode($response);
            exit;
        }

        // Obtener los productos del carrito (enviados desde el cliente o almacenados en una sesión)
        // Para este ejemplo, asumimos que el carrito se envía como un campo oculto o se maneja en el servidor
        $subject = "Nuevo pedido de $name";
        $body = "Nombre: $name\n";
        $body .= "Correo: $email\n";
        $body .= "Dirección de envío:\n$address\n";
        $body .= "Productos:\n";
        // Aquí deberías incluir los productos del carrito, por ejemplo, desde una sesión o un campo oculto
        $body .= "Total: [Calculado en el cliente]\n";

        if (mail($to, $subject, $body, $headers)) {
            $response['success'] = true;
            $response['message'] = 'Pedido confirmado con éxito.';
        } else {
            $response['message'] = 'Error al confirmar el pedido.';
        }
    } else {
        $response['message'] = 'Tipo de formulario no válido.';
    }
} else {
    $response['message'] = 'Método no permitido.';
}

echo json_encode($response);
exit;