
import { LoggerService } from "./logger.service";
import { TodoService } from "./todo.service";
import { TODOS } from './test-data/todo.db';
import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

// Definir el grupo de pruebas que se van a ejecutar
describe('TodoService', () => {

    let todoService: TodoService;
    let loggerSpy: any;

    // Hacer una petición falsa
    let httpTestingController: HttpTestingController;

    // Se va a ejecutar antes de todas las pruebas (cada it)
    beforeEach(() => {

        // Simulación: Sin tener que hacer una instancia para que se siga refiriendo a una prueba unitaria y no de integración
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
        // todoService = new TodoService(loggerSpy);

        // Dejar que angular se encargue de la inicialización de nuestros servicios
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                TodoService,
                { provide: LoggerService, useValue: loggerSpy}
            ]

        });
        todoService = TestBed.inject(TodoService);
        httpTestingController = TestBed.inject(HttpTestingController);


    });

    // Lanzar prueba, explicación, función que se ejecuta
    it('debería agregar una nueva tarea', () => {


        // const logger = new LoggerService();

        // Herramienta para espiar al método log 
        // spyOn(logger, 'log');
        todoService.add({autor: 'PruebaAutor', titulo: 'PruebaTitulo', descripcion: 'PruebaDescripción'});




        expect(todoService.todos.length).toBe(1, 'Deberíamos tener una única tarea');
        expect(todoService.todos[0].id).toBe(1, 'El id autoincremental debería ser 1');
        expect(todoService.autoIncrementId).toBe(2, 'El autoincremental debería haber avanzado');
        expect(todoService.todos[0].titulo).toEqual('PruebaTitulo', 'El titulo debería coincidir con la prueba');
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });


    it('Debería borrar una tarea', () => {

        // const logger = jasmine.createSpyObj('LoggerService', ['log']);
        // const todoService = new TodoService(logger);

        const todoBorrar = [...TODOS];
        todoService.todos = todoBorrar;

        todoService.delete(2);

        expect(todoService.todos.length).toBe(2, 'El número de tareas debería ser 2');
        expect(todoService.todos[1].autor).toEqual('Sara');

    });

    it('Debería recuperar todas las tareas', () => {

        todoService.getAll().subscribe(todos => {

            expect(todos).toBeTruthy('No existen tareas');
            expect(todos.length).toBe(3, 'La longitud de las tareas debería ser de 3');
            
            const todo = todos.find(item => item.id === 2);

            expect(todo.titulo).toEqual('Compra de mueble', 'El titulo debe ser el especificado en las pruebas');

        });

        const req = httpTestingController.expectOne('http://localhost:3000/api/todos/all');
        expect(req.request.method).toBe('GET');
        // Definir los datos que vamos a recibir en el subscribe, simular la respuesta del servidor
        req.flush(TODOS);
        // req.flush([
        //     { id: 1, autor: 'Giovanni', titulo: 'Titulo desde http', descripcion: 'Información desde el server'}
        // ]);

    });


    it('Debería recuperar una única tarea', () => {

        todoService.getById(2).subscribe(todo => {

            expect(todo).toBeTruthy('La tarea debe existir');
            expect(todo.id).toBe(2, 'El id de la tarea debe ser 2');

        });

        const req = httpTestingController.expectOne('http://localhost:3000/api/todos/2');
        expect(req.request.method).toBe('GET');

        req.flush(TODOS[1]);

    });


    // Comprobar que nos se hagan llamadas extras
    afterEach(() => {

        httpTestingController.verify();

    });

});