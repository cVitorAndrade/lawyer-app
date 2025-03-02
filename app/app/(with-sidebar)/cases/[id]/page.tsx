'use client'

import { columns, files } from './files-table-columns'
import DataTable from './files-table'

import { TimelineEvent } from '@/components/timeline-event'
import { AtSign, BriefcaseBusiness, Calendar, Check, Files, ListTodo, Mail, MapPin, MessageSquareText, Phone, Tags, Timer, Upload, User, Users } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import FileDropzone from '@/components/file-dropzone'

export default function CaseDetails () {
  const [selectedTab, setSelectedTab] = useState(0)
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 })
  const tabsRef = useRef<(HTMLLIElement | null)[]>([])

  const tabs = ['Sobre', 'Tarefas', 'Atividades', 'Documentos', 'Compromissos']

  useEffect(() => {
    const currentTab = tabsRef.current[selectedTab]
    if (currentTab) {
      setLineStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      })
    }
  }, [selectedTab])

  return (
    <div>
      {/* Top */}
      <div></div>

      {/* <div className="relative">
        <ul className="flex gap-2 text-sm font-medium text-neutral-600 px-2">
          {tabs.map((tab, index) => (
            <li
              key={index}
              ref={(el) => {
                (tabsRef.current[index] = el)
              }}
              className={`p-4 cursor-pointer ${
                selectedTab === index ? "text-blue-600" : ""
              }`}
              onClick={() => setSelectedTab(index)}
            >
              {tab}
            </li>
          ))}
        </ul>
        <div
          className="absolute bottom-0 h-1 bg-blue-600 transition-all duration-300"
          style={{
            left: `${lineStyle.left}px`,
            width: `${lineStyle.width}px`,
          }}
        ></div>
      </div> */}

      <div>
        {/* <div className='flex flex-col gap-1 pb-4'>
          <h3 className='font-medium'>Case Details</h3>
          <p className='text-neutral-500'>General details about the case. This section provides a summary for initial tracking</p>
        </div> */}

        <div className='py-4 border-y text-sm flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 text-neutral-500'>
                <User size={18} />
                <span className='font-medium'>Name:</span>
              </div>

              <div>
                <span className='font-medium'>John Doe</span>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 text-neutral-500'>
                <Mail size={18} />
                <span className='font-medium'>Email:</span>
              </div>

              <div className='flex items-center gap-4'>
                <span className='font-medium'>johndoe@email.com</span>
                <div className='flex items-center gap-2'>
                  <Link
                    href='mailto:johndoe@email.com'
                  >
                    <Button
                      variant='outline'
                      className='h-fit p-1.5'
                    >
                      <AtSign />
                    </Button>
                  </Link>

                  <Button
                    variant='outline'
                    className='h-fit p-1.5'
                    onClick={() => navigator.clipboard.writeText('johndoe@email.com')}
                  >
                    <Files />
                  </Button>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 text-neutral-500'>
                <Phone size={18} />
                <span className='font-medium'>Tel:</span>
              </div>

              <div>
                <span className='font-medium'>+33 6 60 15 55 37</span>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 text-neutral-500'>
                <MapPin size={18} />
                <span className='font-medium'>Location:</span>
              </div>

              <div>
                <span className='font-medium'>Sydney, Australia</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 text-neutral-500'>
                <BriefcaseBusiness size={18} />
                <span className='font-medium'>Case name:</span>
              </div>

              <div>
                <span className='font-medium'>Case #1</span>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 text-neutral-500'>
                <Tags size={18} />
                <span className='font-medium'>Type:</span>
              </div>

              <div className='flex items-center gap-4'>
                <div className='flex gap-2 items-center text-xs w-fit p-1 font-semibold rounded-lg text-blue-800 bg-blue-100/50'>
                  <span className='capitalize'>Administrative</span>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 text-neutral-500'>
                <ListTodo size={18} />
                <span className='font-medium'>Status:</span>
              </div>

              <div>
                <div className='flex gap-2 items-center text-xs w-fit p-1 font-semibold rounded-lg bg-blue-200/50 text-blue-700'>
                  <Timer size={16} />
                  <span className='capitalize'>
                    In Progress
                  </span>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 text-neutral-500'>
                <User size={18} />
                <span className='font-medium'>Created by:</span>
              </div>

              <div className="flex relative -space-x-2 group">
                <TooltipProvider>
                  <Tooltip
                    delayDuration={300}
                  >
                    <TooltipTrigger>
                      <img
                        src="https://github.com/cvitorandrade.png"
                        alt=""
                        className="rounded-full cursor-auto w-8 h-8 border-2 border-white transition-transform duration-300 ease-in-out hover:scale-110 hover:opacity-100 hover:z-10"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      John Doe
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 text-neutral-500'>
                <Users size={18} />
                <span className='font-medium'>Assigned to:</span>
              </div>

              <div className="flex relative -space-x-2 group">
                <TooltipProvider>
                  <Tooltip
                    delayDuration={300}
                  >
                    <TooltipTrigger>
                      <img
                        src="https://github.com/cvitorandrade.png"
                        alt=""
                        className="rounded-full cursor-auto w-8 h-8 border-2 border-white transition-transform duration-300 ease-in-out hover:scale-110 hover:opacity-100 hover:z-10"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      John Doe
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip
                    delayDuration={300}
                  >
                    <TooltipTrigger>
                      <img
                        src="https://github.com/maykbrito.png"
                        alt=""
                        className="rounded-full cursor-auto w-8 h-8 border-2 border-white transition-transform duration-300 ease-in-out hover:scale-110 hover:opacity-100 hover:z-10"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      John Doe
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 text-neutral-500'>
                <Calendar size={18} />
                <span className='font-medium'>Date created:</span>
              </div>

              <div>
                <span className='font-medium'>Dez 25, 2024 </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col gap-4 rounded-lg py-4 bg-white"
      >
        {/* <div
          className="p-4 border-y"
        >
          <p className="text-center">Search Area</p>
        </div> */}
        <div className='flex flex-col gap-1'>
          <h3 className='font-medium'>Atividades</h3>
          <p className='text-neutral-500'>Linha do tempo das atividades que ocorreram nesse caso</p>
        </div>

        <div
          className='border-y py-4'
        >
          <div
            className="pl-4"
          >
            <TimelineEvent.Root>
              <TimelineEvent.Header>
                <TimelineEvent.Icon icon={MessageSquareText} />
                <TimelineEvent.Title 
                  actor="Carter Bator"
                  action="Upload 3 file in"
                  target="Mobile Flow Design"
                />

                <TimelineEvent.CreatedAt createdAt="1hr Ago" />
              </TimelineEvent.Header>
              <TimelineEvent.Content>

              </TimelineEvent.Content>
            </TimelineEvent.Root>

            <TimelineEvent.Root>
              <TimelineEvent.Header>
                <TimelineEvent.Icon icon={Upload} />
                <TimelineEvent.Title 
                  actor="Carter Bator"
                  action="Upload 3 file in"
                  target="Mobile Flow Design"
                />

                <TimelineEvent.CreatedAt createdAt="1hr Ago" />
              </TimelineEvent.Header>
              <TimelineEvent.Content>

              </TimelineEvent.Content>
            </TimelineEvent.Root>
            <TimelineEvent.Root>
              <TimelineEvent.Header>
                <TimelineEvent.Icon icon={MessageSquareText} />
                <TimelineEvent.Title 
                  actor="Carter Bator"
                  action="Upload 3 file in"
                  target="Mobile Flow Design"
                />

                <TimelineEvent.CreatedAt createdAt="1hr Ago" />
              </TimelineEvent.Header>
              <TimelineEvent.Content>
              </TimelineEvent.Content>
            </TimelineEvent.Root>

            <TimelineEvent.Root>
              <TimelineEvent.Header>
                <TimelineEvent.Icon icon={Upload} />
                <TimelineEvent.Title 
                  actor="Carter Bator"
                  action="Upload 3 file in"
                  target="Mobile Flow Design"
                />

                <TimelineEvent.CreatedAt createdAt="1hr Ago" />
              </TimelineEvent.Header>
              <TimelineEvent.Content>
              </TimelineEvent.Content>
            </TimelineEvent.Root>
            <TimelineEvent.Root>
              <TimelineEvent.Header>
                <TimelineEvent.Icon icon={MessageSquareText} />
                <TimelineEvent.Title 
                  actor="Carter Bator"
                  action="Upload 3 file in"
                  target="Mobile Flow Design"
                />

                <TimelineEvent.CreatedAt createdAt="1hr Ago" />
              </TimelineEvent.Header>
              <TimelineEvent.Content>

              </TimelineEvent.Content>
            </TimelineEvent.Root>

            <TimelineEvent.Root>
              <TimelineEvent.Header>
                <TimelineEvent.Icon icon={Check} />
                <TimelineEvent.Title 
                  actor="Carter Bator"
                  action="Upload 3 file in"
                  target="Mobile Flow Design"
                />

                <TimelineEvent.CreatedAt createdAt="1hr Ago" />
              </TimelineEvent.Header>
            </TimelineEvent.Root>
          </div>
        </div>
      </div>

      {/* Documents Section */}

      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <h3 className='font-medium'>Documentos</h3>
          <p className='text-neutral-500'>Arquivos e documentos que foram adicionados a este caso.</p>
        </div>

        <div>
          <FileDropzone />
        </div>

        <div>
          <DataTable columns={columns} data={files} />
        </div>
      </div>

    </div>
  )
}