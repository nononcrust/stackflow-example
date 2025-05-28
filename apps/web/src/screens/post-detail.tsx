"use client";

import { Header } from "@/components/layout/header";
import { Screen } from "@/components/layout/screen";
import { usePostDetail } from "@/services/post";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { Link } from "@stackflow/link/future";
import { ActivityComponentType } from "@stackflow/react/future";

export const PostDetailScreen: ActivityComponentType<"PostDetailScreen"> = ({
  params,
}) => {
  const { data: post } = usePostDetail(params.postId);

  return (
    <AppScreen>
      <Header left={<Header.Back />} />
      <Screen>
        <Link
          activityName="UserProfileScreen"
          activityParams={{ userId: post.author.id }}
          className="flex items-center gap-3 mt-8"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-full" />
          <span className="font-medium">작성자명</span>
        </Link>
        <h1 className="mt-4 font-semibold text-lg">{post.title}</h1>
        <p className="mt-4 whitespace-pre-wrap">{post.content}</p>
      </Screen>
    </AppScreen>
  );
};
