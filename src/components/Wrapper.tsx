import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  variant: "medium" | "large";
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
  return (
    <Box
      mt={4}
      mx="auto"
      maxW={variant === "large" ? "max(100% - 80px)" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};
