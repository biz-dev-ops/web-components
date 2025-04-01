import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../bpmn-viewer/index.ts';

const meta: Meta = {
  title: 'Viewers/BPMNViewer',
  component: 'bpmn-viewer',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL to fetch BPMN XML from'
    },
    'data-xml': {
      control: 'text',
      description: 'BPMN XML data as string'
    },
    'show-process': {
      control: 'text',
      description: 'Process ID to show'
    },
    'enable-simulator': {
      control: 'boolean',
      description: 'Enable token simulation'
    },
    'disable-interaction': {
      control: 'boolean',
      description: 'Disable diagram interaction'
    }
  },
  render: (args) => html`
    <bpmn-viewer
      src=${args.src}
      data-xml=${args['data-xml']}
      show-process=${args['show-process']}
      ?enable-simulator=${args['enable-simulator']}
      ?disable-interaction=${args['disable-interaction']}
    ></bpmn-viewer>
  `
};

export default meta;
type Story = StoryObj;

// Story using src attribute
export const FromSource: Story = {
  args: {
    src: '/path/to/your/process.bpmn',
  }
};

// Story using XML data
export const FromXML: Story = {
  args: {
    'data-xml': '<?xml version="1.0" encoding="UTF-8"?><bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"><bpmn:process id="Process_1"><bpmn:startEvent id="StartEvent_1"/><bpmn:task id="Task_1"/><bpmn:endEvent id="EndEvent_1"/></bpmn:process></bpmn:definitions>'
  }
};

// Story with simulator enabled
export const WithSimulator: Story = {
  args: {
    'data-xml': '<?xml version="1.0" encoding="UTF-8"?><bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"><bpmn:process id="Process_1"><bpmn:startEvent id="StartEvent_1"/><bpmn:task id="Task_1"/><bpmn:endEvent id="EndEvent_1"/></bpmn:process></bpmn:definitions>',
    'enable-simulator': true
  }
};

// Story with interaction disabled
export const DisabledInteraction: Story = {
  args: {
    'data-xml': '<?xml version="1.0" encoding="UTF-8"?><bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"><bpmn:process id="Process_1"><bpmn:startEvent id="StartEvent_1"/><bpmn:task id="Task_1"/><bpmn:endEvent id="EndEvent_1"/></bpmn:process></bpmn:definitions>',
    'disable-interaction': true
  }
}; 