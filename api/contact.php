<?PHP
define("IN_API", 1);
require_once "global.php";

$add  = $_GET["add"];
$del  = $_GET["del"];
$edit = $_GET["edit"];

$inData = getRequestInfo();

$dbc = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if (mysqli_connect_errno())
{
	sendError('There was an issue with our database (' . mysqli_connect_errno . ')');
	die();
}

if(isset($add)
{
	$uid   = $inData["userID"];
	$fname = $inData["first"];
	$lname = $inData["lname"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	if($stmt = $dbc->prepare("INSERT INTO CONTACTS (id, userID, firstname, lastname, phone, email) VALUES (NULL, ?, ?, ?, ?, ?)"))
	{
		$stmt->bind_param('iissss', );
		$stmt->execute();
	}
	else 
	{
		sendError("There was an issue with our database (" . $mysqli->error . ")");
	}
	mysqli_close($dbc);
}
elseif(isset($del))
{
	$cid = $inData["contactID"];
	if($stmt = $dbc->prepare("DELETE FROM CONTACTS WHERE id=?"))
	{
		$stmt->bind_param('i', $cid);
		$stmt->execute();
	}
	else 
	{
		sendError("There was an issue with our database (" . $mysqli->error . ")");
	}
	mysqli_close($dbc);
}
elseif(isset($edit))
{
	
}
else
{
	mysqli_close($dbc);
	die("Invalid GET parameters.");
}
?>