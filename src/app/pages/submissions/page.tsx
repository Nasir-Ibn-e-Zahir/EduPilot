'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Sidebar,SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../../components/ui/sidebar'
import { Button } from '@/components/ui/button';
import ImageUploadComponent from '../upload/page';


type FileData = {
  submissionId: string;
  files: string[]; // URLs like /pdf_files/<submissionId>/<filename>
};



export default function UserPDFList() {
  const [data, setData] = useState<FileData[]>([]);
  const [filterData,setFilterData] = useState<FileData>()
  const { data: session } = useSession();
  const userId = session?.user.id
  const [SelectedId,setSelectedId] = useState<string>()

    const handleSubmissionClick = (submissionId: string) => {
    setSelectedId(submissionId);
    const matched = data.find((item) => item.submissionId === submissionId);
    setFilterData(matched || undefined);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/user-submissions?userId=${userId}`);
      const json = await res.json();
      
      setData(json.submissions);
    };

    fetchData();
  }, [userId]);

  return (
    <div className='flex flex-row p-10'>
      
      <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Button className='bg-gray-700 ' >New Chat </Button>
          <SidebarGroupLabel> Chats </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.map((submission) => (
                <SidebarMenuItem key={submission.submissionId}
                
                >
                  <SidebarMenuButton 
                  className= {SelectedId == submission.submissionId? 'bg-gray-300 hover:bg-gray-300 hover:cursor-pointer':'hover:bg-gray-300 hover:cursor-pointer'}
                  asChild>
                    <a  onClick={()=>handleSubmissionClick(submission.submissionId)}>
                      <span>{submission.submissionId}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='bg-gray-200' >
        {session?.user.name}
        
      </SidebarFooter>
    </Sidebar>
    <div >
      <nav>

      </nav>
      {SelectedId? <h1> PDF Files of {SelectedId} {
            
          <ul className="list-decimal list-inside mt-2 ">
            {filterData?.files.map((fileUrl) => (
              <li key={fileUrl}>
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {fileUrl.split('/').pop()}
                </a>
              </li>
            ))}
            
          </ul> 

        }</h1>:<ImageUploadComponent/>}
     
    </div>
      {/* {data.map((submission) => (
        <div key={submission.submissionId} className="mt-4 border p-4 rounded shadow">
          <h3 className="font-semibold"
          onClick={()=>{console.log(submission.submissionId)}}
          >Submission: {submission.submissionId}</h3> */}
          {/* <ul className="list-disc list-inside mt-2">
            {submission.files.map((fileUrl) => (
              <li key={fileUrl}>
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {fileUrl.split('/').pop()}
                </a>
              </li>
            ))}
          </ul> */}
        {/* </div> */}
      {/* ))} */}
    </div>
  );
}
