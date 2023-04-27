import React, { useState, useEffect } from "react";
import { getHandle } from "../lib/shopify";
import { useRouter } from "next/router";

function DropDownComponent({ subMenu }) {
  const [resourceId, setResourceId] = useState("");
  const [handle, setHandle] = useState("");
  const router = useRouter();

  useEffect(async () => {
    setHandle(await getHandle(resourceId));
  }, [resourceId]);
  useEffect(() => {
    if (handle != "" || handle.handle != undefined)
      router.push(`/collections/${handle?.handle}`);
  }, [handle]);

  return (
    <div className="flex flex-row text-white bg-black rounded-b-xl border-2 border-red-500">
      <div className="flex flex-col">
        {subMenu.map((item) => (
          <div
            className="p-3 font-bold text-xl hover:underline cursor-pointer"
            key={item.id}
            onClick={() => setResourceId(item.resourceId)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropDownComponent;
