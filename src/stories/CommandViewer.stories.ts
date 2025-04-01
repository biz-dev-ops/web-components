import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../command-viewer/index.ts';

const meta: Meta = {
  title: 'Viewers/CommandViewer',
  component: 'command-viewer',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL to fetch command YAML from'
    }
  },
  render: (args) => html`
    <command-viewer
      src=${args.src}
    ></command-viewer>
  `
};

export default meta;
type Story = StoryObj;

export const Command1: Story = {
  args: {
    src: '1.command.yml'
  }
};

export const Command2: Story = {
  args: {
    src: '2.command.yml'
  }
}; 