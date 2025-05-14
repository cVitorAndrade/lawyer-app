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
import { ptBR } from "date-fns/locale";
import {
  createClientInputSchema,
  CreateClientInputType,
} from "@/schemas/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClientDetailsFormProps {
  onPreviousStep: () => void;
  onFinish: (clientDetails: CreateClientInputType) => void;
}

export default function ClientDetailsForm({
  onPreviousStep,
  onFinish,
}: ClientDetailsFormProps) {
  const clientDetailsForm = useForm<CreateClientInputType>({
    resolver: zodResolver(createClientInputSchema),
    defaultValues: {
      birthDate: new Date(),
      email: "",
      name: "",
      telephone: "",
      cpf: "",
      gender: "FEMININO",
      motherName: "",
      maritalStatus: "",
      occupation: "",
      rg: "",
    },
  });

  const onSubmit = async (values: CreateClientInputType) => onFinish(values);

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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={clientDetailsForm.control}
            name="rg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RG</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={clientDetailsForm.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={clientDetailsForm.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Gêneroo</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FEMININO">Feminino</SelectItem>
                      <SelectItem value="MASCULINO">Masculino</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={clientDetailsForm.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado civil</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={clientDetailsForm.control}
            name="motherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da mãe</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={clientDetailsForm.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profissão</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
