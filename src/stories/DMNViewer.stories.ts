import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../dmn-viewer/index.ts';

const meta: Meta = {
  title: 'Viewers/DMNViewer',
  component: 'dmn-viewer',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL to fetch DMN XML from'
    },
    'data-xml': {
      control: 'text',
      description: 'DMN XML data as string'
    },
    'disable-interaction': {
      control: 'boolean',
      description: 'Disable diagram interaction'
    }
  },
  render: (args) => html`
    <dmn-viewer
      src=${args.src}
      data-xml=${args['data-xml']}
      ?disable-interaction=${args['disable-interaction']}
    ></dmn-viewer>
  `
};

export default meta;
type Story = StoryObj;

// Story using src attribute
export const FromSource: Story = {
  args: {
    src: '/path/to/your/decision.dmn',
  }
};

// Story using XML data
export const FromXML: Story = {
  args: {
    'data-xml': '<?xml version="1.0" encoding="UTF-8"?><dmn:definitions xmlns:dmn="http://www.omg.org/spec/DMN/20180521/MODEL/"><dmn:decision id="Decision_1" name="Sample Decision"><dmn:decisionTable><dmn:input id="Input_1" label="Input 1"/><dmn:output id="Output_1" label="Output 1"/></dmn:decisionTable></dmn:decision></dmn:definitions>'
  }
};

// Story with interaction disabled
export const DisabledInteraction: Story = {
  args: {
    'data-xml': '<?xml version="1.0" encoding="UTF-8"?><dmn:definitions xmlns:dmn="http://www.omg.org/spec/DMN/20180521/MODEL/"><dmn:decision id="Decision_1" name="Sample Decision"><dmn:decisionTable><dmn:input id="Input_1" label="Input 1"/><dmn:output id="Output_1" label="Output 1"/></dmn:decisionTable></dmn:decision></dmn:definitions>',
    'disable-interaction': true
  }
}; 