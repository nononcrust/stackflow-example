import { Header } from "@/components/layout/header";
import { Screen } from "@/components/layout/screen";
import { Input } from "@/components/ui/input";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { ActivityComponentType } from "@stackflow/react/future";

export const AddPostScreen: ActivityComponentType<"AddPostScreen"> = () => {
  return (
    <AppScreen>
      <Header left={<Header.Back />} title="게시글 추가" />
      <Screen>
        <div className="flex flex-col gap-4 mt-8">
          <FormField />
          <FormField />
          <FormField />
          <FormField />
          <FormField />
          <FormField />
          <FormField />
          <FormField />
          <FormField />
          <FormField />
        </div>
      </Screen>
    </AppScreen>
  );
};

const FormField = () => {
  return (
    <div className="flex flex-col gap-2">
      <span>레이블</span>
      <Input />
    </div>
  );
};
