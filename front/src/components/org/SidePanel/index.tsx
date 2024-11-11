import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { CgMenuMotion } from "react-icons/cg";
import { BsArrowLeft } from "react-icons/bs";
import React from "react";
import FlatDatePicker from "@/components/mol/FlatDatePicker";

const SidePanel = () => {
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
        icon={isOpen ? <BsArrowLeft /> : <CgMenuMotion />}
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

      {/* [uiux][design] 左端 hover ですみやかに表示されるサイドパネル ^^ */}
      <Box
        position="absolute"
        height="100%"
        width="70px"
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SidePanel;
