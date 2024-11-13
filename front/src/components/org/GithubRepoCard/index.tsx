import React from "react";
import { Box, Text, Button, Icon, VStack, Link, Flex } from "@chakra-ui/react";
import { FaStar, FaGithub } from "react-icons/fa";

// GitHub API の型定義
type GitHubRepo = {
  full_name: string;
  description: string;
  stargazers_count: number;
};

interface GitHubRepoCardProps {
  repoUrl: string;
  repoData: GitHubRepo;
}

const GitHubRepoCard: React.FC<GitHubRepoCardProps> = ({
  repoUrl,
  repoData,
}) => {
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
          <Icon as={FaGithub} boxSize={6} mr={2} />
          <Link href={repoUrl} isExternal fontWeight="bold" fontSize="lg">
            {repoData.full_name}
          </Link>
        </Flex>
        <Text fontSize={14}>{repoData.description || ""}</Text>
        <Button
          leftIcon={<FaStar />}
          colorScheme="yellow"
          variant="outline"
          onClick={() => window.open(repoUrl, "_blank")}
        >
          {`Stars`}
        </Button>
      </VStack>
    </Box>
  );
};

export default GitHubRepoCard;
