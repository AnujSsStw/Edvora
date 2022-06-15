import { Box, Flex, HStack, Input, Spacer } from "@chakra-ui/react";
import dateFormat from "dateformat";
import { useState } from "react";
import { CardComp } from "../components/CardComp";
import { NavBar } from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";

const Index = ({ user, rides }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(1);

  //adding the distance directly to the ride object
  const userDistance = user.station_code;
  for (let i = 0; i < rides.length; i++) {
    const path = rides[i].station_path;
    const Stationdistance = path.reduce((prev, curr) => {
      return Math.abs(curr - userDistance) < Math.abs(prev - userDistance)
        ? curr
        : prev;
    });

    const distance = Math.abs(Stationdistance - userDistance);

    rides[i].distance = distance;
    rides[i].Slicedate = dateFormat(rides[i].date, "dd/mm/yyyy");
  }

  //for same date format btw the data and the current date
  const date = new Date();
  const today = dateFormat(date, "dd/mm/yyyy");

  //data in different areas and filtered by the date
  const NearestRides = rides;
  const UpcomingRides = rides.filter((ride) => ride.Slicedate > today);
  const PastRides = rides.filter((ride) => ride.Slicedate < today);

  let Screen = null;
  if (state === 1) {
    Screen = (
      <>
        {NearestRides.filter((e) => {
          // filtering the search term
          if (searchTerm === "") {
            return e;
          } else if (
            e.city.toLowerCase().includes(searchTerm) ||
            e.state.toLowerCase().includes(searchTerm)
          ) {
            return e;
          }
        })
          .sort((a, b) => {
            return a.distance - b.distance;
          })
          .map((ride, index) => {
            return <CardComp key={index} rides={ride} index={index} />;
          })}
      </>
    );
  } else if (state === 2) {
    Screen = (
      <>
        {UpcomingRides.filter((e) => {
          if (searchTerm === "") {
            return e;
          } else if (
            e.city.toLowerCase().includes(searchTerm) ||
            e.state.toLowerCase().includes(searchTerm)
          ) {
            return e;
          }
        })
          .sort((a, b) => {
            return a.distance - b.distance;
          })
          .map((ride, index) => {
            return <CardComp key={index} rides={ride} index={index} />;
          })}
      </>
    );
  } else {
    Screen = (
      <>
        {PastRides.filter((e) => {
          if (searchTerm === "") {
            return e;
          } else if (
            e.city.toLowerCase().includes(searchTerm) ||
            e.state.toLowerCase().includes(searchTerm)
          ) {
            return e;
          }
        })
          .sort((a, b) => {
            return a.distance - b.distance;
          })
          .map((ride, index) => {
            return <CardComp key={index} rides={ride} index={index} />;
          })}
      </>
    );
  }

  return (
    <>
      <NavBar user={user} />

      <Wrapper variant="large">
        <HStack spacing="24px" color={"white"}>
          <Box
            onClick={() => {
              setState(1);
            }}
            textDecoration={state === 1 ? "underline" : "none"}
            textDecorationThickness="1px"
            textUnderlineOffset={6}
            fontWeight={state === 1 ? "bold" : "normal"}
            _hover={{ cursor: "pointer" }}
          >
            Nearest rides
          </Box>
          <Box
            onClick={() => {
              setState(2);
            }}
            textDecoration={state === 2 ? "underline" : "none"}
            textDecorationThickness="1px"
            textUnderlineOffset={6}
            fontWeight={state === 2 ? "bold" : "normal"}
            _hover={{ cursor: "pointer" }}
          >
            Upcoming rides ({UpcomingRides.length})
          </Box>
          <Box
            textDecoration={state === 3 ? "underline" : "none"}
            fontWeight={state === 3 ? "bold" : "normal"}
            textDecorationThickness="1px"
            textUnderlineOffset={6}
            _hover={{ cursor: "pointer" }}
            onClick={() => setState(3)}
          >
            Past rides ({PastRides.length})
          </Box>

          <Spacer w="max" />

          <Flex>
            <Input
              variant="flushed"
              placeholder="Filters"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </Flex>
        </HStack>
      </Wrapper>

      {Screen}
    </>
  );
};

export async function getServerSideProps() {
  // Your code
  const req = await fetch("https://assessment.api.vweb.app/user");
  const data = await req.json();

  const req2 = await fetch("https://assessment.api.vweb.app/rides");
  const data2 = await req2.json();

  // Passing data to the Page using props
  return {
    props: { user: data, rides: data2 },
  };
}

export default Index;
