import React from 'react';
import ReactDOM from 'react-dom';
import MockControls from './MockControls';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MockControls />, div);
    ReactDOM.unmountComponentAtNode(div);
});
