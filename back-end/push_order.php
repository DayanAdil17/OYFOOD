<?php
    include_once 'DatabaseConnection.php';

    $JSON = json_decode(file_get_contents('php://input'), true);   
    
    $user = $JSON['name'];
    $table = $JSON["table"];
    $menu = $JSON["menu"];
    $quantity = $JSON["quantity"];
    
    $sql = "INSERT into active_order (order_user, order_table, order_menu_id, order_quantity) value('$user', '$table','$menu', '$quantity')";

     mysqli_query($connection,$sql);
?>