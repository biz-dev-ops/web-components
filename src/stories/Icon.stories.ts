import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../shared/icon/index.ts';

const meta: Meta = {
  title: 'Shared/Icon',
  component: 'biz-icon',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Name of the icon from Material Symbols'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the icon'
    }
  },
  render: (args) => html`
    <biz-icon
      name=${args.name}
      size=${args.size}
    ></biz-icon>
  `
};

export default meta;
type Story = StoryObj;

// Small icon
export const Small: Story = {
  args: {
    name: 'home',
    size: 'small'
  }
};

// Medium icon
export const Medium: Story = {
  args: {
    name: 'settings',
    size: 'medium'
  }
};

// Large icon
export const Large: Story = {
  args: {
    name: 'info',
    size: 'large'
  }
};

// Different icons
export const DifferentIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <biz-icon name="home" size="medium"></biz-icon>
      <biz-icon name="settings" size="medium"></biz-icon>
      <biz-icon name="info" size="medium"></biz-icon>
      <biz-icon name="warning" size="medium"></biz-icon>
      <biz-icon name="error" size="medium"></biz-icon>
    </div>
  `
}; 