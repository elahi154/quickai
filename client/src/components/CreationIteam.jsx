import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationIteam = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 sm:p-5 max-w-5xl w-full text-sm bg-white border border-gray-200 rounded-lg cursor-pointer"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="font-medium break-words">
            {item.prompt}
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            {item.type} ·{" "}
            {new Date(item.created_at).toLocaleDateString()}
          </p>

          <button
            className="mt-3 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm"
          >
            {item.type}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4">
          {item.type === "image" ? (
            <div>
              <img
                src={item.content}
                alt="generated content"
                className="w-full max-w-md md:max-w-full mx-auto rounded-lg object-cover"
              />
            </div>
          ) : (
            <div className="mt-3 max-h-80 overflow-y-auto text-sm text-slate-700">
              <div className="reset-tw break-words">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationIteam;