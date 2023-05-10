import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const LinkItems = [
  { name: "For You", path: "/" },
  { name: "Top Tracks", path: "/top" },
  { name: "Favourites", path: "/favourites" },
  { name: "Recently Played", path: "/recent" },
];

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" color={"white"}>
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
        size="xs"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      backgroundColor={{
        base: "rgb(26,18,5)",
        sm: "rgb(26,18,5)",
        lg: "transparent",
      }}
      color={"white"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <a href="/">
          <Image
            cursor={"pointer"}
            w={"160px"}
            h={"50px"}
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          />
        </a>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((item, index) => (
        <Text
          key={index}
          textAlign={"left"}
          px={"2rem"}
          py={"0.2rem"}
          mt={1}
          fontSize={"17px"}
        >
          <NavLink
            to={item.path}
            style={({ isActive }) => {
              return isActive ? { opacity: "100" } : { opacity: 0.4 };
            }}
          >
            {item.name}
          </NavLink>
        </Text>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Box
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="auto"
      alignItems="center"
      pos={"sticky"}
      top={0}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Box>
  );
};
