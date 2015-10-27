<?php
$q = intval($_GET['q']);
$n = $_GET['n'];

$con=mysqli_connect("HOST","USER","PASSWORD","DATABASE");

if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"scores");
if ($q < 30) {
$sql="INSERT INTO scores (Name, Score)
VALUES ('$n', '$q')";
}
else {
echo "<script>console.log('" . $q . "')</script>";
}
$query = mysqli_query($con,$sql);
if (!$query) {
   echo '<script>console.log("' . mysqli_error($con) . '")</script>';
   echo "<div>failed</div>";
}
mysqli_close($con);
?>
