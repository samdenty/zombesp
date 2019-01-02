# esprat

[Flow chart of how it works](https://www.draw.io/#Hsamdenty%2Fesprat%2Fmaster%2Fspec.xml)

## What is this project?

This project is a web-based rubber-ducky remote-administration tool, designed to be undetectable with $2 of physical hardware. It can do 80% of what the Bash Bunny can for 1/45th the cost.

Other devices such as the [bash bunny](https://shop.hak5.org/products/bash-bunny) are expensive, and as they plug directly into the computer, they're easily found.

It's designed to work with a wide-variety of hardware and situations, without comprimising on features.
 - Software-only using powershell
 - ESP8266 module connected via USB to target
 - ESP8266 + digispark
 - ESP8266 + SS micro
 
You communicate with the duckies through the JavaScript-based SDK. The SDK runs both in a browser (eg. on your phone) and on Node.JS (eg. Local Raspberry PI, VPS in the internet).

You can write modules (in JavaScript), which can be executed inside a thread in your browser, or ran directly on Node.

## Web interface

The most powerful feature, is the Web interface (which works both offline / online).
 - When connected to a Node server, it uses to a MySQL/PostGres/SQLLite/MariaDB and runs scripts with full access to your filesystem.
 - When offline (or without a server), it creates a virtual-server inside your browser (complete with a filesystem, in-browser SQL database etc.)
   - If you later connect to a server, it can upload all the data stored in your browser to that server.
   - You can one-click download a server (database, filesystem etc.) into your browser.
   
The web interface uses the JavaScript SDK to provide a rich-interactive experience. Some examples:

 - Input text into the target pc in realtime, using your keyboard inside browser
 - Move the mouse on the target pc in realtime, using your mouse inside browser
 - Explore & download files from the target pc with an easy-to-use file explorer

## TODO:

- Integrate [`react-diagrams`](http://projectstorm.cloud/react-diagrams/?selectedKind=Custom%20Models&selectedStory=Custom%20animated%20links&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fcode%2Fpanel) to visualize how the zombies are connected.
