
/*Hey EJ, hope you dont mind that I changed some variables and other things within the code to reflect what James
said to me this afternoon about how he set up his php files and some variables I changed within the html document.
Added the hideorshow back to make it so that everything can be done on one page
-Katie*/

// No problem, sounds great!
// I changed the search function on here since it looks like the php will handle it ?
// Additionally, added the register, delete, view, edit functions to pass the parameters based on the examples
// updated ID names

var urlBase = '/api';

var userId = 0;

function doRegister()
{
	var username = document.getElementById("loginUsername").value;
	var password = document.getElementById("loginPassword").value;

	var jsonPayload = '{"username" : "' + username + '", "password" : "' + password + '"}';
	var url = urlBase + '/contact.php?register=1';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		// Not sure if we want to display something upon completing register
		// Wasn't sure where the ID tag was to edit the string so just commented it out for now
		
		/*xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactSearchResult").innerHTML = "Registration complete";
			}
		};*/
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

}

function doLogin()
{
	userId = 0;

	var username = document.getElementById("loginUsername").value;
	var password = document.getElementById("loginPassword").value;

	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"username" : "' + username + '", "password" : "' + password + '"}';
	var url = urlBase + '/login.php?login=1';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse( xhr.responseText );

		userId = jsonObject.id;

		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}

		displayName = jsonObject.username;
		document.getElementById("userDisplay").innerHTML = displayName;
		document.getElementById("loginUsername").value = "";
		document.getElementById("loginPassword").value = "";

		hideOrShow( "loggedInDiv", true);
		hideOrShow( "accessUIDiv", true);
		hideOrShow( "loginDiv", false);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doLogout()
{
	userId = 0;
	document.getElementById("loginName").value = "";
	document.getElementById("loginPassword").value = "";
	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", true);
}

function hideOrShow( elementId, showState )
{
	var vis = "visible";
	var dis = "block";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}

	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
}


function addContact()
{
	var fname = document.getElementById("inputFirstName").value;
	var lname = document.getElementById("inputLastName").value;
	var phone = document.getElementById("inputPhone").value;
	var email = document.getElementById("inputEmail").value;

	var jsonPayload = '{"uid" : "' + userId + '", "fname" : "' + fname + '", "lname" : "' + lname + '", "phone" : "' + phone + '", "email" : "' + email + '"}';
	var url = urlBase + '/contact.php?add=1';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactSearchResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

}

function delContact()
{
	var contactid = document.getElementById("inputFirstName").value;

	var jsonPayload = '{"contactid" : "' + contactid + '"}';
	var url = urlBase + '/contact.php?del=1';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactSearchResult").innerHTML = "Contact has been deleted";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

}

function editContact()
{
	var contactid = document.getElementById("searchText").value;
	var fname = document.getElementById("inputFirstName").value;
	var lname = document.getElementById("inputLastName").value;
	var phone = document.getElementById("inputPhone").value;
	var email = document.getElementById("inputEmail").value;

	var jsonPayload = '{"contactid" : "' + contactid + '", "fname" : "' + fname + '", "lname" : "' + lname + '", "phone" : "' + phone + '", "email" : "' + email + '"}';
	var url = urlBase + '/contact.php?edit=1';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactSearchResult").innerHTML = "Contact has been updated";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

}


function viewContact()
{
	var uid = document.getElementById("searchText").value;

	var jsonPayload = '{"uid" : "' + uid + '"}';
	var url = urlBase + '/contact.php?view=1';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactSearchResult").innerHTML = "Contact has been retrieved";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

}

function searchContact()
{
	var search = document.getElementById("searchText").value;

	var jsonPayload = '{"search" : "' + search + '"}';
	var url = urlBase + '/contact.php?search=1';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactSearchResult").innerHTML = "Contact has been retrieved";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

}
