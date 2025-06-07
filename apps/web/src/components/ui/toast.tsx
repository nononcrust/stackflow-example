import { toast as RhtToast, Toaster as RhtToaster } from "react-hot-toast";

const Toaster = () => {
  return (
    <RhtToaster
      toastOptions={{
        position: "bottom-center",
        style: {
          fontWeight: 600,
        },
      }}
    />
  );
};

const toast = RhtToast;

export { toast, Toaster };
