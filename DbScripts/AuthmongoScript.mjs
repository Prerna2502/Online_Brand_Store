use AuthDb
db.Customers.drop()
db.Employees.drop()
db.Customers.insert([
    { "_id" : "C0001", "FirstName" : "Sini", "LastName" : "Robin", "Email" : "sini@xyz.com", "ContactNo" : "9997778881", "Password" : "1234", "Addresses" : [ "Kerala,India" ], "PastOrderCount" : "0" }
,{ "_id" : "C0002", "FirstName" : "Prerna", "LastName" : "Agarwal", "Email" : "prerna@xyz", "ContactNo" : "9557778881", "Password" : "1234", "Addresses" : [ "UttarPradesh,India" ], "PastOrderCount" : "0" }
,{ "_id" : "C0003", "FirstName" : "Harsh", "LastName" : "Pandey", "Email" : "harsh@xyz", "ContactNo" : "9557778889", "Password" : "1234", "Addresses" : [ "Delhi,India" ], "PastOrderCount" : "0" }
])
db.Employees.insert([
    { "_id" : "E0001", "FirstName" : "A", "LastName" : "a", "Email" : "a@xyz.com", "ContactNo" : "1234567890", "Password" : "1234", "Address" : "aaddress", "Designation" : "ITSupport", "StoreId" : "S0001" }
])