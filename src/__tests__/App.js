import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('<App /> La aplicación funciona bien la primera vez', () => {
    render(<App />);

    expect( screen.getByText('Administrador de Pacientes') ).toBeInTheDocument();
    expect( screen.getByTestId('nombre-app').textContent ).toBe('Administrador de Pacientes');
    expect( screen.getByTestId('nombre-app').tagName ).toBe('H1');

    expect( screen.getByText('Crear Cita') ).toBeInTheDocument();
    expect( screen.getByText('No hay citas') ).toBeInTheDocument();

})

test('<App /> Agregar una cita y verificar el heading', () => {
    render(<App />);


    userEvent.type(screen.getByTestId('mascota'), 'Hook');
    userEvent.type(screen.getByTestId('propietario'), 'Elliot');
    userEvent.type(screen.getByTestId('fecha'), '2016-08-11');
    userEvent.type(screen.getByTestId('hora'), '11:45');
    userEvent.type(screen.getByTestId('sintomas'), 'Solo duerme');

    // CLick en el botón de submit
    const btnSubmit = screen.getByTestId('btn-submit');
    userEvent.click(btnSubmit);



    // Revisar por la alerta
    const alerta = screen.queryByTestId('alerta'); 
    expect( alerta ).not.toBeInTheDocument();


    // Revisar por el titulo dinámico ...
    expect( screen.getByTestId('titulo-dinamico').textContent ).toBe('Administra tus Citas');
    expect( screen.getByTestId('titulo-dinamico').textContent ).not.toBe('No hay citas');

});

test('<App /> Verificar las citas en el DOM', async() => {
    render(<App />);

    const citas  = await screen.findAllByTestId('cita');

    // Snapshot crea un archivo para verificar su contenido
    // expect(citas).toMatchSnapshot()

    expect(screen.getByTestId('btn-eliminar').tagName).toBe('BUTTON');
    expect(screen.getByTestId('btn-eliminar')).toBeInTheDocument();

    // Verificar alguna cita
    expect( screen.getByText('Hook') ).toBeInTheDocument();
});

test('<App /> ELimina la cita', () => {
    render(<App />);

    const btnEliminar = screen.getByTestId('btn-eliminar')
    expect(btnEliminar.tagName).toBe('BUTTON');
    expect(btnEliminar).toBeInTheDocument();

    // Simular el click
    userEvent.click(btnEliminar);

    // EL botón ya no debe de estar
    expect(btnEliminar).not.toBeInTheDocument();

    // La cita ya no debe de estar
    expect( screen.queryByText('Hook') ).not.toBeInTheDocument();
    expect(screen.queryByTestId('cita')).not.toBeInTheDocument();

});