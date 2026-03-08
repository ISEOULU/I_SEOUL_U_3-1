import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'url'],
      defaultValue: 'text',
    },
    placeholder: {
      control: 'text',
      description: '입력창에 표시될 힌트 문구',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: '텍스트를 입력하세요...',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'example@company.com',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '입력할 수 없습니다',
  },
};
