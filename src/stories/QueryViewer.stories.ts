import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../query-viewer/index.ts';

const meta: Meta = {
  title: 'Viewers/QueryViewer',
  component: 'query-viewer',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL to fetch query YAML from'
    }
  },
  render: (args) => html`
    <query-viewer
      src=${args.src}
    ></query-viewer>
  `
};

export default meta;
type Story = StoryObj;

export const Query1: Story = {
  args: {
    src: '1.query.yml'
  }
};

export const Query2: Story = {
  args: {
    src: '2.query.yml'
  }
}; 