import { Flex, Button, Stack, Text, Link} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from 'components/Form/Input';

//================================================nextauth
import { GetServerSideProps } from "next";
import { FormEvent, useContext, useState } from "react"

import { AuthContext } from "../contexts/AuthContext";

import { withSSRGuest } from "../utils/withSSRGuest";


type SignInFormData = {
  identifier: string;
  password: string;
};

const signInFormSchema = Yup.object().shape({
  identifier: Yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: Yup.string().required('Senha obrigatório'),
});

export default function Home(): JSX.Element {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async values => {
    console.log(values);
    await signIn(values)
  };

  const { signIn } = useContext(AuthContext);

  const [identifier, setIdentifier] = useState('reader@strapi.io');
  const [password, setPassword] = useState('strapi');

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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Text align="center" justify="center">Login</Text>
        <Stack spacing="4">
          <Input
            name="identifier"
            type="email"
            label="E-mail"
            //value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            error={errors.email}
            {...register('identifier')}
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
        <Text fontSize="sm" align="center" mt="6"> Novo por aqui? <Link color="blue.500" href="/signup">&nbsp;Registre-se</Link> </Text>
        </Stack>
      </Flex>
    </Flex>
  );
}
