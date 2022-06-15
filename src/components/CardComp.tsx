import {
  Box,
  Flex,
  Image,
  List,
  ListItem,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import React from "react";
import { Wrapper } from "./Wrapper";

interface WrapperProps {
  rides: any;
  index: number;
}

export const CardComp: React.FC<WrapperProps> = ({ index, rides }) => {
  const path = rides.station_path;

  return (
    <Wrapper variant="large">
      <Box p={5} shadow="md" borderRadius={8} bg="#171717" key={index}>
        <Flex>
          <Image
            w="296px"
            h="148px
          "
            borderRadius={5}
            src={rides.map_url}
          />
          <Flex direction="column" ml={"10"}>
            <List spacing={2} color="#CFCFCF">
              <ListItem>
                Ride Id : <span>{rides.id}</span>
              </ListItem>
              <ListItem>
                Origin Station : <span>{rides.origin_station_code}</span>
              </ListItem>
              <ListItem>
                station_path : <span>[{path.toString()}]</span>
              </ListItem>
              <ListItem>
                Date : <span>{rides.date}</span>
              </ListItem>
              <ListItem>
                Distance: <span>{rides.distance}</span>
              </ListItem>
            </List>
          </Flex>

          <Box ml="auto">
            <Tag
              borderRadius="full"
              variant="solid"
              colorScheme="#000000"
              mr={3}
            >
              <TagLabel>{rides.city}</TagLabel>
            </Tag>
            <Tag borderRadius="full" variant="solid" colorScheme="#000000">
              <TagLabel>{rides.state}</TagLabel>
            </Tag>
          </Box>
        </Flex>
      </Box>
    </Wrapper>
  );
};
