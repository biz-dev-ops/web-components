import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../business-model-canvas/index.ts';

const meta: Meta = {
  title: 'Viewers/BusinessModelCanvas',
  component: 'business-model-canvas',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL to fetch YAML data from'
    }
  },
  render: (args) => html`
    <business-model-canvas
      src=${args.src}
    ></business-model-canvas>
  `
};

export default meta;
type Story = StoryObj;

export const FromSource: Story = {
  args: {
    src: 'business-model-canvas.yml'
  }
}; 