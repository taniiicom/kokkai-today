import React from "react";
import { Button, Icon } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

interface WideFabProps {
  text: string;
  icon?: React.ElementType;
  onClick: () => void;
}

const WideFab: React.FC<WideFabProps> = ({ text, icon = AddIcon, onClick }) => {
  return (
    <Button
      position="fixed"
      bottom="20px"
      right="20px"
      leftIcon={<Icon as={icon} />}
      colorScheme="teal"
      size="lg"
      borderRadius="full"
      boxShadow="md"
      paddingX="24px"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default WideFab;
