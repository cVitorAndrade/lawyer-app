import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddress } from "@/hooks/use-address";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLAttributes, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ClientAddress {
  postalCode: string;
  city: string;
  neighborhood: string;
  state: string;
  street: string;
  number: string;
  complement: string;
}

interface ClientAddressFormProps {
  onPreviousStep: () => void;
  onFinish: (clientAddress: ClientAddress) => void;
}

export default function ClientAddressForm({
  onPreviousStep,
  onFinish,
}: ClientAddressFormProps) {
  const { onFormatPostalCode, onGetAddressByPostalCode } = useAddress();

  const clientAddressSchema = z.object({
    postalCode: z.string().nonempty("CEP é obrigatório"),
    city: z.string().nonempty("Cidade é obrigatória"),
    neighborhood: z.string().nonempty("Bairro é obrigatório"),
    state: z.string().nonempty("Estado é obrigatório"),
    street: z.string().nonempty("Rua é obrigatório"),
    number: z.string().nonempty("Número é obrigatório"),
    complement: z.string(),
  });

  const clientAddressForm = useForm<z.infer<typeof clientAddressSchema>>({
    resolver: zodResolver(clientAddressSchema),
    defaultValues: {
      city: "",
      complement: "",
      neighborhood: "",
      number: "",
      postalCode: "",
      state: "",
      street: "",
    },
  });

  const onSearchAddressByPostalCode = async (postalCode: string) => {
    try {
      const response = await onGetAddressByPostalCode(postalCode);
      if (!response) return;

      const { estado, localidade, bairro, logradouro, complemento } = response;
      clientAddressForm.setValue("state", estado);
      clientAddressForm.setValue("city", localidade);
      clientAddressForm.setValue("neighborhood", bairro);
      clientAddressForm.setValue("street", logradouro);
      clientAddressForm.setValue("complement", complemento);
    } catch (error) {
      console.log("ClientAddressForm - onSearchAddressByPostalCode:", error);
    }
  };

  const onSubmit = (values: z.infer<typeof clientAddressSchema>) => {
    onFinish(values);
  };
  return (
      <Form {...clientAddressForm}>
        <form
          onSubmit={clientAddressForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={clientAddressForm.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <Input
                  {...field}
                  onChange={async (e) => {
                    const formattedPostalCode = onFormatPostalCode(e);
                    field.onChange(formattedPostalCode);
                    await onSearchAddressByPostalCode(formattedPostalCode);
                  }}
                  value={field.value}
                />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={clientAddressForm.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Estado</FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />

            <FormField
              control={clientAddressForm.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Cidade</FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={clientAddressForm.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={clientAddressForm.control}
              name="street"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Rua</FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />

            <FormField
              control={clientAddressForm.control}
              name="number"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Número</FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={clientAddressForm.control}
            name="complement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complemento</FormLabel>
                <Input {...field} />
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
