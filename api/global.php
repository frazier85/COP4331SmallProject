<?PHP 
if(!defined("IN_API"))
{
	die("Direct access of this file is now allowed");
}

define("DB_HOST", "localhost");
define("DB_NAME", "contactmanager");
define("DB_USER", "root");
define("DB_PASS", "manageMe!");


function getRequestInfo()
{
	return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj )
{
	header('Content-type: application/json');
	echo $obj;
}

function sendError($error)
{
	sendResultInfoAsJson('{"error":"' . $error . '"}');
}
?>