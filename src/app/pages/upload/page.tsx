// "use client";

// // Image Upload Component
// import ImageUpload from "@/components/forms/ImageUpload";

// // Schema
// import { ImageUploadSchema } from "@/lib/schemas";
// // React Query
// import { useMutation } from "@tanstack/react-query";
// // Zod
// import * as z from "zod";


// // useState
// import { useState } from "react";

// // use Session
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";



// export default function ImageUploadComponent() {
//   const { data: session } = useSession();
//   const [upimgMessage, setUploadMessage] = useState();
//   const [showRandom, setShowRandom] = useState(false);
//   const router = useRouter()
  
//   const onImageUpload = async (data: z.infer<typeof ImageUploadSchema>) => {
//     //  Creates a form data object similar to what HTML forms send.
//     //  Automatically sets the correct Content-Type to multipart/form-data.
//     //  Without FormData, you can't send file data using fetch().
//     const formdata = new FormData();
//     console.log("Form data --------------------> ",data)
//     const userid = session?.user.id ?? "";
//     //  Adds a new field to the FormData.
//     formdata.append("image", data.image);
//     formdata.append("userid", userid);
    
//     data.options.forEach((option)=>{
//       formdata.append(option,option)
      
//     })

//     // Optional: Quiz-related values
// if (data.quizDifficulty) {
//   formdata.append("quizDifficulty", data.quizDifficulty);
// }
// if (data.mcqsCount !== undefined) {
//   formdata.append("mcqsCount", String(data.mcqsCount));
// }
// if (data.trueFalseCount !== undefined) {
//   formdata.append("trueFalseCount", String(data.trueFalseCount));
// }
// if (data.shortQCount !== undefined) {
//   formdata.append("shortQCount", String(data.shortQCount));
// }
// if (data.longQCount !== undefined) {
//   formdata.append("longQCount", String(data.longQCount));
// }

// // Optional: Midterm
// if (data.midMcqsCount !== undefined) {
//   formdata.append("midMcqsCount", String(data.midMcqsCount));
// }
// if (data.midTrueFalseCount !== undefined) {
//   formdata.append("midTrueFalseCount", String(data.midTrueFalseCount));
// }
// if (data.midShortQCount !== undefined) {
//   formdata.append("midShortQCount", String(data.midShortQCount));
// }
// if (data.midLongQCount !== undefined) {
//   formdata.append("midLongQCount", String(data.midLongQCount));
// }
// if (data.finalMcqsCount !== undefined) {
//   formdata.append("finalMcqsCount", String(data.finalMcqsCount));
// }
// if (data.finalTrueFalseCount !== undefined) {
//   formdata.append("finalTrueFalseCount", String(data.finalTrueFalseCount));
// }
// if (data.finalShortQCount !== undefined) {
//   formdata.append("finalShortQCount", String(data.finalShortQCount));
// }
// if (data.finalLongQCount !== undefined) {
//   formdata.append("finalLongQCount", String(data.finalLongQCount));
// }



// // Optional: Assignments / Presentations
// if (data.assignmentCount !== undefined) {
//   formdata.append("assignmentCount", String(data.assignmentCount));
// }
// if (data.presentationCount !== undefined) {
//   formdata.append("presentationCount", String(data.presentationCount));
// }
    
// const response = await fetch("/api/upload", {
//       method: "POST",
//       body: formdata,
      
//     });

//     if (!response.ok) {
//       throw new Error("Failed to Upload Image!");
//     }
//     return response.json();
//   };

//   const mutation = useMutation({
//     mutationKey: ["images"],
//     mutationFn: onImageUpload,
//     onSuccess: (data) => {
//       setUploadMessage(data.text); // Show success message
//       console.log(upimgMessage)
//       setShowRandom(true);
//       // Optionally redirect:
//       router.push("/pages/submissions"); // 👈 navigate after successful upload
//     },
//   });
  
//   return (
//     <>
//       {/* {showRandom && <Random text={upimgMessage} />} */}
//       {!showRandom && <ImageUpload onImageUpload={mutation.mutate} />}
//     </>
//   );
// }

"use client";

import ImageUpload from "@/components/forms/ImageUpload";
import { ImageUploadSchema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ImageUploadComponent() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const router = useRouter();

  // WebSocket setup
  useEffect(() => {
    if (!session?.user.id) return;

    const ws = new WebSocket(`ws://localhost:5000/ws/${session.user.id}`);
    
    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.status === "completed" && data.submissionId === submissionId) {
        console.log("Files generated:", data.files);
        setLoading(false);
        setFiles(data.files);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [session?.user.id, submissionId]);

  const onImageUpload = async (data: z.infer<typeof ImageUploadSchema>) => {
    const formdata = new FormData();
    const userid = session?.user.id ?? "";
    if(data.image && data.prompt){
      console.log("Both Image and Prompt not allowed! ")
    }
    if (data.image) {
      formdata.append("image", data.image);
    }
    formdata.append("userid", userid);
    if (data.prompt !== undefined) {
      formdata.append("prompt", data.prompt);
    }
    // Map 'options' to 'features' for FastAPI
    data.options.forEach((option) => formdata.append("features", option));

    // Quiz-related values
    if (data.quizDifficulty) {
      formdata.append("quizDifficulty", data.quizDifficulty);
    }
    if (data.mcqsCount !== undefined) {
      formdata.append("mcqsCount", String(data.mcqsCount));
    }
    if (data.trueFalseCount !== undefined) {
      formdata.append("trueFalseCount", String(data.trueFalseCount));
    }
    if (data.shortQCount !== undefined) {
      formdata.append("shortQCount", String(data.shortQCount));
    }
    if (data.longQCount !== undefined) {
      formdata.append("longQCount", String(data.longQCount));
    }

    // Midterm values
    if (data.midMcqsCount !== undefined) {
      formdata.append("midMcqsCount", String(data.midMcqsCount));
    }
    if (data.midTrueFalseCount !== undefined) {
      formdata.append("midTrueFalseCount", String(data.midTrueFalseCount));
    }
    if (data.midShortQCount !== undefined) {
      formdata.append("midShortQCount", String(data.midShortQCount));
    }
    if (data.midLongQCount !== undefined) {
      formdata.append("midLongQCount", String(data.midLongQCount));
    }

    // Finalterm values
    if (data.finalMcqsCount !== undefined) {
      formdata.append("finalMcqsCount", String(data.finalMcqsCount));
    }
    if (data.finalTrueFalseCount !== undefined) {
      formdata.append("finalTrueFalseCount", String(data.finalTrueFalseCount));
    }
    if (data.finalShortQCount !== undefined) {
      formdata.append("finalShortQCount", String(data.finalShortQCount));
    }
    if (data.finalLongQCount !== undefined) {
      formdata.append("finalLongQCount", String(data.finalLongQCount));
    }

    // Assignments / Presentations
    if (data.assignmentCount !== undefined) {
      formdata.append("assignmentCount", String(data.assignmentCount));
    }
    if (data.presentationCount !== undefined) {
      formdata.append("presentationCount", String(data.presentationCount));
    }

    console.log("FormData entries:", Array.from(formdata.entries()));

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formdata,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image!");
    }

    const result = await response.json();
    setSubmissionId(result.submissionId); // Store submissionId for WebSocket
    return result;
  };

  const mutation = useMutation({
    mutationKey: ["images"],
    mutationFn: onImageUpload,
    onSuccess: (data) => {
      setLoading(true); // Start loading state
      console.log("Submission Name:", data.name);
    },
    onError: (error) => {
      console.error("Upload error:", error);
      setLoading(false);
    },
  });

  return (
    <div>
      {loading && <div className="text-center">Processing...</div>}
      {!loading && <ImageUpload onImageUpload={mutation.mutate} />}
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium">Generated Files:</h3>
          <ul>
            {files.map((file) => (
              <li key={file}>
                <a
                  href={`http://localhost:5000${file}`}
                  download
                  className="text-blue-600 hover:underline"
                >
                  {file.split("/").pop()}
                </a>
              </li>
            ))}
          </ul>
          <Button
            onClick={() => router.push("/pages/submissions")}
            className="mt-2"
          >
            View Submissions
          </Button>
        </div>
      )}
    </div>
  );
}