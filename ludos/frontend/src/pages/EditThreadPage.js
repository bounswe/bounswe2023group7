import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditThreadForm from "../components/EditThreadForm";

export default function EditThreadPage() {
  const { threadId } = useParams();
  console.log(threadId);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <EditThreadForm threadId={threadId} />
    </div>
  );
}
