import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../task-viewer/index.ts';

const meta: Meta = {
  title: 'Viewers/TaskViewer',
  component: 'task-viewer',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL to fetch task YAML from'
    }
  },
  render: (args) => html`
    <task-viewer
      src=${args.src}
    ></task-viewer>
  `
};

export default meta;
type Story = StoryObj;

export const Task1: Story = {
  args: {
    src: '1.task.yml'
  }
};

export const Task2: Story = {
  args: {
    src: '2.task.yml'
  }
}; 