import { PhoneInput } from "@/components/phone-input";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ptBR } from "date-fns/locale";

interface ClientDetails {
  name: string;
  email: string;
  telephone: string;
  birthDate: Date;
}

interface ClientDetailsFormProps {
  onPreviousStep: () => void;
  onFinish: (clientDetails: ClientDetails) => void;
}

export default function ClientDetailsForm({
  onPreviousStep,
  onFinish,
}: ClientDetailsFormProps) {
  const clientDetailsSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    birthDate: z.date({ required_error: "Selecione uma data" }),
    telephone: z.string().nonempty("Telefone é obrigatório"),
  });

  const clientDetailsForm = useForm<z.infer<typeof clientDetailsSchema>>({
    resolver: zodResolver(clientDetailsSchema),
    defaultValues: {
      birthDate: new Date(),
      email: "",
      name: "",
      telephone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof clientDetailsSchema>) => {
    onFinish(values);
  };

  return (
    <Form {...clientDetailsForm}>
      <form
        onSubmit={clientDetailsForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={clientDetailsForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={clientDetailsForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={clientDetailsForm.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Nascimento</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm",
                        !field.value && "text-gray-500"
                      )}
                    >
                      {field.value
                        ? format(field.value, "dd/MM/yyyy")
                        : "Selecione uma data"}
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                    </button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    fromYear={1900}
                    captionLayout="dropdown"
                    toYear={new Date().getFullYear()}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    locale={ptBR}
                    className="flex justify-center"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={clientDetailsForm.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <PhoneInput
                  {...field}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={onPreviousStep}>
            Voltar
          </Button>
          <Button type="submit">Avançar</Button>
        </div>
      </form>
    </Form>
  );
}
