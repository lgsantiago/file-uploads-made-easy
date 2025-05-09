import React, { useEffect } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

export default function FileUploader() {
  const uppy = React.useMemo(() => {
    return new Uppy({
      restrictions: {
        maxNumberOfFiles: 5,
        allowedFileTypes: ["image/*", ".pdf", ".docx"],
      },
      autoProceed: false,
    });
  }, []);

  useEffect(() => {
    uppy.on("complete", (result) => {
      console.log("Upload complete! Files:", result.successful);
    });

    // return () => uppy.close();
  }, [uppy]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Your Files</h2>
      <Dashboard uppy={uppy} proudlyDisplayPoweredByUppy={false} />
    </div>
  );
}
