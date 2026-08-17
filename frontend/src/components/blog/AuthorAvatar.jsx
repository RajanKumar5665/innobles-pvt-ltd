import { useState } from "react";

/**
 * Small circular author avatar. Renders the photo when available,
 * otherwise falls back to an orange initials circle.
 */
const AuthorAvatar = ({ author = "", avatar, size = 22, className = "" }) => {
  const [failed, setFailed] = useState(!avatar);
  const initials = author
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (failed) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-[#fff4eb] font-semibold text-[#ff7200] ${className}`}
        style={{ width: size, height: size, fontSize: Math.max(9, size * 0.38) }}
        aria-hidden="true"
      >
        {initials || "A"}
      </span>
    );
  }

  return (
    <img
      src={avatar}
      alt=""
      className={`inline-block rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
    />
  );
};

export default AuthorAvatar;