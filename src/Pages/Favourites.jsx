import React, { useState } from "react";
import { debounce } from "lodash";
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Icon,
  Button,
  InputRightElement,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import Sidebar from "../Components/Sidebar";
import { FiSearch } from "react-icons/fi";
import Loading from "../Components/Loading";
import { GET_ALL_SONGS } from "../ApiFunctions/getSongsQuery";

const Favourites = ({ artistId }) => {
  const [toggleColor, setToggleColor] = useState(false);
  const [inputBox, setInputBox] = useState("");
  const [singleSongs, setsingleSongs] = useState({
    _id: "61b6f14dc2f7cafd968c31f2",
    title: "A Head Full Of Dreams",
    artist: "Coldplay",
    duration: 645,
    photo:
      "https://i.pinimg.com/originals/1d/a7/9a/1da79a9ed751285378a05535ddb71ec8.png",
    url: "https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3",
    __typename: "Song",
  });
  const { loading, error, data } = useQuery(GET_ALL_SONGS, {
    variables: { playlistId: 3, search: inputBox },
  });

  const handlClickOnSingleSongs = (singleSong) => {
    setsingleSongs(singleSong);
    handleToggleColor();
  };

  const debouncedHandleInputChange = debounce((value) => {
    setInputBox(value);
  }, 1000);

  const handleInputChange = (event) => {
    const value = event.target.value;
    debouncedHandleInputChange(value);
  };

  const handleToggleColor = () => {
    setToggleColor(!toggleColor);
  };

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;
  return (
    <Box
      color={"white"}
      background={
        toggleColor
          ? "linear-gradient(to bottom, rgb(29,38,54), rgb(2,2,3))"
          : "linear-gradient(to bottom, rgb(27,19,5), rgb(20,14,4))"
      }
    >
      <Flex display={{ lg: "flex", sm: "block", md: "block" }}>
        <Sidebar />
        <Flex
          display={{ lg: "flex", sm: "block", md: "block" }}
          w={"75%"}
          px="1rem"
          justifyContent={"space-between"}
        >
          <Box
            border="1px solid black"
            w={{ lg: "40%", md: "100%", sm: "100%" }}
            mt={8}
          >
            <Heading mb={"1rem"} textAlign={"left"}>
              Favourites Songs
            </Heading>
            <Box mt={6}>
              <InputGroup>
                <Input
                  type="search"
                  placeholder="Search Songs, Artist.."
                  background={
                    toggleColor
                      ? "linear-gradient(to bottom, rgb(29,38,54), rgb(2,2,3))"
                      : "linear-gradient(to bottom, rgb(27,19,5), rgb(20,14,4))"
                  }
                  _placeholder={{ color: "rgb(170,167,162)", fontSize: "18px" }}
                  border={"none"}
                  py={6}
                  onChange={handleInputChange}
                />
                <InputRightElement width="4.5rem">
                  <Button variant={"link"} size="lg">
                    <Icon
                      as={FiSearch}
                      color="rgb(170,167,162)"
                      boxSize={6}
                      mt={2}
                    />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
            <Box mt={"40px"}>
              {data.getSongs?.map((songs) => (
                <Flex
                  cursor={"pointer"}
                  mb={"1rem"}
                  justifyContent={"space-between"}
                  key={songs._id}
                  onClick={() => handlClickOnSingleSongs(songs)}
                >
                  <Flex>
                    <Image
                      borderRadius={"full"}
                      boxSize={"40px"}
                      objectFit={"cover"}
                      src={songs.photo}
                    />
                    <Box ml="1rem">
                      <Text
                        fontSize={"1rem"}
                        fontWeight={"bold"}
                        textAlign={"left"}
                      >
                        {songs.title}
                      </Text>
                      <Text textAlign={"left"}>{songs.artist}</Text>
                    </Box>
                  </Flex>
                  <Text>{(songs.duration / 60).toFixed(2)}</Text>
                </Flex>
              ))}
            </Box>
          </Box>
          <Box px="1rem" w={{ lg: "50%", md: "100%", sm: "100%" }} mt={14}>
            <Text
              fontSize={"2rem"}
              fontWeight={"bold"}
              fontStyle={"Gotham Circular"}
              textAlign={"left"}
            >
              {singleSongs.title}
            </Text>
            <Text fontWeight={"bold"} fontSize={"1.2rem"} textAlign={"left"}>
              {singleSongs.artist}
            </Text>
            <Flex direction={"column"} gap={10} alignItems={"center"}>
              <Image
                mt={"1rem"}
                borderRadius={"10px"}
                w="500px"
                h="450px"
                src={singleSongs.photo}
              />
              <audio controls>
                <source src={singleSongs.url} type="audio/ogg" />
                Your browser does not support the audio tag.
              </audio>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Favourites;
