import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Link,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CgMenuMotion } from "react-icons/cg";
import { BsArrowLeft } from "react-icons/bs";
import React from "react";
import FlatDatePicker from "@/components/mol/FlatDatePicker";
import GithubRepoCard from "@/components/org/GithubRepoCard";
import TipsCard from "@/components/org/TipsCard";
import { selectedDateState } from "@/states/selectedDateState";
import { useRecoilState } from "recoil";
import { isLoadingState } from "@/states/isLoadingState";

const SidePanel = () => {
  const [isLoading] = useRecoilState(isLoadingState);
  const [selectedDate] = useRecoilState(selectedDateState);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ホバー時にサイドパネルを開く
  const openSidePanel = () => {
    onOpen();
  };

  // ホバーが外れたらサイドパネルを閉じる
  const closeSidePanel = () => {
    onClose();
  };

  return (
    <>
      {/* [uiux][design][animation] スマホでは FAB のクリックで対応 ^^ */}
      <IconButton
        aria-label="toggle sidepanel"
        icon={
          // [uiux][design][idea] SidePanel > Fab > isLoading 時に Spinner 表示するように ^^
          isOpen ? <BsArrowLeft /> : isLoading ? <Spinner /> : <CgMenuMotion />
        }
        position="fixed"
        top="20px"
        left="20px"
        color="white"
        bgColor={isOpen ? "#999" : "#00cdff"}
        _hover={{ bgColor: isOpen ? "#999" : "#00cdff" }}
        borderRadius="50%"
        onClick={isOpen ? closeSidePanel : openSidePanel}
        zIndex="popover"
        fontSize="25px"
        height="55px"
        width="55px"
        boxShadow="0px 6px 10px rgba(0, 0, 0, 0.15), 0px 1px 18px rgba(0, 0, 0, 0.1), 0px 3px 5px rgba(0, 0, 0, 0.2)"
        transition="all 0.4s ease-in-out"
        _active={{
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          transform: "scale(0.95)",
        }}
      />

      {/* // [uiux][design] 日付が日めくりカレンダーのように強調されるように ^^ */}
      <Box
        width="170px"
        height="170px"
        left="10px"
        top="10px"
        borderRadius={30}
        zIndex="overlay"
        bgColor="#ffffff00"
        position="fixed"
        boxShadow="0px 6px 10px rgba(0, 0, 0, 0.15), 0px 1px 18px rgba(0, 0, 0, 0.1), 0px 3px 5px rgba(0, 0, 0, 0.2)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
        transition="all 0.3s ease-out"
        _hover={{ transform: "scale(1.03)" }}
        onClick={isOpen ? closeSidePanel : openSidePanel}
      >
        <Box p="15px"></Box>
        <Text fontSize="60px" color="#777" fontWeight="600">
          {new Date(selectedDate).getDate()}
        </Text>
        <Box>
          <Text fontSize="15px" color="#999">
            {new Date(selectedDate).getFullYear()} -{" "}
            {new Date(selectedDate).getMonth() + 1}
          </Text>
        </Box>
      </Box>

      {/* [uiux][design] 左端 hover ですみやかに表示されるサイドパネル ^^ */}
      <Box
        position="absolute"
        height="100%"
        width="100px"
        left="0px"
        onMouseEnter={openSidePanel}
        zIndex={10}
      ></Box>

      {/* [uiux][design] 大胆なサイドパネルデザイン ^^ */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          onMouseLeave={closeSidePanel}
          // 開閉速度をカスタマイズ
          transition="all 0.2s ease-out" // [uiux][design][animation] ここでは ease-out が最適 ^^
          zIndex={20}
        >
          <DrawerHeader
            padding={30}
            paddingLeft={100}
            fontSize={28}
            borderBottomWidth="1px"
          >
            #国会Today
          </DrawerHeader>
          <DrawerBody>
            <Box py={4}>
              <FlatDatePicker />
            </Box>
            <Box py={2}>
              <GithubRepoCard
                repoUrl="https://github.com/taniiicom/kokkai-today"
                repoData={{
                  full_name: "taniiicom/kokkai-today",
                  description:
                    "今日1日, 国会で話されたテーマを, 国会議事録の全発言から抽出しビジュアル化しています.",
                  stargazers_count: 1,
                }}
              />
            </Box>
            <Box>
              <TipsCard url="https://taniiicom.fanbox.cc/plans" />
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Box display="flex" flexDirection="column" width="100%">
              <Link href="https://x.com/taniiicom" target="_blank">
                <Text fontSize={17}>Taniii @taniiicom</Text>
              </Link>
              <Link href="https://kokkai.ndl.go.jp/#/" target="_blank">
                <Text fontSize={13}>source: 国立国会図書館 国会会議録</Text>
              </Link>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SidePanel;
