import type {Preview} from "@storybook/react";
import '../src/index.css'

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story, options) => {
            return (
                <>
                    <Story {...options} />
                    <div id="modal-portal"></div>
                </>
            )
        }
    ],
};

export default preview;
