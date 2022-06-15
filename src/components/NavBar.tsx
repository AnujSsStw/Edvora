import { Flex, Heading, Image, Link, Spacer, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface NavBarProps {
  user: any;
}

export const NavBar: React.FC<NavBarProps> = ({ user }) => {
  return (
    <>
      <Flex zIndex={1} position="sticky" top={0} bg="#101010" p={4}>
        <Flex flex={1} m="auto" align="center">
          <NextLink href="/">
            <Link>
              <Heading color={"white"} ml={5}>
                Edvora
              </Heading>
            </Link>
          </NextLink>
          <Flex ml={"auto"}>
            <Text color={"white"} fontWeight="bold">
              {user.name}
            </Text>
            <Spacer w={5} />
            <Image borderRadius="full" boxSize={8} src={user.url} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
