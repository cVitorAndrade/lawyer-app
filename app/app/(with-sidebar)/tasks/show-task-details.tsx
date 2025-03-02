"use client";
import { Attachment } from "@/components/attachment";
import { ViewTask } from "@/components/view-task/indes";
import { Download, Eye, FileText, Image } from "lucide-react";
import { HTMLAttributes, ReactNode } from "react";

interface ShowTaskDetailsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ShowTaskDetails({ children }: ShowTaskDetailsProps) {
  return (
    <ViewTask.Root>
      <ViewTask.OpenButton>{children}</ViewTask.OpenButton>
      <ViewTask.Content>
        <ViewTask.Header>
          <ViewTask.Title text="Schedule Me An Appointment With My Endcrinologist" />

          <ViewTask.Details>
            <ViewTask.Priority priority="medium" />
            <ViewTask.DueDate dueDate="Jul 10 - 14" />
          </ViewTask.Details>

          <ViewTask.Section title="Description">
            <ViewTask.Description text=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ab fuga facere sed hic. Est nam maxime et porro velit itaque tenetur sunt voluptatibus, non, culpa consectetur autem ullam perspiciatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ab fuga facere sed hic. Est nam maxime et porro velit itaque tenetur sunt voluptatibus, non, culpa consectetur autem ullam perspiciatis?" />
          </ViewTask.Section>

          <ViewTask.Section title="Attachment">
            <div className="flex flex-col gap-4">
              <Attachment.Root>
                <Attachment.DetailsSection>
                  <Attachment.Icon
                    icon={Image}
                    backgroundColor="rgba(0, 230, 118, .2)"
                  />
                  <Attachment.Details>
                    <Attachment.Title text="Medical Prescription.jpeg" />
                    <Attachment.CreatedAt createdAt="12:32 PM, 24, August" />
                  </Attachment.Details>
                </Attachment.DetailsSection>
                <Attachment.ActionsSection>
                  <Attachment.ActionItem
                    icon={Eye}
                    text="View"
                    onClick={() => console.log("View")}
                  />
                  <Attachment.ActionItem
                    icon={Download}
                    text="Download"
                    onClick={() => console.log("Download")}
                  />
                </Attachment.ActionsSection>
              </Attachment.Root>

              <Attachment.Root>
                <Attachment.DetailsSection>
                  <Attachment.Icon
                    icon={FileText}
                    backgroundColor="rgba(242, 18, 69, .2)"
                  />
                  <Attachment.Details>
                    <Attachment.Title text="Medical Prescription.docx" />
                    <Attachment.CreatedAt createdAt="14:35 PM, 22, August" />
                  </Attachment.Details>
                </Attachment.DetailsSection>
                <Attachment.ActionsSection>
                  <Attachment.ActionItem
                    icon={Eye}
                    text="View"
                    onClick={() => console.log("View")}
                  />
                  <Attachment.ActionItem
                    icon={Download}
                    text="Download"
                    onClick={() => console.log("Download")}
                  />
                </Attachment.ActionsSection>
              </Attachment.Root>
            </div>
          </ViewTask.Section>
        </ViewTask.Header>
      </ViewTask.Content>
    </ViewTask.Root>
  );
}
