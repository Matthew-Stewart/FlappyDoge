<?php
$q = intval($_GET['q']);
$n = $_GET['n'];

$con=mysqli_connect("matthew-stewart.hopto.org","SQLConnection","sqlconnection","scores");
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"scores");
if ($q < 24) {
$sql="INSERT INTO scores (Name, Score)
VALUES ('$n', '$q')"; }
mysqli_query($con,$sql);
mysqli_close($con);
?>