import { Flex, Button, Stack, Text, Link} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from 'components/Form/Input';

import { GetServerSideProps } from "next";
import { FormEvent, useContext, useState } from "react"

import { AuthContext } from "../contexts/AuthContext";

import styles from '../styles/Home.module.css';
import { withSSRGuest } from "../utils/withSSRGuest";


type RegisterFormData = {
  email: string;
  password: string;
};

const registerFormSchema = Yup.object().shape({
  email: Yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: Yup.string().required('Senha obrigatória'),
});

export default function Register(): JSX.Element {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(registerFormSchema),
  });

  const { errors } = formState;

  const { signUp } = useContext(AuthContext);

  const handleRegister: SubmitHandler<RegisterFormData> = async values => {
    console.log(values);
    await signUp(values)
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
          
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
   
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleRegister)}
      >
        <Text align="center" justify="center">Cadastro</Text>
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            label="E-mail"
            //value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            {...register('email')}
          />

          <Input
            name="password"
            type="password"
            label="Senha"
            //value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
        <Stack spacing={4}>
        <Text fontSize="sm" align="center" mt="6"> Já possui conta? <Link color="blue.500" href="/">&nbsp;Login</Link> </Text>
        </Stack>
      </Flex>
    </Flex>
  );
}
