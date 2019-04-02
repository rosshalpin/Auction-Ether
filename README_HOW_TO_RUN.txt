This was run within the following environment:
*********************************************
Ubuntu 16.04 LTS
64 bit OS
7.7 GB Memory
Intel® Core™ i3-3245 CPU @ 3.40GHz × 4

Firefox Web Browser 63.0 (64-bit)
*********************************************

Please read all of the following ensuring all steps are followed.

This project requires Node.js and NPM in order to run.
This can be found here:
https://nodejs.org/en/

Once installed, open the Auction-Ether folder in cmd prompt and 
run the following:

npm install -g serve
serve -s build

this is to locally host the project. You can then navigate to it 
via http://localhost:5000/. If this for some reason does not work,
please use https://renther.netlify.com/.

This project requires you install Metamask within Firefox.
https://metamask.io/

Once installed choose to "IMPORT WALLET".

Use the following seed phrase:
abstract holiday rule this panel actor winner distance example foam enlist visa

You will be required to set a password for metamask, You can freely set your own 
password, this merely secures access to your metamask in the browser, it does not 
password lock the ether wallets accessed by the seed phrase.

******* IMPORTANT **************************
After importing your wallet, select the metamask icon in your browser, then click on
"main ethereum network", this will give you a drop down.
Please select "Rinkeby Test Network" from this drop down. 
********************************************

It may require a refresh for pre-made auctions to show up.

You are now free to create and interact with auctions, you can switch between 3 accounts
in the metamask dropdown that I have pre-filled with fake ethereum in order to simulate
multiple users.

I recommend using incremental ethereum values of around 0.0001 etc. just so you do not run out of ethereum.