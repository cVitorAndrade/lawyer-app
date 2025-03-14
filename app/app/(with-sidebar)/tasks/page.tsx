import { Subtask } from "@/components/subtask";
import { TaskCard } from "@/components/task-card";
import { List, MessagesSquare, MoreHorizontal } from "lucide-react";
import ShowTaskDetails from "./show-task-details";

export default function Tasks() {
  return (
    <div
      // className="overflow-x-auto"
      className="w-full h-full"
    >
      <div className="h-full w-full  grid grid-cols-3">
        <div className="flex flex-col gap-4 p-4">
          <ShowTaskDetails>
            <TaskCard.Root>
              <TaskCard.Header>
                <TaskCard.Title color="#f21245" title="Development Website" />
                <MoreHorizontal className="cursor-pointer" />
              </TaskCard.Header>

              <TaskCard.Body>
                <TaskCard.Details>
                  <TaskCard.StatsSection>
                    <TaskCard.StatsItem icon={MessagesSquare} text="23" />
                    <TaskCard.StatsItem icon={List} text="1/3" />
                  </TaskCard.StatsSection>

                  <TaskCard.AssignedToSection>
                    <TaskCard.AssignedToItem
                      image="https:/github.com/cvitorandrade.png"
                      name="Carlos Vitor"
                    />

                    <TaskCard.AssignedToItem
                      image="https:/github.com/maykbrito.png"
                      name="Mayk Brito"
                    />
                  </TaskCard.AssignedToSection>
                </TaskCard.Details>

                <TaskCard.SubtaskProgress
                  percentage={50}
                  indicatorColor="bg-[#f21245]"
                />

                <TaskCard.SubtaskSection>
                  <Subtask.Root color="#f21245">
                    <Subtask.Header>
                      <Subtask.Title text="Style font, Color & Component" />
                    </Subtask.Header>
                    <Subtask.Body>
                      <Subtask.Details>
                        <Subtask.Priority priority="high" />
                      </Subtask.Details>
                    </Subtask.Body>
                  </Subtask.Root>

                  <Subtask.Root color="#2176FF">
                    <Subtask.Header>
                      <Subtask.Title text="Home Page Prototype Component" />
                    </Subtask.Header>
                    <Subtask.Body>
                      <Subtask.Details>
                        <Subtask.Priority priority="medium" />
                      </Subtask.Details>
                    </Subtask.Body>
                  </Subtask.Root>

                  <Subtask.Root color="#2176FF">
                    <Subtask.Header>
                      <Subtask.Title text="Home Page Prototype Component" />
                    </Subtask.Header>
                    <Subtask.Body>
                      <Subtask.Details>
                        <Subtask.Priority priority="low" />
                      </Subtask.Details>
                    </Subtask.Body>
                  </Subtask.Root>
                </TaskCard.SubtaskSection>
              </TaskCard.Body>

              <TaskCard.Footer>
                <TaskCard.AddSubtask />
              </TaskCard.Footer>
            </TaskCard.Root>
          </ShowTaskDetails>

          <TaskCard.Root>
            <TaskCard.Header>
              <TaskCard.Title color="#f21245" title="Development Website" />
              <MoreHorizontal className="cursor-pointer" />
            </TaskCard.Header>

            <TaskCard.Body>
              <TaskCard.Details>
                <TaskCard.StatsSection>
                  <TaskCard.StatsItem icon={MessagesSquare} text="23" />
                  <TaskCard.StatsItem icon={List} text="1/3" />
                </TaskCard.StatsSection>

                <TaskCard.AssignedToSection>
                  <TaskCard.AssignedToItem
                    image="https:/github.com/cvitorandrade.png"
                    name="Carlos Vitor"
                  />

                  <TaskCard.AssignedToItem
                    image="https:/github.com/maykbrito.png"
                    name="Mayk Brito"
                  />
                </TaskCard.AssignedToSection>
              </TaskCard.Details>

              <TaskCard.SubtaskProgress
                percentage={50}
                indicatorColor="bg-[#f21245]"
              />

              <TaskCard.SubtaskSection>
                <Subtask.Root color="#f21245">
                  <Subtask.Header>
                    <Subtask.Title text="Style font, Color & Component" />
                  </Subtask.Header>
                  <Subtask.Body>
                    <Subtask.Details>
                      <Subtask.Priority priority="high" />
                    </Subtask.Details>
                  </Subtask.Body>
                </Subtask.Root>

                <Subtask.Root color="#2176FF">
                  <Subtask.Header>
                    <Subtask.Title text="Home Page Prototype Component" />
                  </Subtask.Header>
                  <Subtask.Body>
                    <Subtask.Details>
                      <Subtask.Priority priority="low" />
                    </Subtask.Details>
                  </Subtask.Body>
                </Subtask.Root>
              </TaskCard.SubtaskSection>
            </TaskCard.Body>

            <TaskCard.Footer>
              <TaskCard.AddSubtask />
            </TaskCard.Footer>
          </TaskCard.Root>

          <TaskCard.Root>
            <TaskCard.Header>
              <TaskCard.Title color="#f21245" title="Development Website" />
              <MoreHorizontal className="cursor-pointer" />
            </TaskCard.Header>

            <TaskCard.Body>
              <TaskCard.Details>
                <TaskCard.StatsSection>
                  <TaskCard.StatsItem icon={MessagesSquare} text="23" />
                  <TaskCard.StatsItem icon={List} text="1/3" />
                </TaskCard.StatsSection>

                <TaskCard.AssignedToSection>
                  <TaskCard.AssignedToItem
                    image="https:/github.com/cvitorandrade.png"
                    name="Carlos Vitor"
                  />

                  <TaskCard.AssignedToItem
                    image="https:/github.com/maykbrito.png"
                    name="Mayk Brito"
                  />
                </TaskCard.AssignedToSection>
              </TaskCard.Details>

              <TaskCard.SubtaskProgress
                percentage={50}
                indicatorColor="bg-[#f21245]"
              />

              <TaskCard.SubtaskSection>
                <Subtask.Root color="#f21245">
                  <Subtask.Header>
                    <Subtask.Title text="Style font, Color & Component" />
                  </Subtask.Header>
                  <Subtask.Body>
                    <Subtask.Details>
                      <Subtask.Priority priority="high" />
                    </Subtask.Details>
                  </Subtask.Body>
                </Subtask.Root>

                <Subtask.Root color="#2176FF">
                  <Subtask.Header>
                    <Subtask.Title text="Home Page Prototype Component" />
                  </Subtask.Header>
                  <Subtask.Body>
                    <Subtask.Details>
                      <Subtask.Priority priority="low" />
                    </Subtask.Details>
                  </Subtask.Body>
                </Subtask.Root>
              </TaskCard.SubtaskSection>
            </TaskCard.Body>

            <TaskCard.Footer>
              <TaskCard.AddSubtask />
            </TaskCard.Footer>
          </TaskCard.Root>
        </div>

        <div className="bg-orange-600"></div>
        <div className="bg-green-600"></div>
      </div>
    </div>
  );
}
