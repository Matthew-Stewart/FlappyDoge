<?php
require_once("codebase/connector/grid_connector.php");

$res=mysqli_connect("matthew-stewart.hopto.org","SQLConnection","sqlconnection","scores");//connects to server with  db
mysqli_select_db($res,"scores");//connects to the database with the name "sampledb" 

$conn = new GridConnector($res, "MySQL");             //initializes the connector object
$conn->render_table("scores");
