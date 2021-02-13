import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { AppModule } from '../app.module';
import { TODOS } from '../test-data/todo.db';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {


    let component: TodoListComponent;

    // Objeto que se encarga de gestionar la instancia del componente como el HTML, como la interacción con el mismo
    let fixture: ComponentFixture<TodoListComponent>;

    // Permitir recuperar HTML, interactuar
    let el: DebugElement;

    // Probar un componente, configuración básica
    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({

            imports: [AppModule]

        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(TodoListComponent);
                component =  fixture.componentInstance;
                el = fixture.debugElement;
            });

    }));

    it('Debería existir el componente', () => {

        expect(component).toBeTruthy();

    });


    // fit -> sólo esta prueba se va a ejecutar
    // xit -> Sólo esta prueba no se va a ejcutar

    it('Debería mostrar la lista de tareas', () => {

        component.todos = TODOS;
        fixture.detectChanges();

        const cards = el.queryAll(By.css('.card'));

        expect(cards).toBeTruthy('No se pueden recuperar las cards');
        expect(cards.length).toBe(3, 'Deberían ser 3 cards');
    });

    it('Debería mostrar la primera tarea', () => {

        component.todos = TODOS;
        fixture.detectChanges();

        const todo = TODOS[0];

        const card = el.query(By.css('.card:first-child'));
        const titulo =  card.query(By.css('.card-title'));
        const descripcion =  card.query(By.css('.card-text'));

        expect(card).toBeTruthy('La card debería existir');
        expect(titulo.nativeElement.textContent).toBe(todo.titulo, 'El titulo debe coincidir');
        expect(descripcion.nativeElement.textContent).toBe(todo.descripcion, 'La descripciòn debe coincidir');

    });

});