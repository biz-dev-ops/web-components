import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../shared/tabs/index.ts';

const meta: Meta = {
  title: 'Shared/Tabs',
  component: 'biz-tabs',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array of tab objects with label and content'
    }
  },
  render: (args) => html`
    <biz-tabs
      .tabs=${args.tabs}
    ></biz-tabs>
  `
};

export default meta;
type Story = StoryObj;

// Basic tabs
export const Basic: Story = {
  args: {
    tabs: [
      {
        label: 'Tab 1',
        content: 'Content for tab 1'
      },
      {
        label: 'Tab 2',
        content: 'Content for tab 2'
      },
      {
        label: 'Tab 3',
        content: 'Content for tab 3'
      }
    ]
  }
};

// Tabs with HTML content
export const WithHTMLContent: Story = {
  args: {
    tabs: [
      {
        label: 'Overview',
        content: html`
          <div>
            <h2>Overview</h2>
            <p>This is an overview of the system.</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </div>
        `
      },
      {
        label: 'Details',
        content: html`
          <div>
            <h2>Details</h2>
            <p>Detailed information about the system.</p>
            <table>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>Version</td>
                <td>1.0.0</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>Active</td>
              </tr>
            </table>
          </div>
        `
      }
    ]
  }
}; 