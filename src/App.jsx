import { Box, Flex, Text } from "@chakra-ui/react";
import SidebarComponent from "./Components/Sidebar";
import AllRoutes from "./Components/AllRoutes";
import { useState } from "react";

function App() {
  return (
    <Box>
      <AllRoutes />
    </Box>
  );
}

export default App;
