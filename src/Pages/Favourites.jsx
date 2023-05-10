import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import {
  Box,
  Flex,
  Text,
  Input,
  Image,
  InputGroup,
  InputRightElement,
  Heading,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useQuery } from "@apollo/client";
import { debounce } from "lodash";
import { GET_ALL_SONGS } from "../ApiFunctions/getSongsQuery";
import Loading from "../Components/Loading";
import MusicPlayer from "./Player";

const Favorites = ({ playlistId }) => {
  const [toggleColor, setToggleColor] = useState(false);
  const [activeIndex, SetactiveIndex] = useState(0);
  const [inputSearchBox, setInputSearchBox] = useState("");
  const [songIndex, setSongIndex] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  /* Setting up default song if user doesn't click so this data will show to user */
  const [Player, setPlayer] = useState({
    artist: "Weeknd",
    duration: 320,
    photo:
      "https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg",
    title: "Starboy",
    url: "https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3",
    __typename: "Song",
    _id: "61b6f14dc2f7cafd968c31f0",
  });

  /* Grabbing the data from API using userQuery hook  */
  const { loading, error, data } = useQuery(GET_ALL_SONGS, {
    variables: { playlistId: 3, search: inputSearchBox },
  });

  /* Setting up the songs value into states so we can send it to music player */
  const handleSingleSongsClick = (song, index) => {
    SetactiveIndex(index);
    setPlayer(song);
    setSongIndex(index);
    setCurrentSongIndex(index);
    handleToggleColor();
  };

  /* Deboucing using lodash  */
  let handleDebounced = debounce((value) => {
    setInputSearchBox(value);
  }, 800);

  /* For Input search Box */
  const handleSearch = (e) => {
    let value = e.target.value;
    handleDebounced(value);
  };

  /* For sending the active songs and index */
  const handleSendDataInMusic = (i) => {
    SetactiveIndex(i);
    setCurrentSongIndex(i);
  };

  /* For toggle color when user click on songs  */
  const handleToggleColor = () => {
    setToggleColor(!toggleColor);
  };

  if (loading) return <Loading />;
  if (error) return <p>Error {error.message}</p>;
  return (
    <Box
      color={"white"}
      background={
        toggleColor
          ? "linear-gradient(to bottom, rgb(29,38,54), rgb(2,2,3))"
          : "linear-gradient(to bottom, rgb(27,19,5), rgb(20,14,4))"
      }
      backgroundSize="cover"
      h={"auto"}
    >
      <Flex
        display={{
          lg: "flex",
          sm: "block",
        }}
      >
        <Sidebar />
        <Flex
          mt={"2rem"}
          w={"100%"}
          display={{ sm: "block", md: "block", lg: "flex" }}
          px={"1rem"}
          justifyContent={"space-between"}
        >
          <Box
            w={{
              lg: "50%",
              sm: "100%",
              md: "100%",
            }}
          >
            <Box mb="30px">
              <Heading fontSize={"30px"} textAlign={"left"}>
                Favorites
              </Heading>

              <InputGroup mt={10}>
                <Input
                  border={"none"}
                  backgroundColor={"rgba(255, 255, 255, 0.08)"}
                  onChange={(e) => handleSearch(e)}
                  w={"550px"}
                  placeholder="Search Song, Artist"
                  py={3}
                  px={4}
                  borderRadius={"8px"}
                />
                <InputRightElement
                  w={"4.5rem"}
                  children={
                    <SearchIcon boxSize={5} mt={2} opacity={"0.2"} mb={2} />
                  }
                />
              </InputGroup>
            </Box>
            {data.getSongs?.map((songs, index) => (
              <Flex
                px="1rem"
                py="0.5rem"
                borderRadius={"8px"}
                bg={index === activeIndex ? "rgba(255, 255, 255, 0.08)" : ""}
                cursor={"pointer"}
                mb={"1rem"}
                justifyContent={"space-between"}
                key={songs._id}
                onClick={() => handleSingleSongsClick(songs, index)}
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

          <MusicPlayer
            CurrentPlayingSong={Player}
            data={data.getSongs}
            index={songIndex}
            handleSendDataInMusic={handleSendDataInMusic}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Favorites;
