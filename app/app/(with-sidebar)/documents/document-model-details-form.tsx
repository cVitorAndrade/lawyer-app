import ColorPicker from "@/components/color-picker";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useBreakpoints } from "@/hooks/use-breakpoints";

interface DocumentModelDetails {
  title: string;
  description: string;
  color: string;
}

interface DocumentModelDetailsFormProps {
  onFinish: (values: DocumentModelDetails) => void;
}

export default function DocumentModelDetailsForm({
  onFinish,
}: DocumentModelDetailsFormProps) {
  const documentModelDetailsSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    color: z.string().nonempty(),
  });

  const { isAtMostTablet } = useBreakpoints();

  const documentModelDetailsForm = useForm<
    z.infer<typeof documentModelDetailsSchema>
  >({
    defaultValues: {
      title: "",
      description: "",
      color: "#000000",
    },
    resolver: zodResolver(documentModelDetailsSchema),
  });

  return (
    <Form {...documentModelDetailsForm}>
      <form
        onSubmit={documentModelDetailsForm.handleSubmit(onFinish)}
        className="flex flex-col gap-4 w-full"
      >
        <FormField
          control={documentModelDetailsForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={documentModelDetailsForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={documentModelDetailsForm.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cor</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-2 border p-2 rounded-md cursor-pointer w-full text-sm">
                    <div
                      className="w-6 h-6 border"
                      style={{ background: field.value }}
                    />
                    {field.value}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2 max-h-full" aria-modal>
                  <ColorPicker
                    height={isAtMostTablet ? 200 : undefined}
                    color={field.value}
                    setColor={field.onChange}
                    hideAdvancedSliders
                    hideEyeDrop
                    hideColorGuide
                    hideOpacity
                    hideColorTypeBtns
                    hideControls
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
