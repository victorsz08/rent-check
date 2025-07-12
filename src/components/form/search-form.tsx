"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormField, FormItem, FormLabel  } from "../ui/form";
import { Input } from "../ui/form"


const searchForm = z.object({
    cnpj: z.string().nonempty("Digite um cnpj válido!")
});


type DataSearchForm = z.infer<typeof searchForm>;



export function SearchForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rent, setRent] = useState<boolean | undefined>(undefined);

    const form = useForm<DataSearchForm>({
        resolver: zodResolver(searchForm),
        defaultValues: {
            cnpj: ""
        }
    });

    const onSubmit = async (data: DataSearchForm) => {
        console.log(data)
    };


    return (
        <Card className="shadow-none w-[24vw]">
            <CardHeader className="flex flex-col gap-0 justidy-center items-center">
                <CardTitle className="text-xl font-bold tracking-tight text-muted-foreground">
                    Buscar Oferta
                </CardTitle>
                <CardDescription className="text-xs tracking-tight text-muted-foreground/70 font-light">
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
                               <FormItem>
                                    <FormLabel>Digite um CNPJ</FormLabel>
                                    <Input className="h-12"/>
                               </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
} 