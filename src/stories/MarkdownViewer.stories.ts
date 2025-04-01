import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../markdown-viewer/index.ts';

const meta: Meta = {
  title: 'Viewers/MarkdownViewer',
  component: 'markdown-viewer',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL to fetch Markdown from'
    },
    'data-markdown': {
      control: 'text',
      description: 'Markdown content as string'
    }
  },
  render: (args) => html`
    <markdown-viewer
      src=${args.src}
      data-markdown=${args['data-markdown']}
    ></markdown-viewer>
  `
};

export default meta;
type Story = StoryObj;

// Story using src attribute
export const FromSource: Story = {
  args: {
    src: '/path/to/your/document.md',
  }
};

// Story using markdown data
export const FromMarkdown: Story = {
  args: {
    'data-markdown': `# Sample Markdown

This is a sample markdown document with various features:

## Headers
You can use different levels of headers

### Lists
- Item 1
- Item 2
  - Subitem 1
  - Subitem 2

## Code
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Tables
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |`
  }
}; 