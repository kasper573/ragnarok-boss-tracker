# Boss Tracker

A boss tracker for Ragnarok Online.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and contain all base scripts that come with it. 

## Getting started

- Make sure you have [Node](https://nodejs.org/) installed
- Navigate to the root directory of this project in a console
- Run `npm install`
- Run `npm run start`
- The `start` script will automatically open `localhost:3000` in your browser

While the development server is running any changes you make in the code should automatically compile and update in the browser.

## Data Import
This project is by default embedded with a static snapshot of mobs, maps and items extracted from rAthena. You can update this snapshot by exporting a select set of data tables from rAthena and running the data import script.

Here's how:

1. Make sure you have followed the steps in `Getting started` above.
2. Export the following tables as json from the rAthena database: `mob_db`, `mob_db2`, `item_db`, `item_db2`
3. Find and copy the rAthena data file `mob_drop.txt`
4. Place these files in a folder of your choice
5. Run `npm run import <path-to-data-folder> [<http://url.to/item/icon/server/@ITEM_ID.gif>]`
