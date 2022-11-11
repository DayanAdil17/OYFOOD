<?php
    include_once 'DatabaseConnection.php';

    $JSON = json_decode(file_get_contents('php://input'), true);    
    
    $sql = "SELECT * FROM active_order WHERE order_status = 'done' ORDER BY order_created DESC";

    $result = mysqli_query($connection,$sql);

    $response = array();

    $order_history = array();

    if($result -> num_rows > 0){
        while($row = $result -> fetch_assoc()){
            array_push($order_history, $row);
        }        
    }

    $sql = "SELECT * FROM menu";

    $result = mysqli_query($connection,$sql);

    $response = array();

    $menu = array();

    if($result -> num_rows > 0){
        while($row = $result -> fetch_assoc()){
            array_push($menu, $row);
        }        
    }
    $response['menu'] = $menu;
    $response['order_history'] = $order_history;
    echo json_encode($response);
?>