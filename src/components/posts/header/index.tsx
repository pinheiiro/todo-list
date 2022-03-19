import { NextComponentType } from "next";
import { signOut } from "next-auth/react";

import { Button, Avatar, Text, HStack, Flex, Spacer, Box } from '@chakra-ui/react';

export const Header: NextComponentType = ({user}) => {
    return (
        <Box bg='gray.700' px='4' py='2' boxShadow='base'>
        <Flex m='0 auto' maxW='1366px' align='center'>
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
        </Box>
    )
}