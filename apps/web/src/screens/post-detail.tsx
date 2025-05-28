"use client";

import { Header } from "@/components/layout/header";
import { Screen } from "@/components/layout/screen";
import { useFlow } from "@/lib/stackflow";
import { usePostDetail } from "@/services/post";
import { AppScreen } from "@stackflow/plugin-basic-ui";

type PostDetailScreenProps = {
  params: {
    postId: string;
  };
};

export const PostDetailScreen: React.FC<PostDetailScreenProps> = ({
  params,
}) => {
  const { data: post } = usePostDetail(params.postId);

  const { push } = useFlow();

  const onProfileClick = () => {
    push("user-profile", { userId: post.author.id });
  };

  return (
    <AppScreen>
      <Header left={<Header.Back />} />
      <Screen>
        <button
          className="flex items-center gap-3 mt-8"
          onClick={onProfileClick}
        >
          <div className="w-12 h-12 bg-gray-50 rounded-full" />
          <span className="font-medium">작성자명</span>
        </button>
        <h1 className="mt-4 font-semibold text-lg">{post.title}</h1>
        <p className="mt-4 whitespace-pre-wrap">{post.content}</p>
      </Screen>
    </AppScreen>
  );
};
