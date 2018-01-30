var urlBase = '/api';

var userId = 0;

function register()
{
	var username = document.getElementById("loginUsername").value;
	var password = md5(document.getElementById("loginPassword").value);

	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"username" : "' + username + '", "password" : "' + password + '"}';
	var url = urlBase + '/login.php?register=1';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doLogin()
{
	userId = 0;

	var username = document.getElementById("loginUsername").value;
	var password = md5(document.getElementById("loginPassword").value);

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
				hideOrShow( "contactList", false );

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

function deleteContact()
{
	document.getElementById("contactSearchResult").innerHTML = "";
	var contactList = document.getElementById("contactList");

	var jsonPayload = '{"contactid" : "' + document.getElementById('contactList').value + '"}';
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
				hideOrShow( "contactList", false );

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


function viewAllContacts()
{
	document.getElementById("contactSearchResult").innerHTML = "";

	var contactList = document.getElementById("contactList");
	contactList.innerHTML = "";

	var jsonPayload = '{"uid" : "' + userId + '"}';
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
				hideOrShow( "contactList", true );

				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				var i;
				for( i in jsonObject.contacts)
				{
						var opt = document.createElement("option");
						var entryString = "";
						opt.text = entryString.concat(jsonObject.contacts[i].first, " ", jsonObject.contacts[i].last, " ", jsonObject.contacts[i].phone, " ", jsonObject.contacts[i].email);
						opt.value = jsonObject.contacts[i].id;
						contactList.options.add(opt);
				}
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
	document.getElementById("contactSearchResult").innerHTML = "";

	var search = document.getElementById("searchText").value;

	var contactList = document.getElementById("contactList");
	contactList.innerHTML = "";

	var jsonPayload = '{"uid" : "' + userId + '", "search" : "' + search + '"}';
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
				hideOrShow( "contactList", true );

				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				var i;
				for( i in jsonObject.contacts)
				{
						var opt = document.createElement("option");
						var entryString = "";
						opt.text = entryString.concat(jsonObject.contacts[i].first, " ", jsonObject.contacts[i].last, " ", jsonObject.contacts[i].phone, " ", jsonObject.contacts[i].email);
						opt.value = jsonObject.contacts[i].id;
						contactList.options.add(opt);
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}
