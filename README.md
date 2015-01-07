Polymer component build system
=====

The goal of this project is to develop a method for building Polymer components.

Also includes a system for creating component demos.


Build
-----
`npm install`
`bower install`
`gulp`
`gulp components:demo`


Features
---------
- optionally use .scss (compiles to .css)
- optionally use .es6.js (compiles to .js)



Tasks
------

`gulp watch` watches for file changes on files that needs pre-processing

`gulp components:scripts` runs traceur, outputs .js in each component directory

`gulp components:styles` runs sass, outputs .css in each component directory

`gulp components:vulcanize` runs vulcanize on components.html. Outputs a single html file with all component styles, markup, and scripts. Probably not necessary to vulcanize components because the same process can be done on the index.html of the main project.

