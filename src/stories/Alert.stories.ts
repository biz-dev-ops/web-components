import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../shared/alert/index.ts';

const meta: Meta = {
  title: 'Shared/Alert',
  component: 'biz-alert',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Type of alert'
    },
    message: {
      control: 'text',
      description: 'Alert message'
    }
  },
  render: (args) => html`
    <biz-alert
      type=${args.type}
      message=${args.message}
    ></biz-alert>
  `
};

export default meta;
type Story = StoryObj;

// Info alert
export const Info: Story = {
  args: {
    type: 'info',
    message: 'This is an informational message'
  }
};

// Success alert
export const Success: Story = {
  args: {
    type: 'success',
    message: 'Operation completed successfully'
  }
};

// Warning alert
export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Please review your input before proceeding'
  }
};

// Error alert
export const Error: Story = {
  args: {
    type: 'error',
    message: 'An error occurred while processing your request'
  }
}; 