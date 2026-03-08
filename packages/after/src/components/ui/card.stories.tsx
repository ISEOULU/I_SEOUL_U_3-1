import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from './button';
import { Input } from './input';

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>프로젝트 생성</CardTitle>
        <CardDescription>새로운 프로젝트를 시작하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1.5">
          <Input id="name" placeholder="프로젝트 이름 설정" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">취소</Button>
        <Button>생성하기</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>알림</CardTitle>
        <CardDescription>새로운 메시지가 도착했습니다.</CardDescription>
      </CardHeader>
    </Card>
  ),
};
