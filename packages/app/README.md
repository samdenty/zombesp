api types -

- Physical

  - Uses real filesystem
  - Modules are executed in node threads

- Public virtual

  - Hosts multiple physical's in a VM
  - Modules are executed in node.js virtual machines

- Web
  - Uses browserfs
  - Modules are executed in web workers

Database:

- Can run in browser
- Can run on node
