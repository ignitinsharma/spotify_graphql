import {
  Box,
  Heading,
  Image,
  Text,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

const MusicPlayer = ({
  CurrentPlayingSong,
  data,
  index,
  handleSendDataInMusic,
}) => {
  const audioRefrence = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePrevSong = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    setCurrentSong(currentSong === 0 ? data.length - 1 : currentSong - 1);
    handleSendDataInMusic(
      currentSong === 0 ? data.length - 1 : currentSong - 1
    );
  };
  const handleNextSong = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    handleSendDataInMusic((currentSong + 1) % data.length);

    /* this is for if song is last so we set up the songs first index again */
    currentSong + 1 === data.length
      ? setCurrentSong(0)
      : setCurrentSong(currentSong + 1);
  };

  const handleMuteSongs = () => {
    setIsMute(!isMute);
  };

  const handlePlayPauseSong = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (value) => {
    setCurrentTime(value);
    audioRefrence.current.currentTime = value;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRefrence.current.currentTime);
  };

  useEffect(() => {
    data.forEach((el, index) => {
      if (el._id === CurrentPlayingSong._id) {
        setCurrentSong(index);
        setIsPlaying(true);
      }
    });
  }, [CurrentPlayingSong]);

  useEffect(() => {
    audioRefrence.current.src = data[currentSong].url;
    audioRefrence.current.load();
  }, [currentSong, data]);

  /* For playing song */
  useEffect(() => {
    if (isPlaying) {
      audioRefrence.current.play();
    } else {
      audioRefrence.current.pause();
    }
  }, [isPlaying]);

  /* for mute and unmute the function */
  useEffect(() => {
    if (isMute) {
      audioRefrence.current.muted = true;
    } else {
      audioRefrence.current.muted = false;
    }
  }, [isMute]);

  useEffect(() => {
    audioRefrence.current.currentTime = currentTime;
  }, [currentTime]);

  return (
    <Box
      h={"fit-content"}
      w={{
        lg: "40%",
        sm: "100%",
        md: "100%",
      }}
    >
      <Box
        h={"fit-content"}
        pos={{ lg: "fixed", base: "relative" }}
        top={"30px"}
        right={"20px"}
        gap={"32px"}
      >
        <Box h={"fit-content"} px="1rem" h={"68px"} gap={"8px"}>
          <Text
            fontWeight={700}
            fontSize={{ lg: "2rem", sm: "1.7rem", base: "1.5rem" }}
            lineHeight={"36px"}
            fontStyle={"normal"}
            textAlign={"left"}
          >
            {data[currentSong].title}
          </Text>
          <Text
            fontWeight={400}
            fontSize={"16px"}
            lineHeight={"24px"}
            fontStyle={"normal"}
            opacity={0.6}
            textAlign={"left"}
            mt={2}
          >
            {data[currentSong].artist}
          </Text>
        </Box>
        <Box px="1rem">
          <Image
            src={data[currentSong].photo}
            w={{ lg: "400px", base: "300px" }}
            h={{ lg: "400px" }}
            borderRadius={"10px"}
          />
        </Box>

        <Box px="1rem" h={"fit-content"}>
          <Slider
            aria-label="slider-ex-1"
            max={duration}
            value={currentTime}
            w={"100%"}
            mt="4"
            mr={{ lg: 10, base: "250px", sm: "250px" }}
            handleSendDataInMusic={handleSliderChange}
          >
            <SliderTrack bg="white">
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Flex
            justifyContent={"space-between"}
            mr={{ lg: 12, base: "250px", sm: "250px" }}
            mt={5}
          >
            <Box>
              <IconButton
                size="lg"
                icon={<SlOptions />}
                bg={"transparent"}
                backgroundColor="rgba(255, 255, 255, 0.08)"
                _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                borderRadius={"50%"}
              />
            </Box>
            <Box>
              <IconButton
                onClick={handlePrevSong}
                bg={"transparent"}
                _hover={{ bg: "rgba(255, 255, 255,0.09)" }}
                icon={<FaBackward />}
                size="lg"
                borderRadius={"10px"}
                mr="1rem"
              />
              <IconButton
                onClick={handlePlayPauseSong}
                bg={"transparent"}
                _hover={{ bg: "rgba(255, 255, 255,0.09)" }}
                icon={isPlaying ? <FaPause /> : <FaPlay />}
                borderRadius={"10px"}
                size="lg"
                mr="1rem"
              />
              <IconButton
                onClick={handleNextSong}
                borderRadius={"10px"}
                bg={"transparent"}
                _hover={{ bg: "rgba(255, 255, 255,0.09)" }}
                icon={<FaForward />}
                size="lg"
              />
            </Box>
            <Box>
              <IconButton
                onClick={handleMuteSongs}
                size="lg"
                icon={isMute ? <HiVolumeOff /> : <HiVolumeUp />}
                bg={"transparent"}
                backgroundColor="rgba(255, 255, 255, 0.08)"
                _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                borderRadius={"50%"}
              />
            </Box>
          </Flex>
          <audio
            onTimeUpdate={handleTimeUpdate}
            autoPlay
            ref={audioRefrence}
            onLoadedMetadata={() => setDuration(audioRefrence.current.duration)}
            onEnded={handleNextSong}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MusicPlayer;
