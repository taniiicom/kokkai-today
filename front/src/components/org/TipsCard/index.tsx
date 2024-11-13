import React from "react";
import { Box, Text, Button, Icon, VStack, Link, Flex } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { CiCoffeeCup } from "react-icons/ci";

interface TipsCardProps {
  url: string;
}

const TipsCard: React.FC<TipsCardProps> = ({ url }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      boxShadow="lg"
      maxW="sm"
      bg="white"
    >
      <VStack align="start">
        <Flex alignItems="center">
          <Icon as={CiCoffeeCup} boxSize={6} mr={2} />
          <Link href={url} isExternal fontWeight="bold" fontSize="lg">
            支援する
          </Link>
        </Flex>
        <Text fontSize={14}>
          いいなと思っていただけたらコーヒー1杯分からご支援いただけます
        </Text>
        <Button
          leftIcon={<FaHeart />}
          colorScheme="pink"
          variant="outline"
          onClick={() => window.open(url, "_blank")}
        >
          {`Support`}
        </Button>
      </VStack>
    </Box>
  );
};

export default TipsCard;
