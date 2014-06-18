<?php
	$n = strtoupper($_GET['n']);
	$l = intval($_GET['l']);
	$o = $_GET['o'];
	$con=mysqli_connect("matthew-stewart.hopto.org","SQLConnection","sqlconnection","scores");
	// Check connection
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	if ($o=="true") {
		$result = mysqli_query($con,"SELECT * FROM scores WHERE UPPER(Name) = '$n' ORDER BY Score DESC LIMIT 10");
		
		makeTable ($result);
	}
	else {
		$result = mysqli_query($con,"SELECT * FROM scores ORDER BY Score DESC LIMIT 10");
		
		makeTable ($result);
	}
	
	//$result = mysqli_query($con,"UPDATE scores SET Name='Matthew' WHERE Name='0'");
	//$result = mysqli_query($con,"DELETE FROM scores WHERE Name='Eric'");

	function makeTable ($result) {
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
		if (strtoupper($row['Name'])==strtoupper($GLOBALS['n']) and $count%2==0) {
			echo "<tr class='ev_dhx_skyblue rowselected cellselected'>";
		}
		elseif (strtoupper($row['Name'])==strtoupper($GLOBALS['n']) and $count%2==1){
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


	

	}
	mysqli_close($con);
?>