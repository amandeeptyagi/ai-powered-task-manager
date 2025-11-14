import React from "react";
import { Loader2 } from "lucide-react"; // or your preferred loader icon

const ServerConnecting = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed bottom-10 right-10 flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
      <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
      <span>Server Connecting...</span>
    </div>
  );
};

export default ServerConnecting;
