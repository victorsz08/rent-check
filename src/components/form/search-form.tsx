"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CheckCircle, SearchIcon, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const searchForm = z.object({
  cnpj: z
    .string()
    .nonempty("Digite um cnpj válido!")
    .min(18, "Digite um cnpj válido"),
});

type DataSearchForm = z.infer<typeof searchForm>;

function formatCnpj(value: string) {
  const valueFormated = value.replace(/\D/g, "");
  const cnpjPattern = valueFormated.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );

  return cnpjPattern;
}

export function SearchForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rent, setRent] = useState<boolean | undefined>(undefined);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const form = useForm<DataSearchForm>({
    resolver: zodResolver(searchForm),
    defaultValues: {
      cnpj: "",
    },
  });

  const onSubmit = async (data: DataSearchForm) => {
    setIsLoading(true);
    setRent(undefined);

    const dataFormatted = data.cnpj.replace(/\D/g, "");

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cnpj: dataFormatted }),
      });

      const result = await response.json();
      setRent(result.rent);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-none w-[26vw] px-4 py-10">
      <CardHeader className="flex flex-col mb-8 gap-0 justidy-center items-center">
        <Image src="/claro-logo.svg" alt="claro-logo" width={32} height={32} />
        <CardTitle className="text-xl font-bold mt-3 tracking-tight text-muted-foreground">
          Buscar Oferta
        </CardTitle>
        <CardDescription className="text-xs tracking-tight text-muted-foreground/80 font-light">
          Busque a disponibilidade de ofertas excluisivas PME
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem className="group relative">
                  <FormLabel
                    className="text-xs text-muted-foreground font-normal bg-card 
                    absolute -translate-y-2 px-1 translate-x-1"
                  >
                    Digite um CNPJ
                  </FormLabel>
                  <Input
                    className="h-12"
                    maxLength={18}
                    value={field.value}
                    placeholder="00.000.000/0000-00"
                    onChange={(e) => {
                      setRent(undefined);
                      field.onChange(formatCnpj(e.target.value));
                    }}
                  />
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3 items-center mt-8 justify-center">
              <Button
                className="w-full h-12 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Buscando..." : "Buscar"}
              </Button>
            </div>
          </form>
        </Form>
        <AnimatePresence mode="wait">
          {rent !== undefined ? (
            <motion.div
              key={rent ? "available" : "unavailable"}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-5 animate-ease-in-out transition-all"
            >
              {rent === true ? (
                <span className="flex flex-col gap-1 items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <p className="text-base font-semibold text-muted-foreground">
                    Oferta exclusiva disponível
                  </p>
                </span>
              ) : (
                <span className="flex flex-col gap-1 items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-600" />
                  <p className="text-base font-semibold text-muted-foreground">
                    Oferta exclusiva indisponível
                  </p>
                </span>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="default"
              className="mt-5 flex flex-col gap-1 items-center justify-center"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <SearchIcon className="w-8 h-8 text-muted-foreground" />
              <p className="text-base font-semibold text-muted-foreground">
                Verifique se existe oferta exclusiva
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
