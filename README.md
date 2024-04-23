# WebMyDaily

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/` . The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module` .

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

```typescript

/**
 * AuthComponent - abstract class, responsible to provider resources to children's classes
 **/
export abstract class AuthComponent {
    public email!: FormControl
}

```



```typescript
/**
 * ExampleComponent - receive resources from AuthComponent using OOP (Object Oriented Programming)
 **/
@Component({
    selector: 'app'
})
export class ExampleComponent extends AutComponent implements OnInit {
    constructor() {
    }
    public ngOnInit():void {
    }
}

```

# Github Flux - Development
1. clone do projeto
2. trocar de branch caso não esteja na dev - switch branch `git checkout dev`
3. update local dev branch `git pull origin -u dev`
4. criar sua branch de trabalho `git checkout -b feature/wd-login-register
    feature -> indica nova funcionalidades ou mudança novas - incrementa versão 0.1.0  
    
    issues -> indica algum bug porem o sistema funcionada - incrementa versão 0.0.1  
    bug -> indica um bug pode causar falha de funcionamento incrementa versão 0.0.2  
    hotfix -> bug urgente - pode direto para produção - incrementa versão 0.0.404040  
    fix -> bug com caracteristica de correção de algum que já exite -> incrementa versão 0.0.4000000  
