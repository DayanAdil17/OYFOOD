<?php
    include_once 'DatabaseConnection.php';

    $JSON = json_decode(file_get_contents('php://input'), true);    
    
    $sql = "SELECT * FROM active_order WHERE order_status = 'active'";

    $result = mysqli_query($connection,$sql);

    $response = array();

    $active_order = array();

    if($result -> num_rows > 0){
        while($row = $result -> fetch_assoc()){
            array_push($active_order, $row);
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
    $response['active_order'] = $active_order;
    echo json_encode($response);
?>