import React, {createRef} from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import MockControls from './MockControls';

describe('MockControls', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        let emptyFunction = () => {};

        ReactDOM.render(
            <MockControls
                onGetHtmlStart={emptyFunction}
                onGetHtmlComplete={emptyFunction}
                onGetHtmlError={emptyFunction} />,
            div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('handlePopulateRandomClick and clicking on button populates the input', () => {
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
        const input1 = div.querySelector<HTMLInputElement>('input[type="text"]')!.value;
        expect(input1).not.toBeNull();

        const button = div.querySelector<HTMLElement>('div.secondary button')!;
        ReactTestUtils.Simulate.click(button);
        const input2 = div.querySelector<HTMLInputElement>('input[type="text"]')!.value;
        expect(input2).not.toBeNull();

        expect(input1).not.toStrictEqual(input2);
    });
});
