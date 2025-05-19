"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ClientPersonalInfosSection() {
  return (
    <div className="col-span-1 shadow-lg p-2 border rounded-lg">
      <div className="flex flex-col gap-4 items-center">
        <img
          className="size-28 rounded-full border shadow-md"
          src="https://github.com/cvitorandrade.png"
          alt=""
        />

        <h2 className="text-primary text-2xl font-semibold">Carlos Vitor</h2>
      </div>

      <div>
        <Accordion type="multiple">
          <AccordionItem value="client-details">
            <AccordionTrigger>Detalhes do cliente</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
              quo nesciunt deleniti delectus tenetur ad consectetur ea commodi,
              voluptatibus molestiae exercitationem excepturi itaque mollitia ex
              ut labore quae tempora ipsam.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="client-notes">
            <AccordionTrigger>Casos</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
              quo nesciunt deleniti delectus tenetur ad consectetur ea commodi,
              voluptatibus molestiae exercitationem excepturi itaque mollitia ex
              ut labore quae tempora ipsam.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="client-cases">
            <AccordionTrigger>Anotações</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
              quo nesciunt deleniti delectus tenetur ad consectetur ea commodi,
              voluptatibus molestiae exercitationem excepturi itaque mollitia ex
              ut labore quae tempora ipsam.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
