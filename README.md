# Project Name

A Calculator!

## Description

This project is a calculator that peforms calculations and stores data on a server. 

Communication between the client side and the server side is executed with express routes and ajax in jQuery. 

When a user enters in a calculation the client.js checks to make sure that information has been entered in fully before sending an object built from the input to the server, where the calculation is performed, added to an array of previous calculations and then returned to the client. 

In order to clear content there is a clear button that clears any input on the calculator, and an all clear button that clears the stored calculation history in the serer.
