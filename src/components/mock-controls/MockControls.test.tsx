import React, {createRef} from 'react';
import ReactDOM from 'react-dom';
import MockControls from './MockControls';

let emptyFunction = () => {};

it('renders without crashing', () => {
    const div = document.createElement('div');

    let element: MockControls = createRef<MockControls>().current!;

    ReactDOM.render(
        <MockControls
            onGetHtmlStart={emptyFunction}
            onGetHtmlComplete={emptyFunction}
            onGetHtmlError={emptyFunction}
            ref={ref => element = ref!} />,
        div);

    element.handlePopulateRandomClick('microdata');

    ReactDOM.unmountComponentAtNode(div);
});
