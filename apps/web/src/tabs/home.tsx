"use client";

import { BottomTab } from "@/components/layout/bottom-tab";
import { Header } from "@/components/layout/header";
import { Screen } from "@/components/layout/screen";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { ChipTabs } from "@/components/ui/chip-tabs";
import { Dialog } from "@/components/ui/dialog";
import { Fab } from "@/components/ui/fab";
import { Input } from "@/components/ui/input";
import { Prompt } from "@/components/ui/prompt";
import { useRecentPosts } from "@/services/post";
import { Link } from "@stackflow/link/future";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { ActivityComponentType, useStack } from "@stackflow/react/future";
import { BellIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export const HomeTab: ActivityComponentType<"HomeTab"> = () => {
  const [activeTab, setActiveTab] = useState("1");

  const { data: recentPosts } = useRecentPosts();

  const stack = useStack();

  return (
    <AppScreen>
      <Header
        right={
          <Link
            activityName="NotificationsScreen"
            activityParams={{}}
            className="size-8 flex items-center justify-center"
          >
            <BellIcon />
          </Link>
        }
      />
      <Screen className="pb-8">
        <span>스택: {stack.activities.length}</span>
        <ChipTabs value={activeTab} onChange={setActiveTab}>
          <ChipTabs.List className="mt-8" size="large">
            <ChipTabs.Trigger value="1">전체</ChipTabs.Trigger>
            <ChipTabs.Trigger value="2">인기글</ChipTabs.Trigger>
            <ChipTabs.Trigger value="3">최근</ChipTabs.Trigger>
          </ChipTabs.List>
        </ChipTabs>
        <h2 className="mt-4 font-semibold text-xl">최근 게시글</h2>
        <ul className="mt-3 flex flex-col">
          {recentPosts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </ul>
        <div className="flex gap-2">
          <DialogExample />
          <PromptExample />
          <BottomSheetExample />
        </div>
      </Screen>
      <BottomTab currentTab="home" />
      <Fab.Container>
        <Link activityName="AddPostScreen" activityParams={{}}>
          <Fab withLabel>
            <PlusIcon />
            글쓰기
          </Fab>
        </Link>
      </Fab.Container>
    </AppScreen>
  );
};

type PostListItemProps = {
  post: {
    id: string;
    title: string;
    content: string;
  };
};

const PostListItem = ({ post }: PostListItemProps) => {
  return (
    <li>
      <Link
        className="flex flex-col items-start py-3"
        activityName="PostDetailScreen"
        activityParams={{ postId: post.id }}
        key={post.id}
      >
        <h3 className="font-medium text-lg text-main line-clamp-1 text-start">
          {post.title}
        </h3>
        <p className="text-sub line-clamp-1 text-start">{post.content}</p>
      </Link>
    </li>
  );
};

const DialogExample = () => {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outlined">모달 열기</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>메뉴 추가</Dialog.Title>
          <Dialog.Description>
            추가할 메뉴의 정보를 입력해주세요.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body className="h-[120px] flex flex-col justify-center">
          <span className="mb-2">이름</span>
          <Input />
          <span className="mt-4 mb-2">설명</span>
          <Input />
          <span className="mt-4 mb-2">추가 입력</span>
          <Input />
          <span className="mt-4 mb-2">기타</span>
          <Input />
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close asChild className="mt-6">
            <Button className="w-full" size="xlarge">
              추가하기
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

const PromptExample = () => {
  return (
    <Prompt>
      <Prompt.Trigger asChild>
        <Button variant="outlined">컨펌 모달 열기</Button>
      </Prompt.Trigger>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>과제를 제출할까요?</Prompt.Title>
          <Prompt.Description>
            제출한 과제는 수정할 수 없어요.
          </Prompt.Description>
        </Prompt.Header>
        <Prompt.Footer>
          <Prompt.Cancel>취소</Prompt.Cancel>
          <Prompt.Action>확인</Prompt.Action>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
};

const BottomSheetExample = () => {
  return (
    <BottomSheet>
      <BottomSheet.Trigger asChild>
        <Button>바텀시트 열기</Button>
      </BottomSheet.Trigger>
      <BottomSheet.Content>
        <BottomSheet.Header>
          <BottomSheet.Title>바텀시트 제목</BottomSheet.Title>
          <BottomSheet.Description>
            바텀시트에도 Safe Area를 적용해야 합니다.
          </BottomSheet.Description>
        </BottomSheet.Header>
        <BottomSheet.Body>
          <Input />
        </BottomSheet.Body>
        <BottomSheet.Footer>
          <Button className="w-full" size="xlarge">
            닫기
          </Button>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet>
  );
};
