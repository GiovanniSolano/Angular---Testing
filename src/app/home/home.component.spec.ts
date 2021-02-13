import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AppModule } from '../app.module';
import { By } from '@angular/platform-browser';
fdescribe('HomeComponent', () => {

    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let el: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [AppModule]
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(HomeComponent);
                component = fixture.componentInstance;
                el = fixture.debugElement;
            });

    }));

    it('Debería existir el componente', () => {

        expect(component).toBeTruthy();

    });

    it('Debería agregar una tarea', fakeAsync(() => {

        setInputValue('.form-control.autor', 'pruebaAutor2');
        setInputValue('.form-control.titulo', 'pruebaTitulo');
        setInputValue('.form-control.descripcion', 'pruebaDescripcion');

        const boton = el.query(By.css('.btn.btn-success'));
        boton.nativeElement.click();
        tick();
        fixture.detectChanges();

        const card = el.query(By.css('.card:first-child'));
        const title = el.query(By.css('.card-title'));
        const descripcion = el.query(By.css('.card-text'));

        expect(card).toBeTruthy();
        expect(title.nativeElement.textContent).toBe('pruebaTitulo');
        expect(descripcion.nativeElement.textContent).toBe('pruebaDescripcion');


    }));

    function setInputValue(selector: string, value: string) {

        fixture.detectChanges();
        // Forzar a que pase el tiempo
        tick();

        const inputAutor = el.query(By.css(selector));
        inputAutor.nativeElement.value = value;
        inputAutor.nativeElement.dispatchEvent(new Event('input'));
        tick();

        

    }

});