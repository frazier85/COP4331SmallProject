#PHP API

(this is tentative but hopefully won't change too much)

**/api/login.php?login=1**
* Log user in, expects json with username and password

**/api/login.php?logout=1**
* Log user out, no json

**/api/login.php?register=1**
* Register user, expects json with username and password

**/api/contact.php?add=1**
* Add a contact, expects json with contact information

**/api/contact.php?del=1**
* Delete a contact, expects json with contact's ID (not foreign ID)

**/api/contact.php?edit=1**
* Edit a contact, expects json with contact's new information (including the contact's unique ID)

**/api/contact.php?view=1**
* Outputs all of the user's contacts