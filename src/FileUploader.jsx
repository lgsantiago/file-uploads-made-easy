import React, { useEffect, useState } from "react";

// Step 1: Import Uppy, Dashboard, and plugins (ImageEditor, XHRUpload)
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import ImageEditor from "@uppy/image-editor";
import XHRUpload from "@uppy/xhr-upload";
import Webcam from "@uppy/webcam";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/image-editor/dist/style.css";

export default function FileUploader() {
  // Step 2: Initialize Uppy instance with ImageEditor and XHRUpload plugins.
  const [uppy] = useState(() => {
    const uppyInstance = new Uppy({
      id: "file-uploader",
      restrictions: {
        maxNumberOfFiles: 5,
        allowedFileTypes: [".jpg", ".png", ".jpeg", ".pdf"],
      },
      autoProceed: false,
    });

    uppyInstance.use(ImageEditor, {
      cropperOptions: {
        aspectRatio: undefined,
        viewMode: 1,
      },
      actions: {
        revert: true,
        rotate: true,
        granularRotate: true,
        flip: true,
        zoomIn: true,
        zoomOut: true,
        cropSquare: true,
        cropWidescreen: true,
        cropWidescreenVertical: true,
      },
    });

    uppyInstance.use(XHRUpload, {
      endpoint: "http://localhost:3001/upload",
      fieldName: "files",
    });

    uppyInstance.use(Webcam);

    return uppyInstance;
  });

  // Step 3: Handle event listeners
  useEffect(() => {
    const successHandler = (file, response) => {
      console.log("File uploaded successfully:", file.name);
      console.log("Server response:", response);
    };

    const errorHandler = (file, error) => {
      console.error("Error uploading file:", file.name);
      console.error("Error details:", error);
    };

    const completeHandler = (result) => {
      console.log("Upload complete! Files:", result.successful);
    };

    // Add event listeners
    uppy.on("upload-success", successHandler);
    uppy.on("upload-error", errorHandler);
    uppy.on("complete", completeHandler);

    // Cleanup function to remove specific event listeners
    return () => {
      uppy.off("upload-success", successHandler);
      uppy.off("upload-error", errorHandler);
      uppy.off("complete", completeHandler);
    };
  }, [uppy]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Your Files</h2>
      {/* Step 4: Dashboard component */}
      <Dashboard
        uppy={uppy}
        height={450}
        showProgressDetails
        note="Accepted file types: jpg, gif, png, pdf. Maximum size per photo: 10MB"
        proudlyDisplayPoweredByUppy={false}
        showLinkToFileUploadResult={false}
        showRemoveButtonAfterComplete={false}
      />
    </div>
  );
}
