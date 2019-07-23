import React, {createRef} from 'react';
import ReactDOM from 'react-dom';
import MockControls from './MockControls';

it('renders without crashing', () => {
    const div = document.createElement('div');

    let emptyFunction = () => {},
        element: MockControls = createRef<MockControls>().current!;

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
