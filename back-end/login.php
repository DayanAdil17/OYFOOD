<?php
    include_once 'DatabaseConnection.php';

    $JSON = json_decode(file_get_contents('php://input'), true);   
    
    $username = $JSON['username'];
    $password = $JSON['password'];

    $response = array();
    
    $sql = "SELECT * FROM resto_admin WHERE resto_username = '$username' AND resto_password = '$password'";

    $result = mysqli_query($connection,$sql);

    if($result -> num_rows > 0){
        $response['status_login'] = "success";
    }else{
        $response['status_login'] = "failed";
    }
    echo json_encode($response);
    
?>