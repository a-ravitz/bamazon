# bamazon

## summary
bamazonCustomer.js, bamazonManager.js, and bamazonSupervisor are three CLI applications that simulate an Amazon-like store front that can take in orders from the store front, and can depelete stock from the shop.  You can also track products sales accross departments and find out which department is the highest grocing in the store.

## required instillations
In order to run bamazonCustomer and bamazonManager you'll need to run an ```npm install``` on ```cli-table```, ```inquirer```, and ```mysql```

To use the bamazonSupervisor app you'll need to run an ```npm install``` on ```console.table``` 

<hr>
## bamazonCustomer

When you open bamazonCustomer.js you'll see the following 
<img width="507" alt="Screen Shot 2019-04-29 at 12 27 39 AM" src="https://user-images.githubusercontent.com/46004362/56876535-15424480-6a16-11e9-96f5-d678f24ad68f.png">

Here you can pick an item based on its item number, and then you're prompted to select the quantity you'd like. 
if you attempt to purchase more then are in stock you'll see this message 

<img width="485" alt="Screen Shot 2019-04-29 at 12 33 59 AM" src="https://user-images.githubusercontent.com/46004362/56876590-7cf88f80-6a16-11e9-9a59-b2b2f1dac966.png">

You may then choose to try again and buy a different amount. If you pick an amount that is less than or equal to bamazon's current stock you'll see the number price for the total, and the number left in stock 

<img width="528" alt="Screen Shot 2019-04-29 at 12 28 51 AM" src="https://user-images.githubusercontent.com/46004362/56876623-bfba6780-6a16-11e9-8f1e-6980b138b436.png">

You'll then be prompted like before to stay in bamazonCustomer and make another purchase, or leave.

If you choose to stay you may pick the same item, or another item, and your new purchase total will be added to your last purchase total 

<img width="529" alt="Screen Shot 2019-04-29 at 12 29 31 AM" src="https://user-images.githubusercontent.com/46004362/56876663-03ad6c80-6a17-11e9-934f-90d061300651.png">

You'll then be prompted again to either exit the store or continue shopping. If you choose to leave it'll say "thank you for choosing Bamazon.

Colors for the bamazon interface have been achieved in the following way without using the colors NPM package
<img width="277" alt="Screen Shot 2019-04-29 at 12 40 49 AM" src="https://user-images.githubusercontent.com/46004362/56876730-6dc61180-6a17-11e9-94d9-28f3bbfbaa31.png">

And the tables for bamazonCustomer and bamazonManager have been generated using CLI-Table and a for loop
<img width="659" alt="Screen Shot 2019-04-29 at 12 42 38 AM" src="https://user-images.githubusercontent.com/46004362/56876767-af56bc80-6a17-11e9-90e6-734272512bb0.png">

## bamazonManger
When you open bamazonManager.js you're greeted with the following 
<img width="375" alt="Screen Shot 2019-04-29 at 12 44 04 AM" src="https://user-images.githubusercontent.com/46004362/56876814-02c90a80-6a18-11e9-969c-b2f2c2ddb781.png">

If you choose the first option, "View products for Sale", a switch statment will execute a function that pulls up the following information. 

<img width="579" alt="Screen Shot 2019-04-29 at 12 46 06 AM" src="https://user-images.githubusercontent.com/46004362/56876864-55a2c200-6a18-11e9-9478-fed748bbfec7.png">

It is very similar to the bamazonCustomer main screen, except it shows you the current inventory. 
If you select "View Low Inventory" it'll generate a list of item with stock of 5 of less 

<img width="1031" alt="Screen Shot 2019-04-29 at 1 01 24 AM" src="https://user-images.githubusercontent.com/46004362/56877204-58061b80-6a1a-11e9-8941-12fb2523500b.png">

Note the use of ```async/await``` to fire the ```restart()``` function only after the other information has been gathered and displayed. this is utalized in every function through out this project 

Here is "View Low Inventory":

<img width="418" alt="Screen Shot 2019-04-29 at 12 49 37 AM" src="https://user-images.githubusercontent.com/46004362/56876936-a9151000-6a18-11e9-90c9-29f67d728ccc.png">

At anypoint you may decide to exit the program, or select another option from the main menu. if you select Add to Inventory you're asked to select an item by item number, then how many you'd like to add. Then you're shown the new total stock quantity.

<img width="546" alt="Screen Shot 2019-04-29 at 12 51 00 AM" src="https://user-images.githubusercontent.com/46004362/56876980-f09b9c00-6a18-11e9-93bf-64d0589577ca.png">

And finally you can choose to add a new product to the store. You'll be asked to input the item's name, department name, price, and inventory amount 

<img width="523" alt="Screen Shot 2019-04-29 at 12 53 12 AM" src="https://user-images.githubusercontent.com/46004362/56877022-36586480-6a19-11e9-915d-a52fc34301f7.png">

Then if you select item's you'll see your new item at the bottom of the list. it'll have a new item number, generated by mySQL's auto increment function. 

<img width="393" alt="Screen Shot 2019-04-29 at 12 56 43 AM" src="https://user-images.githubusercontent.com/46004362/56877105-aff05280-6a19-11e9-9a22-ea7f191e0f9b.png">

Here you can see the new product. also notice the insane amount of pool noodles
<img width="593" alt="Screen Shot 2019-04-29 at 1 05 14 AM" src="https://user-images.githubusercontent.com/46004362/56877283-dc589e80-6a1a-11e9-8446-0490d7066ba7.png">

You may then choose to repeat any of the previous functions, or exit, in which case it'll say "Thank you for using Bamazon's manager mode" and exit the program.

The restart function is generally the same accross the three .js files. the only difference really being the last line of text. ```process.exit()``` is how the progam closes on its own.

<img width="707" alt="Screen Shot 2019-04-29 at 1 08 00 AM" src="https://user-images.githubusercontent.com/46004362/56877353-5d179a80-6a1b-11e9-8ed9-0de497cd96fb.png">

## bamazonSupervisor

Finally, we can open bamazonSupervisor.js. When you open this file you'll be greated the following way:
<img width="385" alt="Screen Shot 2019-04-29 at 1 10 45 AM" src="https://user-images.githubusercontent.com/46004362/56877386-a0720900-6a1b-11e9-89ff-612802338937.png">

If you select "View Product Sales by Department" you'll get the following table. This table is generated using the NPM package console.table, because there was a problem with CLI-table and the on the fly calculations being done by the database. 

As you can see, not only does this table look more supervisorish but also our business is failing miserably 
<img width="588" alt="Screen Shot 2019-04-29 at 1 12 59 AM" src="https://user-images.githubusercontent.com/46004362/56877431-fd6dbf00-6a1b-11e9-9bd0-82eed4638d3b.png">

Getting the statement to gather this data, and do these calculations was by far the most difficult part of this whole assignment. Luckily, 3 TA's and 3 Students and 1 teacher helped. Here it is: 

<img width="812" alt="Screen Shot 2019-04-29 at 1 15 43 AM" src="https://user-images.githubusercontent.com/46004362/56877473-50477680-6a1c-11e9-9cb4-6610b8ff2715.png">

And finally you can choose to create a new department in the store. You'll be prompted to enter the name of the department, and the over head cost. 

<img width="674" alt="Screen Shot 2019-04-29 at 1 22 13 AM" src="https://user-images.githubusercontent.com/46004362/56877620-42debc00-6a1d-11e9-9fdd-5e0b0082604f.png">

After this you may exist, or create as many new departments as you'd like. If you go over to the mySQL workbench you can ```SELECT * FROM departments``` and you'll be able to see your brand new department, waiting for items to be added to it. 

<img width="326" alt="Screen Shot 2019-04-29 at 1 24 10 AM" src="https://user-images.githubusercontent.com/46004362/56877657-820d0d00-6a1d-11e9-9026-71f034cddfcb.png">

Thanks for checking out my README!





