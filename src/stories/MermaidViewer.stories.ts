import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../mermaid-viewer/index.ts';

const meta: Meta = {
  title: 'Viewers/MermaidViewer',
  component: 'mermaid-viewer',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL to fetch Mermaid diagram from'
    },
    'data-diagram': {
      control: 'text',
      description: 'Mermaid diagram data as string'
    },
    'disable-interaction': {
      control: 'boolean',
      description: 'Disable diagram interaction'
    }
  },
  render: (args) => html`
    <mermaid-viewer
      src=${args.src}
      data-diagram=${args['data-diagram']}
      ?disable-interaction=${args['disable-interaction']}
    ></mermaid-viewer>
  `
};

export default meta;
type Story = StoryObj;

// Story using src attribute
export const FromSource: Story = {
  args: {
    src: '/path/to/your/diagram.mmd',
  }
};

// Story using diagram data
export const FromDiagram: Story = {
  args: {
    'data-diagram': `graph TD
    A[Start] --> B{Is it?}
    B -- Yes --> C[OK]
    B -- No --> D[End]`
  }
};

// Story with interaction disabled
export const DisabledInteraction: Story = {
  args: {
    'data-diagram': `graph TD
    A[Start] --> B{Is it?}
    B -- Yes --> C[OK]
    B -- No --> D[End]`,
    'disable-interaction': true
  }
}; 