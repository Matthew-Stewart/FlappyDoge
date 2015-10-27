<?php

   // not currently working / not fully implemented

	$num  = $_GET['a'];
	$NorS = $_GET['b'];
	$DorA = $_GET['c'];
	$BEA  = $_GET['d'];
	$SorN = $_GET['e'];

   $con=mysqli_connect("HOST","USER","PASSWORD","DATABASE");
	// Check connection
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	$result = "";

	if ($NorS == "Score") {
		switch ($DorA) {
			case "Descending":
				switch ($BEA) {
					case "Below":
						$result = mysqli_query($con,"SELECT * FROM scores WHERE Score < '$SorN' ORDER BY Score DESC LIMIT '$num'");
						break;
					case "Above":
						$result = mysqli_query($con,"SELECT * FROM scores WHERE Score > '$SorN' ORDER BY Score DESC LIMIT '$num'");
						break;
					case "Equal To":
						$result = mysqli_query($con,"SELECT * FROM scores WHERE Score = '$SorN' ORDER BY Score DESC LIMIT '$num'");
						break;
				}
				break;
			case "Ascending":
				switch ($BEA) {
					case "Below":
						$result = mysqli_query($con,"SELECT * FROM scores WHERE Score < '$SorN' ORDER BY Score ASC LIMIT '$num'");
						break;
					case "Above":
						$result = mysqli_query($con,"SELECT * FROM scores WHERE Score > '$SorN' ORDER BY Score ASC LIMIT '$num'");
						break;
					case "Equal To":
						$result = mysqli_query($con,"SELECT * FROM scores WHERE Score = '$SorN' ORDER BY Score ASC LIMIT '$num'");
						break;
				}
				break;
		}
	}

	else {
		$result = mysqli_query($con,"SELECT * FROM scores WHERE (strpos('$SorN', Name) !== false) ORDER BY Score DESC LIMIT '$num'");
	}

echo "<div class='xhdr'>
		  <table class='' style=\"width: 100%; font-size: 20px;\">
		  <tr>
		  <td style=\"width: 65%;\"><div class='hdrcell'>Name</div></td>
		  <td style=\"width: 35%;\"><div class='hdrcell'>Score</div></td>
		  </tr>
		  </table>
		  </div>
		  <div class='objbox'>
		  <table class='obj row20' style=\"width: 100%;\">";
	$count = 0;
	while($row = mysqli_fetch_array($result)) {
		if (strtoupper($row['Name'])==strtoupper($n) and $count%2==0) {
			echo "<tr class='ev_dhx_skyblue rowselected cellselected'>";
		}
		elseif (strtoupper($row['Name'])==strtoupper($n) and $count%2==1){
			echo "<tr class='odd_dhx_skyblue rowselected cellselected'>";
		}
		elseif ($count%2==0) {
			echo "<tr class='ev_dhx_skyblue'>";
		}
		else {
			echo "<tr class='odd_dhx_skyblue'>";
		}
		echo "<td style=\"width: 65%;\">" . $row['Name'] . "</td>";
		echo "<td style=\"width: 35%;\">" . $row['Score'] . "</td>";
		echo "</tr>";
		$count++;
	}

	echo "</table>";

	mysqli_close($con);
?>
