import { NextComponentType } from "next";
import { signOut } from "next-auth/react";

import { Button, Avatar, Text, HStack, Flex, Spacer } from '@chakra-ui/react';

export const Header: NextComponentType = ({user}) => {
    return (
        <Flex px='4' py='2' bg='gray.700' boxShadow='base' align='center'>
            <HStack>
                <Avatar 
                    border='2px double white'
                    name={user.name} 
                    src={user.image} 
                />
                <Text 
                    fontWeight='bold' 
                    color='white' 
                    fontSize='lg'
                >
                    {user.name}
                </Text>
            </HStack>
            <Spacer/>
            <Button colorScheme='orange' onClick={() => signOut()}>Sair</Button>
        </Flex>
    )
}