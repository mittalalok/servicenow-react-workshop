This is boilerplate code for react workshop.  

This code contains:
1.	Express server for node API
2.	React for font-end.
3.	Webpack for bunding and hot reloading


How to use: 
===========

1.	npm install 

2.	npm run dev 
        --> This will start two servers, one @8080 port for node api and one @3000 port for webpack dev server with hot reloading for JS, HTML and SASS changes
3.	npm run build 
        --> This will build the artifacts using webpack (with production mode) and keep them in dist folder.
4.	npm run start 
        --> This is start the node server @8080 port and server the contains from dist folder. 

Note: Please ensure that the node version is > = v6.9.1 
