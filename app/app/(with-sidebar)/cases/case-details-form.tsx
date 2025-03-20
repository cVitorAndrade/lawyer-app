import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CaseDetails {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  type: "ADMINISTRATIVE" | "JUDICIAL";
}

interface CaseDetailsFormProps {
  onFinish: (values: CaseDetails) => void;
}

export default function CaseDetailsForm({ onFinish }: CaseDetailsFormProps) {
  const caseDetailsSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    type: z.enum(["ADMINISTRATIVE", "JUDICIAL"]),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  });

  const caseDetailsForm = useForm<z.infer<typeof caseDetailsSchema>>({
    resolver: zodResolver(caseDetailsSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "ADMINISTRATIVE",
      priority: "LOW",
    },
  });

  const onSubmit = (values: z.infer<typeof caseDetailsSchema>) => {
    onFinish(values);
  };

  return (
    <Form {...caseDetailsForm}>
      <form
        onSubmit={caseDetailsForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={caseDetailsForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={caseDetailsForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={caseDetailsForm.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMINISTRATIVE">
                        <span className="text-blue-800 bg-blue-100/50 items-center text-sm w-fit p-1 font-semibold rounded-lg">
                          Administrative
                        </span>
                      </SelectItem>
                      <SelectItem value="JUDICIAL">
                        <span className="text-purple-800 bg-purple-100/50 items-center text-sm w-fit p-1 font-semibold rounded-lg">
                          Judicial
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={caseDetailsForm.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">
                        <span className="flex gap-2 items-center text-sm font-normal">
                          <ArrowDown size={14} />
                          Low
                        </span>
                      </SelectItem>
                      <SelectItem value="MEDIUM">
                        <span className="flex gap-2 items-center text-sm font-normal">
                          <ArrowRight size={14} />
                          Medium
                        </span>
                      </SelectItem>
                      <SelectItem value="HIGH">
                        <span className="flex gap-2 items-center text-sm font-normal">
                          <ArrowUp size={14} />
                          High
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
