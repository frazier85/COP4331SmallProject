<?PHP
define("IN_API", 1);
require_once "global.php";

$add  = $_GET["add"];
$del  = $_GET["del"];
$edit = $_GET["edit"];
$view = $_GET["view"];
$search = $_GET["search"];
$inData = getRequestInfo();

$dbc = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if (mysqli_connect_errno())
{
	sendError('There was an issue with our database. (' . mysqli_connect_errno . ')');
	die();
}

if(isset($add))
{
	$uid   = $inData["uid"];
	$fname = $inData["fname"];
	$lname = $inData["lname"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	if($stmt = $dbc->prepare("INSERT INTO CONTACTS (id, userID, firstname, lastname, phone, email) VALUES (NULL, ?, ?, ?, ?, ?)"))
	{
		$stmt->bind_param('issss', $uid, $fname, $lname, $phone, $email);
		$stmt->execute();
	}
	else
	{
		sendError("There was an issue with our database. (" . $mysqli->error . ")");
	}
	mysqli_close($dbc);
}
elseif(isset($del))
{
	$cid = $inData["contactid"];
	if($stmt = $dbc->prepare("DELETE FROM CONTACTS WHERE id=?"))
	{
		$stmt->bind_param('i', $cid);
		$stmt->execute();
	}
	else
	{
		sendError("There was an issue with our database. (" . $mysqli->error . ")");
	}
	mysqli_close($dbc);
}
elseif(isset($edit))
{
	$cid   = $inData["contactid"];
	$fname = $inData["fname"];
	$lname = $inData["lname"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	if($stmt = $dbc->prepare("UPDATE CONTACTS SET firstname=?, lastname=?, phone=?, email=? WHERE ID=?"))
	{
		$stmt->bind_param('ssssi', $fname, $lname, $phone, $email, $cid);
		$stmt->execute();
	}
	else
	{
		sendError("There was an issue with our database. (" . $mysqli->error . ")");
	}
	mysqli_close($dbc);
}
elseif(isset($view))
{
	if ($stmt = $dbc->prepare("SELECT * FROM CONTACTS WHERE userID=? ORDER BY lastname ASC" ))
	{
		$uid = $inData["uid"];
		$stmt->bind_param('i', $uid);
		$stmt->execute();
		$stmt->store_result();
		$stmt->bind_result($cid, $userid, $fname, $lname, $phone, $email);
		$json = '{ "contacts": [';
		while($stmt->fetch())
		{
			$json = $json . '{"id" : ' . $cid . ', "first" : "' . $fname . '","last":"' . $lname .
			'", "phone" : "' . $phone . '", "email" : "' . $email . '"},';
		}
		//remove last comma
		$json = substr($json, 0, -1);
		$json = $json . "]}";
		$stmt->close();
		sendResultInfoAsJson($json);
	}
	else
	{
		sendError("There was an issue with our database. (" . $mysqli->error . ")");
	}
	mysqli_close($dbc);
}
elseif(isset($search))
{
	$uid = $inData["uid"];
	$searchData = $inData["search"];
	if(strlen($searchData) < 3)
	{
		sendError("Please enter at least 3 characters");
		die();
	}
	if ($stmt = $dbc->prepare("SELECT * FROM CONTACTS WHERE userID=? AND firstname LIKE CONCAT('%',?,'%') OR lastname LIKE CONCAT('%',?,'%') OR email LIKE CONCAT('%',?,'%') OR phone LIKE CONCAT('%',?,'%') ORDER BY lastname ASC" ))
	{
		$stmt->bind_param('issss', $uid, $searchData, $searchData, $searchData, $searchData);
		$stmt->execute();
		$stmt->store_result();
		$stmt->bind_result($cid, $userid, $fname, $lname, $phone, $email);
		$json = '{ "contacts": [';
		while($stmt->fetch())
		{
			$json = $json . '{"id" : ' . $cid . ', "first" : "' . $fname . '","last":"' . $lname .
			'", "phone" : "' . $phone . '", "email" : "' . $email . '"},';
		}
		//remove last comma
		$json = substr($json, 0, -1);
		$json = $json . "]}";
		$stmt->close();
		sendResultInfoAsJson($json);
	}
	else
	{
		sendError("There was an issue with our database. (" . $mysqli->error . ")");
	}
	mysqli_close($dbc);
}
else
{
	mysqli_close($dbc);
	die("Invalid GET parameters.");
}
?>
