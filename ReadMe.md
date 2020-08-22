<h2>Getir-Case-Study</h2>

<strong>A case study from Getir HR to attend to the tech team as a new grad computer engineer.</strong>

<hr>

In this project the aim is fetching the data in the provided MongoDB collection and return the results in the 
requested format.

To download then install and run this application in the local machine, follow these steps : 
<hr>
<strong>Instructions</strong><br>
<p>Run the commands step by step in command line:</p>  
<ul>
    <li>$ git init</li>
    <li>$ git pull <a href="https://github.com/IlterisKUmit/GetirApp-Case-Study.git">https://github.com/IlterisKUmit/GetirApp-Case-Study.git</a></li>
    <li>$ npm init</li>
    <li>$ npm install</li>
    <li>$ node app.js</li>
</ul>
<p>Then open the <a href="http://localhost:3000">localhost:<b>3000</b></a> link in your browser</p>

<hr>  

<strong>Used Technologies: </strong>
<ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB for database</li>
    <li>Jest for testing</li>
    <li>Ejs as view engine</li>
</ul>


What does this app exactly do ?
Giving a request payload as shown below:  
<pre>
{   
     "startDate": "2016-01-26",  
     "endDate": "2018-02-02",    
     "minCount": 2700,   
     "maxCount": 3000    
}
</pre> 
   

And getting a response payload like this:    
<pre>
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
        } 
    ]   
}
</pre> 