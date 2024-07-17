import React from "react";

const ChatIndicator = () => {
  return (
    <div className="flex items-end gap-2">
      <img
        className="object-cover rounded-full size-8"
        src="https://penguinui.s3.amazonaws.com/component-assets/avatar-8.webp"
        alt="avatar"
      />
      <div className="flex gap-1">
        <span className="size-1.5 rounded-full bg-slate-700 motion-safe:animate-[bounce_1s_ease-in-out_infinite] dark:bg-slate-300"></span>
        <span className="size-1.5 rounded-full bg-slate-700 motion-safe:animate-[bounce_0.5s_ease-in-out_infinite] dark:bg-slate-300"></span>
        <span className="size-1.5 rounded-full bg-slate-700 motion-safe:animate-[bounce_1s_ease-in-out_infinite] dark:bg-slate-300"></span>
      </div>
    </div>
  );
};

export default ChatIndicator;
