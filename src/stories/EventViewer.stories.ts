import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../event-viewer/index.ts';

const meta: Meta = {
  title: 'Viewers/EventViewer',
  component: 'event-viewer',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL to fetch event YAML from'
    }
  },
  render: (args) => html`
    <event-viewer
      src=${args.src}
    ></event-viewer>
  `
};

export default meta;
type Story = StoryObj;

export const Event1: Story = {
  args: {
    src: '1.event.yml'
  }
};

export const Event2: Story = {
  args: {
    src: '2.event.yml'
  }
}; 