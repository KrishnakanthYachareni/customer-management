# CustomerManagement

Deployed App: https://customer-mm.herokuapp.com/customers

1. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.
2. This project has been using node server has a back-end API which exposes REST API for a customer and order CRUD
   operations.

   Following are the major API path from
   node [server](https://github.com/KrishnakanthYachareni/customer-management/blob/master/server.js):
  1. customers `host-name/api/customers/`

     Example: https://customer-mm.herokuapp.com/api/customers

  2. Specific Customer `host-name/api/customers/id`

     Example: https://customer-mm.herokuapp.com/api/customers/1
  3. States `host-name/api/states`

     Example: https://customer-mm.herokuapp.com/api/states

## Development server

1. `ng build -- watch`
2. `npm start` or `node server.js`  --> Runs back end node server.
3. Navigate to `http://localhost:5000/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag
for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
