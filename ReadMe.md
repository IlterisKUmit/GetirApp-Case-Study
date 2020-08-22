Getir-Case-Study

A case study from Getir HR to attend to the tech team as a new grad.

In this project the aim is fetching the data in the provided MongoDB collection and return the results in the 
requested format.

Used Technologies:  
-Node.js    
-Express.js     
-MongoDB for database   
-Jest for testing   
-Ejs as view engine 

We are aiming to get a request payload as shown below:  
{   
    "startDate": "2016-01-26",  
    "endDate": "2018-02-02",    
    "minCount": 2700,   
    "maxCount": 3000    
}   

and delivering a response payload like this:    
{   
"code":0,   
"msg":"Success",    
"records":[     
{   
"key":"TAKwGc6Jr4i8Z487",   
"createdAt":"2017-01-28T01:22:14.398Z",     
"totalCount":2800 
},  
{   
"key":"NAeQ8eX7e5TEg7oH",   
"createdAt":"2017-01-27T08:19:14.135Z",     
"totalCount":2900 
} ]   
}   


