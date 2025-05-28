import { useSuspenseQuery } from "@tanstack/react-query";

export const postApi = {
  getRecentPosts: async () => {
    return posts;
  },
  getPostDetail: async (id: string) => {
    const post = posts.find((post) => post.id === id);

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  },
};

export const useRecentPosts = () => {
  return useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: postApi.getRecentPosts,
  });
};

export const usePostDetail = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["posts", "detail", id],
    queryFn: () => postApi.getPostDetail(id),
  });
};

type Post = {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
  };
};

const posts: Post[] = [
  {
    id: "1",
    title: "방금 수지도서관 옆 공중화장실에 사람들 웅성이던거 뭔가요?",
    content:
      "화장실 둘러싸고 학생들 웅성거리던데\n놀란학생도 있는거 같은데\n무슨일있었나요?",
    author: {
      id: "1",
    },
  },
  {
    id: "2",
    title: "치과추천좀용",
    content:
      "10살때 앞니부러져서 씌워서 치료했는데 토래되니까 수명이다해서 바꿔야되서요\n브릿지랑 임플란트 추천하시던데\n앞니는 브릿지 해도되나요???\n임플란트는 잇몸안에 고름이 차있어서 뼈가녹았다고 뼈이식하고 해야된다고 브릿지 추천하시네요\n임플란트도 저렴한 치과추천해주심감사합니다",
    author: {
      id: "1",
    },
  },
  {
    id: "3",
    title: "집안 셀프페인팅하시고 남은 페인팅도구 있으심 사거나 얻고싶어요",
    content: "천장 벽 문틀 창틀 칠할거여염^^",
    author: {
      id: "1",
    },
  },
  {
    id: "4",
    title: "방금 수지도서관 옆 공중화장실에 사람들 웅성이던거 뭔가요?",
    content:
      "화장실 둘러싸고 학생들 웅성거리던데\n놀란학생도 있는거 같은데\n무슨일있었나요?",
    author: {
      id: "1",
    },
  },
  {
    id: "5",
    title: "치과추천좀용",
    content:
      "10살때 앞니부러져서 씌워서 치료했는데 토래되니까 수명이다해서 바꿔야되서요\n브릿지랑 임플란트 추천하시던데\n앞니는 브릿지 해도되나요???\n임플란트는 잇몸안에 고름이 차있어서 뼈가녹았다고 뼈이식하고 해야된다고 브릿지 추천하시네요\n임플란트도 저렴한 치과추천해주심감사합니다",
    author: {
      id: "1",
    },
  },
  {
    id: "6",
    title: "집안 셀프페인팅하시고 남은 페인팅도구 있으심 사거나 얻고싶어요",
    content: "천장 벽 문틀 창틀 칠할거여염^^",
    author: {
      id: "1",
    },
  },
  {
    id: "7",
    title: "방금 수지도서관 옆 공중화장실에 사람들 웅성이던거 뭔가요?",
    content:
      "화장실 둘러싸고 학생들 웅성거리던데\n놀란학생도 있는거 같은데\n무슨일있었나요?",
    author: {
      id: "1",
    },
  },
  {
    id: "8",
    title: "치과추천좀용",
    content:
      "10살때 앞니부러져서 씌워서 치료했는데 토래되니까 수명이다해서 바꿔야되서요\n브릿지랑 임플란트 추천하시던데\n앞니는 브릿지 해도되나요???\n임플란트는 잇몸안에 고름이 차있어서 뼈가녹았다고 뼈이식하고 해야된다고 브릿지 추천하시네요\n임플란트도 저렴한 치과추천해주심감사합니다",
    author: {
      id: "1",
    },
  },
  {
    id: "9",
    title: "집안 셀프페인팅하시고 남은 페인팅도구 있으심 사거나 얻고싶어요",
    content: "천장 벽 문틀 창틀 칠할거여염^^",
    author: {
      id: "1",
    },
  },
];
