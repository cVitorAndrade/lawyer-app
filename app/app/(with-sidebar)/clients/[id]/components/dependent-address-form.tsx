import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAddress } from "@/hooks/use-address";
import { cn } from "@/lib/utils";
import {
  AddressType,
  createAddressInputSchema,
  CreateAddressInputType,
} from "@/schemas/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface DependentAddressFormProps {
  onPreviousStep: () => void;
  onFinish: (dependentAddress: CreateAddressInputType) => void;
  clientAddress: AddressType;
}

export default function DependentAddressForm({
  onPreviousStep,
  onFinish,
  clientAddress,
}: DependentAddressFormProps) {
  const [useClientAddress, setUseClientAddress] = useState<boolean>(false);

  const { onFormatPostalCode, onGetAddressByPostalCode } = useAddress();

  const dependentAddressForm = useForm<CreateAddressInputType>({
    resolver: zodResolver(createAddressInputSchema),
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
      dependentAddressForm.setValue("state", estado);
      dependentAddressForm.setValue("city", localidade);
      dependentAddressForm.setValue("neighborhood", bairro);
      dependentAddressForm.setValue("street", logradouro);
      dependentAddressForm.setValue("complement", complemento);
    } catch (error) {
      console.log("DependentAddressForm - onSearchAddressByPostalCode:", error);
    }
  };

  const onSubmit = (values: CreateAddressInputType) => {
    onFinish(values);
  };

  const onUseClientAddress = () => {
    const addressFields = [
      "city",
      "complement",
      "neighborhood",
      "number",
      "postalCode",
      "state",
      "street",
    ] as const;

    for (const field of addressFields) {
      dependentAddressForm.setValue(field, clientAddress[field]);
    }
  };

  useEffect(() => {
    if (!useClientAddress || !clientAddress) return;
    onUseClientAddress();
  }, [useClientAddress]);

  return (
    <Form {...dependentAddressForm}>
      <form
        onSubmit={dependentAddressForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div
          className={cn(
            "flex items-center justify-between gap-4 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm",
            !useClientAddress ? "opacity-50 pointer-events-none" : ""
          )}
        >
          <div className="flex items-center justify-between w-full pointer-events-auto">
            <FormLabel htmlFor="use-client-address">
              Usar mesmo endereço do cliente
            </FormLabel>
            <Switch
              id="use-client-address"
              onCheckedChange={() => setUseClientAddress((prev) => !prev)}
              checked={useClientAddress}
            />
          </div>
        </div>

        <FormField
          control={dependentAddressForm.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <Input
                disabled={useClientAddress}
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
            control={dependentAddressForm.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Estado</FormLabel>
                <Input disabled={useClientAddress} {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={dependentAddressForm.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cidade</FormLabel>
                <Input disabled={useClientAddress} {...field} />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={dependentAddressForm.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <Input disabled={useClientAddress} {...field} />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={dependentAddressForm.control}
            name="street"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Rua</FormLabel>
                <Input disabled={useClientAddress} {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={dependentAddressForm.control}
            name="number"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Número</FormLabel>
                <Input disabled={useClientAddress} {...field} />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={dependentAddressForm.control}
          name="complement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complemento</FormLabel>
              <Input disabled={useClientAddress} {...field} />
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
