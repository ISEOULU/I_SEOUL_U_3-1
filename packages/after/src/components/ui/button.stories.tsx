import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      description: '버튼의 시각적 형태를 결정합니다.',
    },
    size: {
      control: 'radio',
      options: ['default', 'sm', 'md', 'lg', 'icon'],
      description: '버튼의 크기를 결정합니다.',
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 상태
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Secondary Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'md',
    children: 'Destructive Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    children: 'Ghost Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Sizes: Record<string, Story> = {
  Small: { args: { size: 'sm', children: 'Small' } },
  Medium: { args: { size: 'md', children: 'Medium' } },
  Large: { args: { size: 'lg', children: 'Large' } },
};
