<?PHP
define("IN_API", 1);
require_once "global.php";

$login    = $_GET["login"];
$logout   = $_GET["logout"];
$register = $_GET["register"];

$inData = getRequestInfo();
$user = $inData["username"];
$pass = $inData["password"];

if(!isset($user) or !isset($pass))
{
	die("Username or password are mandatory");
}

$dbc = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if (mysqli_connect_errno())
{
	$error = '{"id":-1,"username":"","error":"There was an issue with our database (' . mysqli_connect_errno . ')"}';
	sendResultInfoAsJson($error);
	die();
}

if(isset($login)
{
	if ($stmt = $dbc->prepare("SELECT ID,username FROM USERS WHERE username=? AND PW=?" ))
	{
		$stmt->bind_param('ss', $user, $pass);
		$stmt->execute();
		$stmt->store_result();
		$stmt->bind_result($uid,$user);
		$json = '{"id":-1,"username":"","error":"Invalid username or password."}';
		if($stmt->fetch())
		{
			$json = '{"id":' . $uid . ',"username":"' . $user .'",error":""}';
		}
		$stmt->close();
		sendResultInfoAsJson($json);
	}
	else
	{
		$error = '{"id":-1,"username":"","error":"There was an issue with our database."}';
		sendResultInfoAsJson($error);
	}
}
elseif(isset($logout))
{
	
}
elseif(isset($register))
{
	
}
else
{
	mysqli_close($dbc);
	die("Invalid GET parameters.");
}

mysqli_close($dbc);
?>