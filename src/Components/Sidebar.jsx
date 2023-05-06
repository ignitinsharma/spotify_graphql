import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

const LinkItems = [
  { name: "For You", icon: FiHome, path: "/" },
  { name: "Top Tracks", icon: FiTrendingUp, path: "/top" },
  { name: "Favorites", icon: FiCompass, path: "/favourites" },
  { name: "Recently Played", icon: FiSettings, path: "/recent" },
];

export default function SidebarComponent({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      background="linear-gradient(to bottom, rgb(27,19,5), rgb(20,14,4))"
      minH="100vh"
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Flex>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Box
      background="linear-gradient(to bottom, rgb(27,19,5), rgb(20,14,4))"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60, sm: "full" }}
      pos="fixed"
      h="full"
      {...rest}
    >
      {/* <Link to="/"> */}
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          cursor={"pointer"}
          onClick={() => navigate("/")}
          w={"160px"}
          h={"50px"}
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {/* </Link> */}
      {LinkItems.map((item, index) => (
        <Box pl={"2.5rem"} key={index}>
          <NavLink to={item.path}>
            <Text
              color={"white"}
              mt={"5px"}
              fontSize={"1rem"}
              style={{ fontWeight: "500" }}
            >
              {item.name}
            </Text>
          </NavLink>
        </Box>
      ))}
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};
