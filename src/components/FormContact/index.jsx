import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { REQUIRED_VALIDATION } from "../Util/index";
import { Form, Button, Container } from "react-bootstrap";

const FormContact = () => {
    const initState = {
        name: "",
        phone: "",
        email: "",
        date: "",
    };
    const [initialValues, setInitialValues] = useState(initState);

    const validationSchema = yup
        .object({
            name: yup.string().required(REQUIRED_VALIDATION("Name")).min(3, "Mínimo 3 caracteres.").matches(/^[A-z\s]+$/, "Inválido, apenas letras."),
            adress: yup.string().required(REQUIRED_VALIDATION("Adress")).min(10, "Mínimo 10 caracteres.").matches(/^[A-z\s][0-9]+$/, "Endereço, inválido."),
            phone: yup.string().required(REQUIRED_VALIDATION("Phone")).min(11, "Mínimo 11 caracteres, inclusa o seu DDD.").matches(/^[0-9]+$/, "Apenas números."),
            date: yup.date("Inválido.").required(REQUIRED_VALIDATION("Date")),
            email: yup.string().email("Email inválido.").required(REQUIRED_VALIDATION("Email")).min(5, "Inválido"),
        })
        .required();

    const onSubmit = (values) => {
        console.log("Values:::", values);
    };

    const onError = (error) => {
        console.log("ERROR:::", error);
    };

    const { register, handleSubmit, formState: { errors },
    } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange",
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    return (
        <Container className="shadow p-3 mb-5 bg-white rounded">
            <Form onSubmit={handleSubmit(onSubmit, onError)}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label column="lg" lg={2}>Nome</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Insira o seu nome completo"
                        {...register("name")}
                    />
                    {errors.name && (
                        <Form.Text className="text-danger">
                            {errors.name?.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAdress">
                    <Form.Label column="lg" lg={2}>Endereço</Form.Label>
                    <Form.Control
                        type="adress"
                        placeholder="Insira o seu endereço"
                        {...register("adress")}
                    />
                    {errors.adress && (
                        <Form.Text className="text-danger">
                            {errors.adress?.message}
                        </Form.Text>
                    )}
                </Form.Group>


                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label column="lg" lg={2}>Telefone</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Insira o seu telefone"
                        {...register("phone")}
                    />
                    {errors.phone && (
                        <Form.Text className="text-danger">
                            {errors.phone?.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label column="lg" lg={2}>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        {...register("email")}
                    />
                    {errors.email && (
                        <Form.Text className="text-danger">
                            {errors.email.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDate">
                    <Form.Label column="lg" lg={2}>Data de nascimento</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Insira sua data de nascimento"
                        {...register("date")}
                    />
                    {errors.date && (
                        <Form.Text className="text-danger">
                            {errors.date.message}
                        </Form.Text>
                    )}
                </Form.Group>



                <Button variant="outline-secondary"  type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default FormContact;
