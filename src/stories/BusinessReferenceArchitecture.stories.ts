import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../business-reference-architecture/index.ts';

// Example mock data
const mockSections = [
  {
    title: "Section 1",
    sectionType: "main",
    buttonType: "primary",
    arrow: "right"
  },
  {
    title: "Section 2",
    sectionType: "side",
    buttonType: "secondary",
    arrow: "none"
  }
];

const meta: Meta = {
  title: 'Components/BusinessReferenceArchitecture',
  // Using tag name from the component
  component: 'business-reference-architecture',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL to fetch YAML data from'
    },
    'data-json': {
      control: 'text',
      description: 'JSON data as string'
    }
  },
  // Render function to properly handle web components
  render: (args) => html`
    <business-reference-architecture
      src=${args.src}
      data-json=${args['data-json']}
    ></business-reference-architecture>
  `
};

export default meta;
type Story = StoryObj;

// Story using src attribute
export const FromSource: Story = {
  args: {
    src: '/path/to/your/data.yaml',
  }
};

// Story using JSON data
export const FromJSON: Story = {
  args: {
    'data-json': JSON.stringify(mockSections)
  }
};

// Story showing error state
export const ErrorState: Story = {
  args: {
    src: 'invalid-url.yaml'
  }
};

// Story with both main and side sections
export const WithSideSections: Story = {
  args: {
    'data-json': JSON.stringify([
      {
        title: "Main Section",
        sectionType: "main",
        buttonType: "primary",
        arrow: "right"
      },
      {
        title: "Side Section",
        sectionType: "side",
        buttonType: "secondary",
        arrow: "none"
      },
      {
        title: "Another Main Section",
        sectionType: "main",
        buttonType: "primary",
        arrow: "right"
      }
    ])
  }
}; 