interface PostalCodeDetails {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const useAddress = () => {
  const onFormatPostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    let postalCode = e.target.value.replace(/\D/g, "").slice(0, 8);
    postalCode = postalCode.replace(/^(\d{5})(\d{3})$/, "$1-$2");

    return postalCode;
  };

  const onGetAddressByPostalCode = async (
    postalCode: string
  ): Promise<PostalCodeDetails | null> => {
    try {
      postalCode = postalCode.replace(/\D/g, "");

      const invalidPostalCode = postalCode.length !== 8;
      if (invalidPostalCode) return null;

      const response = await fetch(
        `https://viacep.com.br/ws/${postalCode}/json/`
      );
      const postalCodeDetails: PostalCodeDetails = await response.json();

      return postalCodeDetails;
    } catch (error) {
      console.log("useAddress - onGetAddressByPostalCode:", error);
      return null;
    }
  };

  return { onFormatPostalCode, onGetAddressByPostalCode };
};
