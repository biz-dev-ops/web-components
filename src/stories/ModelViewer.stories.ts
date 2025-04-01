import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../model-viewer/index.ts';

const meta: Meta = {
  title: 'Viewers/ModelViewer',
  component: 'model-viewer',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL to fetch model YAML from'
    }
  },
  render: (args) => html`
    <model-viewer
      src=${args.src}
    ></model-viewer>
  `
};

export default meta;
type Story = StoryObj;

export const Model1: Story = {
  args: {
    src: '1.model.yml'
  }
};

export const Model2: Story = {
  args: {
    src: '2.model.yml'
  }
}; 