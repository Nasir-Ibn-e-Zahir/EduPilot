"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../components/ui/sidebar";
import { Button } from "@/components/ui/button";
import ImageUploadComponent from "../upload/page";
import { Download} from "lucide-react";

import { DeleteDialog } from "@/components/shared/Delete";

type FileData = {
  submissionId: string;
  submissionName: string;
  files: string[]; // URLs like /pdf_files/<submissionId>/<filename>
};

export default function UserPDFList() {
  const [data, setData] = useState<FileData[]>([]);
  const [filterData, setFilterData] = useState<FileData>();
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [SelectedId, setSelectedId] = useState<string>();
  const [subName, setSubName] = useState<string>();
  const [showNavbar, setShowNavbar] = useState(false);

  const handleSubmissionClick = (submissionId: string) => {
    setSelectedId(submissionId);

    setShowNavbar(true);
    const matched = data.find((item) => item.submissionId === submissionId);
    setFilterData(matched || undefined);
  };

 const handleDelete = async (id: string) => {
  try {
    const res = await fetch(`/api/user-submissions/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setData(prev => prev.filter(item => item.submissionId !== id));
    } else {
      console.error("Delete failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  const handleNewChatButton = () => {
    setSelectedId("");
  };

 
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/user-submissions?userId=${userId}`);
      const json = await res.json();

      setData(json.submissions);
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (data.length > 1) {
      setSelectedId(data[0].submissionId);
      handleSubmissionClick(data[0].submissionId);
      setSubName(data[0].submissionName);
    }
  }, [data]);

  return (
    <div className="flex flex-row w-screen">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <Button className="bg-gray-700 " onClick={handleNewChatButton}>
              New Chat
            </Button>
            <SidebarGroupLabel> Chats </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.map((submission) => (
                  <SidebarMenuItem key={submission.submissionId}>
                    <SidebarMenuButton
                      className={
                        SelectedId == submission.submissionId
                          ? "bg-gray-300 hover:bg-gray-300 hover:cursor-pointer"
                          : "hover:bg-gray-300 hover:cursor-pointer"
                      }
                      asChild
                    >
                      <a
                        onClick={() =>
                          handleSubmissionClick(submission.submissionId)
                        }
                      >
                        
                          
                          <div className="flex flex-row justify-between"  >
                          <p>{submission.submissionName} AI Intelligence</p>
                           <DeleteDialog submissionId={submission.submissionId} onDelete={handleDelete}  />
                          </div>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-gray-200">
          {session?.user.name}
        </SidebarFooter>
      </Sidebar>
      <div className="w-full flex-1">
        {showNavbar ? (
          <nav className="w-full h-[50px] bg-gray-700 text-white p-2 flex flex-row justify-between ">
            {subName}
            {/*         
             <Button onClick={handleDownloadAll}  variant={'outline'}  className="flex gap-2 items-center hover:cursor-pointer" >
                  <Download  size={5} className="text-black"  />
                  
                </Button> */}
          </nav>
        ) : null}

        {SelectedId ? (
          <div className="space-y-4 mt-4 p-4">
            <ul className="list-decimal list-inside space-y-2">
              {filterData?.files.map((fileUrl: string) => {
                const fileName = fileUrl.split("/").pop();
                return (
                  <li
                    key={fileUrl}
                    className="flex justify-between items-center gap-4 bg-gray-100 px-4 py-2 rounded"
                  >
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex-1"
                    >
                      {fileName}
                    </a>
                    <a href={fileUrl} download>
                      <Button
                        variant={"default"}
                        className="flex gap-2 items-center hover:cursor-pointer"
                      >
                        <Download size={16} />
                      </Button>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col h-full w-[910px] items-center justify-between text-center ">
            <div className="">
              <h1>What can i help?</h1>
            </div>
            <ImageUploadComponent />
          </div>
        )}
      </div>
    </div>
  );
}
