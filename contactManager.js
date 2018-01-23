
//	Ids and variable names based on what I saw from the html and php tags
//  not entire sure how well this works.

var urlBase = '';
var extension = "php";

var userId = 0;

function doLogin()
{
	userId = 0;

	var username = document.getElementById("inputEmail4").value;
	var password = document.getElementById("inputPassword4").value;
	
	var jsonPayload = '{"username" : "' + username + '", "password" : "' + password + '"}';
	var url = urlBase + '/login.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		
		/*if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
		*/
		
		document.getElementById("inputEmail4").value = "";
		document.getElementById("inputPassword4").value = "";
		
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
	
}

function doLogout()
{
	userId = 0;
	document.getElementById("inputEmail4").value = "";
	document.getElementById("inputPassword4").value = "";	
}


function addContact()
{
	var fname = document.getElementById("inputFirstName").value;
	var lname = document.getElementById("inputLastName").value;
	var phone = document.getElementById("inputPhoneNum").value;
	var email = document.getElementById("inputEmail4").value;

	var jsonPayload = '{"uid" : "' + userId + '", "fname" : "' + fname + '", "lname" : "' + lname + '", "phone" : "' + phone + '", "email" : "' + email + '"}';
	var url = urlBase + '/contact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactResult").innerHTML = err.message;
	}
	
}

// Searches by first name only for now, due to First name being the first column
// need to have it compare information in other <td> cells of each <tr>
function searchContact()
{
	var search = document.getElementById("exampleInputEmail").value;
	var contactList = document.getElementByTagName("table");
 	var filter = search.value.toUpperCase();
  	var tr = conactList.getElementsByTagName("tr");
	
	var jsonPayload = '{"search" : "' + search + '"}';
	var url = urlBase + '/search.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText );

				for (i = 0; i < tr.length; i++) 
				{
				    td = tr[i].getElementsByTagName("td")[0];
				    if (td) 
				    {
				      	if (td.innerHTML.toUpperCase().indexOf(filter) > -1) 
				        	tr[i].style.display = "";
				    	else {
				        	tr[i].style.display = "none";
				    } 
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactResult").innerHTML = err.message;
	}
	
}
