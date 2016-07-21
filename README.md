# Final Project for CPSC-2030-001

Author: Alexey Kulakov S/N: 100240998

## Project Overview

This configuration is only intended for development and testing purpuses, to be able to use it in production you will have to configure data layer to presiste data

### Techonologies & Languagaes Used

* Server Side (API):
  * Node.js
  * mongodb with mongoose ORM
  * Multicontainer Docker to isolate server and database layer
* Client side:
  * ember.js


### Data Stractures

**User**

* id (int)
* user_name (email)
* password (encoded)
* first name (string)
* last name (string)
* bio (string)
* user role (HR, sales, helpdesk)
* last login (date)

**Article**

* title (string)
* content (string)
* date created (date)
* last edited (date)
* user_id (int)

**Page**

* id (int)
* name (string)
* cover image
* url (string)


### API

**/auth**

* req (POST)
  * email (string, valid email)
  * password (string, validation non empty)
* res (200)
  * user info
  * token
* res (401)
  * error message

**/pages**

  * req (GET)
  * res (200)
    * [{ Page }]
  * res (404)
    * []

**/articles**

* req (GET)
* res (200)
  * [{ Articles }]
* res (404)
  * []
