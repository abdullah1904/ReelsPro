"use client"

import { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void;
    onProgress: (progress: number) => void;
    fileType: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType = "image" }: FileUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onError = (err: { message: string }) => {
        console.log("Error", err);
        setError(err.message);
        setUploading(false);
    };

    const handleSuccess = (res: IKUploadResponse) => {
        console.log("Success", res);
        setError(null);
        setUploading(false);
        onSuccess(res);
    };

    const handleProgress = (evt: ProgressEvent) => {
        if (evt.lengthComputable && onProgress) {
            const progress = Math.round((evt.loaded / evt.total) * 100);
            onProgress(progress);
        }
    };

    const handleStartUpload = () => {
        setError(null);
        setUploading(true);
    };
    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Please upload a video file");
                return false;
            }
            if (file.size > 100 * 1024 * 1024) {
                setError("File size should be less than 100MB");
                return false;
            }
        }
        else {
            const validTypes = ["image/jpeg", "image/png", "image/webp"];
            if (!validTypes.includes(file.type)) {
                setError("Please upload an image file (jpeg, png, webp)");
                return false;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError("File size should be less than 5MB");
                return false;
            }
        }
        return false;
    }
    return (
        <div className="space-y-2">
            <IKUpload
                fileName={fileType === "image" ? "sample-image" : "sample-video"}
                onError={onError}
                onSuccess={handleSuccess}
                onUploadStart={handleStartUpload}
                onUploadProgress={handleProgress}
                accept={fileType === "image" ? "image/*" : "video/*"}
                className="file-input file-input-bordered w-full"
                validateFile={validateFile}
                useUniqueFileName={true}
                folder={fileType === "image" ? "/images" : "/videos"}
            />
            {
                uploading && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                        <Loader2 className="animate-spin w-4 h-2" />
                        <span>Uploading...</span>
                    </div>
                )
            }
            {
                error && (
                    <div className="text-error text-sm">{error}</div>
                )
            }
        </div>
    )
}

export default FileUpload